export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._main = document.querySelector(".main");
    this._closeEsc = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  _handleTarget(evt) {
    if (evt.target.classList.contains("popup")) this.close();
  }

  open() {
    this._popup.classList.add("popup_opened");

    this._main.classList.add("main_no-scroll");

    document.addEventListener("keydown", this._closeEsc);
  }

  close() {
    this._popup.classList.remove("popup_opened");

    this._main.classList.remove("main_no-scroll");

    document.removeEventListener("keydown", this._closeEsc);
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector(".popup__close-button");

    this._closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (evt) => this._handleTarget(evt));
  }
}
