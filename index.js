// login Page

document.getElementById("loginForm")?.addEventListener("submit", function(event){
    event.preventDefault();

    const userEmail = event.target.email.value;
    const userPassword = event.target.email.value;
    
    const loggedInUser = {
        user_Email : userEmail,
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const checkUser = users.find(u => u.user_Email === userEmail);

    if (!checkUser){
        alert("Invalid crednetials");
        event.target.reset();
        return;
    }else if (userPassword !== userPassword){
        alert("Invalid Password");
        return;
    }
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
    event.target.reset();
    window.location.href = "otherPages/home.html";



 });