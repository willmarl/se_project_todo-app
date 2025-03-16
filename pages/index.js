import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    console.log("submitted");
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    todosList.append(todo);
  },
  containerSelector: todosList,
});

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
