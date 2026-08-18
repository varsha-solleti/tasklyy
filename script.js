const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
        <input type="checkbox">
        <label>${taskText}</label>
        <button class="delete-btn">🗑️</button>
    `;

    taskList.appendChild(task);

    taskInput.value = "";
});

taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove();
        updateProgress();
    }
});

taskList.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
        updateProgress();
    }
});

function updateProgress() {
    const tasks = taskList.querySelectorAll(".task");
    const completed = taskList.querySelectorAll(".task input:checked");

    const totalTasks = tasks.length;
    const completedCount = completed.length;

    const remainingCount = totalTasks - completedCount;
    const percentage = totalTasks === 0 ? 0 : (completedCount / totalTasks) * 100;

    document.getElementById("remainingTasks").textContent =
        `${remainingCount} tasks remaining`;

    document.getElementById("completedTasks").textContent =
        `${completedCount} of ${totalTasks} tasks completed`;

    document.querySelector(".progress").style.width =
        `${percentage}%`;
}

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTaskBtn.click();
    }
});