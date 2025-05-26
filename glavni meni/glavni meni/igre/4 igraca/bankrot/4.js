const kockica1 = document.getElementById('kockica1');
const kockica2 = document.getElementById('kockica2');
const baciBtn = document.getElementById('baci-kockicu');
const naPotezu = document.getElementById('na-potezu');
const polja = document.querySelectorAll('.polje');
let porez = 0;
const cenePolja = [
  60, 60, null, 60, null, 200, 100, null, 100, 120, null,
  140, 150, 140, 160, 200, 180, null, 180, 200, null,
  220, null, 220, 240, 200, 260, 260, null, 280, 300,
  null, 300, 320, null, 200, null, 350, null, 400
];
const imenaPolja = [
  "Start", "Beograd", "Šansa", "Novi Sad", "Porez", "Stanica",
  "Niš", "Zajednica", "Subotica", "U poseti zatvoru", "Zatvor",
  "Kragujevac", "EPS", "Čačak", "Kraljevo", "Stanica", "Šabac",
  "Zajednica", "Pančevo", "Zrenjanin", "Besplatan parking", "Užice",
  "Šansa", "Valjevo", "Loznica", "Stanica", "Požarevac", "Smederevo",
  "Vodovod", "Sremska Mitrovica", "Idi u zatvor", "Šabac 2", "Zajednica",
  "Kikinda", "Sombor", "Stanica", "Šansa", "Pirot", "Porez", "Jovac"
];
const hipotekeCene = [
  30, 30, null, 30, null, 100, 50, null, 50, 60, null,
  70, 75, 70, 80, 100, 90, null, 90, 100, null,
  110, null, 110, 120, 100, 130, 130, null, 140, 150,
  null, 150, 160, null, 100, null, 175, null, 200
];

const zeleznice = [5, 15, 25, 35];
const komunalije = [12, 28];

const figurice = [
  { id: 1, pozicija: 0, novac: 50, posedi: [1, 3, 6, 8], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true },
  { id: 2, pozicija: 0, novac: 1500, posedi: [], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true },
  { id: 3, pozicija: 0, novac: 1500, posedi: [], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true },
  { id: 4, pozicija: 0, novac: 1500, posedi: [], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true }
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
  [1, 3], [6, 8, 9], [11, 13, 14], [16, 18, 19],
  [21, 23, 24], [26, 27, 29], [31, 32, 34], [37, 39]
];

let bacanjeDozvoljeno = true;

const porezi = {
  4: 150,
  38: 150
};

function postaviPocetneFigurice() {
  figurice.forEach((igrac) => {
    const polje = polja[igrac.pozicija];
    const figuricaEl = document.createElement('div');
    figuricaEl.className = `figurica igrac${igrac.id}`;
    figuricaEl.innerText = ['🔴','🔵','🟢','🟡'][igrac.id - 1];
    polje.appendChild(figuricaEl);

    igrac.posedi.forEach(pIndex => {
      vlasnici[pIndex] = igrac.id;
    });
  });
}
function baciKockice()
  {
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

  const broj1 = 2;
  const broj2 = 2;
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
    pomeriIgracaAnimirano(zbir, false);
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

  if (index === 30) {
    igrac.uZatvoru = true;
    igrac.kazna = 3;

    pomeriIgracaDoPolja(10, () => {
      igrac.pozicija = 10;
      alert("Idi u zatvor! 3 poteza pauza.");
      azurirajPrikaz();
      sledeciIgrac();
    });
    return;
  }

  if ([2, 7, 17, 22, 36].includes(index)) {
    izvuciKartu(index, dupli);
    return;
  }

  if (porezi[index]) {
    obradiPorez(index);
    return;
  }

  if (vlasnici[index] && vlasnici[index] !== igrac.id) {
    obradiRentu(index);
  } else if (vlasnici[index] === null && cenePolja[index] !== null) {
    document.getElementById('akcije').style.display = 'flex';
    document.getElementById('kupi-polje').innerText = `Kupi ${cenePolja[index]}$`;
    document.getElementById('izgradi').style.display = 'none';
    document.getElementById('hipoteka').style.display = 'none';
    document.getElementById('odglavi').style.display = 'none';
  } else {
    if (vlasnici[index] === igrac.id) {
        document.getElementById('akcije').style.display = 'flex';
        document.getElementById('kupi-polje').style.display = 'none';
        document.getElementById('preskoci-kupovinu').style.display = 'none';
        document.getElementById('izgradi').style.display = 'block';
        document.getElementById('hipoteka').style.display = 'block';
        document.getElementById('odglavi').style.display = 'block';
    } else {
        document.getElementById('akcije').style.display = 'none';
        sledeciIgrac();
    }
  }


  if (!dupli) {
  } else {
    alert("Bacio si dupli broj! Igraš još jednom.");
    bacanjeDozvoljeno = true;
  }

  azurirajPrikaz();
}

