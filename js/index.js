// login Page

window.onload = function(){
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser){

        window.location.href = "otherPages/home.html";
    }

}
document.getElementById("loginForm")?.addEventListener("submit", function(event){
    event.preventDefault();

    const userEmail = event.target.email.value;
    const userPassword = event.target.password.value;
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const checkUser = users.find(u => u.user_Email === userEmail);
    
    if (!checkUser){
        alert("Invalid email!");
        event.target.reset();
    }else if (userPassword !== checkUser.user_Password ){
        alert("Invalid Password!");
    }else{

        const loggedInUser = {
            user_Email : checkUser.user_Email,
            user_fullName : checkUser.user_Name,
        }
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        event.target.reset();
        window.location.href = "otherPages/home.html";
    }



 });