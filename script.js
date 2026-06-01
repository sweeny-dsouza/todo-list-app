const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const pendingTasks = document.getElementById("pendingTasks");

const clearAllBtn = document.getElementById("clearAllBtn");

const emptyMessage = document.getElementById("emptyMessage");


// LOAD TASKS WHEN PAGE LOADS

window.addEventListener("DOMContentLoaded", loadTasks);


// ADD TASK BUTTON

addTaskBtn.addEventListener("click", addTask);


// ENTER KEY

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();
    }

});


// ADD TASK FUNCTION

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task!");

        return;
    }

    createTaskElement(taskText, false);

    saveTasks();

    taskInput.value = "";

    updateStats();
}


// CREATE TASK ELEMENT

function createTaskElement(taskText, isCompleted) {

    const li = document.createElement("li");

    li.classList.add("task-item");

    if (isCompleted) {

        li.classList.add("completed");
    }


    li.innerHTML = `

        <div class="left-section">

            <div class="complete-btn">
                <i class="fa-solid fa-check"></i>
            </div>

            <span class="task-text">${taskText}</span>

        </div>

        <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>

    `;


    // COMPLETE TASK

    const completeBtn = li.querySelector(".complete-btn");

    completeBtn.addEventListener("click", () => {

        li.classList.toggle("completed");

        saveTasks();

        updateStats();

    });


    // DELETE TASK

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {

        li.remove();

        saveTasks();

        updateStats();

    });


    taskList.appendChild(li);

    updateEmptyState();
}


// UPDATE STATS

function updateStats() {

    const allTasks = document.querySelectorAll(".task-item");

    const completed = document.querySelectorAll(".completed");

    taskCount.textContent = allTasks.length;

    totalTasks.textContent = allTasks.length;

    completedTasks.textContent = completed.length;

    pendingTasks.textContent =
        allTasks.length - completed.length;

    updateEmptyState();
}


// EMPTY STATE

function updateEmptyState() {

    if (taskList.children.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";
    }
}


// SAVE TASKS

function saveTasks() {

    const tasks = [];

    document.querySelectorAll(".task-item").forEach(task => {

        tasks.push({

            text: task.querySelector(".task-text").textContent,

            completed: task.classList.contains("completed")

        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// LOAD TASKS

function loadTasks() {

    const savedTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {

        createTaskElement(task.text, task.completed);

    });

    updateStats();
}


// CLEAR ALL

clearAllBtn.addEventListener("click", () => {

    taskList.innerHTML = "";

    localStorage.removeItem("tasks");

    updateStats();

});