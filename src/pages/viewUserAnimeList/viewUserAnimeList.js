import Login from "../../security/login";
import BottomNav from "../../sharedComponents/bottomNav/bottomNav";
import userIsLoggedIn from "../../commonFunctions/userIsLoggedIn";
import { useEffect, useState } from "react";


function ViewUserAnimeList() {

    const [isLoggedIn, setIsLoggedIn] = useState(() => userIsLoggedIn());
    const [comoponentToBeRender, setComponentToBeRender] = useState(<h1>User List</h1>);
    const login = <Login setIsLoggedIn={setIsLoggedIn} />;


    const tempFunction = async () => {
        try {
            const userId = JSON.parse(sessionStorage.getItem("credentials")).UserId;
            const response = await fetch(`https://kitsu.io/api/edge/users/${userId}/library-entries`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userIsLoggedIn()) {
            // Since useEffect should not be async and we want to await the results from the fetch call I created an async function that immediatly gets called.
            console.log(tempFunction());
            setComponentToBeRender(<h1>User List</h1>);    
        } else {
            setComponentToBeRender(login);
        }
    }, [isLoggedIn]);

    return <>
        {comoponentToBeRender}
        <BottomNav />
    </>
}

export default ViewUserAnimeList;