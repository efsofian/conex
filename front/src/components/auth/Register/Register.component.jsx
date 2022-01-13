import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setAlert } from "../../../redux/alert/alert.actions";
import { register } from "../../../redux/auth/auth.actions";

const Register = () => {
	const [formData, setformData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const dispatch = useDispatch();
	const { name, email, password, password2 } = formData;
	const onChange = (e) =>
		setformData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			dispatch(setAlert("password doesnt match", "danger", 5000));
		} else {
			dispatch(register({ name, email, password }));
		}
	};
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	if (isAuthenticated) {
		return <Navigate to="/dashboard" />;
	}
	return (
		<>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Create Your Account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
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
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						value={password2}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</>
	);
};

export default Register;
