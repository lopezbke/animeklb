
import { useState } from "react";
import "./login.css";

function Login() {

    const [emailParam, setEmailParam] = useState("");
    const [passParam, setPassParam] = useState("");
    const [token, setToken] = useState(null);

    const makeTokenFromResponse = (json) => {

        const responseToken = {
            accessToken: json.access_token,
            refreshToken: json.refresh_token,
            loggedIn: true,
            expiresAt:  json.expires_in,
        };
        setToken(responseToken);
        sessionStorage.setItem("token",JSON.stringify(token));
        alert("Logged in successfully.");
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
            body: '{"grant_type":"password","username":"kevin.klb@outlook.com","password":"Lk1501278*"}'
        };

        fetch('https://kitsu.io/api/oauth/token', options)
            .then(response => response.json())
            .then(response => makeTokenFromResponse(response))
            .catch(err => console.error(err));

    };
    return <>
        <div className="loginContainer">
            <form onSubmit={loginWithKitsu}>
                <label>Email:</label>
                <br></br>
                <input type="email" id="loginEmail" className="loginInput"></input>
                <br></br>
                <label>Password:</label>
                <br></br>
                <input type="password" id="loginPassword" className="loginInput"></input>
                <br></br>
                <br></br>
                <button className="loginButton" type="submit">Login with Kitsu</button>
                <p>{JSON.stringify(token)}</p>
            </form>
        </div>
    </>
}

export default Login;