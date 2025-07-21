// Generate stars
const staticStarsContainer = document.querySelector('.stars.initial');
const driftingStarsContainer = document.querySelector('.stars.continual');

// Static stars: just fixed dots, no animation
for (let i = 0; i < 120; i++) {
  const star = document.createElement('div');
  star.classList.add('star-init');
  const size = Math.random() * 2 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`; // Anywhere in viewport
  star.style.animationDuration = `${200 + Math.random() * 100}s`;
  star.style.opacity = `${0.2 + Math.random() * 1.2}s`;
  star.addEventListener('animationend', () => {
    star.remove();
  });
  staticStarsContainer.appendChild(star);
}

// Drifting stars: start above screen, float down forever
for (let i = 0; i < 120; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 2 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${-10 - Math.random() * 20}vh`; // Start above
  star.style.animationDuration = `${200 + Math.random() * 100}s`;
  star.style.animationDelay = `${Math.random() * 20}s`;
  star.style.opacity = `${0.2 + Math.random() * 1.2}s`;
  driftingStarsContainer.appendChild(star);
}

// document.querySelectorAll('.character-inner').forEach(character => {
//   character.addEventListener('click', () => {
//     character.classList.add('bounce');

//     // Remove the class when the animation ends so it can play again
//     character.addEventListener('animationend', () => {
//       character.classList.remove('bounce');
//     }, { once: true }); // ensures the event fires only once per click
//   });
// });

const sections = document.querySelector('.sections');
const worrel = document.querySelector('.worrel');
const spaceship = document.querySelector('.spaceship');

const back_buttons = document.querySelectorAll('.back-button');

document.querySelectorAll('.home-nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    const section = parseInt(btn.dataset.section);
    panToSection(section);
  });
});

let currentSection = 0;

function panToSection(section) {
  // move the sections
  sections.style.transform = `translateY(-${section * 100}vh)`;
  //stars.style.transform = `translateY(${section * 20}vh)`;
  // characters.forEach(char => {
  //   char.style.transform = `translateY(${section * 40}vh)`;
  // });

  // Hide all back buttons
  back_buttons.forEach(btn => btn.classList.remove('show'));

  currentSection = section;

  // Show the back button for this section (if not the first)
  if (currentSection > 0) {
    back_buttons.item(currentSection - 1).classList.add('show');
  }

}

document.querySelectorAll('.back-button').forEach(btn => {
  btn.addEventListener('click', () => {
    panToSection(0);
  });
});