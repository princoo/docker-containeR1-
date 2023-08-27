SignUp.js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://tekki-docker-app.onrender.com/server/users", requestOptions)
.then(response => response.text())
.then(result => {console.log(result), localStorage.setItem('signupData', result)})
.catch(error => console.log('error', error));

function SignUp()
{
   /** var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;
    
    localStorage.setItem('userName',JSON.stringify(name))
    localStorage.setItem('userEmail',JSON.stringify(email));
    localStorage.setItem('userPass',JSON.stringify(password)); */

    
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "https://tekki-docker-app.onrender.com")




    var ptd = document.getElementById('password').value

    if(ptd.length < 4) {
        document.getElementById('emailp').innerHTML = 'Password has to be more than 4 characters';
        
    }else{
        var isAdmin
      let name = document.getElementById('name').value,
          email = document.getElementById('email').value,
          password = document.getElementById('password').value;
          if(password =="admin"){
            isAdmin = true
          }else{
            isAdmin = false
          }

        
  let signupData = JSON.parse(localStorage.getItem('signupData')) || [];

  let exist = signupData.length && 
      JSON.parse(localStorage.getItem('signupData')).some(data => 
          data.email.toLowerCase() == email.toLowerCase() 
      );

  if(!exist){

    const raw = {
        name: name,
        email: email,
        password: password,
        isAdmin: isAdmin
      } 
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow",
    };
       
      const sendMsg = () => {
        console.log({name, email, password, isAdmin});
      fetch("https://tekki-docker-app.onrender.com/server/auth/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
      }
      sendMsg()

      signupData.push({ name, email, password, isAdmin });
      localStorage.setItem('signupData', JSON.stringify(signupData));
      document.querySelector('form').reset();
      document.getElementById('name').focus();
      document.getElementById('confirm').style.display = 'block'
      //location.href="./LogIn.html"
      setTimeout(function () { document.getElementById('confirm').style.display = "none" }, 2000)
      setTimeout(function () { location.href="./LogIn.html" }, 2000)
      
  }
  else{

      document.getElementById('wrong').style.display = 'block'
  }

}}