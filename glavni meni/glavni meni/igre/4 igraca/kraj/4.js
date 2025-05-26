const kockica1 = document.getElementById('kockica1');
const kockica2 = document.getElementById('kockica2');
const baciBtn = document.getElementById('baci-kockicu');
const naPotezu = document.getElementById('na-potezu');
const polja = document.querySelectorAll('.polje');
let porez = 0; // Globalna varijabla za skupljeni porez
const cenePolja = [
  null, 60, null, 60, null, 200, 100, null, 100, 120, null, // Index 0 je Start, Index 2 je Šansa, Index 4 je Porez, Index 7 je Zajednica, Index 10 je Zatvor
  140, 150, 140, 160, 200, 180, null, 180, 200, null,
  220, null, 220, 240, 200, 260, 260, null, 280, 300, // Index 22 je Šansa, Index 28 je Vodovod
  null, 300, 320, null, 200, null, 350, null, 400 // Index 32 je Zajednica, Index 36 je Šansa
];
const imenaPolja = [
  "Start", "Beograd", "Šansa", "Novi Sad", "Porez", "Stanica",
  "Niš", "Zajednica", "Subotica", "U poseti zatvoru", "Zatvor",
  "Kragujevac", "EPS", "Čačak", "Kraljevo", "Stanica", "Šabac",
  "Zajednica", "Pančevo", "Zrenjanin", "Besplatan parking", "Užice",
  "Šansa", "Valjevo", "Loznica", "Stanica", "Požarevac", "Smederevo",
  "Vodovod", "Sremska Mitrovica", "Idi u zatvor", "Leskovac", "Zajednica",
  "Kikinda", "Sombor", "Stanica", "Šansa", "Pirot", "Porez", "Jovac"
];
const hipotekeCene = [
  null, 30, null, 30, null, 100, 50, null, 50, 60, null,
  70, 75, 70, 80, 100, 90, null, 90, 100, null,
  110, null, 110, 120, 100, 130, 130, null, 140, 150,
  null, 150, 160, null, 100, null, 175, null, 200
];

const zeleznice = [5, 15, 25, 35];
const komunalije = [12, 28];

// MODIFIKOVANO: Početno stanje igrača za demonstraciju kraja igre
const figurice = [
  // Igrač 1: Pobednik - ima mnogo novca i poseda
  { id: 1, pozicija: 0, novac: 2500, posedi: [11, 13, 14, 1, 3, 37, 39], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true }, // Kragujevac, Čačak, Kraljevo (smeđa grupa), Beograd, Novi Sad (ljubičasta), Pirot, Jovac (tamno plava)
  // Igrač 2: Ima malo novca, brzo bankrotira
  { id: 2, pozicija: 0, novac: 300, posedi: [], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true },
  // Igrač 3: Ima vrlo malo novca, brzo bankrotira
  { id: 3, pozicija: 0, novac: 150, posedi: [], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true },
  // Igrač 4: Ima vrlo malo novca, brzo bankrotira
  { id: 4, pozicija: 0, novac: 200, posedi: [], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true }
];

let trenutniIgrac = 0;
const ukupnoPolja = 40;
const vlasnici = Array(40).fill(null);
const kuce = Array(40).fill(0);
const hipoteke = Array(40).fill(false);
const sansa = [
  "Dobio si 200$",
  "Plati kaznu 100$",
  "Idi direktno u zatvor",
  "Idi na Start",
  "Karta za izlazak iz zatvora"
];

const bojePolja = [
  [1, 3], // Ljubicasta (Beograd, Novi Sad)
  [6, 8, 9], // Svetlo plava (Niš, Subotica, U poseti zatvoru)
  [11, 13, 14], // Roza (Kragujevac, Čačak, Kraljevo)
  [16, 18, 19], // Narandzasta (Šabac, Pančevo, Zrenjanin)
  [21, 23, 24], // Crvena (Užice, Valjevo, Loznica)
  [26, 27, 29], // Zuta (Požarevac, Smederevo, Sremska Mitrovica)
  [31, 32, 34], // Zelena (Leskovac, Kikinda, Sombor)
  [37, 39] // Tamno plava (Pirot, Jovac)
];

let bacanjeDozvoljeno = true;

const porezi = {
  4: 150, // Porez na dohodak
  38: 150 // Porez na luksuz
};

// MODIFIKOVANO: Sekvenca bacanja kockica za demonstraciju kraja igre
// Sekvenca je duža kako bi se osiguralo da se igrači pomere dovoljno da bankrotiraju
const fiksnaBacanja = [
  [1, 1], // Igrač 1 (🔴) na poziciju 2 (Šansa) - Bez kupovine/renete odmah
  [5, 6], // Igrač 2 (🔵) na poziciju 8 (Subotica) - Vlasnik 1, plaća visoku rentu! -> Bankrot
  [5, 6], // Igrač 3 (🟢) na poziciju 10 (Zatvor) -> Plaćanje izlaska ili čekanje
  [5, 6], // Igrač 4 (🟡) na poziciju 7 (Zajednica) -> Možda plati nešto
  [6, 6], // Igrač 1 (🔴) na poziciju 14 (Kraljevo) - Svoje polje (sa kućama)
  [1, 2], // Igrač 2 (🔵) ako je preživeo, sleta na 5 (Stanica) ili dalje
  [1, 2], // Igrač 3 (🟢) ako je u zatvoru, ostaje; inače se pomera
  [5, 1], // Igrač 4 (🟡) ako je preživeo, sleta na 13 (Čačak) - Vlasnik 1, plaća visoku rentu! -> Bankrot
  [1, 3], // Igrač 1 (🔴) na 18 (Pančevo) - Svoje polje
  [6, 3], // Igrač 2 (🔵) - dalje bacanje
  [4, 2], // Igrač 3 (🟢) - dalje bacanje
  [3, 3]  // Igrač 4 (🟡) - dalje bacanje
  // Dodajte još bacanja po potrebi, ili se vratite na random nakon ovih
];
let brojacBacanja = 0; // Brojač za fiksna bacanja

function postaviPocetneFigurice() {
  figurice.forEach((igrac) => {
    const polje = polja[igrac.pozicija];
    const figuricaEl = document.createElement('div');
    figuricaEl.className = `figurica igrac${igrac.id}`;
    figuricaEl.innerText = ['🔴','🔵','🟢','🟡'][igrac.id - 1];
    polje.appendChild(figuricaEl);

    igrac.posedi.forEach(pIndex => {
      vlasnici[pIndex] = igrac.id;
      // Ako igrač 1 ima grupu, dodajemo kuće da povećamo rentu
      // Kragujevac grupa (11, 13, 14) i Beograd grupa (1, 3) i Pirot grupa (37, 39)
      if (igrac.id === 1 && (bojePolja[2].includes(pIndex) || bojePolja[0].includes(pIndex) || bojePolja[7].includes(pIndex))) {
          if (kuce[pIndex] < 4) kuce[pIndex] = 2; // Dodajemo dve kuće na početku radi veće rente
      }
    });
  });
}

