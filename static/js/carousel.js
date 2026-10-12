document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.image-carousel-track');
  const slides = [...track.children];
  const controls = carousel.querySelector('.image-carousel-controls');
  const previous = controls.querySelector('[data-direction="-1"]');
  const next = controls.querySelector('[data-direction="1"]');
  const status = controls.querySelector('.image-carousel-status');
  let current = 0;

  function update() {
    current = Math.round(track.scrollLeft / track.clientWidth);
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    const label = `${current + 1} / ${slides.length}`;
    if (status.textContent !== label) status.textContent = label;
  }

  function move(direction) {
    const index = Math.max(0, Math.min(slides.length - 1, current + direction));
    track.scrollTo({
      left: index * track.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  controls.addEventListener('click', (event) => {
    const button = event.target.closest('[data-direction]');
    if (button) move(Number(button.dataset.direction));
  });
  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(() => {
    track.scrollTo({ left: current * track.clientWidth, behavior: 'instant' });
    update();
  }).observe(track);
  controls.hidden = slides.length < 2;
  update();
});
