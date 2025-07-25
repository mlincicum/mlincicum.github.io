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

const sections = document.querySelector('.sections');
const props = document.querySelectorAll('.prop');
const back_buttons = document.querySelectorAll('.back-button');
const scrollables = document.querySelectorAll('.scrollable');

document.querySelectorAll('.home-nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    const section = parseInt(btn.dataset.section);
    panToSection(section);
  });
});

let currentSection = 0;
const propWrappers = document.querySelectorAll('.prop');

function panToSection(section) {
  // move the sections
  document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  // props.forEach(prop => {
  //   prop.style.transform = `translate(-50%, calc(-50% + ${section * -100}vh))`;
  // });


  // Hide all back buttons and scrollbars
  back_buttons.forEach(btn => btn.classList.remove('show'));
  scrollables.forEach(btn => btn.classList.add('hide-scroll'));

  currentSection = section;

  // Show the back button for this section (if not the first)
  if (currentSection > 0) {
    back_buttons.item(currentSection - 1).classList.add('show');
   scrollables.item(currentSection - 1).classList.remove('hide-scroll');
  }

}

document.querySelectorAll('.back-button').forEach(btn => {
  btn.addEventListener('click', () => {
    panToSection(0);
  });
});

// Lightbox functionality

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const links = document.querySelectorAll('.art-grid a');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let visibleArt = []; // this will hold only visible items
let currentIndex = 0;

// When any art is clicked:
links.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    // Build visible art array
    visibleArt = Array.from(document.querySelectorAll('.art-grid a'))
      .filter(el => el.offsetParent !== null); // means it's visible in the layout

    // Find index of clicked item in visible array
    currentIndex = visibleArt.indexOf(item);

    showImage();
  });
});

function showImage() {
  lightboxImg.src = visibleArt[currentIndex].href;
  lightbox.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', function (e) {
  if (e.target === this) {
    lightbox.style.display = 'none';
  }
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleArt.length) % visibleArt.length;
  showImage();
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1 + visibleArt.length) % visibleArt.length;
  showImage();
});


/* Filtering projects by tag */
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    // change color of buttons
    filterButtons.forEach(b => {
      b.style.background = 'grey';
    });

    button.style.background = 'pink';

    // filter projects
    projects.forEach(project => {
      const tags = project.getAttribute('data-tags').split(' ');
      if (filter === 'all' || tags.includes(filter)) {
        project.style.display = 'flex';
      } else {
        project.style.display = 'none';
      }
    });

    // now arrange them in the left/right left/right formation
    let count = 0;
    const visible_projects = document.querySelectorAll('.project');
    visible_projects.forEach((project, index) => {
      if (project.style.display == 'flex') {
        project.classList.remove('pleft', 'pright'); // remove previous
        const image = project.querySelector('.project-image');
        image.classList.remove('left', 'right');
        const description = project.querySelector('.project-description');
        description.classList.remove('left', 'right');

        if (count % 2 === 0) {
          // left
          project.classList.add('pleft');
          image.classList.add('left');
          description.classList.add('left');
        } else {
          // right
          project.classList.add('pright');
          image.classList.add('right');
          description.classList.add('right');
        }

        count += 1;
      }
     
    });
  });
});

// we should arrange them once at the beginning
projects.forEach((project, index) => {
      const image = project.querySelector('.project-image');
      const description = project.querySelector('.project-description');

      if (index % 2 === 0) {
        // left
        project.classList.add('pleft');
        image.classList.add('left');
        description.classList.add('left');
      } else {
        // right
        project.classList.add('pright');
        image.classList.add('right');
        description.classList.add('right');
      }
    });

// Filtering in art between illustrations and game assets
const artFilterButtons = document.querySelectorAll('.art-filter-btn');
const artGrids = document.querySelectorAll('.art-grid');

artFilterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    // change color of buttons
    artFilterButtons.forEach(b => {
      b.style.background = 'grey';
    });

    button.style.background = 'pink';

    // filter art
    artGrids.forEach(art => {
      const tags = art.getAttribute('data-tags').split(' ');
      if (tags.includes(filter)) {
        art.style.display = 'block';
      } else {
        art.style.display = 'none';
      }
    });
  });
});

// filter art once at beginning
artGrids.forEach(art => {
  const tags = art.getAttribute('data-tags').split(' ');
    if (tags.includes('illustrations')) {
        art.style.display = 'block';
      } else {
        art.style.display = 'none';
      }
    });


console.log('Wrappers:', propWrappers.length);
