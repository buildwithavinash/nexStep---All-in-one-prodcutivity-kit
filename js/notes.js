let formField = document.querySelector(".notes__form");
const noteTitle = document.querySelector("#noteTitle");
const noteDes = document.querySelector("#noteDes");
let notesList = document.querySelector(".notes__list");
let addNoteBtn = document.querySelector(".btn-addNotes");
let cancelEditBtn = document.querySelector(".btn-cancelEdit");

// states
let notes = [];
let inEditMode = false;
let itemToEdit = null;



formField.addEventListener("submit", (e)=>{
    e.preventDefault();

    let noteHeading = noteTitle.value.trim();
    let noteDescription = noteDes.value.trim();


    if(inEditMode){
        itemToEdit.noteHeading = noteHeading
        itemToEdit.noteDes = noteDescription

        inEditMode = false;
        itemToEdit = null;
        addNoteBtn.textContent = "Add Note";
        cancelEditBtn.classList.add("hidden");
    }else {
         let newNote = {
        id: Date.now(),
        noteHeading : noteHeading,
        noteDes : noteDescription,
    }

    notes.push(newNote);
    }
    
    renderNotes(notes)
    console.log(notes);

    formField.reset();
})

renderNotes(notes);

function renderNotes(notes){

notesList.innerHTML = "";
    notes.forEach((note)=>{
        
const li = document.createElement('li');
li.classList.add("note__item")
li.dataset.id = note.id

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
noteDate.textContent = dateFormattter(note.id);

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

notesList.addEventListener("click", function(e){
    let target = e.target;
    let card = target.closest(".note__item");
    console.log(card);
    if(!card) return;

    if(target.classList.contains("btn-edit")){
        inEditMode = true;
        noteTitle.focus();

        itemToEdit = notes.find((note)=> note.id === Number(card.dataset.id));
        noteTitle.value = itemToEdit.noteHeading;
        noteDes.value = itemToEdit.noteDes;
        addNoteBtn.textContent = "Update"
        cancelEditBtn.classList.remove("hidden");
    }

    if(target.classList.contains("btn-delete")){
        inEditMode = false;
        itemToEdit = null;
        cancelEditBtn.classList.add("hidden");
        addNoteBtn.textContent = "Add Note"
        notes = notes.filter((note)=> note.id !== Number(card.dataset.id))
        renderNotes(notes);
    }
})

cancelEditBtn.addEventListener("click", function(e){
    inEditMode = false;
    itemToEdit = null;
    formField.reset();
    cancelEditBtn.classList.add("hidden");
    addNoteBtn.textContent = "Add Note"
})

function dateFormattter(id){

    const today = new Date(id);
    const dateOptions = {
        day : "numeric",
        month : "long",
        year : "numeric",
    }
    const formattedDate = today.toLocaleDateString("en-GB", dateOptions);
    return formattedDate;
}