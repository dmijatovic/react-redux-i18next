import React, { Component } from 'react';
//REDUX
//import { connect } from 'react-redux';
//ROUTER
import { NavLink } from 'react-router-dom';
//LOCAL
import { Clock, LanguageButtons } from '../component';
import './NavBar.scss';
import routes from '../router/routes';
/**
 * Navbar loads links from router and 2 nav widgets:
 * LanguageButtons and Clock (not i18n)
 */
class NavBar extends Component {
  createLinks = () => {
    let links = [];
    routes.forEach(item => {
      if (item.label) {
        //extract translations
        /*let trans
        if (this.props.routeLabel){
          trans = this.props.routeLabel[item.path];
        }*/
        links.push(
          <li className="link-item" key={item.path}>
            <NavLink
              className="link-item"
              key={item.path}
              to={item.path}
              activeClassName="selected">
              {item.label}
            </NavLink>
          </li>
        );
      }
    });
    //debugger
    return links;
  };
  render() {
    return (
      <nav className="app-navbar">
        <section className="app-navbar-body">
          <ul className="nav-menu">{this.createLinks()}</ul>

          <div className="nav-widgets">
            <LanguageButtons />
            <Clock />
          </div>
        </section>
      </nav>
    );
  }
}

export default NavBar;

/* problems with router selected flag when using redux ?!?
//------------------- REDUX CONNECTION --------------------------
const mapStateToProps = state => {
  //debugger
  //get translations from i18n reducer
  let { data } = state.i18n.lang;
  if (data){
    return {
      routeLabel: data["NavBar.routeLabel"]
    }
  }else{
    return {
      routeLabel: null
    }
  }
}

export default connect(
  mapStateToProps
)(NavBar);
*/