function baciKockice() {
  if (!bacanjeDozvoljeno) return;

  const igrac = figurice[trenutniIgrac];
  if (!igrac.aktivan) {
    sledeciIgrac();
    return;
  }

  if (igrac.uZatvoru) {
    if (igrac.imaKartuZaIzlazIzZatvora) {
      igrac.uZatvoru = false;
      igrac.imaKartuZaIzlazIzZatvora = false;
      alert("Iskoristio si kartu za izlazak iz zatvora.");
    } else if (igrac.novac >= 50) {
      igrac.novac -= 50;
      igrac.uZatvoru = false;
      alert("Platio si 50$ i izašao iz zatvora.");
    } else {
      igrac.kazna--;
      if (igrac.kazna <= 0) {
        igrac.uZatvoru = false;
        alert("Odležao si kaznu i sada izlaziš iz zatvora.");
      } else {
        alert(`U zatvoru si još ${igrac.kazna} potez/a.`);
        sledeciIgrac();
        return;
      }
    }
  }

  // MODIFIKOVANO: Koristimo fiksna bacanja kockica
  let broj1, broj2;
  if (brojacBacanja < fiksnaBacanja.length) {
    [broj1, broj2] = fiksnaBacanja[brojacBacanja];
    brojacBacanja++;
  } else {
    // Vraćanje na nasumična bacanja nakon fiksne sekvence
    broj1 = Math.floor(Math.random() * 6) + 1;
    broj2 = Math.floor(Math.random() * 6) + 1;
  }
  const zbir = broj1 + broj2;

  kockica1.style.animation = 'none';
  kockica2.style.animation = 'none';
  void kockica1.offsetWidth;
  void kockica2.offsetWidth;
  kockica1.style.animation = 'rotiraj 0.5s forwards';
  kockica2.style.animation = 'rotiraj 0.5s forwards';

  kockica1.innerText = broj1;
  kockica2.innerText = broj2;

  bacanjeDozvoljeno = false;

  setTimeout(() => {
    kockica1.classList.add('zaustavljena');
    kockica2.classList.add('zaustavljena');
  }, 500);

  setTimeout(() => {
    pomeriIgracaAnimirano(zbir, (broj1 === broj2)); // Prosleđujemo da li je dupli
  }, 600);
}

function pomeriIgracaAnimirano(koraci, dupli, callback) {
  const igrac = figurice[trenutniIgrac];
  let pomeranja = 0;

  const interval = setInterval(() => {
    document.querySelectorAll(`.figurica.igrac${igrac.id}`).forEach(el => el.remove());
    igrac.pozicija = (igrac.pozicija + 1) % ukupnoPolja;

    if (igrac.pozicija === 0 && pomeranja < koraci) {
      igrac.novac += 200;
      alert("Prošao si Start i dobio 200$!");
    }
    else if (igrac.pozicija === 20 && pomeranja < koraci)
    {
      if(porez != 0)
      {
        alert(`Dobili ste sav porez! ${porez}$`);
        igrac.novac += porez;
        porez = 0;
      }
    }

    const polje = polja[igrac.pozicija];
    const figuricaEl = document.createElement('div');
    figuricaEl.className = `figurica igrac${igrac.id}`;
    figuricaEl.innerText = ['🔴','🔵','🟢','🟡'][igrac.id - 1];
    polje.appendChild(figuricaEl);

    pomeranja++;

    if (pomeranja >= koraci) {
      clearInterval(interval);
      if (callback) callback();
      else nakonPomeranja(dupli);
    }
  }, 250);
}

function nakonPomeranja(dupli) {
  const igrac = figurice[trenutniIgrac];
  const index = igrac.pozicija;

  if (index === 30) { // Idi u zatvor
    igrac.uZatvoru = true;
    igrac.kazna = 3;

    pomeriIgracaDoPolja(10, () => { // Pomeri figuru na polje Zatvor
      igrac.pozicija = 10;
      alert("Idi u zatvor! 3 poteza pauza.");
      azurirajPrikaz();
      sledeciIgrac(); // Završi potez
    });
    return;
  }

  if ([2, 7, 17, 22, 36].includes(index)) { // Šansa i Zajednica
    izvuciKartu(index, dupli);
    return;
  }

  if (porezi[index]) { // Porez polja
    obradiPorez(index);
    return;
  }

  if (vlasnici[index] && vlasnici[index] !== igrac.id) {
    // Polje ima vlasnika i nije tvoje (plaća se renta)
    obradiRentu(index);
  } else if (vlasnici[index] === null && cenePolja[index] !== null) {
    // Polje nema vlasnika i može se kupiti
    document.getElementById('akcije').style.display = 'flex';
    document.getElementById('kupi-polje').innerText = `Kupi ${cenePolja[index]}$`;
    document.getElementById('kupi-polje').style.display = 'block';
    document.getElementById('preskoci-kupovinu').style.display = 'block'; // Prikazi dugme Preskoči
    document.getElementById('izgradi').style.display = 'none';
    document.getElementById('hipoteka').style.display = 'none';
    document.getElementById('odglavi').style.display = 'none';
  } else {
    // Polje je tvoje, ili je besplatno (Start, Zatvor, Parking, Šansa, Zajednica)
    if (vlasnici[index] === igrac.id) {
        document.getElementById('akcije').style.display = 'flex';
        document.getElementById('kupi-polje').style.display = 'none';
        document.getElementById('preskoci-kupovinu').style.display = 'none'; // Sakrij preskoci za svoje polje
        document.getElementById('izgradi').style.display = 'block';
        document.getElementById('hipoteka').style.display = 'block';
        document.getElementById('odglavi').style.display = 'block';
    } else {
        document.getElementById('akcije').style.display = 'none'; // Ako je besplatno polje, nema akcija
        sledeciIgrac(); // Pređi na sledećeg igrača ako nema akcija
    }
  }

  // Ako nije dupli broj, prelazimo na sledećeg igrača nakon akcija,
  // ali samo ako trenutne akcije (kupovina/preskakanje) nisu još završene
  if (!dupli && (vlasnici[index] === null || vlasnici[index] === igrac.id || [2,7,17,22,36].includes(index) || porezi[index])) {
    // Ne pozivamo sledeciIgrac() ovde, jer ga pozivamo u handerima akcija (kupi/preskoci/izgradi/hipoteka/renta/porez/karta)
    // Ostavljamo igraču da odabere akciju
  } else if (dupli) {
    alert("Bacio si dupli broj! Igraš još jednom.");
    bacanjeDozvoljeno = true;
  }
  azurirajPrikaz();
}

