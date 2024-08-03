import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._emailInput = this._popup.querySelector(".popup__input_name_email");
    this._submitButton = this._popup.querySelector(".popup__save-button");
    this._submitButtonText = this._submitButton.querySelector(".popup__continue");
    this._loader = this._submitButton.querySelector(".loader");
    // this._submitButtonValue = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputValues.forEach((input) => (this._formValues[input.name] = input.value));

    return this._formValues;
  }

  _changeDisabledSubmit(inputValue) {
    if (inputValue.trim().length > 0) {
      this._submitButton.disabled = false;
    } else {
      this._submitButton.disabled = true;
    }
  }

  close() {
    this._form.reset();

    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButtonText.classList.add("popup__continue_hide");
      this._loader.classList.add("loader_visible");

      this._submitButton.disabled = true;
    } else {
      this._submitButtonText.classList.remove("popup__continue_hide");
      this._loader.classList.remove("loader_visible");

      this._submitButton.disabled = true;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._inputValues = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};

    this._emailInput.addEventListener("input", () => this._changeDisabledSubmit(this._emailInput.value));

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }
}
