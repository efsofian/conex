import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../redux/auth/auth.actions";

const Login = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const [formData, setformData] = useState({
		email: "",
		password: "",
	});
	const dispatch = useDispatch();
	const { email, password } = formData;
	const onChange = (e) =>
		setformData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};
	if (isAuthenticated) {
		return <Navigate to="/dashboard" />;
	}
	return (
		<section className="container">
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign Into Your Account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</section>
	);
};

export default Login;
