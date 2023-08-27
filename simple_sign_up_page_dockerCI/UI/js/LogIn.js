var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://tekki-docker-app.onrender.com/server/users", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result), localStorage.setItem('signupData', result)})
  .catch(error => console.log('error', error));
  

function Login() {
    let email = document.getElementById('email').value, password = document.getElementById('password').value;
    /**let formData = JSON.parse(localStorage.getItem('signupData')) || [];
    let exist = formData.length && 
    JSON.parse(localStorage.getItem('signupData')).some(data => data.email.toLowerCase() === email && data.password.toLowerCase() === password);
    if(!exist){
        alert("Incorrect login credentials");
    }
    else{*/
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "https://tekki-docker-app.onrender.com")
        const data = {
            email: email,
            password: password,
        };
    
    
        requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow",
        };
    
        console.log(data, email.value);
        fetch("https://tekki-docker-app.onrender.com/server/auth/login", requestOptions)
            .then((response) => response.json())
            .then((result) => { console.log(result), localStorage.setItem('current_user', JSON.stringify(result))})
            .catch((error) => console.log("error", error));

            let result;
setTimeout(function () {
  result = JSON.parse(localStorage.getItem('current_user'));
  
  if (!result.others) {
    alert(`${result}`);
  } else if (result.others.isAdmin) {
    location.href = "./Dashboard.html";
  } else if (result) {
    location.href = "./Dashboard.html";
    document.querySelector(".button").innerHTML = result.others.name;
  } else {
    alert('Something went wrong, please try again');
  }
}, 2000);
        
    }
        
    

/**
function Login()
{
    var getEmail = JSON.parse(localStorage.getItem('userEmail'));
    var getPass = JSON.parse(localStorage.getItem('userPass'));
    
    var enterEmail = document.getElementById('email').value;
    var enterPass = document.getElementById('psw').value;
    
   

    if( enterEmail==getEmail) {

        if(enterPass==getPass){

            alert('Log In Successfully')

        }else(
            alert('Wrong Password')
        )
    }else(
        alert('Wrong Email')
    )
    
}*/