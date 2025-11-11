import { useNavigate, useLocation } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const routes = [
        { name: 'Vocabulary', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Languages', path: '/languages' }
    ]
    return (
        <div className={styles.navigation}>
            {routes.map((route, index) => (
                // TODO: Set width to avoid layout shift
                <div className={styles.navItem} key={route.name}> 
                    <button onClick={() => navigate(route.path)} className={`${styles.navButton} ${route.path == location.pathname ? styles.selected : ""}`}>{route.name}</button> {index < routes.length - 1 && <p>|</p>}
                </div>
            ))}
        </div>
    )

};

export default Navbar;