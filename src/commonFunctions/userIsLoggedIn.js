function userIsLoggedIn () {
    if(localStorage.getItem("credentials")) {
        sessionStorage.setItem("credentials", localStorage.getItem("credentials"))
        return true;
    }
    if(sessionStorage.getItem("credentials")) {
        return true;
    }
    return false;
  };

  export default userIsLoggedIn;