
import { useState } from "react";
import userIsLoggedIn from "../commonFunctions/userIsLoggedIn";
import "./login.css";
function Login({setIsLoggedIn}) {

    const [emailParam, setEmailParam] = useState("");
    const [passParam, setPassParam] = useState("");
    const [token, setToken] = useState(null);

    const makeTokenFromResponse = (json, email, password) => {

        const responseToken = {
            accessToken: json.access_token,
            refreshToken: json.refresh_token,
            loggedIn: true,
            expiresAt:  json.expires_in,
        };
        setToken(responseToken);
        sessionStorage.setItem("token",JSON.stringify(token));
        const credentials = JSON.stringify({UserEmail: email, UserPassword: password});
        if(document.getElementById("rememberCheckBox").checked) {
            localStorage.setItem("credentials",credentials);
        }
        sessionStorage.setItem("credentials",credentials);
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
        setEmailParam(document.getElementById("loginEmail").value);
        setPassParam(document.getElementById("loginPassword").value);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: `{"grant_type":"password","username":"${emailParam}","password":"${passParam}"}`
        };

        fetch('https://kitsu.io/api/oauth/token', options)
            .then(response => response.json())
            .then(response => makeTokenFromResponse(response, emailParam, passParam))
            .catch(err => console.error(err));

    };
    return <>
        <div className="loginContainer">
            <form onSubmit={loginWithKitsu}>
                <label>Email:</label>
                <br></br>
                <input type="email" id="loginEmail" className="loginInput"/>
                <br></br>
                <label>Password:</label>
                <br></br>
                <input type="password" id="loginPassword" className="loginInput"/>
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