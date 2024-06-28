// Function to toggle the theme
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  const links = document.querySelectorAll('.navigation a');

  // Check if the dark mode is currently active
  if (body.classList.contains('dark-mode')) {
    // Switch to light mode
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeIcon.textContent = '☀️';
    themeIcon.classList.add('animate__animated', 'animate__bounce');

    // Update the link colors
    links.forEach(link => {
      link.style.color = '#333';
    });
    document.querySelector('.navigation .active').style.color = 'pink';

    // Save the theme preference to local storage
    localStorage.setItem('theme', 'light');
  } else {
    // Switch to dark mode
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    themeIcon.textContent = '🌙';
    themeIcon.classList.add('animate__animated', 'animate__bounce');

    // Update the link colors
    links.forEach(link => {
      link.style.color = 'white';
    });
    document.querySelector('.navigation .active').style.color = 'pink';

    // Save the theme preference to local storage
    localStorage.setItem('theme', 'dark');
  }

  // Remove the animation class after the animation is complete
  setTimeout(() => {
    themeIcon.classList.remove('animate__animated', 'animate__bounce');
  }, 1000);
}

// Function to add particle effect on click
function addParticles(event) {
  const particles = event.currentTarget.querySelector('.particles');
  if (!particles) return;

  const numParticles = 10;
  const rect = event.currentTarget.getBoundingClientRect();

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.left = event.clientX - rect.left + 'px';
    particle.style.top = event.clientY - rect.top + 'px';
    particle.style.setProperty('--x', `${(Math.random() - 0.5) * 100}px`);
    particle.style.setProperty('--y', `${(Math.random() - 0.5) * 100}px`);
    particles.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 2000);
  }
}

// Function to add swipe particle effect
function addSwipeParticles(event) {
  const particles = event.currentTarget.querySelector('.particles');
  if (!particles) return;

  const numParticles = 10;
  const rect = event.currentTarget.getBoundingClientRect();

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.left = event.clientX - rect.left + 'px';
    particle.style.top = event.clientY - rect.top + 'px';
    particle.style.setProperty('--x', `${(event.deltaX / 2)}px`);
    particle.style.setProperty('--y', `${(event.deltaY / 2)}px`);
    particles.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 2000);
  }

  event.currentTarget.classList.add('swipe-particles');
  setTimeout(() => {
    event.currentTarget.classList.remove('swipe-particles');
  }, 2000);
}

// Set the initial theme based on the saved preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    document.getElementById('theme-icon').textContent = '☀️';
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    document.getElementById('theme-icon').textContent = '🌙';
  }

  // Add click and swipe/scroll event listeners
  const clickableElements = document.querySelectorAll('.profile-card, .profile-pic, .info-box, .content, .theme-switcher, .code-box, .contact-info');
  clickableElements.forEach(element => {
    if (element.querySelector('.particles')) {
      element.addEventListener('click', addParticles);
      element.addEventListener('wheel', addSwipeParticles);
      element.addEventListener('scroll', addSwipeParticles);
    }
  });
});
