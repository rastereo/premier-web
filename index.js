import PopupWithForm from "./src/components/PopupWithForm.js";
import PopupWithSuccess from "./src/components/PopupWithSuccess.js";

const main = document.querySelector(".main");
const logo = document.querySelector(".header__logo");
const logoPaths = logo.querySelectorAll("path");
const path = logoPaths[0];
const presentationSection = main.querySelector(".presentation");
const arrowButton = presentationSection.querySelector(".presentation__arrow");
const filmCollectionSection = main.querySelector(".film-collection");
const wordList = filmCollectionSection.querySelectorAll(".film-collection__list li");
const filmList = filmCollectionSection.querySelector(".film-collection__film-list");
const filmLinks = filmList.querySelectorAll(".film-collection__link");
const emailButton = main.querySelector(".film-collection__email");

const windowHeight = window.innerHeight;

let startX;
let scrollLeft;
let isDown = false;
let isDragging = false;

const popupSubscription = new PopupWithForm(
  {
    handleFormSubmit: ({ email }) => {
      popupSubscription.renderLoading(true);

      console.log(email);

      setTimeout(() => {
        popupSubscription.renderLoading(false);
        popupSubscription.close();
        popupSuccess.open();
      }, 1000);
    },
  },
  ".popup_name_subscription"
);

const popupSuccess = new PopupWithSuccess(".popup_name_success");

console.log(popupSuccess);

popupSubscription.setEventListeners();
popupSuccess.setEventListeners();

emailButton.addEventListener("click", () => {
  popupSubscription.open();
});

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

filmList.addEventListener("mousedown", (e) => {
  e.preventDefault();

  isDown = true;
  isDragging = false;
  startX = e.pageX - filmList.offsetLeft;
  scrollLeft = filmList.scrollLeft;
  filmList.style.cursor = "grabbing";
});

filmList.addEventListener("mouseleave", () => {
  isDown = false;
  isDragging = true;
  filmList.style.cursor = "grab";
});

filmList.addEventListener("mouseup", () => {
  isDown = false;
  filmList.style.cursor = "grab";
  if (!isDragging) {
    filmList.style.pointerEvents = "auto";
  }
});

filmList.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  isDragging = true;
  const x = e.pageX - filmList.offsetLeft;
  const walkX = (x - startX) * 1;
  filmList.scrollLeft = scrollLeft - walkX;
});

filmLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (isDragging) e.preventDefault();
  });

  link.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
});
