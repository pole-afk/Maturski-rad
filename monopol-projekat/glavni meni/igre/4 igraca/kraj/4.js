const kockica1 = document.getElementById('kockica1');
const kockica2 = document.getElementById('kockica2');
const baciBtn = document.getElementById('baci-kockicu');
const naPotezu = document.getElementById('na-potezu');
const polja = document.querySelectorAll('.polje');
// Dodat resetBtn za testiranje (prethodno nije bio definisan u fajlu)
const resetBtn = document.getElementById('reset-btn'); // Pretpostavljam da imate dugme sa ovim ID-om

let porez = 0;
const zajednica = [
  "Dobio si 100$ nasleđa!",
  "Povrat poreza, dobijaš 20$.",
  "Greška banke u tvoju korist. Sakupljaš 200$.",
  "Tvoj rođendan. Svaki igrač ti daje 10$.",
  "Prodao si deonice. Sakupljaš 50$.",
  "Plaćaš školarinu 150$.",
  "Plaćaš bolničke troškove 100$.",
  "Premija osiguranja. Plati 50$.",
  "Popravka kuće/hotela. Plati 25$ za svaku kuću, 100$ za svaki hotel.",
  "Kazna za prebrzu vožnju. Plati 15$.",
  "Idi direktno na Start. Sakupljaš 200$.",
  "Idi direktno u zatvor."
];
const cenePolja = [
  null,   // 0: Start - Ne kupuje se
  60,     // 1: Beograd
  null,   // 2: Šansa - Ne kupuje se
  60,     // 3: Novi Sad
  null,   // 4: Porez - Ne kupuje se (plaća se u obradiPorez)
  200,    // 5: Stanica
  100,    // 6: Niš
  null,   // 7: Zajednica - Ne kupuje se
  100,    // 8: Subotica
  120,    // 9: Palić
  null,   // 10: Zatvor - Ne kupuje se
  140,    // 11: Kragujevac
  150,    // 12: EPS (Komunalija)
  140,    // 13: Čačak
  160,    // 14: Kraljevo
  200,    // 15: Stanica
  180,    // 16: Šabac
  null,   // 17: Zajednica - Ne kupuje se
  180,    // 18: Pančevo
  200,    // 19: Zrenjanin
  null,   // 20: Besplatan parking - Ne kupuje se
  220,    // 21: Užice
  null,   // 22: Šansa - Ne kupuje se
  220,    // 23: Valjevo
  240,    // 24: Loznica
  200,    // 25: Stanica
  260,    // 26: Požarevac
  260,    // 27: Smederevo
  150,    // 28: Vodovod (Komunalija) - cena kupovine
  280,    // 29: Sremska Mitrovica
  null,   // 30: Idi u zatvor - Ne kupuje se
  300,    // 31: Šabac 2
  300,    // 32: Svilajnac
  320,    // 33: Aerodrom
  320,   // 34: Porez - Ne kupuje se (iz HTML-a, ali ako je Sombor onda 200) - Držim se HTML-a za sada
  200,    // 35: Stanica
  null,   // 36: Šansa - Ne kupuje se
  350,    // 37: Pirot
  null,   // 38: Porez - Ne kupuje se
  400     // 39: Jovac
];
const ceneRente = {
    // Braon grupa (2 polja)
    1: [2, 10, 30, 90, 160, 250],  // Beograd (Brown)
    3: [4, 20, 60, 180, 320, 450], // Novi Sad (Brown)

    // Svetloplava grupa (3 polja)
    // 6: [6, 30, 90, 270, 400, 550], // Niš (Light Blue) - Ovo polje je sada kupivo
    8: [6, 30, 90, 270, 400, 550], // Subotica (Light Blue)
    9: [8, 40, 100, 300, 450, 600], // Palić (Light Blue) - promenjeno ime
    
    // Dodato Niš u ceneRente jer je sada kupivo polje
    6: [6, 30, 90, 270, 400, 550], // Niš (Light Blue)

    // Pink grupa (3 polja)
    11: [10, 50, 150, 450, 625, 750], // Kragujevac (Pink)
    13: [10, 50, 150, 450, 625, 750], // Čačak (Pink)
    14: [12, 60, 180, 500, 700, 900], // Kraljevo (Pink)

    // Narandžasta grupa (3 polja)
    16: [14, 70, 200, 550, 750, 950], // Šabac (Orange)
    18: [14, 70, 200, 550, 750, 950], // Pančevo (Orange)
    19: [16, 80, 220, 600, 800, 1000], // Zrenjanin (Orange) - promenjeno sa null na kupivo

    // Crvena grupa (3 polja)
    21: [18, 90, 250, 700, 875, 1050], // Užice (Red) - promenjeno sa null na kupivo
    23: [18, 90, 250, 700, 875, 1050], // Valjevo (Red)
    24: [20, 100, 300, 750, 925, 1100], // Loznica (Red)

    // Žuta grupa (3 polja)
    26: [22, 110, 330, 800, 975, 1150], // Požarevac (Yellow)
    27: [22, 110, 330, 800, 975, 1150], // Smederevo (Yellow) - promenjeno sa null na kupivo
    29: [24, 120, 360, 850, 1025, 1200], // Sremska Mitrovica (Yellow)

    // Zelena grupa (3 polja)
    31: [26, 130, 390, 900, 1100, 1275], // Šabac 2 (Green) - promenjeno sa null na kupivo
    32: [26, 130, 390, 900, 1100, 1275], // Svilajnac (Green) - promenjeno ime
    34: [28, 150, 450, 1000, 1200, 1400], // Sombor (Green)

    // Tamnoplava grupa (2 polja)
    37: [35, 175, 500, 1100, 1300, 1500], // Pirot (Dark Blue)
    39: [50, 200, 600, 1400, 1700, 2000] // Jovac (Dark Blue)
};
const imenaPolja = [
  "Start",        // 0
  "Beograd",      // 1
  "Šansa",        // 2
  "Novi Sad",     // 3
  "Porez",        // 4
  "Stanica",      // 5
  "Niš",          // 6
  "Zajednica",    // 7
  "Subotica",     // 8
  "Palić",        // 9 - promenjeno ime (bilo "U poseti zatvoru")
  "Zatvor",       // 10
  "Kikinda",   // 11
  "EPS",          // 12
  "Čačak",        // 13
  "Kraljevo",     // 14
  "Stanica",      // 15
  "Šabac",        // 16
  "Zajednica",    // 17
  "Pančevo",      // 18
  "Zrenjanin",    // 19
  "Besplatan parking", // 20
  "Užice",        // 21
  "Šansa",        // 22
  "Valjevo",      // 23
  "Loznica",      // 24
  "Stanica",      // 25
  "Požarevac",    // 26
  "Smederevo",    // 27
  "Vodovod",      // 28 - promenjeno ime (bilo "Porez" u HTML-u)
  "Sremska Mitrovica", // 29
  "Idi u zatvor", // 30
  "Cuprija",      // 31
  "Svilajnac",    // 32 - promenjeno ime (bilo "Zajednica")
  "Aerodrom",     // 33 - promenjeno ime (bilo "Kikinda")
  "Sombor",       // 34 - (HTML je imao Porez, ali ako je Sombor grad, onda nije porez)
  "Stanica",      // 35
  "Šansa",        // 36
  "Pirot",        // 37
  "Porez",        // 38
  "Jovac"         // 39
];
const hipotekeCene = [
  null,   // 0: Start
  30,     // 1: Beograd
  null,   // 2: Šansa
  30,     // 3: Novi Sad
  null,   // 4: Porez
  100,    // 5: Stanica
  50,     // 6: Niš
  null,   // 7: Zajednica
  50,     // 8: Subotica
  60,     // 9: Palić
  null,   // 10: Zatvor
  70,     // 11: Kragujevac
  75,     // 12: EPS
  70,     // 13: Čačak
  80,     // 14: Kraljevo
  100,    // 15: Stanica
  90,     // 16: Šabac
  null,   // 17: Zajednica
  90,     // 18: Pančevo
  100,    // 19: Zrenjanin
  null,   // 20: Besplatan parking
  110,    // 21: Užice
  null,   // 22: Šansa
  110,    // 23: Valjevo
  120,    // 24: Loznica
  100,    // 25: Stanica
  130,    // 26: Požarevac
  130,    // 27: Smederevo
  75,     // 28: Vodovod (Cena hipoteke za komunalije je obično pola kupovne cene, 150/2=75)
  140,    // 29: Sremska Mitrovica
  null,   // 30: Idi u zatvor
  150,    // 31: Šabac 2
  150,    // 32: Svilajnac
  160,    // 33: Aerodrom
  null,   // 34: Porez (Ako je Porez, ako je Sombor onda 100)
  100,    // 35: Stanica
  null,   // 36: Šansa
  175,    // 37: Pirot
  null,   // 38: Porez
  200     // 39: Jovac
];
const zeleznice = [5, 15, 25, 35];
const komunalije = [12, 28];
const porezi = [4, 38];

