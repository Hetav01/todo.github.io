/*selectors*/
var todoInput = document.querySelector(".todoInput");
var todoButton = document.querySelector(".todoButton");
var todoList = document.querySelector(".todo");
var filter = document.querySelector(".filterTodo");

todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos); //basically means that getTodos will run if the DOM is fully loaded.

function addToDo(event) {
    event.preventDefault();
    //add the div including two buttons and a li for to-do item;
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todoItem");
    //create the li now.
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("newTodo");
    //add the newTodo to the todoDiv;
    todoDiv.appendChild(newTodo);
    //"add the lis locally"
    saveLocally(newTodo.innerText);
    //add the two buttons;
    //add the checked button;
    const completedButton = document.createElement("button"); //createElement is used to add the elements of html to the Js variables;
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completedButton");
    todoDiv.appendChild(completedButton);
    //add the second button.
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("deleteButton");
    todoDiv.appendChild(deleteButton);
    //append the todoDiv to the todoList(.todo);
    todoList.appendChild(todoDiv);

    //now the clear the input value.
    if (todoButton) {
        todoInput.value = null;
    }

}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "deleteButton") {
        var todo = item.parentElement;
        //add aimation here so that we can remove the todo also.
        todo.classList.add("fall");
        removeLocalTodos(todo);        //also remove the todos locally.
        todo.addEventListener("transitionend", function () {  //we can even add eventlisteners inside the functions.
            todo.remove();
        });
    }
    //checked button.
    if (item.classList[0] === "completedButton") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    var todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                {
                    todo.style.display = "flex";
                    break;
                }
            case "completed":
                {
                    if (todo.classList.contains("completed")) /*it basically checks whether the class assigned has the whole string of the 'name' tag in it!!!*/ {
                        todo.style.display = "flex";
                    }
                    else {
                        todo.style.display = "none";
                    }
                    break;
                }
            case "incomplete":
                {
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    }
                    else {
                        todo.style.display = "none";
                    }
                    break; /*always remember to break the cases!!!!!!!! */
                }
        }

    })
}

function saveLocally(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos)); //setting it back to the local storage.
}

function getTodos()
{
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        var todoDiv = document.createElement("div");
        todoDiv.classList.add("todoItem");
        //create the li now.
        const newTodo = document.createElement("li");
        newTodo.innerText = todo
        newTodo.classList.add("newTodo");
        //add the newTodo to the todoDiv;
        todoDiv.appendChild(newTodo);
        //add the two buttons;
        //add the checked button;
        const completedButton = document.createElement("button"); //createElement is used to add the elements of html to the Js variables;
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("completedButton");
        todoDiv.appendChild(completedButton);
        //add the second button.
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("deleteButton");
        todoDiv.appendChild(deleteButton);
        //append the todoDiv to the todoList(.todo);
        todoList.appendChild(todoDiv);
    });

}

function removeLocalTodos(todo)
{
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    /*  console.log(todo.children[0].innerText) //method to find out which element is to be used for the code.*/
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}