const kockica1 = document.getElementById('kockica1');
const kockica2 = document.getElementById('kockica2');
const baciBtn = document.getElementById('baci-kockicu');
const naPotezu = document.getElementById('na-potezu');
const polja = document.querySelectorAll('.polje');
let porez = 0;
const brojIgraca = 3;
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
  320,   // 34: Porez - 
  200,    // 35: Stanica
  null,   // 36: Šansa - Ne kupuje se
  350,    // 37: Pirot
  null,   // 38: Porez - Ne kupuje se
  400     // 39: Jovac
];
const ceneRente = {
    // Braon grupa (2 polja)
    1: [2, 10, 30, 90, 160, 250],
    3: [4, 20, 60, 180, 320, 450],

    // Svetloplava grupa (3 polja)
    6: [6, 30, 90, 270, 400, 550],
    8: [6, 30, 90, 270, 400, 550],
    9: [8, 40, 100, 300, 450, 600],
    
    // Pink grupa (3 polja)
    11: [10, 50, 150, 450, 625, 750],
    13: [10, 50, 150, 450, 625, 750],
    14: [12, 60, 180, 500, 700, 900],

    // Narandžasta grupa (3 polja)
    16: [14, 70, 200, 550, 750, 950],
    18: [14, 70, 200, 550, 750, 950],
    19: [16, 80, 220, 600, 800, 1000],

    // Crvena grupa (3 polja)
    21: [18, 90, 250, 700, 875, 1050],
    23: [18, 90, 250, 700, 875, 1050],
    24: [20, 100, 300, 750, 925, 1100],

    // Žuta grupa (3 polja)
    26: [22, 110, 330, 800, 975, 1150],
    27: [22, 110, 330, 800, 975, 1150],
    29: [24, 120, 360, 850, 1025, 1200],

    // Zelena grupa (3 polja)
    31: [26, 130, 390, 900, 1100, 1275],
    32: [26, 130, 390, 900, 1100, 1275],
    34: [28, 150, 450, 1000, 1200, 1400],

    // Tamnoplava grupa (2 polja)
    37: [35, 175, 500, 1100, 1300, 1500],
    39: [50, 200, 600, 1400, 1700, 2000]
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
  "Palić",        // 9
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
  "Vodovod",      // 28
  "Sremska Mitrovica", // 29
  "Idi u zatvor", // 30
  "Cuprija",      // 31
  "Svilajnac",    // 32
  "Aerodrom",     // 33
  "Sombor",       // 34
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
const zeleznice = [5, 15, 25, 35, 33];
const komunalije = [12, 28];
const porezi = [4, 38];

const figurice = [];
for (let i = 1; i <= brojIgraca; i++) {
    figurice.push({
        id: i,
        pozicija: 0,
        novac: 1500,
        posedi: [],
        uZatvoru: false,
        kazna: 0,
        imaKartuZaIzlazIzZatvora: false,
        aktivan: true,
        uzastopniDupli: 0
    });
}

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
    figuricaEl.innerText = ['🔴','🔵','🟢'][igrac.id - 1];
    polje.appendChild(figuricaEl);
  });
}

