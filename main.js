const get = (target) => {
    return document.querySelector(target);
}

const $todoContainer = get('.todo-list');
const $todoForm = get('.input-form-box');
const $todoInputText = get('.todo-input-text');

const API_URL = 'http://localhost:3000/todos'

const createTodoElement =(item)=>{
    const {id, content} = item;
    const $todoItem = document.createElement('div');
    $todoItem.classList.add('todo-item');
    $todoItem.dataset.id=id;
    $todoItem.innerHTML=`
        <div class="todo-content-box">
            <input type="checkbox" class="todo-check"/>
            <span class="todo-text">${content}</span>
        </div>
        <div class="todo-button-box">
            <button class="todo-edit">edit</button>
            <button class="todo-delet">delet</button>
        </div>
    `
    return $todoItem;
}

const renderAllTodos =(todos)=>{
    $todoContainer.innerHTML='';
    todos.forEach((item)=>{
        const todoElement = createTodoElement(item)
        $todoContainer.appendChild(todoElement);
    })
}

const getTodos=()=>{
    fetch(API_URL)
        .then((response)=>response.json())
        .then((todos) => renderAllTodos(todos))
        .catch(error => console.log(error))
}

const addTodo =(e)=>{
    e.preventDefault()
    const todoInputTextValue= $todoInputText.value;
    const todo={
        content : todoInputTextValue,
        completed : false
    }
    fetch(API_URL,{
        method :'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(todo)
    }).then(getTodos)
}

const init =()=>{
    window.addEventListener('DOMContentLoaded',()=>{
        getTodos()
    })
    $todoForm.addEventListener('submit',addTodo)   
}

init();