import Login from "../../security/login";
import BottomNav from "../../sharedComponents/bottomNav/bottomNav";
import userIsLoggedIn from "../../commonFunctions/userIsLoggedIn";
import { useEffect, useState } from "react";

function ViewUserAnimeList() {

    const [isLoggedIn, setIsLoggedIn]= useState(() => userIsLoggedIn());
    const [comoponentToBeRender, setComponentToBeRender] = useState(<h1>User List</h1>);
    const loggedInComponent = <Login setIsLoggedIn={setIsLoggedIn}/>;
    useEffect(() => {
        if (userIsLoggedIn()) {
            setComponentToBeRender(<h1>User List</h1>);
        } else {
            setComponentToBeRender(loggedInComponent);
        }
    },[isLoggedIn]);

    return <>
        {comoponentToBeRender}
        <BottomNav />
    </>
}

export default ViewUserAnimeList;