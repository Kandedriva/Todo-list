
// GLOBAL VARIABLES
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

//TIME CREATION
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

//CREATE FORM TO EDIT THE NOTES
const editNoteForm = document.createElement("form");
          const editNoteTitle = document.createElement("input")
            const editNoteDetail = document.createElement("textarea")
            const editButton = document.createElement("button");
            const breakLine = document.createElement("br");
            const titleLabel = document.createElement("label")
            const detailLabel = document.createElement("label")

            titleLabel.textContent = "Title"
            detailLabel.textContent = "Details"
            editNoteForm.setAttribute("class", "note-form")
            editButton.setAttribute("class", "create-note");
            editButton.textContent = "Save";
            editNoteTitle.setAttribute("class", "note-tittle");
            editNoteDetail.setAttribute("cols", "40");
            editNoteDetail.setAttribute("rows", "5");
            
            editNoteForm.style.display = "none"

            editNoteForm.append(titleLabel, editNoteTitle, breakLine, detailLabel, editNoteDetail, editButton)
            console.log(editNoteForm)
            noteList.appendChild(editNoteForm)


displayNoteForm.style.display = "none";
newNote.style.display = "none";

// EVENT LISTENERS TO SWITCH THE BUTTONS AND THEIR TEXT-ONTENT
anewNoteForm.addEventListener("click", (e)=>{
    if(anewNoteForm.textContent === "Create New Note"){
        anewNoteForm.textContent = "Notes List"
        newNote.style.display = "";
    noteList.style.display = "none";

    }else{
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

  //FONCTION TO CREATE NOTES
  function noteCreator(note){  

    //NOTES FORMAT CREATION
          const noteTile = document.createElement("h2");
          const noteDetails = document.createElement("p");
          const noteContaine = document.createElement("div");
          const theDate = document.createElement("p");
          const removeNote = document.createElement("button")
          const editNote = document.createElement("button");

          const dateOfCreation = note.date;
          const id = note.id
          theDate.textContent = dateOfCreation;
          noteContaine.setAttribute("class", "note-container")
          removeNote.setAttribute("class", "remove-note ")
          theDate.setAttribute("class", "the-date")
          removeNote.textContent = "Remove Note";
          editNote.textContent = "Edit"
          editNote.setAttribute("class", "fa-solid fa-file-pen edit-note")

          noteTile.textContent = note.noteTitle;
          noteDetails.textContent = note.details;
          noteContaine.append(editNote, noteTile, noteDetails, theDate, removeNote)
          noteList.appendChild(noteContaine);

          //DELETE REQUEST TO REMOVE A NOTE
          removeNote.addEventListener("click", ()=>{
            fetch(`http://localhost:3000/notes/${id}`,{
                method: "DELETE",
            })
            .then(response => response.json())
            .then(removeNotes =>{noteContaine.remove()
            }
            )
        })
        //DISPLAY THE EDIT NOTE FORME
        editNote.addEventListener("click", ()=>{
            editNoteForm.style.display = ""
        editNoteTitle.value =  noteTile.textContent;
        editNoteDetail.value = noteDetails.textContent;  
        changeNote()
      
        })

        // FUNCTION TO MAKE THE PATCH REQUEST TO EDIT A NOTE
        function changeNote(){
            editNoteForm.addEventListener("submit", (e)=>{
                e.preventDefault();

                const noteEdited = {
                    noteTitle:  editNoteTitle.value,
                    details: editNoteDetail.value
                }
                noteTile.textContent = noteEdited.noteTitle;
                noteDetails.textContent = noteEdited.details;
                
                //PATCH REQUEST TO EDIT A NOTE
                fetch(`http://localhost:3000/notes/${id}`,{
                    method: "PATCH",
                    headers: {"content-type": "application/json",
                               "accept": "application/json"
                },
                body: JSON.stringify(noteEdited)
                })
                .then(response=>response.json())
                .then(newNote=>{
                    console.log(newNote)
                    newNote.noteTitle = noteEdited.noteTitle;
                    newNote.details = noteEdited.details;
                    
                })
                editNoteForm.style.display = "none"
            })
            

        }

  }

//GET REQUEST TO DISPLAY ALL THE NOTES
  function displayNotes(){
    fetch("http://localhost:3000/notes")
    .then(response =>response.json())
    .then(theNotes =>{
        console.log(theNotes)
        theNotes.forEach(theNote=>noteCreator(theNote))
    })
  
  }

  displayNotes()

  //ADD EVENT LISTENER TO THE NOTE CREATION FORM
newNote.addEventListener("submit", (event)=>{
    event.preventDefault();
    const newNoteTitle = document.getElementById("title").value;
    const newNoteDetails = document.getElementById("details").value;
    const today = new Date();
          const creationDate = today.toLocaleString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
    const createdNote = {
        date: creationDate,
        noteTitle: newNoteTitle,
        details: newNoteDetails
    }
    //POST REQUEST TO CREATE A NEW NOTE
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

  //FONCTION TO CREATE A TASK FOR TODO LIST

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
    //DELETE REQUEST TO REMOVE A TASK FROM TODO LIST
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

    //GET REQUEST TO DIPLAY ALL THE TODO LIST TASKS
function displayTaskList(){
    fetch("http://localhost:3000/todoList")
.then(response =>response.json())
.then(tasks =>{
    console.log(tasks)
    tasks.forEach(task => taskList(task));
});
} 
displayTaskList();

// POST REQUEST TO CREATE A NEW TASK FOR TODO LIST
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
});




