var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl =  document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;

tasksToDoEl.addEventListener("dragover", allowDrop);
tasksToDoEl.addEventListener("dragover", styleDropZone);
tasksToDoEl.addEventListener("dragleave", unstyleDropZone);
tasksToDoEl.addEventListener("drop", dropZoneHandler);
tasksToDoEl.addEventListener("drop", unstyleDropZone);

tasksInProgressEl.addEventListener("dragover", allowDrop);
tasksInProgressEl.addEventListener("dragover", styleDropZone);
tasksInProgressEl.addEventListener("dragleave", unstyleDropZone);
tasksInProgressEl.addEventListener("drop", dropZoneHandler);
tasksInProgressEl.addEventListener("drop", unstyleDropZone);

tasksCompletedEl.addEventListener("dragover", allowDrop);
tasksCompletedEl.addEventListener("dragover", styleDropZone);
tasksCompletedEl.addEventListener("dragleave", unstyleDropZone);
tasksCompletedEl.addEventListener("drop", dropZoneHandler);
tasksCompletedEl.addEventListener("drop", unstyleDropZone);


/* Default behavior is that an element is never droppable. So you have to preventDefault */
function allowDrop(event) {
    event.preventDefault();
}

// Todo: Review; Unlike jQuery's .closest, js .closest finds the closest ancestor that matches the query or is okay with the element matching the query too
// So this is unnecessary: if(event.target.matches(".task-list") || event.target.closest(".task-list"))
function styleDropZone(event) {
    if(event.target.closest(".task-list"))
        event.target.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");

}

function unstyleDropZone(event) {
    event.target.removeAttribute("style");
}

function dropZoneHandler(event) {
    var taskListEl = event.target.closest(".task-list");
    if(taskListEl) {
        var taskId = event.dataTransfer.getData("dragSessionTaskId");
        var taskEl = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
        taskListEl.append(taskEl);

        // Change status dropdown in the task item
        var taskStatusEl = taskEl.querySelector(`select`);
        if(taskListEl.matches("#tasks-to-do")) {
            taskStatusEl.value = "To Do";
        } else if(taskListEl.matches("#tasks-in-progress")) {
            taskStatusEl.value = "In Progress";

        } else if(taskListEl.matches("#tasks-completed")) {
            taskStatusEl.value = "Completed";

        }
    }
}

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

    // The form either creates a new task or edits an existing task
    var isEdit = formEl.hasAttribute("data-task-id");
    if(isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask({name:taskNameInputted, type:taskTypeInputted, taskId});
    } else {
        createTaskEl({name:taskNameInputted, type:taskTypeInputted});
    }
    formEl.reset();
} // taskFormHandler


function completeEditTask(editTaskObj) {
    var {name, type, taskId} = editTaskObj;
    var selectedTask = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    selectedTask.querySelector(".task-name").textContent = name;
    selectedTask.querySelector(".task-type").textContent = type;

    formEl.removeAttribute("data-task-id");

    var submitBtn = document.querySelector("#save-task");
    submitBtn.textContent = "Add Task";
} // completeEditTask

var createTaskEl = (taskDataObj) => {
    var {name, type} = taskDataObj;

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("draggable", true);

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
    statusSelectEl.addEventListener("change", taskStatusChangeHandler);
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
pageContentEl.addEventListener("dragstart", dragTaskHandler);

function dragTaskHandler(event) {
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("dragSessionTaskId", taskId);
}

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

function taskStatusChangeHandler(event) {
    var taskId = event.target.getAttribute("data-task-id");
    var taskEl = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

    var statusInputted = event.target.value.toLowerCase();

    switch(statusInputted) {
        case "to do":
            tasksToDoEl.appendChild(taskEl);
            break;
        case "in progress":
            tasksInProgressEl.appendChild(taskEl);
            break;
        case "completed":
            tasksCompletedEl.appendChild(taskEl);
    }

}

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

    formEl.setAttribute("data-task-id", taskId);

    var submitBtn = document.querySelector("#save-task");
    submitBtn.textContent = "Save Task";
    
}