const showBootstrapAlert = (message, isError = false, options = {}) => {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${isError ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
  alertDiv.style.left = '50%';
  alertDiv.style.transform = 'translateX(-50%)';
  alertDiv.style.zIndex = '9999';
  alertDiv.style.minWidth = '300px';
  alertDiv.style.maxWidth = '80%';
  alertDiv.style.textAlign = 'center';
  alertDiv.style.marginTop = '250px'; 

  const existingAlerts = document.querySelectorAll('.alert.position-fixed');
  let topOffset = 20;

  existingAlerts.forEach(alert => {
    if (alert.offsetHeight > 0) {
      topOffset += alert.offsetHeight + 10;
    }
  });

  alertDiv.style.top = `${topOffset}px`;

  let buttonsHtml = '';
  if (options.confirm) {
    buttonsHtml = `
      <hr>
      <div class="d-flex justify-content-around">
        <button type="button" class="btn btn-success me-2" id="alertConfirmYes">Da</button>
        <button type="button" class="btn btn-danger" id="alertConfirmNo">Ne</button>
      </div>
    `;
  }

  alertDiv.innerHTML = `
    <div>${message}</div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    ${buttonsHtml}
  `;

  document.body.appendChild(alertDiv);

  const bsAlert = new bootstrap.Alert(alertDiv);

  if (options.confirm) {
    alertDiv.querySelector('#alertConfirmYes').addEventListener('click', () => {
      bsAlert.close();
      if (options.onConfirm) options.onConfirm(true);
    });
    alertDiv.querySelector('#alertConfirmNo').addEventListener('click', () => {
      bsAlert.close();
      if (options.onConfirm) options.onConfirm(false);
    });
  }

  if (!options.confirm) {
    setTimeout(() => {
      bsAlert.close();
    }, 5000);
  }

  alertDiv.addEventListener('closed.bs.alert', () => {
  });
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

function showBootstrapPrompt(options, callback) {
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

    modalDiv.addEventListener('shown.bs.modal', () => {
        modalDiv.querySelector('#promptInput').focus();
    });

    modalDiv.querySelector('#promptSubmit').addEventListener('click', () => {
        const inputValue = modalDiv.querySelector('#promptInput').value;
        callback(inputValue);
        modal.hide();
    });

    modalDiv.querySelector('#promptInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const inputValue = modalDiv.querySelector('#promptInput').value;
            callback(inputValue);
            modal.hide();
        }
    });

    modalDiv.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modalDiv);
    });
}
function bootstrapPrompt(message, defaultValue = "") {
  if (typeof message === 'object' && message !== null) {
        options = message;
        message = options.message || '';
        defaultValue = options.defaultValue || '';
    }
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
    bootstrapPrompt({
      title: "U Zatvoru Si!",
      message: `Igrač ${igrac.id}, u zatvoru si. Preostalo poteza: ${igrac.kazna}. Izaberi akciju unosom broja:
        <br>1. Plati 50$ ${igrac.novac < 50 ? '(Nemaš dovoljno novca)' : ''}
        <br>2. Iskoristi Kartu za izlazak iz zatvora ${!igrac.imaKartuZaIzlazIzZatvora ? '(Nemaš kartu)' : ''}
        <br>3. Baci Kockice za dupli broj (probaj da izađeš)
      `,
      input: true,
      defaultValue: "3"
    }).then(async (izbor) => {
      const akcija = parseInt(izbor);

      if (akcija === 1) {
        if (igrac.novac >= 50) {
          igrac.novac -= 50;
          porez += 50;
          igrac.uZatvoru = false;
          igrac.kazna = 0;
          igrac.uzastopniDupli = 0;
          showBootstrapAlert("Platio si 50$ i izašao iz zatvora.");
          azurirajPrikaz();
          baciKockiceNakonZatvora(true);
        } else {
          showBootstrapAlert("Nemaš dovoljno novca za plaćanje! Izaberi drugu opciju.");
          baciKockice();
        }
      } else if (akcija === 2) {
        if (igrac.imaKartuZaIzlazIzZatvora) {
          igrac.uZatvoru = false;
          igrac.kazna = 0;
          igrac.imaKartuZaIzlazIzZatvora = false;
          igrac.uzastopniDupli = 0;
          showBootstrapAlert("Iskoristio si kartu za izlazak iz zatvora.");
          azurirajPrikaz();
          baciKockiceNakonZatvora(true);
        } else {
          showBootstrapAlert("Nemaš kartu za izlazak iz zatvora! Izaberi drugu opciju.");
          baciKockice();
        }
      } else if (akcija === 3) {
        const broj1 = Math.floor(Math.random() * 6) + 1;
        const broj2 = Math.floor(Math.random() * 6) + 1;
        const zbir = broj1 + broj2;
        const dupli = broj1 === broj2;

        kockica1.innerText = broj1;
        kockica2.innerText = broj2;

        if (dupli) {
          igrac.uZatvoru = false;
          igrac.kazna = 0;
          igrac.uzastopniDupli = 0;
          showBootstrapAlert(`Bacio si dupli broj (${broj1}, ${broj2}) i izašao si iz zatvora!`);
          azurirajPrikaz();
          pomeriIgracaAnimirano(zbir, dupli);
        } else {
          igrac.kazna--;
          showBootstrapAlert(`Nisi bacio dupli broj (${broj1}, ${broj2}). Preostalo poteza u zatvoru: ${igrac.kazna}.`);
          azurirajPrikaz();
          if (igrac.kazna <= 0) {
            igrac.uZatvoru = false;
            igrac.uzastopniDupli = 0;
            showBootstrapAlert("Odležao si kaznu i sada izlaziš iz zatvora.");
            sledeciIgrac();
          } else {
            sledeciIgrac();
          }
        }
      } else {
        showBootstrapAlert("Nevažeći izbor. Molim te, unesi 1, 2 ili 3.");
        baciKockice();
      }
      sacuvajStanje();
    });
    return;
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

  if (dupli) {
    igrac.uzastopniDupli++;
    if (igrac.uzastopniDupli >= 3) {
      showBootstrapAlert("Bacio si tri dupla zaredom! Ideš u zatvor!");
      igrac.uZatvoru = true;
      igrac.kazna = 3;
      igrac.uzastopniDupli = 0;
      setTimeout(() => {
        pomeriIgracaDoPolja(10, () => {
          igrac.pozicija = 10;
          azurirajPrikaz();
          sledeciIgrac();
        });
      }, 600);
      return;
    }
  } else {
    igrac.uzastopniDupli = 0;
  }

  setTimeout(() => {
    kockica1.classList.add('zaustavljena');
    kockica2.classList.add('zaustavljena');
  }, 500);

  setTimeout(() => {
    pomeriIgracaAnimirano(zbir, dupli);
  }, 600);
}
function baciKockiceNakonZatvora(shouldRollDice = false) {
    const igrac = figurice[trenutniIgrac];
    if (!igrac.uZatvoru && shouldRollDice) {
        bacanjeDozvoljeno = true;
        baciKockice();
    } else if (!igrac.uZatvoru && !shouldRollDice) {
        sledeciIgrac();
    } else {
        sledeciIgrac();
    }
}
document.getElementById('resetBtn').addEventListener('click',resetGame);
function pomeriIgracaAnimirano(koraci, dupli, callback) {
  const igrac = figurice[trenutniIgrac];
  let pomeranja = 0;

  const interval = setInterval(() => {
    document.querySelectorAll(`.figurica.igrac${igrac.id}`).forEach(el => el.remove());


    if (igrac.pozicija + 1 > ukupnoPolja - 1 && igrac.pozicija !== 0) {
      igrac.novac += 200;
      showBootstrapAlert("Prošao si Start i dobio 200$!");
    }

    igrac.pozicija = (igrac.pozicija + 1) % ukupnoPolja;
    const polje = polja[igrac.pozicija];
    const figuricaEl = document.createElement('div');
    figuricaEl.className = `figurica igrac${igrac.id}`;
    figuricaEl.innerText = ['🔴','🔵','🟢'][igrac.id - 1];
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

  if (index === 0) {
      if(!igrac.uZatvoru)
      {
           igrac.novac += 200;
        showBootstrapAlert("Prošao si Start i dobio 200$!");
      }
    }
  if (index === 30) {
    igrac.uZatvoru = true;
    igrac.kazna = 3;
    igrac.uzastopniDupli = 0;
    pomeriIgracaDoPolja(10, () => {
      igrac.pozicija = 10;
      showBootstrapAlert("Idi u zatvor! 3 poteza pauza.");
      azurirajPrikaz();
      sledeciIgrac();
    });
    return;
  }

  else  if (igrac.pozicija === 20) {
      if(porez!= 0) {
       showBootstrapAlert('Dobili ste sav porez!');
        igrac.novac += porez;
        porez = 0;
        azurirajPrikaz();
      }
      else
      {
        showBootstrapAlert('Trenutno nema poreza!');
      }
    }
  if ([2,22,36].includes(index)) {
    izvuciSansu(dupli);
    return;
  }
  if ([7, 17].includes(index)) {
    izvuciZajednicu(dupli);
    return;
  }

  if (porezi.includes(index)) {
    obradiPorez(index, dupli);
    return;
  }

  if (igrac.uZatvoru) {
    sledeciIgrac();
    return;
  }

  if (dupli) {
    if(igrac.uZatvoru!=true) {
      bacanjeDozvoljeno = true;
      showBootstrapAlert("Isti brojevi! Bacaš ponovo.");
    }
  }
  

  const vlasnikId = vlasnici[index];
  const cenaPolja = cenePolja[index];

  if (vlasnikId === null && cenaPolja !== null) {
    document.getElementById('akcije').style.display = 'block';
  } else if (vlasnikId !== null && vlasnikId !== igrac.id) {
    obradiRentu(index,dupli);
    return;
  } else if(vlasnikId !== null && vlasnikId == igrac.id){
    document.getElementById('akcije').style.display = 'block';
  }
  else{
    azurirajPrikaz();
  }
  sacuvajStanje()
}
function izvuciZajednicu(dupli) {
  const igrac = figurice[trenutniIgrac];
  const karta = zajednica[Math.floor(Math.random() * zajednica.length)];
  showBootstrapAlert("Zajednica: " + karta);

  if (karta.includes("Dobio si") || karta.includes("dobijaš") || karta.includes("Sakupljaš")) {
    const iznosMatch = karta.match(/\d+/);
    if (iznosMatch) {
      const iznos = parseInt(iznosMatch[0]);
      igrac.novac += iznos;
    }
  } else if (karta.includes("Plaćaš") || karta.includes("Plati")) {
    const iznosMatch = karta.match(/\d+/);
    if (iznosMatch) {
      const iznos = parseInt(iznosMatch[0]);

      if (karta.includes("Popravka kuće/hotela")) {
        let totalniTrosak = 0;
        igrac.posedi.forEach(posedIndex => {
          if (kuce[posedIndex] === 4) {
            totalniTrosak += 100;
          } else {
            totalniTrosak += kuce[posedIndex] * 25;
          }
        });
        if(totalniTrosak===0) {
          showBootstrapAlert(`Plaćaš 0$ za popravke.`);
        } else {
          showBootstrapAlert(`Plaćaš ${totalniTrosak}$ za popravke.`);
        }
        igrac.novac -= totalniTrosak;
        porez += totalniTrosak;
      } else if (karta.includes("Tvoj rođendan")) {
      }
      else {
        igrac.novac -= iznos;
        porez += iznos;
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
        }
      }
    });
  }
  else if (karta.includes("zatvor")) {
    igrac.uZatvoru = true;
    igrac.kazna = 3;
    igrac.uzastopniDupli = 0;
    pomeriIgracaDoPolja(10, () => {
      igrac.pozicija = 10;
      azurirajPrikaz();
      sledeciIgrac();
    });
    return;
  } else if (karta.includes("Idi direktno na Start")) {
    pomeriIgracaDoPolja(0, () => {
      igrac.novac += 200;
      showBootstrapAlert("Idi direktno na Start. Dobio si 200$!");
      azurirajPrikaz();
      if (!dupli) {
          sledeciIgrac();
      } else {
          bacanjeDozvoljeno = true;
          document.getElementById('akcije').style.display = 'block';
          showBootstrapAlert("Isti brojevi! Bacaš ponovo.");
      }
      sacuvajStanje();
    });
    return;
  }

  azurirajPrikaz();
  if (!dupli) {
    sledeciIgrac();
  } else {
    bacanjeDozvoljeno = true;
    document.getElementById('akcije').style.display = 'block';
  }
  sacuvajStanje();
}

