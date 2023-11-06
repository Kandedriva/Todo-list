const todoList = document.getElementById("todoList");



fetch("http://localhost:3000/todoList")
.then(response =>response.json())
.then(tasks =>{
    console.log(tasks)
    tasks.forEach(task => {
        const todo = document.createElement("p");
        todo.setAttribute("class", "each-task")
        todo.textContent = task.todo;
        todoList.appendChild(todo);
        console.log(todo)
    });
});