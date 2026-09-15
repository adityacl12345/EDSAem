export default function decorate(block) {
  const rows = [...block.children];

  const slider = document.createElement('div');
  slider.className = 'carousel-slider';

  rows.forEach((row) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';

    [...row.children].forEach((child) => {
      slide.append(child);
    });

    slider.append(slide);
  });

  block.innerHTML = '';
  block.append(slider);

  const slides = [...slider.children];
  let currentSlide = 0;

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-prev';
  prevBtn.setAttribute('aria-label', 'Previous Slide');
  prevBtn.innerHTML = '&#10094;';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-next';
  nextBtn.setAttribute('aria-label', 'Next Slide');
  nextBtn.innerHTML = '&#10095;';

  block.append(prevBtn);
  block.append(nextBtn);

  function updateCarousel() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  let autoplay = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }, 5000);

  block.addEventListener('mouseenter', () => {
    clearInterval(autoplay);
  });

  block.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    }, 5000);
  });

  updateCarousel();
}
