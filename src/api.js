import { asyncProvider } from "./helpers.js";

class Api {
  constructor() {
    this.url = "https://api-nodejs-todolist.herokuapp.com/";
    this.headers = { "Content-Type": "application/json" };
  }

  async register() {
    const res = await fetch(`${this.url}user/register`, {
      method: "POST",
      headers: this.headers,
      // Тут потрібно використовувати ваш name, email, age та password відповідно до прикладу у документації
      body: JSON.stringify({
        "name": "Andrii",
        "email": "akukljak@gmail.com",
        "password": "12345678",
        "age": 23
      })
    });
    const data = await res.json();
    this.headers.Authorization = `Bearer ${data.token}`;
  }

  async login() {
    const res = await fetch(`${this.url}user/login`, {
      method: "POST",
      headers: this.headers,
      // Тут потрібно використовувати ваш email та password відповідно до прикладу у документації
      body: JSON.stringify({
        "email": "akukljak@gmail.com",
        "password": "12345678"
      })
    });
    const data = await res.json();
    this.headers.Authorization = `Bearer ${data.token}`;
  }

  // Написати функцію яка повертає масив ToDo елементів із API
  async fetchAllTodoItems() {
    const res = await fetch(`${this.url}task`,{
      method: "GET",
      headers: this.headers,
    });
  const data = await res.json();
  return data;
  }

  // Написати функцію яка відсилає ToDo елемент до API та повертає результат
  async addTodoItem(todoDescription) {
    const res = await fetch(`${this.url}task`,{
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        "description": todoDescription
      }) 
    });
    const data = await res.json();
    return data;
  }

  // Написати функцію яка видаляє ToDo елемент з API
  async removeTodoItem(id) {
      const res = await fetch(`${this.url}task/${id}`,{
        method: "DELETE",
        headers: this.headers,
      });
      const data = await res.json();
      return data;

  }


  // Написати функцію яка оновляє ToDo елемент у API
  async updateTodoItem(id, completed) {
   const res = await fetch(`${this.url}task/${id}`, {
     method: "PUT",
     headers: this.headers,
     body: JSON.stringify({
       "completed": completed
     })
   });
   const data = await res.json();
   return data;
  }

}
export default new Api();
