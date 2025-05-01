// home Page
window.onload = function(){
    if (localStorage.getItem("isLoggedIn") !== "true"){

        window.location.href = "../index.html";
    }

}
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    
    const userName = user.user_Email;

    document.getElementById("user_Name").innerHTML = `${userName}`;
    document.getElementById("offcanvasDarkNavbarLabel").innerHTML = `${userName}`;

    
    document.getElementById("toDoInput").addEventListener("submit", function(event){
        event.preventDefault();
        
        const inp = event.target.input.value;

        const listItem = document.createElement("div");
        listItem.className = "listItem";

        listItem.innerHTML = `
        <img src="check.png" alt="">
        <p>${inp}</p>
        <img src="delete (1).png" alt="" onclick="this.parentElement.remove()">
        `
        document.getElementById("list").appendChild(listItem);

        event.target.reset();

    });
    function logout(){
        window.location.href = "../index.html";
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("isLoggedIn");
    }
    
    
