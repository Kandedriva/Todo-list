const todoList = document.getElementById("todoList");
const checkbox = document.getElementById("checkbox")
const checkMe = document.getElementById("check-me");
const theDate = document.getElementById("current-date");
const listForm = document.getElementById("list-form");


function taskList(task){
    const todoContainer = document.getElementById("todoContainer");
    const todoItem = document.createElement("p");
    const checkbox = document.createElement("input");
    const div = document.createElement("div");
    const remove = document.createElement("button");
    remove.textContent =("Remove task 🗑️")
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "check-box");
    todoItem.setAttribute("class", "checkbox");
    remove.setAttribute("class", "remove-task");
    div.setAttribute("class", "task-div")
    todoItem.textContent = task.todo;
    div.appendChild(checkbox)
    div.appendChild(todoItem);
    div.appendChild(remove)
    todoContainer.appendChild(div);
    todoList.appendChild(todoContainer);

    function modifyText(anItem){
        checkbox.checked = anItem.lineThrough;
        todoItem.classList.toggle("lineThrough", anItem.lineThrough);
    }
    const id = task.id;
    console.log(id)

    checkbox.addEventListener("click", ()=>{
        const lineThrough = checkbox.checked;

        fetch(`http://localhost:3000/todoList/${id}`,{
            method: "PATCH",
            headers:{
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({lineThrough})
        })
        .then(response =>response.json())
        .then(text=> {
            modifyText(text)
        })
        .catch(error => console.error("There was an error:", error))
    })
    remove.addEventListener("click", e=>{
        fetch(`http://localhost:3000/todoList/${id}`,{
            method: "DELETE",
        })
        .then(response => response.json())
        .then(removeTask =>{div.remove()
        }
        )
        

    })
}

function displayTask(){
    fetch("http://localhost:3000/todoList")
.then(response =>response.json())
.then(tasks =>{
    console.log(tasks)
    tasks.forEach(task => taskList(task));
});
} 
displayTask();

listForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const itemInput = document.getElementById("item-input");
    const newItem = itemInput.value;
    const addItem ={
        todo: newItem
    }
    fetch("http://localhost:3000/todoList",{
        method: "POST",
        headers:{
            "accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify(addItem)
    })
    
    .then(response => response.json())
    .then(todo =>taskList(todo))
    itemInput.value = ""
})


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