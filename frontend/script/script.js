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
        console.log(todoValue)
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
    console.log(data);
    const todos = JSON.parse(data);
    console.log(todos);

    let renderList = '';

    todos.map(todo => {
        renderList+=
        `
            <div class="row">
                <div class="col col-1">
                    <input class="checkbox" type="checkbox" name="" data-id="${todo.id}">
                </div>
                <div class="col col-2">
                    <h3>${todo.name}</h3>
                </div>
                <div class="col col-3">
                    <img src="../assets/trash.png" alt="" class="delete-icon">
                </div>
            </div>
        `
    })
    todoList.innerHTML = renderList
}

function postTodoAPI(todoName) {
    const name = todoName;
    const url = 'https://5bbeeaa072de1d00132536aa.mockapi.io/todo';

    const ajax = new XMLHttpRequest();

    ajax.open('POST', url, true);

    ajax.setRequestHeader('Content-Type', 'application/x-www.form-urlencoded');
    ajax.onload = function () {
        getTodosAPI(showTodos);
    }
    ajax.onerror = function () {
        console.log('error')
    }
    ajax.send(`name=${name}`);
}
