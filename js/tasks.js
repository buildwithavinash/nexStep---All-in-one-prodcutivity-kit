const form = document.querySelector("form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector(".task__list");
let tasks = [];

form.addEventListener("submit", function(e){
    e.preventDefault();

    let taskTitle = taskInput.value.trim();

    if(!taskTitle) return;

    let newTask = {
        id: Date.now(),
        taskName: taskTitle,
        completed: false
    }

    tasks.push(newTask);

    renderTasks(tasks);
    console.log(tasks);

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


