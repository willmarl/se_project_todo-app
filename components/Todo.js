class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._selector = selector;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._completed = data.completed;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._checkboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._remove();
      this._handleDelete(this._completed);
    });
  }

  _toggleCompletion = () => {
    this._completed = !this._completed;
  };

  _remove = () => {
    this._todoElement.remove();
    this._todoElement = null;
  };

  _generateCheckBoxEl() {
    this._checkboxEl = this._todoElement.querySelector(".todo__completed");
    this._label = this._todoElement.querySelector(".todo__label");
    this._checkboxEl.checked = this._completed;
    this._checkboxEl.id = `todo-${this._id}`;
    this._label.setAttribute("for", `todo-${this._id}`);
  }

  _generateName() {
    this._nameEl = this._todoElement.querySelector(".todo__name");
    this._nameEl.textContent = this._name;
  }

  _generateDueDate() {
    const dueDate = new Date(this._date);
    this._dateEl = this._todoElement.querySelector(".todo__date");
    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._getTemplate();
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._generateName();
    this._generateCheckBoxEl();
    this._setEventListeners();
    this._generateDueDate();

    return this._todoElement;
  }
}

export default Todo;
