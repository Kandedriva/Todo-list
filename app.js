const todoList = document.getElementById("todoList");
const checkbox = document.getElementById("checkbox")
const checkMe = document.getElementById("check-me");



fetch("http://localhost:3000/todoList")
.then(response =>response.json())
.then(tasks =>{
    console.log(tasks)
    tasks.forEach(task => {
        const todoContainer = document.getElementById("todoContainer");
       const todoItem = document.createElement("p");
       const checkbox = document.createElement("input");
       const div = document.createElement("div");
       const remove = document.createElement("button");
       remove.textContent =("rmv")


       checkbox.setAttribute("type", "checkbox");
       todoItem.setAttribute("class", "checkbox");
       remove.setAttribute("class", "remove-task");


       todoItem.textContent = task.todo;

       div.appendChild(checkbox)
       div.appendChild(todoItem);
       div.appendChild(remove)
       todoContainer.appendChild(div);
       todoList.appendChild(todoContainer);



    });
});