function izvuciKartu(index, dupli) {
  const igrac = figurice[trenutniIgrac];
  let kartaTip = '';
  let kartaSadrzaj = '';

  const sansaKarte = [
    "Dobio si 200$",
    "Plati kaznu 100$",
    "Idi direktno u zatvor",
    "Idi na Start",
    "Karta za izlazak iz zatvora"
  ];
  const zajednicaKarte = [
    "Nasleđe ti je 200$",
    "Plaćaš školarinu 150$",
    "Idi direktno u zatvor",
    "Idi na Start",
    "Karta za izlazak iz zatvora"
  ];

  if ([2, 22, 36].includes(index)) {
      kartaTip = 'Šansa';
      kartaSadrzaj = sansaKarte[Math.floor(Math.random() * sansaKarte.length)];
  } else if ([7, 17, 32].includes(index)) {
      kartaTip = 'Zajednica';
      kartaSadrzaj = zajednicaKarte[Math.floor(Math.random() * zajednicaKarte.length)];
  }

  alert(`${kartaTip}: ${kartaSadrzaj}`);

  if (kartaSadrzaj.includes("Dobio si") || kartaSadrzaj.includes("Nasleđe ti je")) {
    igrac.novac += parseInt(kartaSadrzaj.match(/\d+/)[0]);
  } else if (kartaSadrzaj.includes("Plati kaznu") || kartaSadrzaj.includes("Plaćaš školarinu")) {
    const iznos = parseInt(kartaSadrzaj.match(/\d+/)[0]);
    igrac.novac -= iznos;
    porez += iznos; // Dodaj u zajednički porez
  } else if (kartaSadrzaj.includes("izlazak")) {
    igrac.imaKartuZaIzlazIzZatvora = true;
  } else if (kartaSadrzaj.includes("zatvor")) {
    igrac.uZatvoru = true;
    igrac.kazna = 3;
    pomeriIgracaDoPolja(10, () => {
      igrac.pozicija = 10;
      azurirajPrikaz();
      sledeciIgrac();
    });
    return;
  } else if (kartaSadrzaj.includes("Start")) {
    pomeriIgracaDoPolja(0, () => {
      igrac.novac += 200; // Dobija 200$ za prolazak kroz Start
      azurirajPrikaz();
      sledeciIgrac();
    });
    return;
  }

  azurirajPrikaz();
  if (!dupli) {
      sledeciIgrac();
  }
}

function pomeriIgracaDoPolja(zeljenoPolje, callback) {
  const igrac = figurice[trenutniIgrac];

  if (zeljenoPolje < 0 || zeljenoPolje >= ukupnoPolja) {
    alert("Nevažeće polje!");
    return;
  }

  let koraci = zeljenoPolje >= igrac.pozicija
    ? zeljenoPolje - igrac.pozicija
    : ukupnoPolja - igrac.pozicija + zeljenoPolje;

  // Specijalna animacija za idi u zatvor (ako je potrebno da se samo teleportuje)
  if (zeljenoPolje === 10 && igrac.pozicija === 30) {
      document.querySelectorAll(`.figurica.igrac${igrac.id}`).forEach(el => el.remove());
      const polje = polja[zeljenoPolje];
      const figuricaEl = document.createElement('div');
      figuricaEl.className = `figurica igrac${igrac.id}`;
      figuricaEl.innerText = ['🔴','🔵','🟢','🟡'][igrac.id - 1];
      polje.appendChild(figuricaEl);
      igrac.pozicija = zeljenoPolje;
      if (callback) callback();
      return;
  }


  pomeriIgracaAnimirano(koraci, false, () => { // false jer ovo nije obično bacanje kockice
    igrac.pozicija = zeljenoPolje;
    if (callback) callback();
  });
}

function obradiPorez(index) {
  const igrac = figurice[trenutniIgrac];
  const iznosPoreza = porezi[index];
  if (iznosPoreza) {
    igrac.novac -= iznosPoreza;
    porez += iznosPoreza; // Dodaj u zajednički porez
    alert(`Porez! Platio si ${iznosPoreza}$. Sada imaš ${igrac.novac}$.`);
    azurirajPrikaz();
  }

  if (igrac.novac < 0) {
      const izbor = prompt(
        `Nemaš dovoljno novca da platiš porez od ${iznosPoreza}$!\n` +
        `1. Pokušaj da pregovaraš (ponudi imovinu)\n` +
        `2. Prodaj polje drugom igraču\n` +
        `3. Prodaj nešto od svoje imovine banci (hipoteka/prodaja)\n` +
        `4. Bankrotiraj`,
        "3"
      );

      if (izbor === "1") {
        pokreniPregovore(igrac, null, iznosPoreza, index); // null jer je poverilac banka (porez)
      } else if (izbor === "2") {
          pokreniProdajuIgracu(igrac, iznosPoreza, () => {
              if (igrac.novac >= 0) { // Proveriti da li je dug podmiren
                  alert(`Uspesno si prikupio novac i platio porez!`);
                  azurirajPrikaz();
                  sledeciIgrac();
              } else {
                  obradiPorez(index); // Ponovo pokušaj da plati porez ako nije dovoljno
              }
          }, index);
      }
      else if (izbor === "3") {
        pokreniProdajuImovine(igrac, iznosPoreza, () => {
          if (igrac.novac >= 0) { // Proveriti da li je dug podmiren
            alert(`Uspesno si prikupio novac i platio porez!`);
            azurirajPrikaz();
            sledeciIgrac();
          } else {
            obradiPorez(index); // Ponovo pokušaj da plati porez ako nije dovoljno
          }
        });
      } else {
        igrac.novac = -1; // Postavi novac na -1 da bankrotira
        sledeciIgrac();
      }
  } else {
      sledeciIgrac(); // Ako ima novca, pređi na sledećeg igrača
  }
}

