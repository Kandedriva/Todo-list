const todoList = document.getElementById("todoList");
const checkbox = document.getElementById("checkbox")
const checkMe = document.getElementById("check-me");
const theDate = document.getElementById("current-date");




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
       div.setAttribute("class", "task-div")
       todoItem.textContent = task.todo;
       div.appendChild(checkbox)
       div.appendChild(todoItem);
       div.appendChild(remove)
       todoContainer.appendChild(div);
       todoList.appendChild(todoContainer);



    });
});

//Create and display current Time 

let date = new Date();
const currentDate = date.toLocaleString("en-US", {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
});
theDate.textContent = currentDate;

function updateTime() {
  const timeElement = document.getElementById('time');

  timeElement.textContent = new Date().toLocaleTimeString();
}

updateTime();

setInterval(updateTime, 1000);