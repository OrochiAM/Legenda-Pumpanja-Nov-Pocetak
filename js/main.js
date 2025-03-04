// TEXT ANIMACIJA

let width = window.innerWidth * 0.11;
const text = document.querySelector('.pumpaj-text');
const textTl = gsap.timeline();
const layer = document.querySelector('.layer');

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
  .to(
    text,
    {
      fontSize: width,
      duration: 0.5,
      bottom: '+=32%',
    },
    '<'
  );
textTl.pause();

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
      console.log('AAAA');
      textTl.play();
      over = true;
    }

    console.log(barValue);

    let audio = new Audio('sounds/jump.wav');
    audio.play();
  }

  old = offset.bottom;
}, 10);
