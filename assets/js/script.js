var formEl = document.querySelector("#task-form");
var tasksToDoEl =  document.querySelector("#tasks-to-do");

var createTaskHandler = (event) => {
    event.preventDefault();

    // var textContentVal = prompt("What should you name the task?");
    // taskItemEl.textContent = textContentVal;
    var inputNameEl = document.querySelector("input[name='task-name']")
    var taskNameInputVal = inputNameEl.value;

    var taskTypeSelected = document.querySelector("select[name='task-type']").value;

    if(taskNameInputVal.length===0) {
        alert("Error: Enter a name for the task");
        inputNameEl.focus();
        return false;
    }

    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.innerHTML = `<h3 class="task-name">${taskNameInputVal}</h3><span class="task-type">${taskTypeSelected}</span>`;
    
    tasksToDoEl.appendChild(taskItemEl);
}

formEl.addEventListener("submit", createTaskHandler);