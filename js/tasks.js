const form = document.querySelector("form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector(".task__list");
let addTaskBtn = document.querySelector(".btn-addTask");
let cancelEditBtn = document.querySelector(".btn-cancelEdit");

// states
let tasks = [];
let inEditMode = false;
let itemToEdit = null;

form.addEventListener("submit", function(e){
    e.preventDefault();

    let taskTitle = taskInput.value.trim();
    if(!taskTitle) return;

    if(inEditMode){
        itemToEdit.taskName = taskTitle;

        inEditMode = false;
        itemToEdit = null;
        addTaskBtn.textContent = "Add Task";
        cancelEditBtn.classList.add("hidden");
    }else {
let newTask = {
        id: Date.now(),
        taskName: taskTitle,
        completed: false
    }

    tasks.push(newTask);
    }
    

    renderTasks(tasks);

    form.reset();
})

renderTasks(tasks);


function renderTasks(tasks){
    taskList.innerHTML = "";

    tasks.forEach((task)=>{
        const li = document.createElement("li");
  li.classList.add("task__item");
  li.dataset.id = task.id;

  // LEFT SIDE
  const taskLeft = document.createElement("div");
  taskLeft.classList.add("task__left");

  const taskStatus = document.createElement("div");
  taskStatus.classList.add("task__status");
  taskStatus.textContent = `${task.completed ? "Completed" : "Pending"}`;

  const taskNameDiv = document.createElement("div");
  taskNameDiv.classList.add("task__name");
  taskNameDiv.textContent = task.taskName;

  taskLeft.append(taskStatus, taskNameDiv);

  // RIGHT SIDE
  const taskRight = document.createElement("div");
  taskRight.classList.add("task__right");

  const taskAction = document.createElement("div");
  taskAction.classList.add("task__action");

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "btn-edit");
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-delete");
  deleteBtn.textContent = "Delete";

  taskAction.append(editBtn, deleteBtn);
  taskRight.append(taskAction);

  // Combine everything
  li.append(taskLeft, taskRight);

  taskList.append(li);
    })
}

taskList.addEventListener("click", function(e){
    let target = e.target;
    let closestTask = target.closest(".task__item");
    if(!closestTask) return;

    if(target.classList.contains("task__status")){
        tasks.forEach((task)=>{
            if(task.id === Number(closestTask.dataset.id)){
                task.completed = !task.completed;
            }
        })
        renderTasks(tasks);
    }


    if(target.classList.contains("btn-delete")){
        tasks = tasks.filter((task)=> task.id !== Number(closestTask.dataset.id));
        renderTasks(tasks)
    }

    if(target.classList.contains("btn-edit")){
         inEditMode = true;
        taskInput.focus();

        itemToEdit = tasks.find((task)=> task.id === Number(closestTask.dataset.id));
        taskInput.value = itemToEdit.taskName;
        addTaskBtn.textContent = "Update"
        cancelEditBtn.classList.remove("hidden");
    }
})


cancelEditBtn.addEventListener("click", function(){
    inEditMode = false;
    itemToEdit = null;
    form.reset();
    cancelEditBtn.classList.add("hidden");
    addTaskBtn.textContent = "Add Task"
})

