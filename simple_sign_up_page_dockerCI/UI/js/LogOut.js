const LogOut = () => {
localStorage.removeItem('current_user')
location.href='./LogIn.html'
}