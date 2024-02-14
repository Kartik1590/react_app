import AppNav from './AppNav';
import styles from './Sidebar.module.css'
import Logo from './Logo'
import { Link, Outlet } from 'react-router-dom';
const Sidebar = () => {
    return ( 
        <div className={styles.sidebar}>
        <Link to='/'><Logo /></Link>
            
            <AppNav />
            <Outlet />
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()}
                </p>
            </footer>
        </div>
     );
}
 
export default Sidebar;