function obradiRentu(index) {
  const igrac = figurice[trenutniIgrac];
  const vlasnikId = vlasnici[index];
  const vlasnik = figurice[vlasnikId - 1];

  if (vlasnikId && vlasnikId !== igrac.id) {
    if (hipoteke[index]) {
      alert(`Polje ${imenaPolja[index]} je pod hipotekom. Nema rente.`);
      sledeciIgrac();
      return;
    }

    let renta = cenePolja[index] * 0.1;

    if (zeleznice.includes(index)) {
        const brojZeleznicaVlasnika = vlasnik.posedi.filter(p => zeleznice.includes(p)).length;
        renta = 25 * Math.pow(2, brojZeleznicaVlasnika - 1);
    }
    else if (komunalije.includes(index)) {
        const brojKomunalijaVlasnika = vlasnik.posedi.filter(p => komunalije.includes(p)).length;
        const rezultatKockica = parseInt(kockica1.innerText) + parseInt(kockica2.innerText);
        renta = brojKomunalijaVlasnika === 1 ? rezultatKockica * 4 : rezultatKockica * 10;
    }
    else {
      // Povećaj rentu za kuće (izmenjeno da bude progresivnije)
      switch (kuce[index]) {
        case 1: renta = Math.ceil(cenePolja[index] * 0.5); break; // 50%
        case 2: renta = Math.ceil(cenePolja[index] * 1.5); break; // 150%
        case 3: renta = Math.ceil(cenePolja[index] * 3.5); break; // 350%
        case 4: renta = Math.ceil(cenePolja[index] * 5); break; // 500%
        case 5: renta = Math.ceil(cenePolja[index] * 7); break; // 700% (hotel)
        default: renta = Math.ceil(cenePolja[index] * 0.1); // Default ako nema kuća ili je 0
      }
    }
    // Ako vlasnik ima celu grupu i nema kuća, renta se duplira pre primene kuća
    const posedujeCeluGrupu = igracImaSvaPoljaGrupe(index, vlasnikId);
    if (posedujeCeluGrupu && kuce[index] === 0 && !zeleznice.includes(index) && !komunalije.includes(index)) {
        renta *= 2;
    }

    renta = Math.floor(renta); // Zaokruži na ceo broj
    // Minimalna renta da ne bude 0 za nerazvijena polja
    if (renta < 10 && !zeleznice.includes(index) && !komunalije.includes(index)) {
        renta = 10;
    }

    if (igrac.novac >= renta) {
      igrac.novac -= renta;
      vlasnik.novac += renta;
      alert(`Platio si rentu od ${renta}$ igraču ${vlasnikId} za polje ${imenaPolja[index]}. Sada imaš ${igrac.novac}$.`);
      azurirajPrikaz();
      sledeciIgrac();
    } else {
      const izbor = prompt(
        `Nemaš dovoljno novca da platiš rentu od ${renta}$ igraču ${vlasnikId} za polje ${imenaPolja[index]}!\n` +
        `1. Pokušaj da pregovaraš (ponudi imovinu)\n` +
        `2. Prodaj polje drugom igraču\n` +
        `3. Prodaj nešto od svoje imovine banci (hipoteka/prodaja)\n` +
        `4. Bankrotiraj`,
        "3"
      );

      if (izbor === "1") {
        pokreniPregovore(igrac, vlasnikId, renta, index);
      } else if (izbor === "2") {
          pokreniProdajuIgracu(igrac, renta, () => {
              if (igrac.novac >= renta) {
                  igrac.novac -= renta;
                  vlasnik.novac += renta;
                  alert(`Uspesno si prikupio novac i platio rentu od ${renta}$ igraču ${vlasnikId}.`);
                  azurirajPrikaz();
                  sledeciIgrac();
              } else {
                  obradiRentu(index); // Ponovo pokušaj ako nije dovoljno
              }
          }, index);
      }
      else if (izbor === "3") {
        pokreniProdajuImovine(igrac, renta, () => {
            if (igrac.novac >= renta) {
                igrac.novac -= renta;
                vlasnik.novac += renta;
                alert(`Uspesno si prikupio novac i platio rentu od ${renta}$ igraču ${vlasnikId}.`);
                azurirajPrikaz();
                sledeciIgrac();
            } else {
                obradiRentu(index); // Ponovo pokušaj ako nije dovoljno
            }
        });
      } else {
        igrac.novac = -1;
        sledeciIgrac();
      }
    }
  }
}

function pokreniPregovore(duznik, poverilacId, iznos, poljeIndex) {
  const poverilac = poverilacId ? figurice[poverilacId - 1] : null;
  const duznikPosediImena = duznik.posedi.map(idx => `${idx} (${imenaPolja[idx]})`).join(', ');

  if (duznik.posedi.length === 0) {
      alert("Nemaš imovine za pregovore. Pokušaj drugu opciju.");
      if (poverilacId) {
          obradiRentu(poljeIndex);
      } else {
          obradiPorez(poljeIndex);
      }
      return;
  }

  const ponuda = prompt(
    `Igrač ${duznik.id}, nemaš dovoljno novca da platiš dug od ${iznos}$.\n` +
    `Možeš ponuditi jedno od svojih polja ${poverilac ? `igraču ${poverilac.id}` : `banci`} u zamenu za otpis duga.\n` +
    `Tvoja polja: ${duznikPosediImena}\n` +
    `Unesi broj polja koje želiš da ponudiš (ili 0 za odustajanje):`,
    "0"
  );

  const ponudjenoPolje = parseInt(ponuda);
  if (ponudjenoPolje === 0 || isNaN(ponudjenoPolje)) {
    alert("Pregovori prekinuti.");
    if (poverilacId) {
        obradiRentu(poljeIndex);
    } else {
        obradiPorez(poljeIndex);
    }
    return;
  }

  if (duznik.posedi.includes(ponudjenoPolje)) {
    if (kuce[ponudjenoPolje] > 0 || hipoteke[ponudjenoPolje]) {
      alert("Ne možeš ponuditi polje sa kućama ili pod hipotekom u pregovorima.");
      pokreniPregovore(duznik, poverilacId, iznos, poljeIndex);
      return;
    }

    const prihvatio = confirm(
      `${poverilac ? `Igrač ${poverilac.id}` : `Banka`}, igrač ${duznik.id} nema dovoljno novca da plati dug od ${iznos}$.\n` +
      `On ti nudi polje ${imenaPolja[ponudjenoPolje]} (${ponudjenoPolje}) u zamenu za otpis duga.\n` +
      `Da li prihvataš ovu ponudu?`
    );

    if (prihvatio) {
      const indexUposedima = duznik.posedi.indexOf(ponudjenoPolje);
      duznik.posedi.splice(indexUposedima, 1);

      if (poverilac) {
        poverilac.posedi.push(ponudjenoPolje);
        vlasnici[ponudjenoPolje] = poverilac.id;
        alert(`Dogovoreno! Igrač ${duznik.id} je preneo polje ${imenaPolja[ponudjenoPolje]} igraču ${poverilac.id} u zamenu za otpis duga.`);
      } else {
        vlasnici[ponudjenoPolje] = null; // Vraća se banci
        alert(`Dogovoreno! Igrač ${duznik.id} je preneo polje ${imenaPolja[ponudjenoPolje]} banci u zamenu za otpis duga.`);
      }

      kuce[ponudjenoPolje] = 0;
      hipoteke[ponudjenoPolje] = false;

      const poljeEl = polja[ponudjenoPolje];
      const gradnjaEl = poljeEl.querySelector('.gradnja');
      if (gradnjaEl) {
        gradnjaEl.remove();
      }

      duznik.novac = Math.max(0, duznik.novac + iznos); // Dug je podmiren
      azurirajPrikaz();
      sledeciIgrac();
    } else {
      alert("Ponuda odbijena.");
      if (poverilacId) {
          obradiRentu(poljeIndex); // Ponovo traži rešenje za rentu
      } else {
          obradiPorez(poljeIndex); // Ponovo traži rešenje za porez
      }
    }
  } else {
    alert("Nevažeći izbor polja. Moraš ponuditi polje koje poseduješ.");
    pokreniPregovore(duznik, poverilacId, iznos, poljeIndex);
  }
}

