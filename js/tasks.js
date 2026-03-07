const form = document.querySelector("form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector(".task__list");
let dropdownTrigger = document.querySelector(".dropdown__trigger");
let dropdownMenu = document.querySelector(".dropdown__menu");
let dropdownOptions = document.querySelectorAll(".dropdown__menu li");
let addTaskBtn = document.querySelector(".btn-addTask");
let cancelEditBtn = document.querySelector(".btn-cancelEdit");
let filterControls = document.querySelector(".filter__controls");
let filterBySearch = document.querySelector(".filter__by__search");
// states
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let inEditMode = false;
let itemToEdit = null;
let currentFilter = "all";
let searchQuery = "";
let selectedCateogry = "General";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let taskTitle = taskInput.value.trim();
  let category = selectedCateogry;
  if (!taskTitle) return;

  if (inEditMode) {
    itemToEdit.taskName = taskTitle;
    itemToEdit.category = category;
    inEditMode = false;
    itemToEdit = null;
    addTaskBtn.textContent = "Add Task";
    cancelEditBtn.classList.add("hidden");
  } else {
    let newTask = {
      id: Date.now(),
      taskName: taskTitle,
      category: category,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
  }

  applyFilter();

  dropdownTrigger.textContent = "Select Category";
  form.reset();
});

applyFilter();

function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task__item");
    li.dataset.id = task.id;

    // LEFT SIDE
    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task__left");

    // META DATA (status + category)
    const taskMetaData = document.createElement("div");
    taskMetaData.classList.add("task__metaData");

    const taskStatus = document.createElement("div");
    taskStatus.classList.add("task__status");
    taskStatus.textContent = task.completed ? "Completed" : "Pending";

    const taskCategory = document.createElement("div");
    taskCategory.classList.add("task__category");
    taskCategory.textContent = task.category || "General";

    taskMetaData.append(taskStatus, taskCategory);

    // TASK NAME
    const taskNameDiv = document.createElement("div");
    taskNameDiv.classList.add("task__name");
    taskNameDiv.textContent = task.taskName;

    taskLeft.append(taskMetaData, taskNameDiv);

    // RIGHT SIDE
    const taskRight = document.createElement("div");
    taskRight.classList.add("task__right");

    const taskAction = document.createElement("div");
    taskAction.classList.add("task__action");

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-edit");
    editBtn.textContent = "✏️";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.textContent = "❌";

    taskAction.append(editBtn, deleteBtn);
    taskRight.append(taskAction);

    // COMBINE EVERYTHING
    li.append(taskLeft, taskRight);

    taskList.append(li);
  });
}

taskList.addEventListener("click", function (e) {
  let target = e.target;
  let closestTask = target.closest(".task__item");
  if (!closestTask) return;

  if (target.classList.contains("task__status")) {
    tasks.forEach((task) => {
      if (task.id === Number(closestTask.dataset.id)) {
        task.completed = !task.completed;
      }
    });

    saveTasks();
    applyFilter();
  }

  if (target.classList.contains("btn-delete")) {
    tasks = tasks.filter((task) => task.id !== Number(closestTask.dataset.id));

    saveTasks();
    applyFilter();
  }

  if (target.classList.contains("btn-edit")) {
    inEditMode = true;
    taskInput.focus();

    itemToEdit = tasks.find(
      (task) => task.id === Number(closestTask.dataset.id),
    );
    taskInput.value = itemToEdit.taskName;
    addTaskBtn.textContent = "Update";
    cancelEditBtn.classList.remove("hidden");
  }
});

cancelEditBtn.addEventListener("click", function () {
  inEditMode = false;
  itemToEdit = null;
  form.reset();
  cancelEditBtn.classList.add("hidden");
  addTaskBtn.textContent = "Add Task";
});

// filter by status
filterControls.addEventListener("click", function (e) {
  let target = e.target;

  const btn = e.target.closest("button");
  if (!btn) return;

  if (target.classList.contains("filter__all")) currentFilter = "all";
  if (target.classList.contains("filter__pending")) currentFilter = "pending";
  if (target.classList.contains("filter__completed"))
    currentFilter = "completed";

  applyFilter();
});

filterBySearch.addEventListener("input", function (e) {
  searchQuery = e.target.value.trim().toLowerCase();

  applyFilter();
});

function applyFilter() {
  let result = tasks;

  if (currentFilter === "pending") {
    result = result.filter((t) => !t.completed);
  } else if (currentFilter === "completed") {
    result = result.filter((t) => t.completed);
  }

  if (searchQuery) {
    result = result.filter((t) =>
      t.taskName.toLowerCase().includes(searchQuery),
    );
  }

  renderTasks(result);
  updateDashboardStats();
  renderRecentTasks();
  
}

// dropdown

dropdownTrigger.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

dropdownOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectedCateogry = option.textContent;
    dropdownTrigger.textContent = selectedCateogry;

    dropdownMenu.classList.add("hidden");
  });
});


// save tasks

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// stats

function updateDashboardStats(){

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;


    document.querySelector("#totalTasks").textContent = total;
document.querySelector("#completedTasks").textContent = completed;
document.querySelector("#pendingTasks").textContent = pending;
}

// recent tasks

function renderRecentTasks(){
    const list = document.querySelector(".recentTasksList");

    if(!list) return;

    list.innerHTML = "";

    const recent = tasks.slice(-3).reverse();

    recent.forEach(task => {
        const li = document.createElement("li");

        li.textContent = `${task.taskName} (${task.category})`;

        list.append(li);
    });
}


