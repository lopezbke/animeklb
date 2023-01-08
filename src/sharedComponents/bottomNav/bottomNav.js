import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faList, faGlasses } from "@fortawesome/free-solid-svg-icons";
import "./bottomNav.css";

import { Link } from "react-router-dom";

function BottomNav() {
    return (
        <>
            <div className="bottomNavMainContainer grid-container">
                <Link to={"/"} className="grid-item" >
                    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon> Search
                </Link>
                <Link to={"/Categories"} className="grid-item" >
                    <FontAwesomeIcon icon={faList}></FontAwesomeIcon> Categories
                </Link>
                <Link to={"/view-user-anime-list"} className="grid-item">
                    <FontAwesomeIcon icon={faGlasses}></FontAwesomeIcon> My List
                </Link>
            </div>
        </>
    );
};

export default BottomNav;