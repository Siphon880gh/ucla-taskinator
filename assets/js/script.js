var formEl = document.querySelector("#task-form");
var tasksToDoEl =  document.querySelector("#tasks-to-do");

var taskFormHandler = (event) => {
    event.preventDefault();

    // Capture values
    var taskNameInput = document.querySelector("input[name='task-name']")
    var taskNameInputVal = taskNameInput.value;

    var taskTypeOption = document.querySelector("select[name='task-type']");
    var taskTypeOptionVal = taskTypeOption.value;

    // Validate values
    if(taskNameInputVal.length===0) {
        alert("Error: Enter a name for the task.");
        taskNameInput.focus();
        return false;
    }
    if(taskTypeOptionVal.length===0) {
        alert("Error: Select a task type.");
        taskTypeOption.focus();
        return false;
    }

    createTaskEl({name:taskNameInputVal, type:taskTypeOptionVal});
}

var createTaskEl = (taskDataObj) => {
    var {name, type} = taskDataObj;

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info
    var taskInfoEl = document.createElement("div");
    taskInfoEl.innerHTML = `<h3 class="task-name">${name}</h3><span class="task-type">${type}</span>`;

    listItemEl.appendChild(taskInfoEl);
    
    // add list item to list
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);