function pokreniProdajuImovine(igrac, iznos, callback) {
  if (igrac.posedi.length === 0 && igrac.novac < iznos) {
    alert("Nemaš imovine za prodaju. Bankrotiraš!");
    igrac.novac = -1;
    sledeciIgrac();
    return;
  }

  const potrebanIznos = iznos - igrac.novac;
  if (potrebanIznos <= 0) {
      alert("Imaš dovoljno novca, dug je podmiren.");
      callback();
      return;
  }

  const igracPosediImena = igrac.posedi.map(idx => `${idx} (${imenaPolja[idx]})${hipoteke[idx] ? ' (H)' : ''}${kuce[idx] > 0 ? ` (${kuce[idx]}🏠)` : ''}`).join(', ');

  const izbor = prompt(
    `Igrač ${igrac.id}, moraš prikupiti ${potrebanIznos}$ da bi platio dug.\n` +
    `Tvoja polja: ${igracPosediImena}\n` +
    `Unesi broj polja za prodaju banci, ili "hipoteka X" za hipoteku polja X (npr. "hipoteka 5").\n` +
    `Unesi 0 za odustajanje i bankrot:`,
    ""
  );

  if (izbor === null || izbor === "0") {
      alert("Odustao si od prodaje imovine. Bankrotiraš!");
      igrac.novac = -1;
      sledeciIgrac();
      return;
  }

  if (izbor.toLowerCase().startsWith("hipoteka ")) {
    const parts = izbor.split(" ");
    const poljeIndex = parseInt(parts[1]);
    if (igrac.posedi.includes(poljeIndex) && !hipoteke[poljeIndex]) {
      if (kuce[poljeIndex] > 0) {
          alert(`Ne možeš hipotekovati polje ${imenaPolja[poljeIndex]} dok imaš kuće na njemu. Prvo prodaj sve kuće iz te grupe!`);
          pokreniProdajuImovine(igrac, iznos, callback);
          return;
      }

      const hipotekaCena = hipotekeCene[poljeIndex];
      igrac.novac += hipotekaCena;
      hipoteke[poljeIndex] = true;
      azurirajPrikaz();
      alert(`Hipotekovao si polje ${imenaPolja[poljeIndex]} za ${hipotekaCena}$. Sada imaš ${igrac.novac}$.`);
      pokreniProdajuImovine(igrac, iznos, callback); // Ponovo pozovi dok se ne prikupi dovoljno
    } else {
      alert("Nevažeća hipoteka, polje nije tvoje, ili je već hipotekovano.");
      pokreniProdajuImovine(igrac, iznos, callback);
    }
  } else {
    const poljeIndex = parseInt(izbor);
    if (igrac.posedi.includes(poljeIndex)) {
      if (kuce[poljeIndex] > 0) {
          alert(`Ne možeš prodati polje ${imenaPolja[poljeIndex]} dok imaš kuće na njemu. Prvo prodaj sve kuće iz te grupe!`);
          pokreniProdajuImovine(igrac, iznos, callback);
          return;
      }

      const cena = Math.floor(cenePolja[poljeIndex] / 2); // Banka kupuje za pola cene
      igrac.novac += cena;

      const indexUposedima = igrac.posedi.indexOf(poljeIndex);
      igrac.posedi.splice(indexUposedima, 1);
      vlasnici[poljeIndex] = null; // Vraća se banci
      kuce[poljeIndex] = 0;
      hipoteke[poljeIndex] = false;

      const poljeEl = polja[poljeIndex];
      const gradnjaEl = poljeEl.querySelector('.gradnja');
      if (gradnjaEl) {
        gradnjaEl.remove();
      }

      azurirajPrikaz();
      alert(`Prodao si polje ${imenaPolja[poljeIndex]} banci za ${cena}$. Sada imaš ${igrac.novac}$.`);
      pokreniProdajuImovine(igrac, iznos, callback); // Ponovo pozovi dok se ne prikupi dovoljno
    } else {
      alert("Nevažeći izbor polja. Moraš prodati polje koje poseduješ.");
      pokreniProdajuImovine(igrac, iznos, callback);
    }
  }
}

