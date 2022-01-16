import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/auth.actions";

const Navbar = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const guestLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);
	const authLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user"></i>
					{"  "}
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/" onClick={() => dispatch(logout())}>
					<i className="fas fa-sign-out-alt"></i>
					{"  "}
					<span className="hide-sm">Logout</span>
				</Link>
			</li>
		</ul>
	);
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fas fa-code"></i> Dev connector
				</Link>
			</h1>
			{!auth.loading && <>{auth.isAuthenticated ? authLinks : guestLinks}</>}
		</nav>
	);
};

export default Navbar;
