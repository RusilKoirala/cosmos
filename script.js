const planets = [
  { name: 'Mercury', description: 'A small, swift world of extremes, racing around the Sun faster than any other planet.', distance: '57.9M km', moons: '0', color: '#a99f91' },
  { name: 'Venus', description: 'A cloud-wrapped world with a surface hot enough to melt lead and winds that never rest.', distance: '108.2M km', moons: '0', color: '#d5a45d' },
  { name: 'Earth', description: 'Our blue, breathing home. The only world known to carry life across its oceans and continents.', distance: '149.6M km', moons: '1', color: '#4b9da1' },
  { name: 'Mars', description: 'The red planet, marked by ancient volcanoes, deep canyons, and the possibility of past water.', distance: '227.9M km', moons: '2', color: '#b8593c' },
  { name: 'Jupiter', description: 'A giant stormy world with a magnetic field and a famous Great Red Spot larger than Earth.', distance: '778.5M km', moons: '95', color: '#c99472' },
  { name: 'Saturn', description: 'A pale gas giant encircled by an intricate, icy ring system visible from millions of miles away.', distance: '1.43B km', moons: '146', color: '#d4b47b' },
  { name: 'Uranus', description: 'An ice giant tilted on its side, turning slowly through a blue-green atmosphere of methane.', distance: '2.87B km', moons: '28', color: '#8ccbc7' },
  { name: 'Neptune', description: 'A deep-blue world at the edge of the system, swept by the fastest winds we have measured.', distance: '4.5B km', moons: '16', color: '#5072c4' }
];

const facts = [
  'A day on Venus is longer than a year on Venus.',
  'Jupiter is so large that more than 1,300 Earths could fit inside it.',
  'The footprints on the Moon may last for 100 million years.',
  'Neutron stars can spin 600 times every second.',
  'One million Earths could fit inside the Sun.'
];

const planetGrid = document.querySelector('#planet-grid');
const dialog = document.querySelector('#planet-dialog');
const factText = document.querySelector('#fact-text');
let factIndex = 0;

planetGrid.innerHTML = planets.map((planet, index) => `
  <article class="planet-card" style="--planet-color: ${planet.color}">
    <div class="planet-top"><span>0${index + 1}</span><span>ORBITAL BODY</span></div>
    <div><h3>${planet.name}</h3><p>${planet.description}</p><div class="planet-meta"><span>Distance<strong>${planet.distance}</strong></span><span>Moons<strong>${planet.moons}</strong></span></div><button class="planet-button" type="button" data-planet="${index}">View details ↗</button></div>
  </article>`).join('');

const openPlanet = (index) => {
  index = Number(index);
  const planet = planets[index];
  document.querySelector('#dialog-label').textContent = `PLANET 0${index + 1} / SOLAR SYSTEM`;
  document.querySelector('#dialog-title').textContent = planet.name;
  document.querySelector('#dialog-description').textContent = planet.description;
  document.querySelector('#dialog-distance').textContent = planet.distance;
  document.querySelector('#dialog-moons').textContent = planet.moons;
  document.querySelector('#dialog-visual').style.setProperty('--dialog-color', planet.color);
  dialog.showModal();
};

planetGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-planet]');
  if (button) openPlanet(button.dataset.planet);
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector('#next-fact').addEventListener('click', () => { factIndex = (factIndex + 1) % facts.length; factText.textContent = facts[factIndex]; });

document.querySelector('.menu-toggle').addEventListener('click', (event) => {
  const nav = document.querySelector('.main-nav');
  const isOpen = nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => document.querySelector('.main-nav').classList.remove('open')));

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }), { rootMargin: '-45% 0px -45% 0px' });
sections.forEach((section) => observer.observe(section));




// my new changes

const searchbox = document.createElement('input');

searchbox.placeholder = 'Search planets...';
searchbox.className = 'planet-search';

document.querySelector('.planets-section').prepend(searchbox);

searchbox.addEventListener('input', (event) => {
    const searchTerm = searchbox.value.toLowerCase();
    
    document.querySelectorAll('.planet-card').forEach((card, index) => {
        const planetName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = planetName.includes(searchTerm) ? '' : 'none';
    });
});


/// new feature fav planet


const favoritePlanets = JSON.parse(localStorage.getItem('favoritePlanets')) || [];

document.querySelectorAll('.planet-card').forEach((card, index) => {   
    const favbutton = document.createElement('button');

    favbutton.textContent = favoritePlanets.includes(index) ? 'FAV' : 'NOT FAV';

    favbutton.className = 'fav-button';
    card.appendChild(favbutton);

    favbutton.addEventListener('click', () => {
        const postion = favoritePlanets.indexOf(index);

        if (postion === -1) {
            favoritePlanets.push(index);
            favbutton.textContent = 'FAV';
        } else {
            favoritePlanets.splice(postion, 1);
            favbutton.textContent = 'NOT FAV';
        }

        localStorage.setItem('favoritePlanets', JSON.stringify(favoritePlanets));
    });
});


// random planettt


const randomButton = document.createElement('button');
randomButton.textContent = 'Random Planet';
randomButton.className = 'random-button';

document.querySelector('.planets-section').prepend(randomButton);

randomButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * planets.length);
    openPlanet(randomIndex);
});