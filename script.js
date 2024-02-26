'use strict';

///////////////////////////////////////
// Modal window
const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Scroll
btnscrollto.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('cuurent scroll X/Y', window.pageXOffset, window.pageYOffset);

  //SCROLLING
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  //Matching Stratgy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabed componenet
const tabs = document.querySelectorAll('.operations__tab');
const tabsconatiner = document.querySelector('.operations__tab-container');
const tabscontent = document.querySelectorAll('.operations__content');

tabsconatiner.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabscontent.forEach(t => t.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade
const handlehover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblibings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblibings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
  handlehover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handlehover(e, 1);
});

//sticky Event
// const initiallcord = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (initiallcord.top < window.scrollY) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//Intersection observer API
// const obscallback = function (entries, observer) {
//   entries.forEach(t => {
//     console.log(t);
//   });
// };
// const obsoption = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obscallback, obsoption);
// observer.observe(section1);
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Revea section
const allsection = document.querySelectorAll('.section');
const revealsection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealsection, {
  root: null,
  threshold: 0.15,
});

allsection.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

//Lazy image
const imgTarget = document.querySelectorAll('img[data-src]');
const loadimg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
imgTarget.forEach(img => {
  imgObserver.observe(img);
});

//Sliders
const slides = document.querySelectorAll('.slide');
const btnleft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');
const dotscontainer = document.querySelector('.dots');
let curslide = 0;
const maxSlides = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.2) translateX(-800px';
// slider.style.overflow = 'visible';
const createdots = function () {
  slides.forEach(function (_, i) {
    dotscontainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createdots();
const activedots = function (slide) {
  document
    .querySelectorAll('.dots_dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activedots(0);

const gotoslide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%) `)
  );
};
gotoslide(0);
const nextslide = function () {
  if (curslide === maxSlides - 1) {
    curslide = 0;
  } else curslide++;
  gotoslide(curslide);
  activedots(curslide);
};
const prevslide = function () {
  if (curslide === 0) {
    curslide = maxSlides - 1;
  } else curslide--;
  gotoslide(curslide);
  activedots(curslide);
};
btnright.addEventListener('click', nextslide);
btnleft.addEventListener('click', prevslide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextslide();
  e.key === 'ArrowLeft' && prevslide();
});
dotscontainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoslide(slide);
    activedots(slide);
  }
});
/*
//Selecting Elements
const header = document.querySelector(' .header');
const allbuttons = document.getElementsByTagName('button');
console.log(allbuttons);

console.log(document.getElementsByClassName('btn'));


//Creating Elements
//.insertAdjacentHTML;
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'we use cookie for improved functionaklly and analytics ';
message.innerHTML =
  'we use cookie for improved functionaklly and analytics .<button class ="btn btn--close-cookie">Got it</button> ';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

//DELETING ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

//STYLES
message.style.backgroundColor = '#33234d';
message.style.width = '120%';
console.log(getComputedStyle(message).color);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
document.documentElement.style.setProperty('--color-primary', 'orangered');

//ATTRIBUTES

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

//DATA ATTRIBUTES
console.log(logo.dataset.versionNumber);

//CLASSES*/

// const btnscrollto = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');
// btnscrollto.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);
//   console.log(e.target.getBoundingClientRect());
//   console.log('cuurent scroll X/Y', window.pageXOffset, window.pageYOffset);

//   //SCROLLING
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// const h1alert = function (e) {
//   alert('addeentistner:great you are reading');

//   //read only time
// };
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', h1alert);
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', h1alert);
// }, 3000);
// h1.onmouseenter = function (e) {
//   alert('onmouseenter::great you are reading');
// };

//RANDOM colour
// const randomint = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomcolor = () =>
//   `rgb(${randomint(0, 255)},${randomint(0, 255)},${randomint(0, 255)} `;
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomcolor();
// });

// const h1 = document.querySelector('h1');
// //Going downwards :child
// console.log(h1.querySelectorAll('.highlight'));
// h1.firstElementChild.style.color = 'orangered';
// h1.lastElementChild.style.color = 'white  ';

// //Going Upwards:parents
// console.log(h1.parentNode);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// //sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
