function userIsLoggedIn () {
    const userCredentials = sessionStorage.getItem("credentials");
    if(userCredentials == null) {
        return false;
    }
    return true;
  };

  export default userIsLoggedIn;