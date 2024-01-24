import React from "react";
import { Link,useNavigate } from "react-router-dom";
const Nav=()=>{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/signup')
    }
    return(
        <div>
            <img className="logo" alt="logo" src="https://cdn.dribbble.com/userupload/12201819/file/original-5435fb273c69387dc0ac51cfe13435cd.jpg?crop=522x1470-7809x6935&resize=400x300&vertical=center"/>
           {auth? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Products</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li></ul>
                :
                <ul className="nav-ul nav-ul1">
                <li><Link to="/signup">signup</Link></li>
                <li><Link to="/login">login</Link></li>
                </ul>  

                }
            
        </div>
    )
}
export default Nav;