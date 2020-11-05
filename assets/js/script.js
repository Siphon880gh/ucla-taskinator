var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl =  document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

var taskFormHandler = (event) => {
    event.preventDefault();

    // Capture values
    var taskNameInputted = document.querySelector("input[name='task-name']").value;

    var taskTypeInputted = document.querySelector("select[name='task-type']").value;

    // Validate values
    if(!taskNameInputted || !taskTypeInputted) {
        alert("Error: You need to fill out the task form.");
        return false;
    }

    var submitBtn = document.querySelector("#save-task");

    // The form either creates a new task or edits an existing task
    var isEdit = submitBtn.hasAttribute("data-task-id");
    if(isEdit) {
        var taskId = submitBtn.getAttribute("data-task-id");
        completeEditTask({name:taskNameInputted, type:taskTypeInputted, taskId});
    } else {
        createTaskEl({name:taskNameInputted, type:taskTypeInputted});
    }
    formEl.reset();
}


function completeEditTask(editTaskObj) {
    var {name, type, taskId} = editTaskObj;
    var selectedTask = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    selectedTask.querySelector(".task-name").textContent = name;
    selectedTask.querySelector(".task-type").textContent = type;

    var submitBtn = document.querySelector("#save-task");
    submitBtn.removeAttribute("data-task-id");
    submitBtn.textContent = "Add Task";
} // completeEditTask

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
pageContentEl.addEventListener("click", taskButtonHandler);

function taskButtonHandler(event) {
    console.log(event.target)
    if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    } else if (event.target.matches(".edit-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
};

function deleteTask(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if(confirm("Delete task?")) taskSelected.remove();
};

function editTask(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var title = taskSelected.querySelector(".task-name").textContent;
    var taskType = taskSelected.querySelector(".task-type").textContent;

    var formTaskName = document.querySelector("input[name='task-name']");
    var formTaskType = document.querySelector("select[name='task-type']");
    formTaskName.value = title;
    formTaskType.value = taskType;

    var submitBtn = document.querySelector("#save-task");
    submitBtn.textContent = "Save Task";
    submitBtn.setAttribute("data-task-id", taskId);
    
}