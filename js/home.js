// home Page
    window.onload = function(){
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser){
        
        window.location.href = "../index.html";
    }
    
    }
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    function logout(){
    window.location.href = "../index.html";
    localStorage.removeItem("loggedInUser");
    }
    
    document.getElementById("user_Name").innerHTML = `${user.user_fullName}`;
    document.getElementById("offcanvasDarkNavbarLabel").innerHTML = `${user.user_fullName}`;
    
    function createItem(item){
        const li = `<div class = "listItem">
        <img src="../images/check.png" alt="">
        <p>${item.todo}</p>
        <img src="../images/delete (1).png" alt="" id="deleteTodo" onclick= "this.parentElement.remove()">
        </div>`
        return li;

    }
    function showTodo(){
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        
        const filteredTodos = todos.filter((item) => 
            item.createdBy.userEmail === user.user_Email
        );
        console.log('filteredTodos: ', filteredTodos);

        const todosList = document.createElement("div");
        todosList.className = "list";
        todosList.id = "todo_list";
        
        filteredTodos.forEach((item) => {
            const li = createItem(item);
            todosList.innerHTML += li;
        });
        

        const div = document.getElementById("section");
        div.appendChild(todosList);
        

    }
    
    document.getElementById("toDoInput").addEventListener("submit", function(event){
        event.preventDefault();
        
        
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        const inp = event.target.input.value;


        const todo = {
            todo : inp,
            iscompleted: false,
            createdBy: {
                userName : user.user_fullName,
                userEmail : user.user_Email,
            }

        }

        todos.push(todo);

        localStorage.setItem("todos",JSON.stringify(todos));
        event.target.reset();

        const list = document.getElementById("todo_list");
        list.innerHTML += createItem(todo);

        const removeTodoButton = document.getElementById("deleteTodo");
        removeTodoButton.addEventListener("click", function(event){
            event.preventDefault();
            
        });

    });
    showTodo();
