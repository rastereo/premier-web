import Popup from "./Popup.js";

export default class PopupWithSuccess extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);

    if (evt.key === "Enter") this.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._successButton = this._popup.querySelector(".popup__success-button");

    this._successButton.addEventListener("click", () => this.close());
  }
}
