var formEl = document.querySelector("#task-form");
var tasksToDoEl =  document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

var taskFormHandler = (event) => {
    event.preventDefault();

    // Capture values
    var taskNameInput = document.querySelector("input[name='task-name']")
    var taskNameInputVal = taskNameInput.value;

    var taskTypeOption = document.querySelector("select[name='task-type']");
    var taskTypeOptionVal = taskTypeOption.value;

    // Validate values
    if(!taskNameInputVal || !taskTypeOptionVal) {
        alert("Error: You need to fill out the task form.");
        return false;
    }
    formEl.reset();

    createTaskEl({name:taskNameInputVal, type:taskTypeOptionVal});
}

var createTaskEl = (taskDataObj) => {
    var {name, type} = taskDataObj;

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add unique task id based on task counter for querying
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info
    var taskInfoEl = document.createElement("div");
    taskInfoEl.innerHTML = `<h3 class="task-name">${name}</h3><span class="task-type">${type}</span>`;

    listItemEl.appendChild(taskInfoEl);
    
    // add list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increment task counter
    taskIdCounter++;
}

formEl.addEventListener("submit", taskFormHandler);