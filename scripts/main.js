
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("concept_link")
    .addEventListener("click", function () {
      window.location.href = "https://tbcconcept.ge/ge";
    });
});

document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

const scrollAmount = 380;
const scrollDuration = 600;
let isDown = false;
let startX;
let scrollLeft;
let velocity = 0;
let lastScrollLeft = 0;
let lastTime = 0;
let inertiaTimer;
let isDragging = false;

const initSwiper = (
  swiperWrapper,
  scrollbar,
  scrollbarDrag,
  leftArrow,
  rightArrow
) => {
  swiperWrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    isDragging = true;
    swiperWrapper.style.cursor = "grabbing";
    startX = e.pageX - swiperWrapper.offsetLeft;
    scrollLeft = swiperWrapper.scrollLeft;
    lastScrollLeft = scrollLeft;
    lastTime = Date.now();
    clearInterval(inertiaTimer);
  });

  const smoothScrollTo = (targetScrollLeft, duration) => {
    const startScrollLeft = swiperWrapper.scrollLeft;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easing =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      swiperWrapper.scrollLeft =
        startScrollLeft + (targetScrollLeft - startScrollLeft) * easing;

      if (progress < 1) {
        window.requestAnimationFrame(animateScroll);
      } else {
        updateArrowColors(swiperWrapper, leftArrow, rightArrow);
      }
    };

    window.requestAnimationFrame(animateScroll);
  };

  const handleArrowClick = (direction) => {
    if (direction === "left") {
      smoothScrollTo(swiperWrapper.scrollLeft - scrollAmount, scrollDuration);
    } else if (direction === "right") {
      smoothScrollTo(swiperWrapper.scrollLeft + scrollAmount, scrollDuration);
    }
  };

  leftArrow.addEventListener("click", () => handleArrowClick("left"));
  rightArrow.addEventListener("click", () => handleArrowClick("right"));

  const stopDragging = () => {
    if (isDown) {
      isDown = false;
      swiperWrapper.style.cursor = "grab";
      applyInertia(swiperWrapper);
    }
  };

  swiperWrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - swiperWrapper.offsetLeft;
    const walk = (x - startX) * 0.88;

    swiperWrapper.scrollLeft = scrollLeft - walk;

    const currentTime = Date.now();
    const timeElapsed = currentTime - lastTime;
    velocity = (swiperWrapper.scrollLeft - lastScrollLeft) / timeElapsed;

    lastScrollLeft = swiperWrapper.scrollLeft;
    lastTime = currentTime;

    updateArrowColors(swiperWrapper, leftArrow, rightArrow);
  });

  const applyInertia = (swiperWrapper) => {
    if (Math.abs(velocity) > 0) {
      inertiaTimer = setInterval(() => {
        const scrollSpeed = velocity * 0.95;
        swiperWrapper.scrollLeft += scrollSpeed;
        velocity *= 0.95;

        if (Math.abs(velocity) < 0.1) {
          clearInterval(inertiaTimer);
        }

        updateArrowColors(swiperWrapper, leftArrow, rightArrow);
      }, 16);
    }
  };

  const updateScrollbar = () => {
    const scrollPercentage =
      (swiperWrapper.scrollLeft /
        (swiperWrapper.scrollWidth - swiperWrapper.clientWidth)) *
      100;
    const trackWidth = scrollbar.clientWidth - scrollbarDrag.clientWidth;
    const dragPosition = (scrollPercentage / 100) * trackWidth;

    scrollbarDrag.style.transform = `translateX(${dragPosition}px)`;
  };

  swiperWrapper.addEventListener("scroll", () => {
    updateScrollbar();
    updateArrowColors(swiperWrapper, leftArrow, rightArrow);
  });

  const updateScrollPositionFromScrollbar = (e) => {
    const trackWidth = scrollbar.clientWidth - scrollbarDrag.clientWidth;
    const dragPosition = e.pageX - scrollbar.getBoundingClientRect().left;
    const scrollPercentage = (dragPosition / trackWidth) * 100;
    swiperWrapper.scrollLeft =
      (scrollPercentage / 100) *
      (swiperWrapper.scrollWidth - swiperWrapper.clientWidth);
  };

  const onScrollbarDragMouseMove = (e) => {
    updateScrollPositionFromScrollbar(e);
  };

  const onScrollbarDragMouseUp = () => {
    document.removeEventListener("mousemove", onScrollbarDragMouseMove);
    document.removeEventListener("mouseup", onScrollbarDragMouseUp);
  };

  scrollbarDrag.addEventListener("mousedown", (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", onScrollbarDragMouseMove);
    document.addEventListener("mouseup", onScrollbarDragMouseUp);
  });

  swiperWrapper.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      stopDragging();
    }
  });

  swiperWrapper.addEventListener("mouseup", stopDragging);

  const updateArrowColors = (swiperWrapper, leftArrow, rightArrow) => {
    if (swiperWrapper.scrollLeft > lastScrollLeft) {
      leftArrow.style.fill = "#d1d5d6";
      rightArrow.style.fill = "#182cc0";
    } else if (swiperWrapper.scrollLeft < lastScrollLeft) {
      leftArrow.style.fill = "#182cc0";
      rightArrow.style.fill = "#d1d5d6";
    }

    lastScrollLeft = swiperWrapper.scrollLeft;
  };
};

const conceptSwiperWrapper = document.querySelector(".swiper_wrapper");
const conceptScrollbar = document.querySelector(".swiper_scrollbar");
const conceptScrollbarDrag = document.querySelector(".swiper-scrollbar-drag");
const conceptLeftArrow = document.querySelector(".main-slider-prev");
const conceptRightArrow = document.querySelector(".main-slider-next");

initSwiper(
  conceptSwiperWrapper,
  conceptScrollbar,
  conceptScrollbarDrag,
  conceptLeftArrow,
  conceptRightArrow
);

const awardSwiperWrapper = document.querySelector(".award-swiper_wrapper");
const awardScrollbar = document.querySelector(".award_swiper_scrollbar");
const awardScrollbarDrag = document.querySelector(
  ".award_swiper-scrollbar-drag"
);
const awardLeftArrow = document.querySelector(".award_main-slider-prev");
const awardRightArrow = document.querySelector(".award_main-slider-next");

initSwiper(
  awardSwiperWrapper,
  awardScrollbar,
  awardScrollbarDrag,
  awardLeftArrow,
  awardRightArrow
);

document.addEventListener("DOMContentLoaded", function () {
  const productTextElements = document.querySelectorAll(".header_text");
  const dropdownBg = document.querySelector(".header_dropdown-bg");

  function removeActiveClass() {
    productTextElements.forEach((el) => el.classList.remove("active"));
  }

  function hideDropdownBg() {
    if (dropdownBg) {
      dropdownBg.classList.remove("visible");
    }
  }

  productTextElements.forEach((el) => {
    el.addEventListener("click", function (e) {
      e.stopPropagation();

      removeActiveClass();

      this.classList.add("active");

      if (dropdownBg) {
        dropdownBg.classList.add("visible");
      }
    });
  });

  document.addEventListener("click", function () {
    removeActiveClass();
    hideDropdownBg();
  });
});