function izvuciSansu(dupli) {
  const igrac = figurice[trenutniIgrac];
  const karta = sansa[Math.floor(Math.random() * sansa.length)];
  showBootstrapAlert("Šansa: " + karta);

  if (karta.includes("Karta za izlazak iz zatvora")) {
      igrac.imaKartuZaIzlazIzZatvora = true;
      showBootstrapAlert("Dobio si kartu za izlazak iz zatvora!");
      azurirajPrikaz();
  } else if (karta.includes("Dobio")) {
    igrac.novac += 200;
    azurirajPrikaz();
  } else if (karta.includes("Plati")) {
    igrac.novac -= 100;
    porez += 100;
    azurirajPrikaz();
  }
  else if (karta.includes("zatvor")) {
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
      if(!dupli)
      {
        sledeciIgrac();
      }
      
    });
    return;
  }

  if (!dupli) {
    sledeciIgrac();
  } else {
    bacanjeDozvoljeno = true;
    document.getElementById('akcije').style.display = 'block';
  }
  sacuvajStanje();
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

function obradiPorez(index, dupli) { 
  const igrac = figurice[trenutniIgrac];
  let iznosPoreza = 0;

  iznosPoreza = 150;

  igrac.novac -= iznosPoreza;
  showBootstrapAlert(`Porez! Platio si ${iznosPoreza}$.`);
  porez += iznosPoreza;
  azurirajPrikaz();

  if (!dupli) {
     sledeciIgrac();
  }

  sacuvajStanje();
}