function pokreniProdajuIgracu(prodavac, iznosDuga, callback, trenutnoPoljeIndex) {
  const aktivniIgraci = figurice.filter(i => i.aktivan && i.id !== prodavac.id);
  if (aktivniIgraci.length === 0) {
      alert("Nema drugih aktivnih igrača kojima bi mogao prodati polje.");
      // Vrati na prethodne opcije (hipoteka/bankrot)
      if (trenutnoPoljeIndex !== undefined) {
          if (porezi[trenutnoPoljeIndex]) obradiPorez(trenutnoPoljeIndex);
          else obradiRentu(trenutnoPoljeIndex);
      } else { // Ako je pozvano iz nekog drugog konteksta (npr. direktno prodaja)
          alert("Nema drugih aktivnih igrača kojima bi mogao prodati polje. Bankrotiraš!");
          prodavac.novac = -1;
          sledeciIgrac();
      }
      return;
  }

  const prodavacPosediImena = prodavac.posedi.map(idx => `${idx} (${imenaPolja[idx]})${hipoteke[idx] ? ' (H)' : ''}${kuce[idx] > 0 ? ` (${kuce[idx]}🏠)` : ''}`).join(', ');
  const kupciIds = aktivniIgraci.map(i => i.id).join(', ');

  if (prodavac.posedi.length === 0) {
    alert("Nemaš imovine za prodaju. Pokušaj drugu opciju.");
    if (trenutnoPoljeIndex !== undefined) {
      if (porezi[trenutnoPoljeIndex]) obradiPorez(trenutnoPoljeIndex);
      else obradiRentu(trenutnoPoljeIndex);
    } else {
      prodavac.novac = -1;
      sledeciIgrac();
    }
    return;
  }

  const promptPoruka =
    `Igrač ${prodavac.id}, želiš da prodaš polje drugom igraču kako bi prikupio ${Math.max(0, iznosDuga - prodavac.novac)}$ za dug.\n` +
    `Tvoja polja: ${prodavacPosediImena}\n` +
    `Dostupni igrači: ${kupciIds}\n` +
    `Unesi: "polje_index cena igrac_id" (npr. "1 100 2" za polje Beograd za 100$ igracu 2)\n` +
    `Unesi 0 za odustajanje od prodaje igraču i povratak na prethodne opcije:`;

  const odgovor = prompt(promptPoruka, "");

  if (odgovor === null || odgovor === "0") {
      alert("Odustao si od prodaje drugom igraču. Vraćaš se na prethodne opcije.");
      if (trenutnoPoljeIndex !== undefined) {
          if (porezi[trenutnoPoljeIndex]) obradiPorez(trenutnoPoljeIndex);
          else obradiRentu(trenutnoPoljeIndex);
      } else {
          // Ako je inicirano iz nekog drugog konteksta
          alert("Nema drugih opcija. Bankrotiraš!");
          prodavac.novac = -1;
          sledeciIgrac();
      }
      return;
  }

  const delovi = odgovor.split(' ');
  if (delovi.length !== 3) {
      alert("Nevažeći format unosa. Unesi 'polje_index cena igrac_id'.");
      pokreniProdajuIgracu(prodavac, iznosDuga, callback, trenutnoPoljeIndex);
      return;
  }

  const poljeZaProdajuIndex = parseInt(delovi[0]);
  const ponudjenaCena = parseInt(delovi[1]);
  const kupacId = parseInt(delovi[2]);

  if (isNaN(poljeZaProdajuIndex) || isNaN(ponudjenaCena) || isNaN(kupacId)) {
      alert("Nevažeći brojevi. Molimo unesi ispravne brojeve.");
      pokreniProdajuIgracu(prodavac, iznosDuga, callback, trenutnoPoljeIndex);
      return;
  }

  if (!prodavac.posedi.includes(poljeZaProdajuIndex)) {
      alert(`Polje ${poljeZaProdajuIndex} nije tvoje.`);
      pokreniProdajuIgracu(prodavac, iznosDuga, callback, trenutnoPoljeIndex);
      return;
  }
  if (kuce[poljeZaProdajuIndex] > 0 || hipoteke[poljeZaProdajuIndex]) {
      alert("Ne možeš prodati polje sa kućama ili pod hipotekom. Prvo ih se reši.");
      pokreniProdajuIgracu(prodavac, iznosDuga, callback, trenutnoPoljeIndex);
      return;
  }

  const kupac = figurice.find(i => i.id === kupacId && i.aktivan);
  if (!kupac || kupac.id === prodavac.id) {
      alert(`Igrač ${kupacId} nije validan kupac.`);
      pokreniProdajuIgracu(prodavac, iznosDuga, callback, trenutnoPoljeIndex);
      return;
  }
  if (kupac.novac < ponudjenaCena) {
      alert(`Igrač ${kupac.id} nema dovoljno novca (${kupac.novac}$) da plati ${ponudjenaCena}$.`);
      pokreniProdajuIgracu(prodavac, iznosDuga, callback, trenutnoPoljeIndex);
      return;
  }

  const prihvacenaPonuda = confirm(
      `Igrač ${kupac.id}, igrač ${prodavac.id} ti nudi polje ${imenaPolja[poljeZaProdajuIndex]} za ${ponudjenaCena}$.\n` +
      `Da li prihvataš?`
  );

  if (prihvacenaPonuda) {
      prodavac.novac += ponudjenaCena;
      kupac.novac -= ponudjenaCena;

      const indexUposedima = prodavac.posedi.indexOf(poljeZaProdajuIndex);
      prodavac.posedi.splice(indexUposedima, 1);
      kupac.posedi.push(poljeZaProdajuIndex);
      vlasnici[poljeZaProdajuIndex] = kupac.id;

      alert(`Transakcija uspešna! Igrač ${prodavac.id} je prodao polje ${imenaPolja[poljeZaProdajuIndex]} igraču ${kupac.id} za ${ponudjenaCena}$.`);
      azurirajPrikaz();
      callback(); // Vraća se na rešavanje duga
  } else {
      alert("Ponuda odbijena.");
      pokreniProdajuIgracu(prodavac, iznosDuga, callback, trenutnoPoljeIndex);
  }
}

function igracImaSvaPoljaGrupe(index, igracId) {
  for (const grupa of bojePolja) {
    if (grupa.includes(index)) {
      return grupa.every(i => vlasnici[i] === igracId);
    }
  }
  return false;
}

function prikaziKucu(index) {
  const polje = polja[index];
  let gradnja = polje.querySelector('.gradnja');
  if (!gradnja) {
    gradnja = document.createElement('div');
    gradnja.className = 'gradnja';
    polje.appendChild(gradnja);
  }
  // Osiguravamo da se prikaz kuća ažurira
  gradnja.innerText = kuce[index] === 5 ? '🏨' : '🏠'.repeat(kuce[index]);
  // Dodatno, ako nema kuća, ukloni element
  if (kuce[index] === 0) {
    gradnja.remove();
  }
}

function azurirajPrikaz() {
  figurice.forEach((igrac) => {
    const info = document.getElementById(`igrac${igrac.id}-info`);
    if (info) {
      if (!igrac.aktivan) {
        info.style.display = 'none'; // Sakrij info bankrotiranog igrača
      } else {
        info.style.display = 'block';
        info.querySelector('.novac').innerText = igrac.novac;
        info.querySelector('.polja').innerText = igrac.posedi
          .map(index => `${imenaPolja[index]}${kuce[index] > 0 ? `(${kuce[index]}🏠)` : ''}${hipoteke[index] ? ' (H)' : ''}`)
          .join(', ');
      }
    }
  });

  polja.forEach((polje, index) => {
    polje.classList.remove('vlasnik1', 'vlasnik2', 'vlasnik3', 'vlasnik4', 'hipotekovano');
    if (vlasnici[index]) polje.classList.add(`vlasnik${vlasnici[index]}`);
    if (hipoteke[index]) polje.classList.add('hipotekovano');
    prikaziKucu(index); // Ažuriraj prikaz kuće na svakom polju
  });
}

function hipotekaPolje() {
  const igrac = figurice[trenutniIgrac];
  const index = igrac.pozicija;

  if (vlasnici[index] === igrac.id && !hipoteke[index]) {
    if (kuce[index] > 0) {
      alert("Ne možeš hipotekovati polje sa kućama. Prvo prodaj kuće!");
      return;
    }
    igrac.novac += hipotekeCene[index];
    hipoteke[index] = true;
    azurirajPrikaz();
    alert(`Hipotekovano polje ${imenaPolja[index]}. Dobio si ${hipotekeCene[index]}$`);
    sledeciIgrac(); // Završi potez
  } else {
    alert("Ne možeš hipotekovati ovo polje.");
  }
}

function odglaviPolje() {
  const igrac = figurice[trenutniIgrac];
  const index = igrac.pozicija;

  if (vlasnici[index] === igrac.id && hipoteke[index]) {
    const cenaZaOdglavljivanje = Math.ceil(hipotekeCene[index] * 1.1); // 10% kamate
    if (igrac.novac >= cenaZaOdglavljivanje) {
      igrac.novac -= cenaZaOdglavljivanje;
      hipoteke[index] = false;
      azurirajPrikaz();
      alert(`Odglavljeno polje ${imenaPolja[index]}. Platio si ${cenaZaOdglavljivanje}$`);
      sledeciIgrac(); // Završi potez
    } else {
      alert("Nemaš dovoljno novca da odglaviš ovo polje.");
    }
  } else {
    alert("Ne možeš odglaviti ovo polje.");
  }
}

