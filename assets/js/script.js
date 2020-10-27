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
    listItemEl.appendChild( createTaskActions(taskIdCounter) );
    
    // add list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increment task counter
    taskIdCounter++;
} // createTaskEl

/**
 * Makes buttons and dropdwon for the task list item
 * 
 * editButtonEl     Edit    btn edit-btn       data-task-id
 * deleteButtonEl   Delete  btn delete-btn     data-task-id
 * statusSelectEl   ..      select-status      data-task-id
 * statusChoices
 * 
 * actionContainerEl
 * 
 * @param {num} taskId Incremented task counter that serves as a unique id for querying list items
 * @returns {element} Div element with buttons and dropdown to modify the task
 */
function createTaskActions(taskId) {
    var listItem = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    var actionContainerEl = document.createElement("div");

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "select-status");
    statusSelectEl.setAttribute("data-task-id", taskId);
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for(var i=0; i<statusChoices.length; i++) {
        var statusChoice = statusChoices[i];
        var optionEl = document.createElement("option");
        optionEl.textContent = statusChoice;
        optionEl.setAttribute("value", statusChoice);
        statusSelectEl.appendChild(optionEl);
    }

    actionContainerEl.appendChild(editButtonEl);
    actionContainerEl.appendChild(deleteButtonEl);
    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
} // createTaskActions

formEl.addEventListener("submit", taskFormHandler);