const input = document.querySelector('#task-input');
const addTask = document.querySelector('#add-task');   
const todoList = document.querySelector('#task-list');
const compTasks = document.querySelector('#completed-tasks');
const clearTodoBtn = document.querySelector('#clear-tasks');
const clearCompBtn = document.querySelector('#clear-completed');

function saveTasks() {
    const todoTasks = [];
    const completedTasks = [];

    todoList.querySelectorAll('li').forEach(li => {
        todoTasks.push(li.querySelector('span').textContent);
    });

    compTasks.querySelectorAll('li').forEach(li => {
        completedTasks.push(li.querySelector('span').textContent);
    });

    localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function loadTasks() {
    const todoTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    todoTasks.forEach(text => addTaskToList(text, false));
    completedTasks.forEach(text => addTaskToList(text, true));
}

function addTaskToList(taskText, completed = false) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const span = document.createElement('span');
    span.textContent = taskText;

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            compTasks.appendChild(li);
        } else {
            todoList.appendChild(li);
        }
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);

    if (completed) compTasks.appendChild(li);
    else todoList.appendChild(li);

    saveTasks();
};

addTask.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText === "") return;
    addTaskToList(taskText, false);
    input.value = "";
    input.focus();
});

input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText === "") return;
        addTaskToList(taskText, false);
        input.value = "";
        input.focus();
    }
});

clearTodoBtn.addEventListener('click', () => {
    todoList.innerHTML = "";
    saveTasks();
});

clearCompBtn.addEventListener('click', () => {
    compTasks.innerHTML = "";
    saveTasks();
});

window.addEventListener('DOMContentLoaded', loadTasks);