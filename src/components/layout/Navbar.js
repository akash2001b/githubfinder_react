import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


function Navbar({icon, title}) {

    return (
        <nav className="navbar bg-primary ">
            <h1>
            <i className={icon}/> {title}
            </h1>
            <ul>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/about'>
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    )

}

Navbar.defaultProps={
    title:'Github Finder',
    icon:'fab fa-github'
}

Navbar.propTypes={
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar
