import React, { useState } from 'react';
import './ProfileMenu.css';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user, logout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
     
  return (
    <div className="profile-menu">
      <div className="avatar" onClick={toggleMenu}>
        <img src={user.picture} alt="img"  className="avatar-image"/>
      </div>
      {menuOpen && (
        <div className="dropdown">
          <ul>
            <li onClick={()=> navigate("./favourites", {replace: true})}>Favorites</li>
            <li onClick={()=> navigate("./bookings", {replace: true})}>Bookings</li>
            {/* Add more menu items as needed */}
          <li onClick={()=>{
                localStorage.clear();
                logout()
            }}>
                Logout
            </li>
        </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;