// Функція повертає HTML темплейт ToDo елемента (Використовувати не потрібно)
const todoHTML = ({ _id, description, completed }) =>
  `<div id="${_id}" class="todoItem ${
    completed ? "todoCompleted" : ""
  }"><p onclick="modifyTodo('${_id}', ${completed})" >${description}</p> <button class="removeButton" onclick="removeTodo('${_id}')"><span>x</span></button></div>`;

// Функція приймає масив ToDo елементів та вставляє їх у html
export const insertAllTodosToHtml = (todos) => {
    const container = document.getElementById("app");

    const todoInput = `<div class="inputContainer"><input class="input" id="descriptionInput" />
  <button class="button" onclick="addTodo()">
    Add todo
  </button></div>`;

    const todosHTML = todos.reduce((acc, todo) => {
        acc += todoHTML(todo);
        return acc;
    }, "");
    container.innerHTML = `<div class="todoListContainer"><div class="todoListHeader">Todo List</div><div id="todoList">${todosHTML}</div>${todoInput}</div>`;
};

// Функція приймає 1 ToDo елемент та вставляє його зверху у html
export const insertSingleTodoToHtml = (todo) => {
    const container = document.getElementById("todoList");

    container.innerHTML = `${todoHTML(todo)}${container.innerHTML}`;
};

// Функція видаляє ToDo елемент по полю id із html
export const removeFromHtmlById = (_id) => {
    const todoItemContainer = document.getElementById(_id);
    todoItemContainer.remove();
};

// Функція оновлює ToDo елемент по полю id (робить completed/not completed)
export const updateTodoState = (_id) => {
  const container = document.getElementById(_id);
  container.classList.toggle("todoCompleted");
};

// Івент який додає іконку лоадера (запустити на початку з’єднання з сервером)
export const fetchStart = new Event("fetchStart", {
  view: document,
  bubbles: true,
  cancelable: false
});
// Івент який видаляє іконку лоадера (запустити після отримання результату з сервера)
export const fetchEnd = new Event("fetchEnd", {
  view: document,
  bubbles: true,
  cancelable: false
});

// Лістенери для лоадера (Використовувати не потрібно)
document.addEventListener("fetchStart", function () {
  document.getElementById("loader").classList.add("shown");
});
document.addEventListener("fetchEnd", function () {
  document.getElementById("loader").classList.remove("shown");
});