function izvuciKartu(index, dupli) {
  const igrac = figurice[trenutniIgrac];
  let kartaTip = '';
  if ([2, 22, 36].includes(index)) {
      kartaTip = 'Šansa';
      const karta = sansa[Math.floor(Math.random() * sansa.length)];
      alert(`${kartaTip}: ${karta}`);

      if (karta.includes("Dobio")) {
        igrac.novac += 200;
      } else if (karta.includes("Plati")) {
        igrac.novac -= 100;
        porez += 100;
      } else if (karta.includes("izlazak")) {
        igrac.imaKartuZaIzlazIzZatvora = true;
      } else if (karta.includes("zatvor")) {
        igrac.uZatvoru = true;
        igrac.kazna = 3;
        pomeriIgracaDoPolja(10, () => {
          igrac.pozicija = 10;
          azurirajPrikaz();
          sledeciIgrac();
        });
        return;
      } else if (karta.includes("Start")) {
        pomeriIgracaDoPolja(0, () => {
          igrac.novac += 200;
          azurirajPrikaz();
          sledeciIgrac();
        });
        return;
      }
  } else if ([7, 17, 32].includes(index)) {
      kartaTip = 'Zajednica';
      const karta = sansa[Math.floor(Math.random() * sansa.length)];
      alert(`${kartaTip}: ${karta}`);

      if (karta.includes("Dobio")) {
        igrac.novac += 200;
      } else if (karta.includes("Plati")) {
        igrac.novac -= 100;
        porez += 100;
      } else if (karta.includes("izlazak")) {
        igrac.imaKartuZaIzlazIzZatvora = true;
      } else if (karta.includes("zatvor")) {
        igrac.uZatvoru = true;
        igrac.kazna = 3;
        pomeriIgracaDoPolja(10, () => {
          igrac.pozicija = 10;
          azurirajPrikaz();
          sledeciIgrac();
        });
        return;
      } else if (karta.includes("Start")) {
        pomeriIgracaDoPolja(0, () => {
          igrac.novac += 200;
          azurirajPrikaz();
          sledeciIgrac();
        });
        return;
      }
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

  pomeriIgracaAnimirano(koraci, () => {
    igrac.pozicija = zeljenoPolje;
    if (callback) callback();
  });
}
function obradiPorez(index) {
  const igrac = figurice[trenutniIgrac];
  const iznosPoreza = porezi[index];
  if (iznosPoreza) {
    igrac.novac -= iznosPoreza;
    porez += iznosPoreza;
    alert(`Porez! Platio si ${iznosPoreza}$. Sada imaš ${igrac.novac}$.`);
    azurirajPrikaz();
  }

  if (igrac.novac < 0) {
      // MODIFIKOVANO: Dodata opcija za prodaju drugom igraču
      const izbor = prompt(
        `Nemaš dovoljno novca da platiš porez od ${iznosPoreza}$!\n` +
        `1. Pokušaj da pregovaraš (ponudi imovinu)\n` +
        `2. Prodaj polje drugom igraču\n` + // NOVA OPCIJA
        `3. Prodaj nešto od svoje imovine banci (hipoteka/prodaja)\n` + // STARA OPCIJA 2
        `4. Bankrotiraj`, // STARA OPCIJA 3
        "3" // Predlažemo prodaju banci/hipoteku kao default
      );

      if (izbor === "1") {
        pokreniPregovore(igrac, null, iznosPoreza, index);
      } else if (izbor === "2") { // NOVA OPCIJA ZA PRODAJU DRUGOM IGRACU
          pokreniProdajuIgracu(igrac, iznosPoreza, () => {
              if (igrac.novac >= 0) { // Ako je igrač uspeo da prikupi novac
                  alert(`Uspesno si prikupio novac i platio porez!`);
                  azurirajPrikaz();
                  sledeciIgrac();
              } else {
                  obradiPorez(index); // Ako i dalje nema dovoljno, ponovo ponudi opcije
              }
          }, index); // Dodato poljeIndex za callback
      }
      else if (izbor === "3") { // STARA OPCIJA 2
        pokreniProdajuImovine(igrac, iznosPoreza, () => {
          if (igrac.novac >= 0) {
            alert(`Uspesno si prikupio novac i platio porez!`);
            azurirajPrikaz();
            sledeciIgrac();
          } else {
            obradiPorez(index);
          }
        });
      } else {
        igrac.novac = -1;
        sledeciIgrac();
      }
  } else {
      sledeciIgrac();
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
      const posedujeCeluGrupu = igracImaSvaPoljaGrupe(index, vlasnikId);
      if (posedujeCeluGrupu && kuce[index] === 0) {
        renta *= 2;
      }
      switch (kuce[index]) {
        case 1: renta *= 2; break;
        case 2: renta *= 4; break;
        case 3: renta *= 6; break;
        case 4: renta *= 8; break;
        case 5: renta *= 10; break;
      }
    }
    renta = Math.floor(renta);

    if (igrac.novac >= renta) {
      igrac.novac -= renta;
      vlasnik.novac += renta;
      alert(`Platio si rentu od ${renta}$ igraču ${vlasnikId} za polje ${imenaPolja[index]}. Sada imaš ${igrac.novac}$.`);
      azurirajPrikaz();
      sledeciIgrac();
    } else {
      // MODIFIKOVANO: Dodata opcija za prodaju drugom igraču
      const izbor = prompt(
        `Nemaš dovoljno novca da platiš rentu od ${renta}$ igraču ${vlasnikId} za polje ${imenaPolja[index]}!\n` +
        `1. Pokušaj da pregovaraš (ponudi imovinu)\n` +
        `2. Prodaj polje drugom igraču\n` + // NOVA OPCIJA
        `3. Prodaj nešto od svoje imovine banci (hipoteka/prodaja)\n` + // STARA OPCIJA 2
        `4. Bankrotiraj`, // STARA OPCIJA 3
        "3" // Predlažemo prodaju banci/hipoteku kao default
      );

      if (izbor === "1") {
        pokreniPregovore(igrac, vlasnikId, renta, index);
      } else if (izbor === "2") { // NOVA OPCIJA ZA PRODAJU DRUGOM IGRACU
          pokreniProdajuIgracu(igrac, renta, () => {
              if (igrac.novac >= renta) { // Ako je igrač uspeo da prikupi novac
                  igrac.novac -= renta;
                  vlasnik.novac += renta;
                  alert(`Uspesno si prikupio novac i platio rentu od ${renta}$ igraču ${vlasnikId}.`);
                  azurirajPrikaz();
                  sledeciIgrac();
              } else {
                  obradiRentu(index); // Ako i dalje nema dovoljno, ponovo ponudi opcije
              }
          }, index); // Dodato poljeIndex za callback
      }
      else if (izbor === "3") { // STARA OPCIJA 2
        pokreniProdajuImovine(igrac, renta, () => {
            if (igrac.novac >= renta) {
                igrac.novac -= renta;
                vlasnik.novac += renta;
                alert(`Uspesno si prikupio novac i platio rentu od ${renta}$ igraču ${vlasnikId}.`);
                azurirajPrikaz();
                sledeciIgrac();
            } else {
                obradiRentu(index);
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
    // Vrati se na opcije prodaje imovine ili bankrota
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
      `On ti nudi polje ${ponudjenoPolje} (${imenaPolja[ponudjenoPolje]}) u zamenu za otpis duga.\n` +
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
        vlasnici[ponudjenoPolje] = null;
        alert(`Dogovoreno! Igrač ${duznik.id} je preneo polje ${imenaPolja[ponudjenoPolje]} banci u zamenu za otpis duga.`);
      }

      kuce[ponudjenoPolje] = 0;
      hipoteke[ponudjenoPolje] = false;

      const poljeEl = polja[ponudjenoPolje];
      const gradnjaEl = poljeEl.querySelector('.gradnja');
      if (gradnjaEl) {
        gradnjaEl.remove();
      }

      duznik.novac = Math.max(0, duznik.novac + iznos);
      azurirajPrikaz();
      sledeciIgrac();
    } else {
      alert("Ponuda odbijena.");
      // Vrati se na opcije prodaje imovine ili bankrota
      if (poverilacId) {
          obradiRentu(poljeIndex);
      } else {
          obradiPorez(poljeIndex);
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

  if (!izbor) {
    alert("Nema izbora, bankrotiraš!");
    igrac.novac = -1;
    sledeciIgrac();
    return;
  }

  if (izbor === "0") {
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
      pokreniProdajuImovine(igrac, iznos, callback);
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

      const cena = Math.floor(cenePolja[poljeIndex] / 2);
      igrac.novac += cena;

      const indexUposedima = igrac.posedi.indexOf(poljeIndex);
      igrac.posedi.splice(indexUposedima, 1);
      vlasnici[poljeIndex] = null;
      kuce[poljeIndex] = 0;
      hipoteke[poljeIndex] = false;

      const poljeEl = polja[poljeIndex];
      const gradnjaEl = poljeEl.querySelector('.gradnja');
      if (gradnjaEl) {
        gradnjaEl.remove();
      }

      azurirajPrikaz();
      alert(`Prodao si polje ${imenaPolja[poljeIndex]} banci za ${cena}$. Sada imaš ${igrac.novac}$.`);
      pokreniProdajuImovine(igrac, iznos, callback);
    } else {
      alert("Nevažeći izbor polja. Moraš prodati polje koje poseduješ.");
      pokreniProdajuImovine(igrac, iznos, callback);
    }
  }
}

// NOVA FUNKCIJA: Prodaja polja drugom igraču
function pokreniProdajuIgracu(prodavac, iznosDuga, callback, trenutnoPoljeIndex) {
  const aktivniIgraci = figurice.filter(i => i.aktivan && i.id !== prodavac.id);
  if (aktivniIgraci.length === 0) {
      alert("Nema drugih aktivnih igrača kojima bi mogao prodati polje.");
      // Vrati se na prethodne opcije
      if (trenutnoPoljeIndex) { // Da li je bio porez ili renta?
          if (porezi[trenutnoPoljeIndex]) obradiPorez(trenutnoPoljeIndex);
          else obradiRentu(trenutnoPoljeIndex);
      }
      return;
  }

  const prodavacPosediImena = prodavac.posedi.map(idx => `${idx} (${imenaPolja[idx]})${hipoteke[idx] ? ' (H)' : ''}${kuce[idx] > 0 ? ` (${kuce[idx]}🏠)` : ''}`).join(', ');
  const kupciIds = aktivniIgraci.map(i => i.id).join(', ');

  const promptPoruka =
    `Igrač ${prodavac.id}, želiš da prodaš polje drugom igraču kako bi prikupio ${Math.max(0, iznosDuga - prodavac.novac)}$ za dug.\n` +
    `Tvoja polja: ${prodavacPosediImena}\n` +
    `Dostupni igrači: ${kupciIds}\n` +
    `Unesi: "polje_index cena igrac_id" (npr. "1 100 2" za polje Beograd za 100$ igracu 2)\n` +
    `Unesi 0 za odustajanje od prodaje igraču i povratak na prethodne opcije:`;

  const odgovor = prompt(promptPoruka, "");

  if (odgovor === null || odgovor === "0") {
      alert("Odustao si od prodaje drugom igraču. Vraćaš se na prethodne opcije.");
      if (trenutnoPoljeIndex) {
          if (porezi[trenutnoPoljeIndex]) obradiPorez(trenutnoPoljeIndex);
          else obradiRentu(trenutnoPoljeIndex);
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
      alert(`Igrač ${kupacId} nema dovoljno novca (${kupac.novac}$) da plati ${ponudjenaCena}$.`);
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
      callback(); // Vrati se na funkciju koja je pozvala prodaju (obradiPorez ili obradiRentu)
  } else {
      alert("Ponuda odbijena.");
      pokreniProdajuIgracu(prodavac, iznosDuga, callback, trenutnoPoljeIndex); // Ponovo pitaj za prodaju
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
  gradnja.innerText = kuce[index] === 5 ? '🏨' : '🏠'.repeat(kuce[index]);
}

function azurirajPrikaz() {
  figurice.forEach((igrac) => {
    const info = document.getElementById(`igrac${igrac.id}-info`);
    if (info) {
      if (!igrac.aktivan) {
        info.style.display = 'none';
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
    prikaziKucu(index);
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
  } else {
    alert("Ne možeš hipotekovati ovo polje.");
  }
}

function odglaviPolje() {
  const igrac = figurice[trenutniIgrac];
  const index = igrac.pozicija;

  if (vlasnici[index] === igrac.id && hipoteke[index]) {
    const cenaZaOdglavljivanje = Math.ceil(hipotekeCene[index] * 1.1);
    if (igrac.novac >= cenaZaOdglavljivanje) {
      igrac.novac -= cenaZaOdglavljivanje;
      hipoteke[index] = false;
      azurirajPrikaz();
      alert(`Odglavljeno polje ${imenaPolja[index]}. Platio si ${cenaZaOdglavljivanje}$`);
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

  if (index === 0 || index === 10 || index === 20 || index === 30) {
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
      if(!bacanjeDozvoljeno)
      {
        document.getElementById('akcije').style.display = 'none';
        sledeciIgrac();
      } else {
        alert('Prvo baci kockice!');
      }
});
document.getElementById('baci-kockicu').addEventListener('click',()=>
{
    baciKockice();
})
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

      const cenaGradnje = 150;
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
  document.getElementById('akcije').style.display = 'none';
  const igrac = figurice[trenutniIgrac];

  if (igrac.novac < 0) {
    alert(`Igrač ${igrac.id} je bankrotirao!`);

    const poljaZaAukciju = [...igrac.posedi];
    igrac.posedi = [];
    igrac.aktivan = false;
    document.querySelectorAll(`.figurica.igrac${igrac.id}`).forEach(el => el.remove());

    if (poljaZaAukciju.length > 0) {
      pokreniAukciju(poljaZaAukciju);
    }
  }

  const aktivni = figurice.filter(i => i.aktivan);
  if (aktivni.length === 1) {
    alert(`Igra je završena! Pobednik je Igrač ${aktivni[0].id} 🎉`);
    location.reload();
    return;
  }
  if (aktivni.length === 0) {
    alert("Svi igrači su bankrotirali. Igra je završena bez pobednika.");
    location.reload();
    return;
  }

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
});

function pokreniAukciju(poljaZaProdaju) {
  const aktivniIgraci = figurice.filter(i => i.aktivan);
  if (aktivniIgraci.length === 0 || poljaZaProdaju.length === 0) {
    alert("Nema aktivnih igrača ili polja za aukciju.");
    return;
  }

  let trenutnaPonuda = { igracId: null, iznos: 0 };
  let indeksTrenutnogPonudjaca = 0;
  let brojOdustajanja = 0;

  const poljeIndex = poljaZaProdaju[0];
  const nazivPolja = imenaPolja[poljeIndex];
  const osnovnaCena = cenePolja[poljeIndex] || 0;

  alert(`Počinje aukcija za polje ${nazivPolja} (index: ${poljeIndex})!`);

  function procesuirajAukcijuPolja() {
    if (brojOdustajanja >= aktivniIgraci.length - 1 && trenutnaPonuda.igracId !== null) {
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
            kuce[poljeIndex] = 0;
            hipoteke[poljeIndex] = false;
        }
        poljaZaProdaju.shift();
        if (poljaZaProdaju.length > 0) {
            pokreniAukciju(poljaZaProdaju);
        } else {
            sledeciIgrac();
        }
        return;
    }

    if (brojOdustajanja === aktivniIgraci.length && trenutnaPonuda.igracId === null) {
      alert(`Aukcija za polje ${nazivPolja} završena bez ponuda.`);
      vlasnici[poljeIndex] = null;
      kuce[poljeIndex] = 0;
      hipoteke[poljeIndex] = false;
      poljaZaProdaju.shift();
      if (poljaZaProdaju.length > 0) {
          pokreniAukciju(poljaZaProdaju);
      } else {
          sledeciIgrac();
      }
      return;
    }

    const ponudjac = aktivniIgraci[indeksTrenutnogPonudjaca];

    if (ponudjac.odustaoUAukciji === true) {
        indeksTrenutnogPonudjaca = (indeksTrenutnogPonudjaca + 1) % aktivniIgraci.length;
        procesuirajAukcijuPolja();
        return;
    }

    const minPonuda = trenutnaPonuda.iznos + 10;
    let ponuda = prompt(
      `Aukcija za polje ${nazivPolja} (index: ${poljeIndex})\n` +
      `Trenutna ponuda: ${trenutnaPonuda.iznos}$ od igrača ${trenutnaPonuda.igracId || 'niko'}\n` +
      `Igrač ${ponudjac.id} (${['🔴','🔵','🟢','🟡'][ponudjac.id - 1]}), tvoj novac: ${ponudjac.novac}$\n` +
      `Unesi svoju ponudu (min ${minPonuda}$) ili 0 za odustajanje:`,
      minPonuda > ponudjac.novac ? ponudjac.novac : minPonuda
    );

    const ponudaBroj = parseInt(ponuda);

    if (!isNaN(ponudaBroj)) {
      if (ponudaBroj === 0) {
        ponudjac.odustaoUAukciji = true;
        brojOdustajanja++;
        indeksTrenutnogPonudjaca = (indeksTrenutnogPonudjaca + 1) % aktivniIgraci.length;
        procesuirajAukcijuPolja();
      } else if (ponudaBroj > trenutnaPonuda.iznos && ponudaBroj <= ponudjac.novac) {
        trenutnaPonuda = { igracId: ponudjac.id, iznos: ponudaBroj };
        aktivniIgraci.forEach(p => p.odustaoUAukciji = false);
        brojOdustajanja = 0;
        indeksTrenutnogPonudjaca = (indeksTrenutnogPonudjaca + 1) % aktivniIgraci.length;
        procesuirajAukcijuPolja();
      } else {
        alert("Nevažeća ponuda! Ponuda mora biti veća od trenutne i ne sme premašiti tvoj novac.");
        procesuirajAukcijuPolja();
      }
    } else {
      alert("Molimo unesite broj.");
      procesuirajAukcijuPolja();
    }
  }

  aktivniIgraci.forEach(p => p.odustaoUAukciji = false);
  procesuirajAukcijuPolja();
}