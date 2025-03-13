// TEXT ANIMACIJA

const text = document.querySelector('.pumpaj-text');
const textTl = gsap.timeline();
const layer = document.querySelector('.layer');

// FUNKICJA KOJA MENJA WIDTH U TIMELINE-U KADA SE PROMENI VELICINA EKRANA

const updateTimeline = () => {
  textTl.kill();
  textTl
    .to(
      layer,
      {
        opacity: 1,
        duration: 0.5,
      },
      '<'
    )
    .to(
      '.exp',
      {
        opacity: 1,
        duration: 1,
      },
      '<'
    )
    .to(
      text,
      {
        display: 'flex',
      },
      '<'
    )
    .fromTo(
      text,
      {
        bottom: '50px',
        fontSize: 50,
        duration: 0.5,
      },
      {
        fontSize: width,
        duration: 0.5,
        bottom: '+=32%',
      },
      '<'
    );
  textTl.pause();
};

let width = window.innerWidth * 0.11;
updateTimeline();

const sipka = document.querySelector('.pozadi');
const bar = document.querySelector('.bar');
const procenatText = document.querySelector('.procenat');

let height = sipka.clientHeight;
console.log(height);

Draggable.create(sipka, {
  type: 'y',
  bounds: { minY: 10, maxY: -(height * 0.7) },
});

let offsetStart = sipka.getBoundingClientRect().bottom + 10;
console.log(offsetStart.bottom);

let over = false;
let old;
let barValue = 0;

// RESPONSIVE

addEventListener('resize', () => {
  Draggable.get(sipka).kill();

  //VRATI SIPKU NA POCETAK ZBOG OFFSETA
  gsap.to(sipka, {
    y: '0',
    duration: 0,
  });

  width = window.innerWidth * 0.11;
  updateTimeline();
  console.log('WIDTH:' + width);
  height = sipka.clientHeight;
  offsetStart = sipka.getBoundingClientRect().bottom + 10;

  Draggable.create(sipka, {
    type: 'y',
    bounds: { minY: 10, maxY: -(height * 0.7) },
  });
  old = offsetStart;
  console.log(height + ' ' + offsetStart);
});

// IGRICIFIKACIJA
const coinCounter = document.querySelector('.coin-count');
let coinCount = 0;

// SHOP
const shopOpenButton = document.querySelector('.shop-button');
const shopCloseButton = document.querySelector('.close-button');
const shopContainer = document.querySelector('.container');
const contentSection = document.querySelector('section');
const pump = document.querySelector('.napred');

// POPUP HANDLE
shopOpenButton.addEventListener('click', () => {
  shopContainer.style.display = 'grid';
});

shopCloseButton.addEventListener('click', () => {
  shopContainer.style.display = 'none';
});

// SKINOVI
let skins = [
  { naziv: 'No Skin', kupljen: 'true' },
  { naziv: 'Plavi', kupljen: 'false' },
  { naziv: 'Petar Jeremic', kupljen: 'false' },
  { naziv: 'Stiker', kupljen: 'false' },
];

let skin = 'normal.svg';
const div = document.createElement('div');
div.className = 'skin-container';

function changeSkin() {
  console.log(this);
  pump.src = `images/skins/${this.dataset.naziv
    .replace(' ', '-')
    .toLowerCase()}.svg`;
}

for (const skin of skins) {
  const p = document.createElement('p');
  p.innerHTML = skin.naziv;

  const skinImg = document.createElement('div');

  const skinDiv = document.createElement('div');
  skinDiv.addEventListener('click', changeSkin);
  skinDiv.appendChild(skinImg);
  skinDiv.appendChild(p);
  skinDiv.dataset.naziv = skin.naziv;

  div.appendChild(skinDiv);
}
contentSection.appendChild(div);

// PUMPANJE

const updatePumpBar = () => {
  bar.style.backgroundImage = `linear-gradient(to right, #FF4F4F 0%, #FF4F4F ${barValue}%, #F9F9FF ${barValue}%)`;
  procenatText.innerHTML = `${barValue}%`;
};

const overAnimation = () => {
  let audioExp = new Audio('sounds/explosion.wav');
  audioExp.play();
  textTl.play();
};

const pumpanje = () => {
  if (barValue != 110) {
    let audio = new Audio('sounds/jump.wav');
    audio.play();

    barValue += 10;
  }

  if (barValue == 110) {
    let audio = new Audio('sounds/pickupCoin.wav');
    audio.play();

    coinCount++;
    coinCounter.innerHTML = coinCount;

    barValue = 0;
  }
};

setInterval(() => {
  let offset = sipka.getBoundingClientRect();

  if (offset.bottom == offsetStart && offsetStart != old) {
    pumpanje();
    updatePumpBar();
  }

  old = offset.bottom;
}, 10);
