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
        let li = "";
         if (item.iscompleted === true){

             li = `<div class = "listItem" id="${item.id}">
             <img src="../images/check.png" alt="" class="check">
             <p class="todos text_aria line_through">${item.todo}</p>
             <input type="text" name="edit_input" class="edit_input text_aria" style="display: none;">
             <button class="edit_btn btn btn-primary" style= "color: black;">Edit</button>
             <button class="save_edit btn btn-primary" style="display: none; color: black;">Save</button>
             <img src="../images/delete (1).png" alt="" class="delete_todo">
             </div>`
             
            }else if(item.iscompleted === false){
            
            li = `<div class = "listItem" id="${item.id}">
                         <img src="../images/check.png" alt="" class="check">
                         <p class="todos text_aria">${item.todo}</p>
                         <input type="text" name="edit_input" class="edit_input text_aria" style="display: none;">
                         <button class="edit_btn btn btn-primary" style= "color: black;">Edit</button>
                         <button class="save_edit btn btn-primary" style="display: none; color: black;">Save</button>
                         <img src="../images/delete (1).png" alt="" class="delete_todo">
                         </div>`

        }
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
    
    
    const div = document.getElementById("todos");
    div.appendChild(todosList);
    
}
document.getElementById("toDoInput").addEventListener("submit", function(event){
    event.preventDefault();
        
        
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        const inp = event.target.input.value;
        

        const todo = {
            id: Date.now(),
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
        
        
        
    });
    showTodo();

    document.getElementById("todos").addEventListener("click", function(event){
        if(event.target && event.target.classList.contains("delete_todo")){

            const parent = event.target.parentElement;
            const idOfTodo = parseInt(parent.getAttribute("id"));
        
                // Load todos from localStorage
                let todos = JSON.parse(localStorage.getItem("todos")) || [];
                
                // Filter out the one we want to delete
                const updatedTodos = todos.filter(item => item.id !== idOfTodo);
                console.log('updatedTodos: ', updatedTodos);
                
                // Save the updated list back to localStorage
                
                // Remove from UI
                parent.remove();
                
            }if(event.target && event.target.classList.contains("edit_btn")){
                const parent = event.target.parentElement;
                const Edit_btn = parent.querySelector(".edit_btn");
                const save_btn = parent.querySelector(".save_edit");
                const p = parent.querySelector(".todos");
                const input = parent.querySelector(".edit_input");
                
                input.value = p.innerHTML;
                Edit_btn.style.display = "none";
                save_btn.style.display = "inline";
                p.style.display = "none";
                input.style.display = "inline";
            }if(event.target && event.target.classList.contains("save_edit")){
                
                const parent = event.target.parentElement;
                const idtoEdit = parseInt(parent.getAttribute("id"));
                const Edit_btn = parent.querySelector(".edit_btn");
                const save_btn = parent.querySelector(".save_edit");
                const p = parent.querySelector(".todos");
                const input = parent.querySelector(".edit_input");
                const newvalue = input.value;
                
                
                let todos = JSON.parse(localStorage.getItem("todos")) || [];
                todos = todos.map(item => {
                        if (item.id == idtoEdit){
                              return {...item, todo:  newvalue, iscompleted: false};
                            }
                            return item;
                        })
                        p.classList.remove("line_through")
                        p.innerHTML = newvalue;
                        Edit_btn.style.display = "inline";
                        save_btn.style.display = "none";
                        p.style.display = "inline";
                        input.style.display = "none";
                localStorage.setItem("todos", JSON.stringify(todos));
                
                
            }if(event.target && event.target.classList.contains("check")){
                const parent = event.target.parentElement;
                const p = parent.querySelector(".todos");
                const idtoCheck = parseInt(parent.getAttribute("id"));


                p.classList.add("line_through");

                let todos = JSON.parse(localStorage.getItem("todos")) || [];
                todos = todos.map(item => {
                        if (item.id == idtoCheck){
                              return {...item, iscompleted: true};
                            }
                            return item;
                        })
                localStorage.setItem("todos", JSON.stringify(todos));


            }
            
        });
        