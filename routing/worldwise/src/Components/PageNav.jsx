import { NavLink } from "react-router-dom";

const PageNav = () => {
    return ( <div>
        <ul>
            <li><NavLink to={'/'} >Home</NavLink></li>
            <li><NavLink to={'/product'}>Product</NavLink></li>
            <li><NavLink to={'/pricing'}>Pricing</NavLink></li>
        </ul>
    </div> );
}
 
export default PageNav;