const figurice = [
  { id: 1, pozicija: 0, novac: 1500, posedi: [], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true },
  { id: 2, pozicija: 0, novac: -1, posedi: [], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true }, // Mali novac za test
  { id: 3, pozicija: 0, novac: -1, posedi: [], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true }, // Mali novac za test
  { id: 4, pozicija: 0, novac: -1, posedi: [], uZatvoru: false, kazna: 0, imaKartuZaIzlazIzZatvora: false, aktivan: true }  // Mali novac za test
];

let trenutniIgrac = 0;
const ukupnoPolja = 40;
const vlasnici = Array(40).fill(null);
const kuce = Array(40).fill(0);
const hipoteke = Array(40).fill(false);

const sansa = [
  "Dobio si 200$!",
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

function postaviPocetneFigurice() {
  figurice.forEach((igrac) => {
    const polje = polja[igrac.pozicija];
    const figuricaEl = document.createElement('div');
    figuricaEl.className = `figurica igrac${igrac.id}`;
    figuricaEl.innerText = ['🔴','🔵','🟢','🟡'][igrac.id - 1];
    polje.appendChild(figuricaEl);
  });
}

const showBootstrapAlert = (message, isError = false) => {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${isError ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
  alertDiv.style.top = '20px';
  alertDiv.style.left = '50%';
  alertDiv.style.transform = 'translateX(-50%)';
  alertDiv.style.zIndex = '9999';
  alertDiv.style.minWidth = '300px';
  alertDiv.style.maxWidth = '80%';
  alertDiv.style.textAlign = 'center';
  alertDiv.style.marginTop='250px';
  alertDiv.role = 'alert';
  
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  
  document.body.appendChild(alertDiv);
  
  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    const bsAlert = new bootstrap.Alert(alertDiv);
    bsAlert.close();
  }, 3000);
};
const showBootstrapConfirm = (message, callback) => {
  const modalDiv = document.createElement('div');
  modalDiv.className = 'modal fade';
  modalDiv.tabIndex = '-1';
  modalDiv.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Potvrda</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ${message}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ne</button>
          <button type="button" class="btn btn-primary" id="confirmBtn">Da</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modalDiv);
  
  const modal = new bootstrap.Modal(modalDiv);
  modal.show();
  
  modalDiv.querySelector('#confirmBtn').addEventListener('click', () => {
    callback(true);
    modal.hide();
  });
  
  modalDiv.addEventListener('hidden.bs.modal', () => {
    document.body.removeChild(modalDiv);
  });
};
// Add this function at the beginning of your file (with other utility functions)
function showBootstrapPrompt(options, callback) {
    // Create modal element
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal fade';
    modalDiv.tabIndex = '-1';
    modalDiv.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${options.title || 'Unesite vrednost'}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${options.message || ''}</p>
                    <input type="${options.type || 'text'}" class="form-control" id="promptInput" value="${options.defaultValue || ''}">
                    ${options.extraHTML || ''}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Otkaži</button>
                    <button type="button" class="btn btn-primary" id="promptSubmit">Potvrdi</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalDiv);
    const modal = new bootstrap.Modal(modalDiv);
    modal.show();

    // Focus input field when modal is shown
    modalDiv.addEventListener('shown.bs.modal', () => {
        modalDiv.querySelector('#promptInput').focus();
    });

    // Handle submit button click
    modalDiv.querySelector('#promptSubmit').addEventListener('click', () => {
        const inputValue = modalDiv.querySelector('#promptInput').value;
        callback(inputValue);
        modal.hide();
    });

    // Handle Enter key press
    modalDiv.querySelector('#promptInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const inputValue = modalDiv.querySelector('#promptInput').value;
            callback(inputValue);
            modal.hide();
        }
    });

    // Clean up after modal is closed
    modalDiv.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modalDiv);
    });
}
function bootstrapPrompt(message, defaultValue = "") {
    return new Promise((resolve) => {
        showBootstrapPrompt({
            message: message,
            defaultValue: defaultValue
        }, (result) => {
            resolve(result || defaultValue);
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

  document.getElementById('akcije').style.display = 'block';

  if (igrac.uZatvoru) {
    if (igrac.imaKartuZaIzlazIzZatvora) {
      igrac.uZatvoru = false;
      igrac.imaKartuZaIzlazIzZatvora = false;
      showBootstrapAlert("Iskoristio si kartu za izlazak iz zatvora.");
    } else if (igrac.novac >= 50) {
      igrac.novac -= 50;
      igrac.uZatvoru = false;
      showBootstrapAlert("Platio si 50$ i izašao iz zatvora.");
    } else {
      igrac.kazna--;
      if (igrac.kazna <= 0) {
        igrac.uZatvoru = false;
        showBootstrapAlert("Odležao si kaznu i sada izlaziš iz zatvora.");
      } else {
        showBootstrapAlert(`U zatvoru si još ${igrac.kazna} potez/a.`);
        sledeciIgrac();
        return;
      }
    }
  }

  const broj1 = Math.floor(Math.random() * 6) + 1;
  const broj2 = Math.floor(Math.random() * 6) + 1;
  const zbir = broj1 + broj2;
  const dupli = broj1 === broj2;

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
    pomeriIgracaAnimirano(zbir, dupli);
  }, 600);
}

function pomeriIgracaAnimirano(koraci, dupli, callback) {
  const igrac = figurice[trenutniIgrac];
  let pomeranja = 0;

  const interval = setInterval(() => {
    document.querySelectorAll(`.figurica.igrac${igrac.id}`).forEach(el => el.remove());
    igrac.pozicija = (igrac.pozicija + 1) % ukupnoPolja;

    if (igrac.pozicija === 0) {
      igrac.novac += 200;
      showBootstrapAlert("Prošao si Start i dobio 200$!");
    }
    else if (igrac.pozicija === 20) { 
      if(porez !== 0) {
       showBootstrapAlert('Dobili ste sav porez!');
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
  sacuvajStanje()
}

function nakonPomeranja(dupli) {
  const igrac = figurice[trenutniIgrac];
  const index = igrac.pozicija;

  // Ako su brojevi isti i igrac nije u zatvoru, dozvoli ponovno bacanje
  if (dupli && !igrac.uZatvoru) {
    bacanjeDozvoljeno = true;
    showBootstrapAlert("Isti brojevi! Bacaš ponovo.");
  }

  if (index === 30) {
    igrac.uZatvoru = true;
    igrac.kazna = 3;
    pomeriIgracaDoPolja(10, () => {
      igrac.pozicija = 10;
      showBootstrapAlert("Idi u zatvor! 3 poteza pauza.");
      azurirajPrikaz();
      sledeciIgrac();
    });
    return;
  }

  if ([2,22,36].includes(index)) {
    izvuciSansu(dupli); // Funkcija izvuciSansu() treba da odluci da li ce pozvati sledeciIgrac()
    return;
  }
  if ([7, 17].includes(index)) { // Novi/modifikovani indeksi za Zajednicu (prilagodite prema svom HTML-u)
    izvuciZajednicu(dupli);
    return;
  }

  if (porezi.includes(index)) {
    obradiPorez(index); // Funkcija obradiPorez() poziva sledeciIgrac()
    return;
  }

  // NOVA LOGIKA OVDE:
  const vlasnikId = vlasnici[index];
  const cenaPolja = cenePolja[index];

  if (vlasnikId === null && cenaPolja !== null) { // Polje je slobodno i moze se kupiti
    document.getElementById('akcije').style.display = 'block'; // Prikazi dugmad za akcije
    // NE ZOVEMO SLEDECI IGRAC() OVDE, CEKAMO KORISNIKOV IZBOR
  } else if (vlasnikId !== null && vlasnikId !== igrac.id) { // Polje ima vlasnika i nije tvoje
    obradiRentu(index); // Obradi rentu, obradiRentu ce pozvati sledeciIgrac() ako je potrebno
  } else { // Ako je tvoje polje, ili je start, parking itd.
    azurirajPrikaz();
    // Ako je tvoje polje, ili polje koje ne izaziva akciju, idi na sledeceg igraca
  }
  sacuvajStanje()
}
function izvuciZajednicu(dupli) {
  const igrac = figurice[trenutniIgrac];
  const karta = zajednica[Math.floor(Math.random() * zajednica.length)];
  showBootstrapAlert("Zajednica: " + karta);

  if (karta.includes("Dobio si") || karta.includes("dobijaš") || karta.includes("Sakupljaš")) {
    // Izvuci iznos novca iz stringa
    const iznosMatch = karta.match(/\d+/);
    if (iznosMatch) {
      const iznos = parseInt(iznosMatch[0]);
      igrac.novac += iznos;
    }
  } else if (karta.includes("Plaćaš") || karta.includes("Plati")) {
    // Izvuci iznos novca za plaćanje
    const iznosMatch = karta.match(/\d+/);
    if (iznosMatch) {
      const iznos = parseInt(iznosMatch[0]);

      if (karta.includes("Popravka kuće/hotela")) {
        let totalniTrosak = 0;
        // Proveri sva polja koja igrač poseduje
        igrac.posedi.forEach(posedIndex => {
          if (kuce[posedIndex] === 4) { // Ako je hotel
            totalniTrosak += 100;
          } else { // Ako su kuće
            totalniTrosak += kuce[posedIndex] * 25; // 25$ po kući
          }
        });
        showBootstrapAlert(`Plaćaš ${totalniTrosak}$ za popravke.`);
        igrac.novac -= totalniTrosak;
        porez += totalniTrosak; // Sakupljaj porez na Besplatnom Parkingu
      } else {
        igrac.novac -= iznos;
        porez += iznos; // Dodaj porez na Besplatnom Parkingu
      }
    }
  } else if (karta.includes("Tvoj rođendan")) {
    const iznos = 10;
    figurice.forEach(drugiIgrac => {
      if (drugiIgrac.id !== igrac.id && drugiIgrac.aktivan) {
        if (drugiIgrac.novac >= iznos) {
          drugiIgrac.novac -= iznos;
          igrac.novac += iznos;
          showBootstrapAlert(`Igrač ${drugiIgrac.id} ti je dao 10$.`);
        } else {
          showBootstrapAlert(`Igrač ${drugiIgrac.id} nema dovoljno novca da ti da 10$.`);
          // Možda implementirati logiku za bankrot ili pregovore ovde
        }
      }

    });
  } else if (karta.includes("Idi direktno u zatvor")) {
    igrac.uZatvoru = true;
    igrac.kazna = 3;
    pomeriIgracaDoPolja(10, () => {
      igrac.pozicija = 10;
      azurirajPrikaz();
      sledeciIgrac();
    });
    return; // Važno je prekinuti izvršavanje funkcije ovde
  } else if (karta.includes("Idi direktno na Start")) {
    pomeriIgracaDoPolja(0, () => {
      igrac.novac += 200; // Dobija se 200$ za prolazak kroz Start
      azurirajPrikaz();
      sledeciIgrac();
    });
    return; // Važno je prekinuti izvršavanje funkcije ovde
  }

  azurirajPrikaz();
  if (!dupli) {
    sledeciIgrac();
  }
  sacuvajStanje();
}

function izvuciSansu(dupli) {
  const igrac = figurice[trenutniIgrac];
  const karta = sansa[Math.floor(Math.random() * sansa.length)];
  showBootstrapAlert("Šansa: " + karta);

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

  azurirajPrikaz();
  if (!dupli) {
    sledeciIgrac();
  }
}

function pomeriIgracaDoPolja(zeljenoPolje, callback) {
  const igrac = figurice[trenutniIgrac];

  if (zeljenoPolje < 0 || zeljenoPolje >= ukupnoPolja) {
    showBootstrapAlert("Nevažeće polje!");
    return;
  }

  let koraci = zeljenoPolje >= igrac.pozicija 
    ? zeljenoPolje - igrac.pozicija
    : ukupnoPolja - igrac.pozicija + zeljenoPolje;

  pomeriIgracaAnimirano(koraci, false, () => {
    igrac.pozicija = zeljenoPolje;
    if (callback) callback();
  });
}

function obradiPorez(index) {
  const igrac = figurice[trenutniIgrac];
  igrac.novac -= 150;
  showBootstrapAlert(`Porez! Platio si 150$`);
  porez += 150;
  azurirajPrikaz();
  sledeciIgrac();
  sacuvajStanje();
}

async function obradiRentu(index) {
  const igrac = figurice[trenutniIgrac];
  const vlasnikId = vlasnici[index];

  if (vlasnikId !== null && vlasnikId !== igrac.id) {
    const vlasnik = figurice[vlasnikId - 1];

    if (hipoteke[index]) {
      showBootstrapAlert(`Polje ${imenaPolja[index]} je pod hipotekom. Nema rente za plaćanje.`);
      azurirajPrikaz();
      sledeciIgrac();
      return;
    }

    let renta = 0;
    // const dupli = parseInt(kockica1.innerText) === parseInt(kockica2.innerText); // Potrebno za komunalije, ali nije korišteno direktno u renti grada

    if (zeleznice.includes(index)) {
      // Logika za železničke stanice
      const brojZeleznica = vlasnik.posedi.filter(p => zeleznice.includes(p)).length;
      switch (brojZeleznica) {
        case 1:
          renta = 25;
          break;
        case 2:
          renta = 50;
          break;
        case 3:
          renta = 100;
          break;
        case 4:
          renta = 200;
          break;
      }
      showBootstrapAlert(`Stao si na ${imenaPolja[index]}. Vlasnik ima ${brojZeleznica} železnic(a/e). Renta je ${renta}$.`);
    } else if (komunalije.includes(index)) {
      // Logika za komunalije (EPS i Vodovod)
      const brojKomunalija = vlasnik.posedi.filter(p => komunalije.includes(p)).length;
      const zbirKockica = parseInt(kockica1.innerText) + parseInt(kockica2.innerText); // Zbir kockica za komunalije

      if (brojKomunalija === 1) {
        renta = zbirKockica * 4; // Renta je 4 puta zbir kockica ako je vlasnik jedne komunalije
      } else if (brojKomunalija === 2) {
        renta = zbirKockica * 10; // Renta je 10 puta zbir kockica ako je vlasnik obe komunalije
      }
      showBootstrapAlert(`Stao si na ${imenaPolja[index]}. Vlasnik ima ${brojKomunalija} komunalij(a/e). Renta je ${renta}$ (Zbir kockica: ${zbirKockica}).`);
    } else if (ceneRente[index]) { // Proveri da li je polje u ceneRente objektu (tj. grad)
      renta = ceneRente[index][kuce[index]]; // Dohvati rentu direktno iz liste

      // Ako vlasnik ima monopol (sva polja u boji) i NEMA KUĆA (0 kuća) na polju, renta se udvostručuje.
      if (igracImaSvaPoljaGrupe(index, vlasnikId) && kuce[index] === 0) {
        renta *= 2;
        showBootstrapAlert(`Vlasnik ${vlasnikId} ima monopol na ovu boju! Osnovna renta je udvostručena.`);
      }
      showBootstrapAlert(`Stao si na ${imenaPolja[index]}. Renta je ${renta}$.`);

    } else { // Specijalna polja koja se ne kupuju i nemaju rentu
      azurirajPrikaz();
      sledeciIgrac();
      return;
    }

    if (igrac.novac >= renta) {
      igrac.novac -= renta;
      vlasnik.novac += renta;
      showBootstrapAlert(`Platio si rentu od ${renta}$ igraču ${vlasnikId} za polje ${imenaPolja[index]}.`);
      azurirajPrikaz();
      sledeciIgrac();
    } else {
      // PROMENJENO ZA TESTIRANJE BRZOG BANKROTA
      showBootstrapAlert(`Igrač ${igrac.id} nema dovoljno novca da plati rentu od ${renta}$ i bankrotirao je!`, true);
      igrac.novac = -1; // Postavi novac na -1 da bi sledeciIgrac() funkcija detektovala bankrot
      sledeciIgrac(); // Odmah proglasi bankrot i pređi na sledećeg igrača
      // KRAJ PROMENA ZA TESTIRANJE
    }
  } else { // Ako je polje slobodno, ili igraču pripada
    azurirajPrikaz();
    if (cenePolja[index] === null || vlasnici[index] === igrac.id) {
      const dupli = parseInt(kockica1.innerText) === parseInt(kockica2.innerText); // Proveriti da li je dupli, ako jeste igrac baca ponovo
      if (!dupli) {
        sledeciIgrac();
      }
    }
  }
  sacuvajStanje();
}


async function pokreniPregovore(duznik, poverilac, iznos, poljeIndex) {
 const ponuda = await bootstrapPrompt(
  `Igrač ${duznik.id}, nemaš dovoljno novca da platiš rentu.\n` +
  `Možeš ponuditi nešto od svoje imovine igraču ${poverilac} u zamenu za otpis duga.\n` +
  `Unesi broj polja koje želiš da ponudiš (ili 0 za odustajanje):\n` +
  `Tvoja polja: ${duznik.posedi.join(', ')}`,
  "0"
);
  
  const ponudjenoPolje = parseInt(ponuda);
  if (ponudjenoPolje === 0) {
    showBootstrapAlert("Pregovori prekinuti.");
    pokreniProdajuImovine(duznik, iznos, () => obradiRentu(poljeIndex));
    return;
  }
  
  if (duznik.posedi.includes(ponudjenoPolje)) {
    const prihvatio = confirm(
      `Igrač ${poverilac}, igrač ${duznik.id} nema dovoljno novca da plati rentu.\n` +
      `On ti nudi polje ${ponudjenoPolje} (${imenaPolja[ponudjenoPolje]}) u zamenu za otpis duga od ${iznos}$.\n` +
      `Da li prihvataš ovu ponudu?`
    );
    
    if (prihvatio) {
      const index = duznik.posedi.indexOf(ponudjenoPolje);
      duznik.posedi.splice(index, 1);
      figurice[poverilac - 1].posedi.push(ponudjenoPolje);
      vlasnici[ponudjenoPolje] = poverilac;
      
      kuce[ponudjenoPolje] = 0;
      hipoteke[ponudjenoPolje] = false;
      
      showBootstrapAlert(`Dogovoreno! Igrač ${duznik.id} je preneo polje ${ponudjenoPolje} igraču ${poverilac} u zamenu za otpis duga.`);
      azurirajPrikaz();
      
      const dupli = kockica1.innerText === kockica2.innerText;
      if (!dupli) {
        sledeciIgrac();
      }
    } else {
      showBootstrapAlert("Ponuda odbijena.");
      pokreniProdajuImovine(duznik, iznos, () => obradiRentu(poljeIndex));
    }
  } else {
    showBootstrapAlert("Nevažeći izbor polja.");
    pokreniPregovore(duznik, poverilac, iznos, poljeIndex);
  }
}

async function pokreniProdajuImovine(igrac, iznos, callback) {
  if (igrac.posedi.length === 0) {
    showBootstrapAlert("Nemaš imovine za prodaju. Bankrotiraš!"); // Ispravljeno ime funkcije
    igrac.novac = -1;
    sledeciIgrac();
    return;
  }

  const izbor = await bootstrapPrompt(
  `Izaberi polje za prodaju (ili hipoteku):\n` +
  `Tvoja polja: ${igrac.posedi.join(', ')}\n` +
  `Unesi broj polja ili "hipoteka X" za hipoteku polja X`,
  igrac.posedi[0]
);
  
  if (izbor.startsWith("hipoteka ")) {
    const poljeIndex = parseInt(izbor.split(" ")[1]);
    if (igrac.posedi.includes(poljeIndex) && !hipoteke[poljeIndex]) {
      igrac.novac += hipotekeCene[poljeIndex];
      hipoteke[poljeIndex] = true;
      azurirajPrikaz();
      showBootstrapAlert(`Hipotekovao si polje ${poljeIndex} za ${hipotekeCene[poljeIndex]}$`);
      
      if (igrac.novac >= iznos) {
        callback();
      } else {
        pokreniProdajuImovine(igrac, iznos, callback);
      }
    } else {
      showBootstrapAlert("Nevažeća hipoteka.");
      pokreniProdajuImovine(igrac, iznos, callback);
    }
  } else {
    const poljeIndex = parseInt(izbor);
    if (igrac.posedi.includes(poljeIndex)) {
      const cena = Math.floor(cenePolja[poljeIndex] / 2);
      igrac.novac += cena;
      
      const index = igrac.posedi.indexOf(poljeIndex);
      igrac.posedi.splice(index, 1);
      vlasnici[poljeIndex] = null;
      kuce[poljeIndex] = 0;
      hipoteke[poljeIndex] = false;
      
      showBootstrapAlert(`Prodao si polje ${poljeIndex} banci za ${cena}$`);
      azurirajPrikaz();
      
      if (igrac.novac >= iznos) {
        callback();
      } else {
        pokreniProdajuImovine(igrac, iznos, callback);
      }
    } else {
      showBootstrapAlert("Nevažeći izbor polja."); // Ispravljeno ime funkcije
      pokreniProdajuImovine(igrac, iznos, callback);
    }
  }
  sacuvajStanje()
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
  gradnja.innerText = kuce[index] === 4 ? '🏨' : '🏠'.repeat(kuce[index]);
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
          .map(index => imenaPolja[index])
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
  sacuvajStanje()
}

function hipotekaPolje() {
  const igrac = figurice[trenutniIgrac];
  const index = igrac.pozicija;

  if (vlasnici[index] === igrac.id && !hipoteke[index]) {
    igrac.novac += hipotekeCene[index];
    hipoteke[index] = true;
    azurirajPrikaz();
    showBootstrapAlert(`Hipotekovano polje ${index}. Dobio si ${hipotekeCene[index]}$`);
  } else {
    showBootstrapAlert("Ne možeš hipotekovati ovo polje.");
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
      showBootstrapAlert(`Odglavljeno polje ${index}. Platio si ${cenaZaOdglavljivanje}$`);
    } else {
      showBootstrapAlert("Nemaš dovoljno novca da odglaviš ovo polje.");
    }
  } else {
    showBootstrapAlert("Ne možeš odglaviti ovo polje.");
  }
}

document.getElementById('kupi-polje').addEventListener('click', () => {
  const igrac = figurice[trenutniIgrac];
  const index = igrac.pozicija;
  const cena = cenePolja[index];

  if (index === 0 || [2,4,10,20,22,30,36,38].includes(index)) {
    showBootstrapAlert("Ovo polje ne može da se kupi.");
    return;
  }

  if (igrac.novac >= cena && vlasnici[index] === null) {
    igrac.novac -= cena;
    igrac.posedi.push(index);
    vlasnici[index] = igrac.id;
    azurirajPrikaz();
  }

  if(!bacanjeDozvoljeno) {
    document.getElementById('akcije').style.display = 'none';
    const dupli = parseInt(kockica1.innerText) === parseInt(kockica2.innerText); // Proveriti da li je dupli
    if (!dupli) {
      sledeciIgrac();
    }
  }
  sacuvajStanje()
});

document.getElementById('preskoci-kupovinu').addEventListener('click', () => {
  if(bacanjeDozvoljeno) {
    showBootstrapAlert('Prvo odigraj potez!');
  } else {
    document.getElementById('akcije').style.display = 'none';
    const dupli = parseInt(kockica1.innerText) === parseInt(kockica2.innerText); // Proveriti da li je dupli
    if (!dupli) {
      sledeciIgrac();
    }
  }
  sacuvajStanje()
});

document.getElementById('baci-kockicu').addEventListener('click', baciKockice);

document.getElementById('izgradi').addEventListener('click', () => {
  const igrac = figurice[trenutniIgrac];
  const index = igrac.pozicija;
  if (
    vlasnici[index] === igrac.id &&
    kuce[index] < 4 &&
    igrac.novac >= 150 &&
    igracImaSvaPoljaGrupe(index, igrac.id)
  ) {
    const grupa = bojePolja.find(g => g.includes(index));
    const minKuca = Math.min(...grupa.map(i => kuce[i]));
    if (kuce[index] > minKuca) {
      showBootstrapAlert("Moraš ravnomerno graditi kuće unutar iste grupe.");
      return;
    }

    kuce[index]++;
    igrac.novac -= 150;
    azurirajPrikaz();
    
    const dupli = parseInt(kockica1.innerText) === parseInt(kockica2.innerText); // Proveriti da li je dupli
    if (!dupli) {
      sledeciIgrac();
    }
  } else {
    showBootstrapAlert("Ne možeš graditi kuću na ovom polju!");
  }
  sacuvajStanje()
});

document.getElementById('hipoteka').addEventListener('click', hipotekaPolje);
document.getElementById('odglavi').addEventListener('click', odglaviPolje);

function sledeciIgrac() {
  document.getElementById('akcije').style.display = 'none';
  const igrac = figurice[trenutniIgrac];
  
  if (igrac.novac < 0) {
    showBootstrapAlert(`Igrač ${igrac.id} je bankrotirao!`);
    
    // Nema aukcije za bankrotirano polje u ovom scenariju brzog testiranja
    // const poljaZaProdaju = [...igrac.posedi];
    // pokreniAukciju(poljaZaProdaju);
    
    // Prenesi imovinu bankrotiranog igrača banci (ili igraču koji je izazvao bankrot)
    // Opciono: Očistite posednuta polja i vlasnika
    igrac.posedi.forEach(poljeIndex => {
        vlasnici[poljeIndex] = null;
        kuce[poljeIndex] = 0;
        hipoteke[poljeIndex] = false;
    });
    igrac.posedi = []; // Očisti posednuta polja
    
    igrac.aktivan = false;
    document.querySelectorAll(`.figurica.igrac${igrac.id}`).forEach(el => el.remove());
  }

  const aktivni = figurice.filter(i => i.aktivan);
  if (aktivni.length === 1) {
    const pobednik = aktivni[0];
    const pobednickiPoeni = pobednik.novac + pobednik.posedi.reduce((sum, index) => {
        let vrednostPolja = cenePolja[index] || 0;
        if (kuce[index] > 0) {
            // Dodajte vrednost kuća (ovde pretpostavljamo cenu izgradnje po kući)
            vrednostPolja += kuce[index] * 150; // Pretpostavimo da je cena kuće 150$
        }
        if (hipoteke[index]) {
            // Ako je pod hipotekom, vredi pola hipoteke (ili kupovne cene)
            vrednostPolja = hipotekeCene[index] || (cenePolja[index] / 2);
        }
        return sum + vrednostPolja;
    }, 0);

    const gameDate = new Date().toLocaleDateString('sr-RS');

    const newResult = {
        player: `Igrač ${pobednik.id}`,
        date: gameDate,
        score: pobednickiPoeni,
        gameType: "Monopol (4 igrača)" // Dodato polje za vrstu igre
    };

    
    let allResults = JSON.parse(localStorage.getItem('gameResults')) || [];
    allResults.push(newResult);
    localStorage.setItem('gameResults', JSON.stringify(allResults));

    showBootstrapAlert(`Igra je završena! Pobednik je ${newResult.player} sa ${newResult.score}$ 🎉`);
    window.location.href = '../../glavni-meni.html';
    return;
  }

  do {
    trenutniIgrac = (trenutniIgrac + 1) % figurice.length;
  } while (!figurice[trenutniIgrac].aktivan);

  naPotezu.innerText = `Na potezu: Igrač ${figurice[trenutniIgrac].id} (${['🔴','🔵','🟢','🟡'][trenutniIgrac]})`;
  bacanjeDozvoljeno = true;
  kockica1.classList.remove('zaustavljena');
  kockica2.classList.remove('zaustavljena');
  sacuvajStanje(); // Sačuvaj stanje igre nakon svake promene igrača
}
async function pokreniAukciju(poljaZaProdaju) {
  const aktivniIgraci = figurice.filter(i => i.aktivan && i.id !== figurice[trenutniIgrac].id);
  if (aktivniIgraci.length === 0 || poljaZaProdaju.length === 0) return;

  let trenutnaPonuda = { igracId: null, iznos: 0 };
  let indeksPonudjaca = 0;
  const poljeIndex = poljaZaProdaju[0];
  // const osnovnaCena = cenePolja[poljeIndex] || 0; // Nije korišćeno

  async function procesuirajAukciju() {
    if (indeksPonudjaca >= aktivniIgraci.length) {
      if (trenutnaPonuda.igracId && trenutnaPonuda.iznos > 0) {
        const pobednik = figurice.find(i => i.id === trenutnaPonuda.igracId);
        if (pobednik.novac >= trenutnaPonuda.iznos) {
          pobednik.novac -= trenutnaPonuda.iznos;
          pobednik.posedi.push(poljeIndex);
          vlasnici[poljeIndex] = pobednik.id;
          showBootstrapAlert(`Igrač ${pobednik.id} osvojio polje ${poljeIndex} za ${trenutnaPonuda.iznos}$`);
          
          poljaZaProdaju.shift();
          if (poljaZaProdaju.length > 0) {
            pokreniAukciju(poljaZaProdaju);
          }
          return;
        }
      }
      
      showBootstrapAlert(`Niko nije osvojio polje ${poljeIndex}`);
      vlasnici[poljeIndex] = null;
      kuce[poljeIndex] = 0;
      hipoteke[poljeIndex] = false;
      poljaZaProdaju.shift();
      if (poljaZaProdaju.length > 0) {
        pokreniAukciju(poljaZaProdaju);
      }
      return;
    }

    const ponudjac = aktivniIgraci[indeksPonudjaca];
    const ponuda = await bootstrapPrompt(
  `Aukcija za polje ${poljeIndex} (${imenaPolja[poljeIndex]})\n` +
  `Trenutna ponuda: ${trenutnaPonuda.iznos}$ od igrača ${trenutnaPonuda.igracId || 'niko'}\n` +
  `Igrač ${ponudjac.id}, tvoj novac: ${ponudjac.novac}$\n` +
  `Unesi svoju ponudu (min ${trenutnaPonuda.iznos + 10}$) ili 0 za odustajanje:`,
  trenutnaPonuda.iznos + 10
);

    const ponudaBroj = parseInt(ponuda);
    if (!isNaN(ponudaBroj)) {
      if (ponudaBroj === 0) {
        indeksPonudjaca++;
      } else if (ponudaBroj > trenutnaPonuda.iznos && ponudaBroj <= ponudjac.novac) {
        trenutnaPonuda = { igracId: ponudjac.id, iznos: ponudaBroj };
        indeksPonudjaca = 0;
      } else {
        showBootstrapAlert("Nevažeća ponuda! Ponuda mora biti veća od trenutne i ne sme premašiti tvoj novac.");
      }
    }
    
    procesuirajAukciju();
  }

  showBootstrapAlert(`Počinje aukcija za polje ${poljeIndex} (${imenaPolja[poljeIndex]})!`);
  procesuirajAukciju();
}

window.addEventListener('load', () => {
  ucitajStanje();
});
 
function sacuvajStanje() {
  const stanje = {
    figurice,
    trenutniIgrac,
    vlasnici,
    kuce,
    hipoteke,
    porez
  };
  localStorage.setItem("monopolyStanje", JSON.stringify(stanje));
}
function ucitajStanje() {
  const sacuvano = localStorage.getItem("monopolyStanje");
  if (sacuvano) {
    const stanje = JSON.parse(sacuvano);

    // Rekonstruiši stanje
    for (let i = 0; i < figurice.length; i++) {
      Object.assign(figurice[i], stanje.figurice[i]);
    }
    trenutniIgrac = stanje.trenutniIgrac;
    for (let i = 0; i < ukupnoPolja; i++) {
      vlasnici[i] = stanje.vlasnici[i];
      kuce[i] = stanje.kuce[i];
      hipoteke[i] = stanje.hipoteke[i];
    }
    porez = stanje.porez;

    postaviPocetneFigurice();
    azurirajPrikaz();
    naPotezu.innerText = `Na potezu: Igrač ${figurice[trenutniIgrac].id} (${['🔴','🔵','🟢','🟡','🟠','🟣'][trenutniIgrac]})`;
  } else {
    postaviPocetneFigurice();
    azurirajPrikaz();
  }
}
document.getElementById('resetBtn').addEventListener('click', resetGame())
function resetGame() {
  showBootstrapConfirm(
  "Da li ste sigurni da želite da resetujete celu igru? Svi podaci će biti izgubljeni.",
  (confirmed) => {
    if (confirmed) {
       figurice.forEach(igrac => {
      igrac.pozicija = 0;
      igrac.novac = 1500;
      igrac.posedi = [];
      igrac.uZatvoru = false;
      igrac.kazna = 0;
      igrac.imaKartuZaIzlazIzZatvora = false;
      igrac.aktivan = true;
    });

    // Resetovanje globalnih varijabli za stanje igre
    trenutniIgrac = 0;
    for (let i = 0; i < ukupnoPolja; i++) {
      vlasnici[i] = null;
      kuce[i] = 0;
      hipoteke[i] = false;
    }
    porez = 0;
    bacanjeDozvoljeno = true;

    // Uklanjanje svih figurica sa table pre ponovnog postavljanja
    document.querySelectorAll('.figurica').forEach(el => el.remove());

    // Ponovno postavljanje figurica na početne pozicije
    postaviPocetneFigurice();
    // Ažuriranje prikaza svih elemenata igre
    azurirajPrikaz();
    // Ažuriranje teksta ko je na potezu
    naPotezu.innerText = `Na potezu: Igrač ${figurice[trenutniIgrac].id} (${['🔴','🔵','🟢','🟡'][trenutniIgrac]})`;
    // Sakrivanje akcionih dugmadi
    document.getElementById('akcije').style.display = 'none';
    // Resetovanje izgleda kockica
    kockica1.classList.remove('zaustavljena');
    kockica2.classList.remove('zaustavljena');
    kockica1.innerText = '1'; // Postavi na podrazumevanu vrednost
    kockica2.innerText = '1'; // Postavi na podrazumevanu vrednost

    // Brisanje sačuvanog stanja iz localStorage-a
    localStorage.removeItem("monopolyStanje");
    // Ne brišemo 'gameResults' ovde, jer želimo da se čuvaju rezultati sesija

    showBootstrapAlert("Igra je uspešno resetovana!");
    }
  }
);
}

// Proverite da li 'reset-btn' postoji pre dodavanja event listenera
if (resetBtn) {
  resetBtn.addEventListener('click', resetGame);
}


async function pokreniDogovor() {
  const igracNaPotezu = figurice[trenutniIgrac];
  const aktivniIgraci = figurice.filter(i => i.aktivan && i.id !== igracNaPotezu.id);

  if (aktivniIgraci.length === 0) {
    showBootstrapAlert("Nema drugih aktivnih igrača za sklapanje dogovora.");
    return;
  }

  // Korisnik bira s kim želi da sklopi dogovor
  let partnerId = await bootstrapPrompt(
  `Igrač ${igracNaPotezu.id}, sa kojim igračem želiš da sklopiš dogovor?\n` +
  `Dostupni igrači: ${aktivniIgraci.map(i => i.id).join(', ')}`
);

  partnerId = parseInt(partnerId);
  const partner = figurice.find(i => i.id === partnerId);

  if (!partner || !aktivniIgraci.includes(partner)) {
    showBootstrapAlert("Nevažeći igrač. Pokušaj ponovo.");
    return;
  }

  // Pozovi funkciju za kreiranje ponude
  kreirajPonudu(igracNaPotezu, partner);
}
// Proverite da li 'dogovor-btn' postoji pre dodavanja event listenera
const dogovorBtn = document.getElementById('dogovor-btn');
if (dogovorBtn) {
  dogovorBtn.addEventListener('click', pokreniDogovor);
}

async function kreirajPonudu(ponudjac, primalac) {
  let ponudaNovacInput = await bootstrapPrompt(`Igrač ${ponudjac.id}, koliko novca nudiš igraču ${primalac.id}? (Trenutno imaš: ${ponudjac.novac}$)`, "0");

  let ponudaNovac = parseInt(ponudaNovacInput); // ISPRAVLJENO OVDJE

  if (isNaN(ponudaNovac) || ponudaNovac < 0 || ponudaNovac > ponudjac.novac) {
    showBootstrapAlert("Nevažeći iznos novca.");
    return;
  }

  let ponudaPoljaInput = await bootstrapPrompt(`Igrač ${ponudjac.id}, unesi brojeve polja (razdvojene zarezom) koje nudiš igraču ${primalac.id}? (Tvoja polja: ${ponudjac.posedi.map(p => `${p} (${imenaPolja[p]})`).join(', ')})\nNema kuća na poljima koja se nude!`, "");

  let ponudaPolja = ponudaPoljaInput.split(',').map(Number).filter(p => p > 0 && p < ukupnoPolja && ponudjac.posedi.includes(p));

  // Provera da li na ponuđenim poljima ima kuća
  for (const poljeIndex of ponudaPolja) {
    if (kuce[poljeIndex] > 0) {
      showBootstrapAlert(`Ne možeš nuditi polje ${imenaPolja[poljeIndex]} jer na njemu ima kuća. Prvo prodaj kuće.`);
      return;
    }
  }

  let trazeniNovacInput = await bootstrapPrompt(`Igrač ${ponudjac.id}, koliko novca tražiš od igrača ${primalac.id}? (Trenutno imaš: ${ponudjac.novac}$)`, "0");
  let trazeniNovac = parseInt(trazeniNovacInput); // ISPRAVLJENO OVDJE

  if (isNaN(trazeniNovac) || trazeniNovac < 0) {
    showBootstrapAlert("Nevažeći iznos novca.");
    return;
  }

  let trazeniPoljaInput = await bootstrapPrompt(`Igrač ${ponudjac.id}, unesi brojeve polja (razdvojene zarezom) koje tražiš od igrača ${primalac.id}? (Njegova polja: ${primalac.posedi.map(p => `${p} (${imenaPolja[p]})`).join(', ')})\nNema kuća na poljima koja se traže!`, "");
  let trazeniPolja = trazeniPoljaInput.split(',').map(Number).filter(p => p > 0 && p < ukupnoPolja && primalac.posedi.includes(p));

  for (const poljeIndex of trazeniPolja) {
    if (kuce[poljeIndex] > 0) {
      showBootstrapAlert(`Ne možeš tražiti polje ${imenaPolja[poljeIndex]} jer na njemu ima kuća.`);
      return;
    }
  }

  let ponudaKartaIzlazak = confirm(`Igrač ${ponudjac.id}, da li nudiš kartu za izlazak iz zatvora? (Imaš: ${ponudjac.imaKartuZaIzlazIzZatvora ? 'DA' : 'NE'})`);
  let trazenaKartaIzlazak = confirm(`Igrač ${ponudjac.id}, da li tražiš kartu za izlazak iz zatvora od igrača ${primalac.id}? (On ima: ${primalac.imaKartuZaIzlazIzZatvora ? 'DA' : 'NE'})`);

  // Prikaz ponude primaocu
  prikaziPonudu(ponudjac, primalac, ponudaNovac, ponudaPolja, trazeniNovac, trazeniPolja, ponudaKartaIzlazak, trazenaKartaIzlazak);
}
function izvrsiDogovor(ponudjac, primalac, ponudaNovac, ponudaPolja, trazeniNovac, trazeniPolja, ponudaKartaIzlazak, trazenaKartaIzlazak) {
  // Provera da li ponudjac ima ono što nudi i primalac ono što se traži
  if (ponudjac.novac < ponudaNovac || primalac.novac < trazeniNovac) {
    showBootstrapAlert("Nema dovoljno novca za izvršenje dogovora!");
    return;
  }
  if (ponudaKartaIzlazak && !ponudjac.imaKartuZaIzlazIzZatvora) {
    showBootstrapAlert("Ponudjac nema kartu za izlazak iz zatvora koju nudi!");
    return;
  }
  if (trazenaKartaIzlazak && !primalac.imaKartuZaIzlazIzZatvora) {
    showBootstrapAlert("Primalac nema kartu za izlazak iz zatvora koja se traži!");
    return;
  }

  // Prebacivanje novca
  ponudjac.novac -= ponudaNovac;
  primalac.novac += ponudaNovac;
  primalac.novac -= trazeniNovac;
  ponudjac.novac += trazeniNovac;

  // Prebacivanje polja
  ponudaPolja.forEach(poljeIndex => {
    // Ukloni polje od ponuđača
    let indexUkloni = ponudjac.posedi.indexOf(poljeIndex);
    if (indexUkloni > -1) {
      ponudjac.posedi.splice(indexUkloni, 1);
    }
    // Dodaj polje primaocu
    primalac.posedi.push(poljeIndex);
    vlasnici[poljeIndex] = primalac.id;
    // Resetuj hipoteke i kuće ako se polje prenosi
    hipoteke[poljeIndex] = false;
    kuce[poljeIndex] = 0;
  });

  trazeniPolja.forEach(poljeIndex => {
    // Ukloni polje od primaoca
    let indexUkloni = primalac.posedi.indexOf(poljeIndex);
    if (indexUkloni > -1) {
      primalac.posedi.splice(indexUkloni, 1);
    }
    // Dodaj polje ponuđaču
    ponudjac.posedi.push(poljeIndex);
    vlasnici[poljeIndex] = ponudjac.id;
    // Resetuj hipoteke i kuće ako se polje prenosi
    hipoteke[poljeIndex] = false;
    kuce[poljeIndex] = 0;
  });

  // Prebacivanje karata za izlazak iz zatvora
  if (ponudaKartaIzlazak && ponudjac.imaKartuZaIzlazIzZatvora) {
    ponudjac.imaKartuZaIzlazIzZatvora = false;
    primalac.imaKartuZaIzlazIzZatvora = true;
  }
  if (trazenaKartaIzlazak && primalac.imaKartuZaIzlazIzZatvora) {
    primalac.imaKartuZaIzlazIzZatvora = false;
    ponudjac.imaKartuZaIzlazIzZatvora = true;
  }

  showBootstrapAlert("Dogovor je uspešno sklopljen!");
  azurirajPrikaz();
  sacuvajStanje();
}
function prikaziPonudu(ponudjac, primalac, ponudaNovac, ponudaPolja, trazeniNovac, trazeniPolja, ponudaKartaIzlazak, trazenaKartaIzlazak) {
  let poruka = `Igrač ${primalac.id}, igrač ${ponudjac.id} ti nudi sledeći dogovor:\n\n`;

  if (ponudaNovac > 0) poruka += `  - ${ponudaNovac}$ novca\n`;
  if (ponudaPolja.length > 0) poruka += `  - Polja: ${ponudaPolja.map(p => imenaPolja[p]).join(', ')}\n`;
  if (ponudaKartaIzlazak && ponudjac.imaKartuZaIzlazIzZatvora) poruka += `  - Kartu za izlazak iz zatvora\n`;

  poruka += `\nU zamenu traži:\n\n`;

  if (trazeniNovac > 0) poruka += `  - ${trazeniNovac}$ novca\n`;
  if (trazeniPolja.length > 0) poruka += `  - Polja: ${trazeniPolja.map(p => imenaPolja[p]).join(', ')}\n`;
  if (trazenaKartaIzlazak && primalac.imaKartuZaIzlazIzZatvora) poruka += `  - Kartu za izlazak iz zatvora\n`;

  poruka += `\nDa li prihvataš ovu ponudu?`;

  const prihvatio = confirm(poruka);

  if (prihvatio) {
    izvrsiDogovor(ponudjac, primalac, ponudaNovac, ponudaPolja, trazeniNovac, trazeniPolja, ponudaKartaIzlazak, trazenaKartaIzlazak);
  } else {
    showBootstrapAlert(`Igrač ${primalac.id} je odbio ponudu.`);
  }
  sacuvajStanje();
}