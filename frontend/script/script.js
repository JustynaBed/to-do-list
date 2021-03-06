const todoList = document.querySelector('.todos');
const information = document.querySelector('.information');
const httpForm = document.getElementById('http-form');
const todoInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit-btn');


const url = 'https://5bbeeaa072de1d00132536aa.mockapi.io/todo';

httpForm.addEventListener('submit', submitTodo)

function submitTodo(event) {
    event.preventDefault();
    const todoValue = todoInput.value;

    if(todoValue.length === 0) {
        showInformation('Please enter the value');
    } else {
        postTodoAPI(todoValue);
        todoInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getTodosAPI(showTodos);
})

function showInformation(text) {
    information.classList.add('showInformation');
    information.innerHTML = `<p class="textInformation">${text}</p>`;

    setTimeout(() => {
        information.classList.remove('showInformation');
    }, 3000)
}

function getTodosAPI(cb) {
    const url = 'https://5bbeeaa072de1d00132536aa.mockapi.io/todo';

    const ajax = new XMLHttpRequest();

    ajax.open('GET', url, true);
    ajax.onload = function() {
        if(this.status === 200) {
            cb(this.responseText);
        } else {
        console.log('error')
        }
    }
    ajax.onerror = function() {
        console.log('error')
    }
    ajax.send()
}



function showTodos(data) {
    const todos = JSON.parse(data);
    console.log(todos)
    let renderList = '';

    todos.map(todo => {
        renderList+=
        `
            <div class="row">
                <div class="col col-1">
                    <input id="todo-checkbox-${todo.id}" type="checkbox" name="todo-input" data-id="${todo.id}">
                </div>
                <div class="col col-2">
                    <h3 class="todo-name" id="todo-name-${todo.id}" data-id="${todo.id}">${todo.name}</h3>
                </div>
                <div class="col col-3">
                    <img src="../assets/trash.png" alt="trash-img" class="delete-icon" data-id="${todo.id}">
                </div>
            </div>
        `
    })
    todoList.innerHTML = renderList;
    getIcons();
    getCheckboxes();
}


function postTodoAPI(todoName) {
    const name = todoName;
    const url = 'https://5bbeeaa072de1d00132536aa.mockapi.io/todo';

    const ajax = new XMLHttpRequest();

    ajax.open('POST', url, true);

    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.onload = function () {
        getTodosAPI(showTodos);
    }
    ajax.onerror = function () {
        console.log('error')
    }
    ajax.send(`name=${name}`);
}

function getIcons() {
    const deleteIcons = document.querySelectorAll('.delete-icon');

    deleteIcons.forEach(icon => {
        const todoID = icon.dataset.id;
        icon.addEventListener('click', function(event){
            event.preventDefault();
            deleteTodoAPI(todoID);
        })
    })
}

function getCheckboxes() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach(checkbox => {
        const todoID = checkbox.dataset.id;
        const parent = checkbox.parentElement.parentElement;

        if (checkbox !== undefined && checkbox.length !== 0) {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    parent.querySelector('.todo-name').classList.add('task-done-title');
                    parent.querySelector('.delete-icon').classList.add('task-done-trash');
                } else {
                    parent.querySelector('.todo-name').classList.remove('task-done-title');
                    parent.querySelector('.delete-icon').classList.remove('task-done-trash');
                }
            })
        }
    })
}

function deleteTodoAPI(id) {
    const url = `https://5bbeeaa072de1d00132536aa.mockapi.io/todo/${id}`;

    const ajax = new XMLHttpRequest();

    ajax.open('DELETE', url, true);
    ajax.onload = function () {
        if (this.status === 200) {
            getTodosAPI(showTodos);
        } else {
            console.log('error')
        }
    }
    ajax.onerror = function () {
        console.log('error')
    }
    ajax.send();
}