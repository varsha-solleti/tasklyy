const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");


// ADD TASK
addTaskBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    createTask(taskText);

    taskInput.value = "";

    updateProgress();
    saveTasks();
});


// CREATE TASK
function createTask(taskText) {

    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
        <input type="checkbox">
        <label>${taskText}</label>
        <button class="delete-btn">🗑️</button>
    `;

    taskList.appendChild(task);
}


// DELETE TASK
taskList.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-btn")) {

        event.target.parentElement.remove();

        updateProgress();
        saveTasks();
    }
});


// CHECKBOX
taskList.addEventListener("change", function (event) {

    if (event.target.type === "checkbox") {

        updateProgress();
        saveTasks();
    }
});


// ENTER KEY
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTaskBtn.click();
    }
});


// UPDATE PROGRESS
function updateProgress() {

    const tasks = taskList.querySelectorAll(".task");
    const completed = taskList.querySelectorAll(".task input:checked");

    const totalTasks = tasks.length;
    const completedCount = completed.length;

    const remainingCount = totalTasks - completedCount;

    const percentage =
        totalTasks === 0
        ? 0
        : (completedCount / totalTasks) * 100;

    document.getElementById("remainingTasks").textContent =
        `${remainingCount} tasks remaining`;

    document.getElementById("completedTasks").textContent =
        `${completedCount} of ${totalTasks} tasks completed`;

    document.querySelector(".progress").style.width =
        `${percentage}%`;
   
        
    
updateEmptyMessage();
}


// SAVE TASKS
function saveTasks() {

    const tasks = [];

    document.querySelectorAll(".task").forEach(function (task) {

        const text = task.querySelector("label").textContent;

        const completed =
            task.querySelector("input").checked;

        tasks.push({
            text: text,
            completed: completed
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// LOAD TASKS
function loadTasks() {

    const savedTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function (task) {

        createTask(task.text);

        const allTasks =
            document.querySelectorAll(".task");

        const lastTask =
            allTasks[allTasks.length - 1];

        lastTask.querySelector("input").checked =
            task.completed;
    });

    updateProgress();
}

function updateEmptyMessage() {
    const tasks = taskList.querySelectorAll(".task");

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


// START APP
loadTasks();