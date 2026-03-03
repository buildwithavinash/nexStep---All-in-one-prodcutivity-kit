let formField = document.querySelector(".notes__form");
const noteTitle = document.querySelector("#noteTitle");
const noteDes = document.querySelector("#noteDes");
let notesList = document.querySelector(".notes__list");
let notes = [];

formField.addEventListener("submit", (e)=>{
    e.preventDefault();

    let noteHeading = noteTitle.value.trim();
    let noteDescription = noteDes.value.trim();

    let newNote = {
        id: Date.now(),
        noteHeading : noteHeading,
        noteDes : noteDescription,
    }

    notes.push(newNote);
    render(notes)
    console.log(notes);

})


function render(){

notesList.innerHTML = "";
    notes.forEach((note)=>{
        
const li = document.createElement('li');
li.classList.add("note__item")

const leftDiv = document.createElement('div');
leftDiv.classList.add("list");

const noteTitle = document.createElement('div');
noteTitle.classList.add("note__title")
noteTitle.textContent = note.noteHeading;

const noteInfo = document.createElement('div');
noteInfo.classList.add("note__info")
noteInfo.textContent = note.noteDes;


leftDiv.append(noteTitle, noteInfo);

const rightDiv = document.createElement('div');
rightDiv.classList.add("right");

const noteDate = document.createElement('div');
noteDate.classList.add("note__date")
noteDate.textContent = '2nd march';

const noteActions = document.createElement('div');
noteActions.classList.add("note__actions");

const editBtn = document.createElement('button');
editBtn.classList.add("btn", "btn-edit")
editBtn.textContent = 'Edit';

const deleteBtn = document.createElement('button');
deleteBtn.classList.add("btn", "btn-delete")
deleteBtn.textContent = 'Delete';

noteActions.append(editBtn, deleteBtn);
rightDiv.append(noteDate, noteActions);

li.append(leftDiv, rightDiv);

notesList.append(li);
    })
}