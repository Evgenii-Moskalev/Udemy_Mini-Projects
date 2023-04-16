const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

const getToDos = () => {
    fetch(apiUrl + '?_limit=9')
        .then((res) => res.json())
        .then((data) => {
            data.forEach((todo) => addTodoToDOM(todo));
        });
}

const addTodoToDOM = (todo) => {
    const div = document.createElement('div');
    div.classList.add('todo');
    div.appendChild(document.createTextNode(todo.title));
    div.setAttribute('data-id', todo.id);

    const span = document.createElement('span');
    span.appendChild(document.createTextNode('X'));
    span.classList = 'delete-todo';
    div.appendChild(span);

    if (todo.completed) {
        div.classList.add('done');
    }

    document.getElementById('todo-list').appendChild(div);
}

const createTodo = (e) => {
    e.preventDefault();

    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false
    }

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => addTodoToDOM(data));
}

const toggleCompleted = (e) => {
    if (e.target.classList.contains('todo')) {
        e.target.classList.toggle('done');
        updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }
}

const updateTodo = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        // .then(res => res.json())
        // .then(data => console.log(data))
        ;
}


const deleteTodo = (e) => {
    if (e.target.classList.contains('delete-todo')) {
        const id = e.target.parentElement.dataset.id;
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => e.target.parentElement.remove());
    }
}

const init = function () {
    document.addEventListener('DOMContentLoaded', getToDos);
    document.querySelector('#todo-form').addEventListener('submit', createTodo);
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted);
    document.querySelector('#todo-list').addEventListener('click', deleteTodo);
}

init();