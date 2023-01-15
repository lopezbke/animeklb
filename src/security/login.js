
import { useState } from "react";
import userIsLoggedIn from "../commonFunctions/userIsLoggedIn";
import "./login.css";


function Login({ setIsLoggedIn }) {

    const [token, setToken] = useState(null);

    const makeTokenFromResponse = async (json, email, password) => {
        const responseToken = {
            accessToken: json.access_token,
            refreshToken: json.refresh_token,
            loggedIn: true,
            expiresAt: json.expires_in,
        };
        setToken(responseToken);
        // TODO: Change to await syntax. 
        const userInfoResponse = await fetch(`https://kitsu.io/api/edge/users?filter[name]=${email.split('@')[0]}`)
        .then(response => response.json())
        .catch(err => console.error(err));

        console.log("User ID: " + userInfoResponse.data[0].id);
        const credentials = JSON.stringify({ UserEmail: email, UserPassword: password, UserId: userInfoResponse.data[0].id});
        // TODO: Verify if there is a better way to retreive/assign the value that is more appropiate in React.
        if (document.getElementById("rememberCheckBox").checked) {
            localStorage.setItem("credentials", credentials);
        }
        sessionStorage.setItem("credentials", credentials);
        sessionStorage.setItem("jwt", JSON.stringify(responseToken));
        setIsLoggedIn(true);
        // if (response.status === 200) {
        //     const token = {
        //         accessToken: json.access_token,
        //         refreshToken: json.refresh_token,
        //         loggedIn: true,
        //         expiresAt: addSeconds(new Date(), json.expires_in),
        //       };
        //     setToken(token);
        //   }
    };

    const loginWithKitsu = (event) => {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: `{"grant_type":"password","username":"${email}","password":"${password}"}`
        };
        // TODO: Change to await syntax. 
        fetch('https://kitsu.io/api/oauth/token', options)
            .then(response => response.json())
            .then(response => makeTokenFromResponse(response, email, password))
            .catch(err => console.error(err));

    };

    return <>
        <div className="loginContainer">
            <form onSubmit={loginWithKitsu}>
                <label>Email:</label>
                <br></br>
                <input type="email" id="loginEmail" className="loginInput" />
                <br></br>
                <label>Password:</label>
                <br></br>
                <input type="password" id="loginPassword" className="loginInput" />
                <br></br>
                <input type="checkbox" id="rememberCheckBox" />
                <label id="rememberCheckBoxLabel" htmlFor="rememberCheckBox">Remember my credentials.</label>
                <br></br>
                <br></br>
                <button className="loginButton" type="submit">Login with Kitsu</button>
            </form>
        </div>
    </>
}

export default Login;