async function obradiRentu(index, dupli) {
  const igrac = figurice[trenutniIgrac];
  const vlasnikId = vlasnici[index];

  if (vlasnikId !== null && vlasnikId !== igrac.id) {
    const vlasnik = figurice[vlasnikId - 1];

    if (hipoteke[index]) {
      showBootstrapAlert(`Polje ${imenaPolja[index]} je pod hipotekom. Nema rente za plaćanje.`);
      azurirajPrikaz();
      if (!dupli) {
          sledeciIgrac();
      }
      sacuvajStanje();
      return;
    }

    let renta = 0;

    if (zeleznice.includes(index)) {
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
        case 5:
          renta = 300;
          break;
      }
      if (index === 33) {
          renta = Math.round(renta * 1.2);
          showBootstrapAlert(`Stao si na ${imenaPolja[index]}. Vlasnik ima ${brojZeleznica} železnic(a/e) uključujući Aerodrom. Renta je ${renta}$ (sa 1.2x bonusom za Aerodrom).`);
      } else {
          showBootstrapAlert(`Stao si na ${imenaPolja[index]}. Vlasnik ima ${brojZeleznica} železnic(a/e). Renta je ${renta}$.`);
      }
    } else if (komunalije.includes(index)) {
      const brojKomunalija = vlasnik.posedi.filter(p => komunalije.includes(p)).length;
      const zbirKockica = parseInt(kockica1.innerText) + parseInt(kockica2.innerText);

      if (brojKomunalija === 1) {
        renta = zbirKockica * 4;
      } else if (brojKomunalija === 2) {
        renta = zbirKockica * 10;
      }
      showBootstrapAlert(`Stao si na ${imenaPolja[index]}. Vlasnik ima ${brojKomunalija} komunalij(a/e). Renta je ${renta}$ (Zbir kockica: ${zbirKockica}).`);
    } else if (ceneRente[index]) {
      const brojKuca = kuce[index];
      renta = ceneRente[index][brojKuca];

      if (igracImaSvaPoljaGrupe(index, vlasnikId) && brojKuca === 0) {
        renta *= 2;
        showBootstrapAlert(`Vlasnik ${vlasnikId} ima monopol na ovu boju! Osnovna renta je udvostručena.`);
      }
      showBootstrapAlert(`Stao si na ${imenaPolja[index]}. Renta je ${renta}$.`);

    } else {
        azurirajPrikaz();
        if (!dupli) {
            sledeciIgrac();
        }
        sacuvajStanje();
        return;
    }

    if (igrac.novac >= renta) {
      igrac.novac -= renta;
      vlasnik.novac += renta;
      showBootstrapAlert(`Platio si rentu od ${renta}$ igraču ${vlasnikId} za polje ${imenaPolja[index]}.`);
      azurirajPrikaz();
      if (!dupli) {
          sledeciIgrac();
      }
    } else {
      const izbor = await bootstrapPrompt(
        `Nemaš dovoljno novca da platiš rentu od ${renta}$!\n` +
        `Tvoj novac: ${igrac.novac}$.\n` +
        `Izaberi akciju:\n` +
        `1. Pokušaj da pregovaraš (ponudi imovinu)\n` +
        `2. Prodaj imovinu banci\n` +
        `3. Bankrotiraj`,
        "1"
      );

      if (izbor === "1") {
        pokreniPregovore(igrac, vlasnikId, renta, index, dupli);
      } else if (izbor === "2") {
        pokreniProdajuImovine(igrac, renta, () => obradiRentu(index, dupli));
      } else if (izbor === "3") {
        igrac.novac = -1;
        showBootstrapAlert(`Igrač ${igrac.id} je bankrotirao!`);
        sledeciIgrac();
      } else {
        showBootstrapAlert("Nevažeći izbor. Molim te, unesi 1, 2 ili 3.");
        obradiRentu(index, dupli);
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
    const prihvatio = showBootstrapAlert(
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
    showBootstrapAlertt("Nemaš imovine za prodaju. Bankrotiraš!");
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
      showBootstrapAlert(`Hipotekovao si polje ${poljeIndex} za ${hipotekeCene[poljeIndex]}$`);
      azurirajPrikaz();
      
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
      showBootstrapAlertt("Nevažeći izbor polja.");
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
        info.querySelector('.polja').innerHTML = igrac.posedi
          .map(index => {
            let kuciceInfo = '';
            if (kuce[index] > 0) {
              kuciceInfo = ` (${kuce[index]}x🏠)`;
              if (kuce[index] === 4) {
                kuciceInfo = ` (🏨)`;
              }
            }
            return `${imenaPolja[index]}${kuciceInfo}`;
          })
          .join(', ');
      }
    }
  });

  polja.forEach((polje, index) => {
    polje.classList.remove('vlasnik1', 'vlasnik2', 'vlasnik3', 'vlasnik4');
    for (let i = 1; i <= 6; i++) {
        polje.classList.remove(`vlasnik${i}`);
    }
    if (vlasnici[index]) polje.classList.add(`vlasnik${vlasnici[index]}`);
    if (hipoteke[index]) polje.classList.add('hipotekovano');
    prikaziKucu(index);
  });

  const porezInfoEl = document.getElementById('porez-info');
  if (porezInfoEl) {
    porezInfoEl.innerText = `Ukupan Porez: ${porez}$`;
  }

  sacuvajStanje();
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
      porez += cenaZaOdglavljivanje;
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
    const dupli = parseInt(kockica1.innerText) === parseInt(kockica2.innerText);
    if (!dupli) {
      return;
    }
  }
  sacuvajStanje()
});

