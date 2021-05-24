import api from "./api.js";
import { asyncProvider } from "./helpers.js";
import {insertAllTodosToHtml, insertSingleTodoToHtml, removeFromHtmlById, updateTodoState } from "./webApi.js"
// Написати функцію яка залогінює користувача, фетчить список ToDo елементів та добавляє їх на фронт (нові мають бути зверху)
window.login = () => {
  asyncProvider(async () => {
    await api.login();
    const array = await api.fetchAllTodoItems();
    insertAllTodosToHtml(array.data.reverse());
  })
  
};

// Написати функцію яка реєструє користувача, фетчить список ToDo елементів та добавляє їх на фронт (нові мають бути зверху)
window.register = () => {
    asyncProvider( async () => {
      await api.register();
      await api.fetchAllTodoItems();
    });
};

// Написати функцію яка добавляє ToDo елемент до API та фронта
window.addTodo = () => {
  const input = document.getElementById("descriptionInput");
  // Отримуємо значення із інпута
  const description = input.value;

  // Писати код тут
  asyncProvider( async () => {
    const a = await api.addTodoItem(description);
    insertSingleTodoToHtml(a.data);
  })
  
  // Очищає інпут
  input.value = "";
};

// Написати функцію(приймає id та completed - поточний стан ToDo елемента) яка модифікує Todo елемента на API та фронті.
window.modifyTodo = (_id, completed) => {
  // Писати код тут

  asyncProvider(async () => {
    await api.updateTodoItem(_id, !completed);
    updateTodoState(_id);
  });
 
    
    
};

// Написати функцію(приймає id ) яка видаляє ToDo елемент із API та фронта.
window.removeTodo = (_id) => {
  // Писати код тут
  asyncProvider( async () => {
    removeFromHtmlById(_id);
    await api.removeTodoItem(_id);
  })
};
