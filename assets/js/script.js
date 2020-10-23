var buttonEl = document.querySelector("#save-task");
var tasksToDoEl =  document.querySelector("#tasks-to-do");

var createTaskHandler = () => {
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    var textContentVal = prompt("What should you name the task?");
    taskItemEl.textContent = textContentVal;
    
    tasksToDoEl.appendChild(taskItemEl);
}

buttonEl.addEventListener("click", createTaskHandler);