document.getElementById('preskoci-kupovinu').addEventListener('click', () => {
  if(bacanjeDozvoljeno) {
    showBootstrapAlert('Prvo odigraj potez!');
  } else {
    document.getElementById('akcije').style.display = 'none';
    const dupli = kockica1.innerText === kockica2.innerText;
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
  const cenaIzgradnje = 150;

  if (
    vlasnici[index] === igrac.id &&
    kuce[index] < 4 &&
    igrac.novac >= cenaIzgradnje &&
    igracImaSvaPoljaGrupe(index, igrac.id)
  ) {
    const grupa = bojePolja.find(g => g.includes(index));
    const minKuca = Math.min(...grupa.map(i => kuce[i]));
    if (kuce[index] > minKuca) {
      showBootstrapAlert("Moraš ravnomerno graditi kuće unutar iste grupe.");
      return;
    }

    kuce[index]++;
    igrac.novac -= cenaIzgradnje;
    azurirajPrikaz();

    const dupli = parseInt(kockica1.innerText) === parseInt(kockica2.innerText);
    if (!dupli) {
      showBootstrapAlert("Izgradjeno!");
    }
  } else {
    showBootstrapAlert("Ne možeš graditi kuću na ovom polju!");
  }
  sacuvajStanje()
});

document.getElementById('hipoteka').addEventListener('click', hipotekaPolje);
document.getElementById('odglavi').addEventListener('click', odglaviPolje);
document.getElementById('dogovor-btn').addEventListener('click', async () => {
    const igrac = figurice[trenutniIgrac];
    const aktivniIgraciZaDogovor = figurice.filter(i => i.aktivan && i.id !== igrac.id);

    if (aktivniIgraciZaDogovor.length === 0) {
        showBootstrapAlert("Nema drugih aktivnih igrača za dogovor.");
        return;
    }

    let igraciList = aktivniIgraciZaDogovor.map(p => `${p.id} (${['🔴','🔵','🟢','🟡'][p.id - 1]})`).join(', ');

    let primalacIdInput = await bootstrapPrompt(`Igrač ${igrac.id}, sa kojim igračem želiš da praviš dogovor? (Dostupni igrači: ${igraciList})`, "");

    let primalacId = parseInt(primalacIdInput);
    const primalac = figurice.find(p => p.id === primalacId);

    if (!primalac || !primalac.aktivan || primalac.id === igrac.id) {
        showBootstrapAlert("Nevažeći ID igrača ili igrač nije aktivan.");
        return;
    }

    await kreirajPonudu(igrac, primalac);
});

async function kreirajPonudu(ponudjac, primalac) {
  let ponudaNovacInput = await bootstrapPrompt(`Igrač ${ponudjac.id}, koliko novca nudiš igraču ${primalac.id}? (Trenutno imaš: ${ponudjac.novac}$)`, "0");

  let ponudaNovac = parseInt(ponudaNovacInput);

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
  let trazeniNovac = parseInt(trazeniNovacInput);

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

  // Zamenjeno confirm sa bootstrapPrompt
  let ponudaKartaIzlazakOdgovor = await bootstrapPrompt(
    `Igrač ${ponudjac.id}, da li nudiš kartu za izlazak iz zatvora? (Imaš: ${ponudjac.imaKartuZaIzlazIzZatvora ? 'DA' : 'NE'})\nUnesi 'da' ili 'ne'.`,
    "ne" // Podrazumevana vrednost
  );
  let ponudaKartaIzlazak = (ponudaKartaIzlazakOdgovor.toLowerCase() === 'da');

  let trazenaKartaIzlazakOdgovor = await bootstrapPrompt(
    `Igrač ${ponudjac.id}, da li tražiš kartu za izlazak iz zatvora od igrača ${primalac.id}? (On ima: ${primalac.imaKartuZaIzlazIzZatvora ? 'DA' : 'NE'})\nUnesi 'da' ili 'ne'.`,
    "ne" // Podrazumevana vrednost
  );
  let trazenaKartaIzlazak = (trazenaKartaIzlazakOdgovor.toLowerCase() === 'da');

  // Prikaz ponude primaocu
  prikaziPonudu(ponudjac, primalac, ponudaNovac, ponudaPolja, trazeniNovac, trazeniPolja, ponudaKartaIzlazak, trazenaKartaIzlazak);
}
function prikaziPonudu(ponudjac, primalac, ponudaNovac, ponudaPolja, trazeniNovac, trazeniPolja, ponudaKartaIzlazak, trazenaKartaIzlazak) {
    let poruka = `Igrač ${primalac.id}, igrač ${ponudjac.id} ti nudi dogovor:\n\n`;

    if (ponudaNovac > 0) {
        poruka += `- Nudi ti ${ponudaNovac}$ od svog novca.\n`;
    }
    if (ponudaPolja.length > 0) {
        poruka += `- Nudi ti sledeća polja: ${ponudaPolja.map(p => `${p} (${imenaPolja[p]})`).join(', ')}.\n`;
    }
    if (ponudaKartaIzlazak) {
        poruka += `- Nudi ti kartu za izlazak iz zatvora.\n`;
    }

    if (trazeniNovac > 0) {
        poruka += `- Traži od tebe ${trazeniNovac}$ tvog novca.\n`;
    }
    if (trazeniPolja.length > 0) {
        poruka += `- Traži od tebe sledeća polja: ${trazeniPolja.map(p => `${p} (${imenaPolja[p]})`).join(', ')}.\n`;
    }
    if (trazenaKartaIzlazak) {
        poruka += `- Traži od tebe kartu za izlazak iz zatvora.\n`;
    }

    poruka += `\nDa li prihvataš ovu ponudu?`;

    showBootstrapConfirm(poruka, (rezultat) => {
        if (rezultat) {
            obradiPrihvacenuPonudu(ponudjac, primalac, ponudaNovac, ponudaPolja, trazeniNovac, trazeniPolja, ponudaKartaIzlazak, trazenaKartaIzlazak);
        } else {
            showBootstrapAlert(`Igrač ${primalac.id} je odbio ponudu.`, true);
        }
    });
}
function obradiPrihvacenuPonudu(ponudjac, primalac, ponudaNovac, ponudaPolja, trazeniNovac, trazeniPolja, ponudaKartaIzlazak, trazenaKartaIzlazak) {
    // Provera da li primalac ima dovoljno novca za traženu sumu
    if (primalac.novac < trazeniNovac) {
        showBootstrapAlert(`Igrač ${primalac.id} nema dovoljno novca da plati ${trazeniNovac}$ koje traži igrač ${ponudjac.id}. Ponuda poništena.`, true);
        return;
    }

    // Provera da li ponudjac ima dovoljno novca za ponuđenu sumu (ovo bi trebalo da je već provereno, ali dobra praksa)
    if (ponudjac.novac < ponudaNovac) {
        showBootstrapAlert(`Igrač ${ponudjac.id} nema dovoljno novca da ponudi ${ponudaNovac}$ igraču ${primalac.id}. Ponuda poništena.`, true);
        return;
    }

    // Provera da li primalac zaista poseduje polja koja se traže
    for (const poljeIndex of trazeniPolja) {
        if (!primalac.posedi.includes(poljeIndex)) {
            showBootstrapAlert(`Igrač ${primalac.id} ne poseduje polje ${imenaPolja[poljeIndex]} koje je traženo. Ponuda poništena.`, true);
            return;
        }
    }

    // Provera da li ponudjac zaista poseduje polja koja se nude
    for (const poljeIndex of ponudaPolja) {
        if (!ponudjac.posedi.includes(poljeIndex)) {
            showBootstrapAlert(`Igrač ${ponudjac.id} ne poseduje polje ${imenaPolja[poljeIndex]} koje je ponuđeno. Ponuda poništena.`, true);
            return;
        }
    }

    // Provera za karte za izlazak iz zatvora
    if (ponudaKartaIzlazak && !ponudjac.imaKartuZaIzlazIzZatvora) {
        showBootstrapAlert(`Igrač ${ponudjac.id} ne poseduje kartu za izlazak iz zatvora koju je ponudio. Ponuda poništena.`, true);
        return;
    }
    if (trazenaKartaIzlazak && !primalac.imaKartuZaIzlazIzZatvora) {
        showBootstrapAlert(`Igrač ${primalac.id} ne poseduje kartu za izlazak iz zatvora koju je tražio igrač ${ponudjac.id}. Ponuda poništena.`, true);
        return;
    }


    // 1. Razmena novca
    ponudjac.novac -= ponudaNovac;
    primalac.novac += ponudaNovac;

    ponudjac.novac += trazeniNovac;
    primalac.novac -= trazeniNovac;

    // 2. Razmena polja
    // Ponudjac daje polja primaocu
    ponudaPolja.forEach(poljeIndex => {
        // Ukloni polje iz poseda ponudjaca
        ponudjac.posedi = ponudjac.posedi.filter(p => p !== poljeIndex);
        // Dodaj polje u posed primaoca
        primalac.posedi.push(poljeIndex);
        // Ažuriraj vlasnika polja
        vlasnici[poljeIndex] = primalac.id;
        // Resetuj hipoteke i kuće ako su bile na polju
        hipoteke[poljeIndex] = false; // Polja se ne prenose pod hipotekom
        kuce[poljeIndex] = 0; // Kuće se moraju prodati pre prenošenja
    });

    // Primalac daje polja ponudjacu
    trazeniPolja.forEach(poljeIndex => {
        // Ukloni polje iz poseda primaoca
        primalac.posedi = primalac.posedi.filter(p => p !== poljeIndex);
        // Dodaj polje u posed ponudjaca
        ponudjac.posedi.push(poljeIndex);
        // Ažuriraj vlasnika polja
        vlasnici[poljeIndex] = ponudjac.id;
        // Resetuj hipoteke i kuće ako su bile na polju
        hipoteke[poljeIndex] = false;
        kuce[poljeIndex] = 0;
    });

    // 3. Razmena karata za izlazak iz zatvora
    if (ponudaKartaIzlazak) {
        ponudjac.imaKartuZaIzlazIzZatvora = false;
        primalac.imaKartuZaIzlazIzZatvora = true;
    }
    if (trazenaKartaIzlazak) {
        primalac.imaKartuZaIzlazIzZatvora = false;
        ponudjac.imaKartuZaIzlazIzZatvora = true;
    }

    showBootstrapAlert(`Dogovor uspešno sklopljen između igrača ${ponudjac.id} i ${primalac.id}!`);
    azurirajPrikaz();
    sacuvajStanje();
}
function sledeciIgrac() {
  document.getElementById('akcije').style.display = 'none';
  const igrac = figurice[trenutniIgrac];
  
  if (igrac.novac < 0) {
    showBootstrapAlert(`Igrač ${igrac.id} je bankrotirao!`);
    
    const poljaZaProdaju = [...igrac.posedi];
    pokreniAukciju(poljaZaProdaju);
    
    igrac.aktivan = false;
    document.querySelectorAll(`.figurica.igrac${igrac.id}`).forEach(el => el.remove());
  }

  const aktivni = figurice.filter(i => i.aktivan);
  if (aktivni.length === 1) {
    const pobednik = aktivni[0];
    const pobednickiPoeni = pobednik.novac + pobednik.posedi.reduce((sum, index) => {
        let vrednostPolja = cenePolja[index] || 0;
        if (kuce[index] > 0) {
            vrednostPolja += kuce[index] * 150;
        }
        if (hipoteke[index]) {
            vrednostPolja = hipotekeCene[index] || (cenePolja[index] / 2);
        }
        return sum + vrednostPolja;
    }, 0);

    const gameDate = new Date().toLocaleDateString('sr-RS');

    const newResult = {
    player: `Igrač ${pobednik.id}`,
    date: gameDate,
    score: pobednickiPoeni,
    gameType: "4 igrača" 
};

    
    let allResults = JSON.parse(localStorage.getItem('gameResults')) || [];
    allResults.push(newResult);
    localStorage.setItem('gameResults', JSON.stringify(allResults));

    showBootstrapAlert(
  `Igra je završena! Pobednik je ${newResult.player} sa ${newResult.score}$ 🎉`
);

// Sačekaj 3 sekunde, pa idi na glavni meni
setTimeout(() => {
  window.location.href = '../../glavni-meni.html';
}, 3000);



    return;
  }

  do {
    trenutniIgrac = (trenutniIgrac + 1) % figurice.length;
  } while (!figurice[trenutniIgrac].aktivan);

  naPotezu.innerText = `Na potezu: Igrač ${figurice[trenutniIgrac].id} (${['🔴','🔵','🟢','🟡'][trenutniIgrac]})`;
  bacanjeDozvoljeno = true;
  kockica1.classList.remove('zaustavljena');
  kockica2.classList.remove('zaustavljena');
  sacuvajStanje();
}
async function pokreniAukciju(poljaZaProdaju) {
  const bankrotiraniIgracId = figurice[trenutniIgrac].id;
  const aktivniIgraciZaAukciju = figurice.filter(i => i.aktivan && i.id !== bankrotiraniIgracId);

  if (aktivniIgraciZaAukciju.length === 0 || poljaZaProdaju.length === 0) {
    azurirajPrikaz();
    sledeciIgrac();
    return;
  }

  const poljeIndex = poljaZaProdaju[0];
  if (poljeIndex === undefined || poljeIndex === null) {
      poljaZaProdaju.shift();
      if (poljaZaProdaju.length > 0) {
          pokreniAukciju(poljaZaProdaju);
      } else {
          azurirajPrikaz();
          sledeciIgrac();
      }
      return;
  }

  showBootstrapAlert(`Počinje aukcija za polje ${imenaPolja[poljeIndex]} (Polje ${poljeIndex})!`);

  let trenutnaPonuda = { igracId: null, iznos: 0 };
  let igraciKojiSuOdustali = new Set();
  let indeksTrenutnogPonudjaca = 0;
  let poslednjaPonudaKrug = -1; // Pamti u kom krugu je data poslednja ponuda
  let krugAukcije = 0; // Brojač krugova aukcije

  async function aukcijskiKrug() {
    krugAukcije++; // Povećaj broj kruga sa svakim pozivom aukcijskiKrug()

    let preostaliPonudjaci = aktivniIgraciZaAukciju.filter(p => !igraciKojiSuOdustali.has(p.id));

    // Uslov za završetak aukcije
    if (preostaliPonudjaci.length === 1 && trenutnaPonuda.igracId === preostaliPonudjaci[0].id && krugAukcije > poslednjaPonudaKrug + (aktivniIgraciZaAukciju.length - igraciKojiSuOdustali.size)) {
        // Aukcija se završava jer je preostao samo jedan igrač koji je dao poslednju ponudu i prošao je ceo krug
        const pobednik = preostaliPonudjaci[0];
        if (pobednik.novac >= trenutnaPonuda.iznos) {
            pobednik.novac -= trenutnaPonuda.iznos;
            pobednik.posedi.push(poljeIndex);
            vlasnici[poljeIndex] = pobednik.id;
            showBootstrapAlert(`Igrač ${pobednik.id} osvojio polje ${imenaPolja[poljeIndex]} za ${trenutnaPonuda.iznos}$`);
        } else {
            showBootstrapAlert(`Igrač ${pobednik.id} nema dovoljno novca za ponudu! Polje ${imenaPolja[poljeIndex]} ostaje neprodato.`);
            vlasnici[poljeIndex] = null;
            kuce[poljeIndex] = 0;
            hipoteke[poljeIndex] = false;
        }
        
        // Resetuj stanje za sledeću aukciju
        igraciKojiSuOdustali.clear();
        poljaZaProdaju.shift(); // Ukloni prodato/neprodato polje
        if (poljaZaProdaju.length > 0) {
            pokreniAukciju(poljaZaProdaju); // Pokreni aukciju za sledeće polje
        } else {
            azurirajPrikaz();
            sledeciIgrac();
        }
        return;
    } else if (preostaliPonudjaci.length === 0) { // Svi su odustali
        if (trenutnaPonuda.igracId !== null) {
            // Neko je dao poslednju ponudu i svi ostali su odustali
            const pobednik = figurice.find(i => i.id === trenutnaPonuda.igracId);
            if (pobednik.novac >= trenutnaPonuda.iznos) {
                pobednik.novac -= trenutnaPonuda.iznos;
                pobednik.posedi.push(poljeIndex);
                vlasnici[poljeIndex] = pobednik.id;
                showBootstrapAlert(`Igrač ${pobednik.id} osvojio polje ${imenaPolja[poljeIndex]} za ${trenutnaPonuda.iznos}$`);
            } else {
                showBootstrapAlert(`Igrač ${pobednik.id} nema dovoljno novca za ponudu! Polje ${imenaPolja[poljeIndex]} ostaje neprodato.`);
                vlasnici[poljeIndex] = null;
                kuce[poljeIndex] = 0;
                hipoteke[poljeIndex] = false;
            }
        } else {
            // Niko nije ni ponudio
            showBootstrapAlert(`Niko nije osvojio polje ${imenaPolja[poljeIndex]}.`);
            vlasnici[poljeIndex] = null;
            kuce[poljeIndex] = 0;
            hipoteke[poljeIndex] = false;
        }
        igraciKojiSuOdustali.clear();
        poljaZaProdaju.shift();
        if (poljaZaProdaju.length > 0) {
            pokreniAukciju(poljaZaProdaju);
        } else {
            azurirajPrikaz();
            sledeciIgrac();
        }
        return;
    }

    // Pronađi sledećeg igrača koji je na redu za licitiranje i nije odustao
    let sledeciPonudjac;
    let originalniIndeksTrenutnogPonudjaca = indeksTrenutnogPonudjaca;
    
    // Prolazimo kroz aktivne igrače dok ne nađemo sledećeg koji nije odustao
    do {
      sledeciPonudjac = aktivniIgraciZaAukciju[indeksTrenutnogPonudjaca];
      indeksTrenutnogPonudjaca = (indeksTrenutnogPonudjaca + 1) % aktivniIgraciZaAukciju.length;

      // Ako smo se vratili na početni indeks, a i dalje nismo našli aktivnog ponuđača (svi ostali su odustali)
      if (indeksTrenutnogPonudjaca === originalniIndeksTrenutnogPonudjaca && igraciKojiSuOdustali.size === aktivniIgraciZaAukciju.length) {
          // Ovo se dešava ako su svi odustali i nikome se ne može dati ponuda
          if (trenutnaPonuda.igracId !== null) {
              const pobednik = figurice.find(i => i.id === trenutnaPonuda.igracId);
              if (pobednik.novac >= trenutnaPonuda.iznos) {
                  pobednik.novac -= trenutnaPonuda.iznos;
                  pobednik.posedi.push(poljeIndex);
                  vlasnici[poljeIndex] = pobednik.id;
                  showBootstrapAlert(`Igrač ${pobednik.id} osvojio polje ${imenaPolja[poljeIndex]} za ${trenutnaPonuda.iznos}$`);
              } else {
                  showBootstrapAlert(`Igrač ${pobednik.id} nema dovoljno novca za ponudu! Polje ${imenaPolja[poljeIndex]} ostaje neprodato.`);
                  vlasnici[poljeIndex] = null;
                  kuce[poljeIndex] = 0;
                  hipoteke[poljeIndex] = false;
              }
          } else {
              showBootstrapAlert(`Niko nije osvojio polje ${imenaPolja[poljeIndex]}.`);
              vlasnici[poljeIndex] = null;
              kuce[poljeIndex] = 0;
              hipoteke[poljeIndex] = false;
          }
          igraciKojiSuOdustali.clear();
          poljaZaProdaju.shift();
          if (poljaZaProdaju.length > 0) {
              pokreniAukciju(poljaZaProdaju);
          } else {
              azurirajPrikaz();
              sledeciIgrac();
          }
          return;
      }
    } while (igraciKojiSuOdustali.has(sledeciPonudjac.id));

    const ponuda = await bootstrapPrompt(
      `Aukcija za polje ${imenaPolja[poljeIndex]} (Polje ${poljeIndex})\n` +
      `Trenutna ponuda: ${trenutnaPonuda.iznos}$ od igrača ${trenutnaPonuda.igracId || 'niko'}\n` +
      `Igrač ${sledeciPonudjac.id}, tvoj novac: ${sledeciPonudjac.novac}$\n` +
      `Unesi svoju ponudu (min ${trenutnaPonuda.iznos + 10}$) ili 0 za odustajanje:`,
      trenutnaPonuda.iznos + 10
    );

    const ponudaBroj = parseInt(ponuda);
    if (!isNaN(ponudaBroj)) {
      if (ponudaBroj === 0) {
        igraciKojiSuOdustali.add(sledeciPonudjac.id);
        showBootstrapAlert(`Igrač ${sledeciPonudjac.id} je odustao od aukcije.`);
      } else if (ponudaBroj > trenutnaPonuda.iznos && ponudaBroj <= sledeciPonudjac.novac) {
        trenutnaPonuda = { igracId: sledeciPonudjac.id, iznos: ponudaBroj };
        poslednjaPonudaKrug = krugAukcije; // Zabeleži krug kada je data poslednja ponuda
        showBootstrapAlert(`Igrač ${sledeciPonudjac.id} je ponudio ${ponudaBroj}$.`);
      } else {
        showBootstrapAlert("Nevažeća ponuda! Ponuda mora biti veća od trenutne i ne sme premašiti tvoj novac.");
        // Ako je nevažeća ponuda, dajemo istom igraču ponovo šansu
        indeksTrenutnogPonudjaca = (indeksTrenutnogPonudjaca - 1 + aktivniIgraciZaAukciju.length) % aktivniIgraciZaAukciju.length;
      }
    } else {
        showBootstrapAlert("Nevažeći unos. Molimo unesite broj.");
        // Ako je nevažeći unos, dajemo istom igraču ponovo šansu
        indeksTrenutnogPonudjaca = (indeksTrenutnogPonudjaca - 1 + aktivniIgraciZaAukciju.length) % aktivniIgraciZaAukciju.length;
    }

    // Provera da li je aukcija zaista završena:
    // Ako je preostao samo jedan ponuđač, i taj ponuđač je dao poslednju ponudu, i prošao je ceo krug od te ponude
    if (preostaliPonudjaci.length === 1 && trenutnaPonuda.igracId === preostaliPonudjaci[0].id && krugAukcije > poslednjaPonudaKrug + (aktivniIgraciZaAukciju.length - igraciKojiSuOdustali.size)) {
         // Opet uslov za završetak, jer se može desiti da se ispuni tek nakon ponude
        const pobednik = preostaliPonudjaci[0];
        if (pobednik.novac >= trenutnaPonuda.iznos) {
            pobednik.novac -= trenutnaPonuda.iznos;
            pobednik.posedi.push(poljeIndex);
            vlasnici[poljeIndex] = pobednik.id;
            showBootstrapAlert(`Igrač ${pobednik.id} osvojio polje ${imenaPolja[poljeIndex]} za ${trenutnaPonuda.iznos}$`);
        } else {
            showBootstrapAlert(`Igrač ${pobednik.id} nema dovoljno novca za ponudu! Polje ${imenaPolja[poljeIndex]} ostaje neprodato.`);
            vlasnici[poljeIndex] = null;
            kuce[poljeIndex] = 0;
            hipoteke[poljeIndex] = false;
        }
        igraciKojiSuOdustali.clear();
        poljaZaProdaju.shift();
        if (poljaZaProdaju.length > 0) {
            pokreniAukciju(poljaZaProdaju);
        } else {
            azurirajPrikaz();
            sledeciIgrac();
        }
        return;
    }

    // Nastavi sledeći krug aukcije
    aukcijskiKrug();
  }

  // Pokreni prvi krug aukcije
  aukcijskiKrug();
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
  localStorage.setItem(`monopolyStanje-${brojIgraca}igraca`, JSON.stringify(stanje));
}
function ucitajStanje() {
  const sacuvano = localStorage.getItem(`monopolyStanje-${brojIgraca}igraca`);
  if (sacuvano) {
    const stanje = JSON.parse(sacuvano);

    figurice.length = 0;
    for (let i = 0; i < brojIgraca; i++) {
        figurice.push({
            id: i + 1,
            pozicija: 0,
            novac: 1500,
            posedi: [],
            uZatvoru: false,
            kazna: 0,
            imaKartuZaIzlazIzZatvora: false,
            aktivan: true
        });
    }
    for (let i = 0; i < stanje.figurice.length && i < figurice.length; i++) {
      Object.assign(figurice[i], stanje.figurice[i]);
    }
    for (let i = stanje.figurice.length; i < figurice.length; i++) {
        figurice[i].aktivan = false;
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
    const ikonice = ['🔴','🔵','🟢'];
    naPotezu.innerText = `Na potezu: Igrač ${figurice[trenutniIgrac].id} (${ikonice[trenutniIgrac]})`;
  } else {
    figurice.length = 0;
    for (let i = 1; i <= brojIgraca; i++) {
        figurice.push({
            id: i,
            pozicija: 0,
            novac: 1500,
            posedi: [],
            uZatvoru: false,
            kazna: 0,
            imaKartuZaIzlazIzZatvora: false,
            aktivan: true
        });
    }
    postaviPocetneFigurice();
    azurirajPrikaz();
    const ikonice = ['🔴','🔵','🟢'];
    naPotezu.innerText = `Na potezu: Igrač ${figurice[trenutniIgrac].id} (${ikonice[trenutniIgrac]})`;
  }
}
function resetGame() {
  showBootstrapConfirm(
  "Da li ste sigurni da želite da resetujete celu igru? Svi podaci će biti izgubljeni.",
  (confirmed) => {
    if (confirmed) {
       figurice.length = 0;
       for (let i = 1; i <= brojIgraca; i++) {
          figurice.push({
            id: i,
            pozicija: 0,
            novac: 1500,
            posedi: [],
            uZatvoru: false,
            kazna: 0,
            imaKartuZaIzlazIzZatvora: false,
            aktivan: true,
            uzastopniDupli: 0
          });
       }

       trenutniIgrac = 0;
       for (let i = 0; i < ukupnoPolja; i++) {
         vlasnici[i] = null;
         kuce[i] = 0;
         hipoteke[i] = false;
       }
       porez = 0;
       bacanjeDozvoljeno = true;

       document.querySelectorAll('.figurica').forEach(el => el.remove());
       postaviPocetneFigurice();
       azurirajPrikaz();
       const ikonice = ['🔴','🔵','🟢'];
       naPotezu.innerText = `Na potezu: Igrač ${figurice[trenutniIgrac].id} (${ikonice[trenutniIgrac]})`;
       document.getElementById('akcije').style.display = 'none';

       localStorage.removeItem(`monopolyStanje-${brojIgraca}igraca`);
       showBootstrapAlert("Igra je resetovana!");
    }
  });
}