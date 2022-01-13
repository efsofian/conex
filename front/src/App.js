import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/layout/Navbar/Navbar.component";
import Landing from "./components/layout/Landing/Landing.component";
import Register from "./components/auth/Register/Register.component";
import Login from "./components/auth/Login/Login.component";
import Dashboard from "./components/dashboard/Dashboard.component";
import PrivateRoute from "./components/routing/PrivateRoute.component";
import Alert from "./components/layout/Alert/Alert";
import { loadUser } from "./redux/auth/auth.actions";
import "./App.css";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);
	return (
		<BrowserRouter>
			<Navbar />
			<Alert />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="/dashboard"
					element={<PrivateRoute component={Dashboard} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
