document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("concept_link")
    .addEventListener("click", function () {
      window.location.href = "https://tbcconcept.ge/ge";
    });
});
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

const swiperWrapper = document.querySelector('.swiper_wrapper');

let isDown = false;
let startX;
let scrollLeft;

swiperWrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  swiperWrapper.style.cursor = 'grabbing';
  startX = e.pageX - swiperWrapper.offsetLeft;
  scrollLeft = swiperWrapper.scrollLeft;
});

swiperWrapper.addEventListener('mouseleave', () => {
  isDown = false;
  swiperWrapper.style.cursor = 'grab';
});

swiperWrapper.addEventListener('mouseup', () => {
  isDown = false;
  swiperWrapper.style.cursor = 'grab';
});

swiperWrapper.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - swiperWrapper.offsetLeft;
  const walk = (x - startX) * 0.88;

  swiperWrapper.scrollLeft = scrollLeft - walk;
});

const scrollbarDrag = document.querySelector('.swiper-scrollbar-drag');
const scrollbar = document.querySelector('.swiper_scrollbar');

swiperWrapper.addEventListener('scroll', function() {
  const scrollPercentage = (swiperWrapper.scrollLeft / (swiperWrapper.scrollWidth - swiperWrapper.clientWidth)) * 100;
  const trackWidth = scrollbar.clientWidth - scrollbarDrag.clientWidth;
  const dragPosition = (scrollPercentage / 100) * trackWidth;
  
  scrollbarDrag.style.transform = `translateX(${dragPosition}px)`;
});