document.getElementById('kupi-polje').addEventListener('click', () => {
  const igrac = figurice[trenutniIgrac];
  const index = igrac.pozicija;
  const cena = cenePolja[index];

  if (index === 0 || index === 10 || index === 20 || index === 30 || index === 2 || index === 7 || index === 17 || index === 22 || index === 32 || index === 36 || index === 4 || index === 38) {
    alert("Ovo polje ne može da se kupi.");
    document.getElementById('akcije').style.display = 'none';
    sledeciIgrac();
    return;
  }

  if (igrac.novac >= cena && vlasnici[index] === null) {
      igrac.novac -= cena;
      igrac.posedi.push(index);
      vlasnici[index] = igrac.id;
      azurirajPrikaz();
      alert(`Kupio si polje ${imenaPolja[index]} za ${cena}$.`);
      document.getElementById('akcije').style.display = 'none';
      sledeciIgrac();
  } else {
    alert("Ne možeš kupiti ovo polje (već je kupljeno ili nemaš dovoljno novca).");
    document.getElementById('akcije').style.display = 'none';
    sledeciIgrac();
  }
});

document.getElementById('preskoci-kupovinu').addEventListener('click', () => {
      // Proveri da li je akcija preskakanja dozvoljena (tj. da nije dupli broj)
      // Ako je dupli broj, igrač treba da baci ponovo, a ne da preskoči potez
      const igrac = figurice[trenutniIgrac];
      // Ova provera je redundantna jer se akcije prikazuju samo ako je potez na čekanju.
      // Uklonili smo logiku koja je provjeravala bacanjeDozvoljeno ovdje.
      document.getElementById('akcije').style.display = 'none';
      sledeciIgrac();
});

document.getElementById('baci-kockicu').addEventListener('click',()=> {
    baciKockice();
});

document.getElementById('izgradi').addEventListener('click', () => {
  const igrac = figurice[trenutniIgrac];
  const index = igrac.pozicija;

  if (vlasnici[index] === igrac.id && cenePolja[index] !== null && !zeleznice.includes(index) && !komunalije.includes(index)) {
    const grupa = bojePolja.find(g => g.includes(index));
    if (!grupa) {
        alert("Na ovom polju ne možeš graditi kuće.");
        return;
    }

    if (!igracImaSvaPoljaGrupe(index, igrac.id)) {
        alert("Moraš posedovati sva polja u ovoj grupi boja da bi gradio kuće.");
        return;
    }
    if (hipoteke[index]) {
        alert("Ne možeš graditi kuće na hipotekovanom polju. Prvo ga odglavi.");
        return;
    }

    if (kuce[index] < 5) {
      const minKuca = Math.min(...grupa.map(i => kuce[i]));
      if (kuce[index] > minKuca) {
        alert("Moraš ravnomerno graditi kuće unutar iste grupe.");
        return;
      }

      const cenaGradnje = 150; // Može se podesiti po boji grupe
      if (igrac.novac >= cenaGradnje) {
        kuce[index]++;
        igrac.novac -= cenaGradnje;
        azurirajPrikaz();
        alert(`Izgrađena ${kuce[index]}. kuća na polju ${imenaPolja[index]}.`);
      } else {
        alert("Nemaš dovoljno novca za gradnju.");
      }
    } else {
      alert("Već imaš hotel na ovom polju.");
    }
  } else {
    alert("Ne možeš graditi kuću na ovom polju!");
  }
});

document.getElementById('hipoteka').addEventListener('click', hipotekaPolje);
document.getElementById('odglavi').addEventListener('click', odglaviPolje);

function sledeciIgrac() {
  document.getElementById('akcije').style.display = 'none'; // Sakrij akcije pre nego što pređemo na sledećeg

  const igrac = figurice[trenutniIgrac];

  // Proveri da li je igrač bankrotirao
  if (igrac.novac < 0 && igrac.aktivan) { // Dodata provera aktivan da se ne ulazi ponovo
    alert(`Igrač ${igrac.id} je bankrotirao!`);

    const poljaZaAukciju = [...igrac.posedi];
    igrac.posedi = [];
    igrac.aktivan = false;
    document.querySelectorAll(`.figurica.igrac${igrac.id}`).forEach(el => el.remove());

    // Otpusti hipoteke i kuće sa njegovih polja
    poljaZaAukciju.forEach(pIndex => {
      kuce[pIndex] = 0;
      hipoteke[pIndex] = false;
      // Vlasnici se rešavaju u aukciji
    });


    if (poljaZaAukciju.length > 0) {
      // Ako igrač ima polja, pokreni aukciju
      pokreniAukciju(poljaZaAukciju);
      return; // Ne prelazi odmah na sledećeg, aukcija će to učiniti
    }
  }

  // Proveri da li je ostao samo jedan aktivan igrač
  const aktivni = figurice.filter(i => i.aktivan);
  if (aktivni.length === 1) {
    alert(`Igra je završena! Pobednik je Igrač ${aktivni[0].id} 🎉`);
    location.reload(); // Osveži stranicu za novu igru
    return;
  }
  if (aktivni.length === 0) {
    alert("Svi igrači su bankrotirali. Igra je završena bez pobednika.");
    location.reload();
    return;
  }

  // Pređi na sledećeg aktivnog igrača
  do {
    trenutniIgrac = (trenutniIgrac + 1) % figurice.length;
  } while (!figurice[trenutniIgrac].aktivan);

  naPotezu.innerText = `Na potezu: Igrač ${figurice[trenutniIgrac].id} (${['🔴','🔵','🟢','🟡'][trenutniIgrac]})`;
  bacanjeDozvoljeno = true;
  kockica1.classList.remove('zaustavljena');
  kockica2.classList.remove('zaustavljena');
  azurirajPrikaz();
}

window.addEventListener('load', () => {
  postaviPocetneFigurice();
  azurirajPrikaz();
  naPotezu.innerText = `Na potezu: Igrač ${figurice[trenutniIgrac].id} (${['🔴','🔵','🟢','🟡'][trenutniIgrac]})`;
});

