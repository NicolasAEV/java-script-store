// Carrusel propio
const track = document.querySelector('.custom-carousel-track');
const slides = Array.from(document.querySelectorAll('.custom-slide'));
const prevBtn = document.querySelector('.custom-carousel-btn.prev');
const nextBtn = document.querySelector('.custom-carousel-btn.next');
const dotsContainer = document.querySelector('.custom-carousel-dots');
let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dotsContainer.querySelectorAll('span').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

// Dots
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
updateCarousel();

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide
setInterval(nextSlide, 5000);
