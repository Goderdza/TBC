document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("concept_link")
    .addEventListener("click", function () {
      window.location.href = "https://tbcconcept.ge/ge";
    });
});
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});