const main = document.querySelector(".main");
const logo = document.querySelector(".header__logo");
const logoPaths = logo.querySelectorAll("path");
const path = logoPaths[0];
const presentationSection = main.querySelector(".presentation");
const arrowButton = presentationSection.querySelector(".presentation__arrow");
const filmCollectionSection = main.querySelector(".film-collection");
const wordList = filmCollectionSection.querySelectorAll(".film-collection__list li");
// const activeWords = filmCollectionSection.querySelectorAll(".film-collection__word_active");

const windowHeight = window.innerHeight;

arrowButton.addEventListener("click", () => {
  filmCollectionSection.scrollIntoView({ behavior: "smooth" });
});

main.addEventListener("scroll", () => {
  const scrollY = main.scrollTop;

  if (windowHeight / 1.5 < scrollY) {
    logoPaths.forEach((path) => {
      path.setAttribute("fill", "#000000");
    });
  } else if (path.getAttribute("fill") !== "#FDDD2D") {
    logoPaths.forEach((path) => {
      path.setAttribute("fill", "#FDDD2D");
    });
  }
});

wordList.forEach((item) => {
  if (!item.classList.contains("spacer")) {
    item.addEventListener("click", function () {
      const activeWord = this.parentElement.querySelector(".film-collection__word_active");

      this.parentElement.style.scrollSnapType = "none";

      activeWord.classList.remove("film-collection__word_active");
      item.classList.add("film-collection__word_active");

      this.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    });
  }
});
