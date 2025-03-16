export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      document
        .querySelector(".popup_visible")
        .classList.remove("popup_visible");
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target.id === "add-todo-popup"
      ) {
        this.close();
      }
    });
  }
}
