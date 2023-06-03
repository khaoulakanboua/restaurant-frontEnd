import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Menubar } from 'primereact/menubar';
import AuthService from "../services/auth.service";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("usernameId");
  };
    const items = [
        {
            label: 'Spécialité',
            command: () => { navigate('/specialiteList') },
            visible: user && user.roles.includes('ROLE_ADMIN')

        }, {
          label: 'Ville',
          icon: 'pi pi-fw pi-power-off',
            command: () => { navigate('/ville') },
            visible: user && user.roles.includes('ROLE_ADMIN')
      },
      {
        label: 'Série',
        icon: 'pi pi-fw pi-power-off',
        command: () => { navigate('/serie') },
        visible: user && user.roles.includes('ROLE_ADMIN')
    },
    {
      label: 'Restaurant',
      icon: 'pi pi-fw pi-power-off',
      command: () => { navigate('/resto') },
      visible: user && user.roles.includes('ROLE_ADMIN')
  },
  {
    label: 'Zone',
    icon: 'pi pi-fw pi-power-off',
    command: () => { navigate('/zone') },
    visible: user && user.roles.includes('ROLE_ADMIN')
},
{
  label: 'Map',
  icon: 'pi pi-fw pi-power-off',
  command: () => { navigate('/mapAll') },
  visible: user && user.roles.includes('ROLE_ADMIN')
},,
{
  label: 'All restos',
  icon: 'pi pi-fw pi-power-off',
  command: () => { navigate('/Details') },
  visible: user && user.roles.includes('ROLE_USER')

},{
  label: 'Logout',
  icon: 'pi pi-fw pi-power-off',
  command: handleLogout,
  
},

    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}
        
const Footer = () => {
  return (
    <footer className="text-black pt-5 pb-4 fixed-bottom" style={{ backgroundColor: '#e3f2fd', position: 'relative', bottom: 0 }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Adresse</h5>
            <p>1066 Lot Sekkala Essaouira, Maroc</p>
            <p><i className="fas fa-phone"></i> +212 6 97 67 76 00</p>
            <p><i className="fas fa-envelope"></i> khaoulakanboua@gmail.com</p>
          </div>
          <div className="col-md-4">
            <h5>Réseaux sociaux</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.facebook.com/profile.php?id=100007682508273"><i className="fab fa-facebook fa-lg"></i> Facebook</a></li>
              <li><a href="https://www.twitter.com/MaPageTwitter"><i className="fab fa-twitter fa-lg"></i> Twitter</a></li>
              <li><a href="https://www.instagram.com/khaoulakan/"><i className="fab fa-instagram fa-lg"></i> Instagram</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Menu</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink className="nav-link" to="/" activeClassName="active">
                  Specialite
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/ville" activeClassName="active">
                  Ville
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/zone" activeClassName="active">
                  Zone
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/resto" activeClassName="active">
                  Resto
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/map" activeClassName="active">
                  Map
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3 text-center">
            <p>&copy; 2023 Localisation Restaurant</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export  {ResponsiveAppBar,Footer} ;