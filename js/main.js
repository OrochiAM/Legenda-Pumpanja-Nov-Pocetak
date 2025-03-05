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

// PUMPANJE

setInterval(() => {
  let offset = sipka.getBoundingClientRect();

  if (offset.bottom == offsetStart && offsetStart != old) {
    if (barValue != 100) {
      barValue += 10;
      bar.style.backgroundImage = `linear-gradient(to right, #FF4F4F 0%, #FF4F4F ${barValue}%, #F9F9FF ${barValue}%)`;
      procenatText.innerHTML = `${barValue}%`;
    }

    if (!over && barValue == 100) {
      let audioExp = new Audio('sounds/explosion.wav');
      audioExp.play();
      // let audioPum = new Audio('sounds/pumpaj.mp3');
      // audioPum.play();
      console.log('PUMP IT!');
      textTl.play();
      over = true;
    }

    let audio = new Audio('sounds/jump.wav');
    audio.play();
  }

  old = offset.bottom;
}, 10);
