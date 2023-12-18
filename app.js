const todoList = document.getElementById("todoList");
const checkbox = document.getElementById("checkbox")
const checkMe = document.getElementById("check-me");
const theDate = document.getElementById("current-date");
const listForm = document.getElementById("list-form");
const displayTodoList = document.getElementById("display-todolist");
const displayNoteList = document.getElementById("display-notelist");
const displayNoteForm = document.getElementById("display-note-form");
const displayTask = document.getElementById("display-task");
const newNote = document.getElementById("noteForm");
const anewNoteForm = document.getElementById("display-noteForm")
const noteList = document.getElementById("noteList");


displayNoteForm.style.display = "none";
newNote.style.display = "none";
// noteList.style.display = "";

anewNoteForm.addEventListener("click", (e)=>{
    if(anewNoteForm.textContent === "Create New Note"){
        anewNoteForm.textContent = "Notes List"
        newNote.style.display = "";
    noteList.style.display = "none";

    }else{
        // anewNoteForm.textContent = "Notes List"
        anewNoteForm.textContent = "Create New Note"
        newNote.style.display = "none";
        noteList.style.display = "";
    }
    
})

displayTodoList.addEventListener("click", ()=>{
    displayNoteForm.style.display = "none";
    displayTask.style.display = "";
    newNote.style.display = "none";
        noteList.style.display = "";
        
  })
  
  displayNoteList.addEventListener("click", ()=>{
    displayNoteForm.style.display = "";
    displayTask.style.display = "none";
    

   
  })

  function noteCreator(note){  
        //   const noteList = document.getElementById("noteList");
          const noteTile = document.createElement("h2");
          const noteDetails = document.createElement("p");
          const noteContaine = document.createElement("div");
          const theDate = document.createElement("p");
          const removeNote = document.createElement("button")
       const today = new Date();
       const id = note.id

          const creationDate = today.toLocaleString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        
          theDate.textContent = `Note created ${creationDate}`;
          noteContaine.setAttribute("class", "note-container")
          removeNote.setAttribute("class", "remove-note")
          theDate.setAttribute("class", "the-date")


          removeNote.textContent = "Remove Note"


          noteTile.textContent = note.noteTitle;
          noteDetails.textContent = note.details;
          noteContaine.append(noteTile, noteDetails, theDate, removeNote)
          noteList.appendChild(noteContaine);

          removeNote.addEventListener("click", ()=>{
            fetch(`http://localhost:3000/notes/${id}`,{
                method: "DELETE",
            })
            .then(response => response.json())
            .then(removeNotes =>{noteContaine.remove()
            }
            )
        })

     
 

  }

  function displayNotes(){
    fetch("http://localhost:3000/notes")
    .then(response =>response.json())
    .then(theNotes =>{
        theNotes.forEach(theNote=>noteCreator(theNote))
    })
  
  }
  displayNotes()
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

function displayTaskList(){
    fetch("http://localhost:3000/todoList")
.then(response =>response.json())
.then(tasks =>{
    console.log(tasks)
    tasks.forEach(task => taskList(task));
});
} 
displayTaskList();

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

newNote.addEventListener("submit", (event)=>{
    event.preventDefault();
    const newNoteTitle = document.getElementById("title").value;
    const newNoteDetails = document.getElementById("details").value;
    const createdNote = {
        noteTitle: newNoteTitle,
        details: newNoteDetails
    }
    fetch("http://localhost:3000/notes",{
        method: "POST",
        headers: { 
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(createdNote)
    })
    .then(response =>response.json())
    .then(newNotes =>{
        console.log()
        noteCreator(newNotes)
        document.getElementById("title").value = "";
        document.getElementById("details").value = "";
        newNote.style.display = "none";
        noteList.style.display = "";
    })
    
})

