import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return [
                <li className='nav-item' key={5}>
                    <Link className='nav-link' to='/admin/root'>Admin Dashboard</Link>
                </li>,
                <li className='nav-item' key={4}>
                    <Link className='nav-link' to='/admin/additem'>Add Item</Link>
                </li>,
                <li className='nav-item' key={1}>
                    <Link className='nav-link' to='/signout'>Sign Out</Link>
                </li>
            ];
        }
        else {
            return [
                <li className='nav-item' key={2}>
                    <Link className='nav-link' to='/signin'>Sign in</Link>
                </li>,
                <li className='nav-item' key={3}>
                    <Link className='nav-link' to='/signup'>Sign Up</Link>
                </li>
            ];
        }
    }

    render() {
        return (
            <nav className='navbar navbar-light'>
                <Link to='/' className='navbar-brand'>Home</Link>
                <ul className='nav navbar-nav'>
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);