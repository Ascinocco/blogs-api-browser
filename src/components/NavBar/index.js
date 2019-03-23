import PropTypes from 'prop-types'
import React from 'react'

import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import styles from './NavBar.module.css'

const propTypes = {
  pathname: PropTypes.string.isRequired,
}

const renderNavItem = (path, title, active) => (
  <div key={`nav-link-to-page-${title}`} className={active ? styles.active : ''}>
    <Nav.Link as="div">
      <Link to={path}>
        {title}
      </Link>
    </Nav.Link>
  </div>
)

const navLinks = [
  { path: '/', title: 'Blogs' },
  { path: '/entries', title: 'Entries' },
  { path: '/authors', title: 'Authors' },
  { path: '/comments', title: 'Comments' },
]

const renderNavItems = (pathname) => navLinks.map((navLink) => {
  const { path, title } = navLink
  const active = path === pathname
  return renderNavItem(path, title, active)
})

function NavBar(props) {
  const navItems = renderNavItems(props.pathname)
  return (
    <div>
      <Navbar bg="light" expand="sm">
        <Navbar.Brand>Api Browser</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {navItems}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div><Link to="/">Home</Link> <Link to="/hello">Hello</Link> <Link to="/counter">Counter</Link></div>
    </div>
  )
}

NavBar.propTypes = propTypes

export default NavBar