function pokreniAukciju(poljaZaProdaju) {
  const aktivniIgraci = figurice.filter(i => i.aktivan);
  if (aktivniIgraci.length === 0 || poljaZaProdaju.length === 0) {
    alert("Nema aktivnih igrača ili polja za aukciju.");
    sledeciIgrac(); // Možda je zadnji igrač bankrotirao i nema šta da se aukcionira
    return;
  }

  let trenutnaPonuda = { igracId: null, iznos: 0 };
  let indeksTrenutnogPonudjaca = 0;
  let brojOdustajanja = 0;

  const poljeIndex = poljaZaProdaju[0];
  const nazivPolja = imenaPolja[poljeIndex];
  // const osnovnaCena = cenePolja[poljeIndex] || 0; // Nije striktno potrebna za aukciju

  alert(`Počinje aukcija za polje ${nazivPolja} (index: ${poljeIndex})!`);

  // Resetuj odustajanje za sve aktivne igrače na početku aukcije za novo polje
  aktivniIgraci.forEach(p => p.odustaoUAukciji = false);

  function procesuirajAukcijuPolja() {
    // Provera da li je ostao samo jedan igrač
    const preostaliAktivni = figurice.filter(i => i.aktivan && !i.odustaoUAukciji);

    // Ako je ostao samo jedan igrač i on nije odustao, i ima trenutnu ponudu ili je jedini koji može da ponudi
    if (preostaliAktivni.length === 1 && trenutnaPonuda.igracId === preostaliAktivni[0].id) {
        const pobednik = preostaliAktivni[0];
        if (pobednik.novac >= trenutnaPonuda.iznos) {
            pobednik.novac -= trenutnaPonuda.iznos;
            pobednik.posedi.push(poljeIndex);
            vlasnici[poljeIndex] = pobednik.id;
            kuce[poljeIndex] = 0;
            hipoteke[poljeIndex] = false;
            alert(`Igrač ${pobednik.id} osvojio polje ${nazivPolja} za ${trenutnaPonuda.iznos}$.`);
            azurirajPrikaz();
        } else {
            alert(`Aukcija za polje ${nazivPolja} završena bez pobednika (pobednik nema dovoljno novca).`);
            vlasnici[poljeIndex] = null;
        }
        poljaZaProdaju.shift();
        if (poljaZaProdaju.length > 0) {
            pokreniAukciju(poljaZaProdaju); // Nastavi sa sledećim poljem
        } else {
            sledeciIgrac(); // Završi aukcije i pređi na sledeći potez
        }
        return;
    }

    // Provera da li su svi aktivni igrači odustali (osim eventualnog trenutnog ponuđača)
    const sviOdustali = aktivniIgraci.every(p => p.odustaoUAukciji || !p.aktivan);
    if (sviOdustali) {
      if (trenutnaPonuda.igracId !== null) {
        const pobednik = figurice.find(i => i.id === trenutnaPonuda.igracId);
        if (pobednik && pobednik.novac >= trenutnaPonuda.iznos) {
            pobednik.novac -= trenutnaPonuda.iznos;
            pobednik.posedi.push(poljeIndex);
            vlasnici[poljeIndex] = pobednik.id;
            kuce[poljeIndex] = 0;
            hipoteke[poljeIndex] = false;
            alert(`Igrač ${pobednik.id} osvojio polje ${nazivPolja} za ${trenutnaPonuda.iznos}$.`);
            azurirajPrikaz();
        } else {
            alert(`Aukcija za polje ${nazivPolja} završena bez pobednika.`);
            vlasnici[poljeIndex] = null;
        }
      } else {
        alert(`Aukcija za polje ${nazivPolja} završena bez ponuda.`);
        vlasnici[poljeIndex] = null;
      }
      poljaZaProdaju.shift();
      if (poljaZaProdaju.length > 0) {
          pokreniAukciju(poljaZaProdaju);
      } else {
          sledeciIgrac();
      }
      return;
    }

    let ponudjac = aktivniIgraci[indeksTrenutnogPonudjaca];
    // Preskoči bankrotirane ili odustale igrače u tekućoj aukciji
    while (!ponudjac.aktivan || ponudjac.odustaoUAukciji) {
        indeksTrenutnogPonudjaca = (indeksTrenutnogPonudjaca + 1) % aktivniIgraci.length;
        ponudjac = aktivniIgraci[indeksTrenutnogPonudjaca];
        if (indeksTrenutnogPonudjaca === 0 && aktivniIgraci.every(p => !p.aktivan || p.odustaoUAukciji)) {
            // Svi su ili bankrotirali ili odustali, prekinuti aukciju
            if (trenutnaPonuda.igracId !== null) {
                const pobednik = figurice.find(i => i.id === trenutnaPonuda.igracId);
                if (pobednik && pobednik.novac >= trenutnaPonuda.iznos) {
                    pobednik.novac -= trenutnaPonuda.iznos;
                    pobednik.posedi.push(poljeIndex);
                    vlasnici[poljeIndex] = pobednik.id;
                    kuce[poljeIndex] = 0;
                    hipoteke[poljeIndex] = false;
                    alert(`Igrač ${pobednik.id} osvojio polje ${nazivPolja} za ${trenutnaPonuda.iznos}$.`);
                    azurirajPrikaz();
                } else {
                    alert(`Aukcija za polje ${nazivPolja} završena bez pobednika.`);
                    vlasnici[poljeIndex] = null;
                }
            } else {
                alert(`Aukcija za polje ${nazivPolja} završena bez ponuda.`);
                vlasnici[poljeIndex] = null;
            }
            poljaZaProdaju.shift();
            if (poljaZaProdaju.length > 0) {
                pokreniAukciju(poljaZaProdaju);
            } else {
                sledeciIgrac();
            }
            return;
        }
    }


    const minPonuda = trenutnaPonuda.iznos + 10;
    let ponuda = prompt(
      `Aukcija za polje ${nazivPolja} (index: ${poljeIndex})\n` +
      `Trenutna ponuda: ${trenutnaPonuda.iznos}$ od igrača ${trenutnaPonuda.igracId || 'niko'}\n` +
      `Igrač ${ponudjac.id} (${['🔴','🔵','🟢','🟡'][ponudjac.id - 1]}), tvoj novac: ${ponudjac.novac}$\n` +
      `Unesi svoju ponudu (min ${minPonuda}$) ili 0 za odustajanje:`,
      minPonuda > ponudjac.novac ? ponudjac.novac.toString() : minPonuda.toString() // Pretvori u string
    );

    const ponudaBroj = parseInt(ponuda);

    if (!isNaN(ponudaBroj)) {
      if (ponudaBroj === 0) {
        ponudjac.odustaoUAukciji = true; // Označi da je odustao
        brojOdustajanja++;
        indeksTrenutnogPonudjaca = (indeksTrenutnogPonudjaca + 1) % aktivniIgraci.length;
        procesuirajAukcijuPolja();
      } else if (ponudaBroj > trenutnaPonuda.iznos && ponudaBroj <= ponudjac.novac) {
        trenutnaPonuda = { igracId: ponudjac.id, iznos: ponudaBroj };
        // Resetuj odustajanje za sve (osim trenutnog ponuđača) kada se postavi nova ponuda
        aktivniIgraci.forEach(p => {
          if (p.id !== ponudjac.id) p.odustaoUAukciji = false;
        });
        brojOdustajanja = 0; // Resetuj brojač odustajanja
        indeksTrenutnogPonudjaca = (indeksTrenutnogPonudjaca + 1) % aktivniIgraci.length;
        procesuirajAukcijuPolja();
      } else {
        alert("Nevažeća ponuda! Ponuda mora biti veća od trenutne i ne sme premašiti tvoj novac.");
        procesuirajAukcijuPolja(); // Ponovi potez za istog igrača
      }
    } else {
      alert("Molimo unesite broj.");
      procesuirajAukcijuPolja(); // Ponovi potez za istog igrača
    }
  }

  procesuirajAukcijuPolja();
}