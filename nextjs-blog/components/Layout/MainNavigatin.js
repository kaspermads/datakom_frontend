import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../AuthContext";

import classes from "../styles/MainNavigation.module.css";


function MainNavigation() {
    const { logout } = useContext(AuthContext);

    function logoutHandler() {
        logout("nurse");
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>Gruppe 4 Helsetjeneste</div>
            <nav>
                <ul>
                    <li>
                        <Link href="/patients-test">
                            <a>All Patients</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/add_patient">
                            <a>Add New Patient</a>
                        </Link>
                    </li>
                    <li className={classes.actions}>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;