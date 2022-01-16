import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/layout/Navbar/Navbar.component";
import Landing from "./components/layout/Landing/Landing.component";
import Register from "./components/auth/Register/Register.component";
import Login from "./components/auth/Login/Login.component";
import Dashboard from "./components/dashboard/Dashboard.component";
import PrivateRoute from "./components/routing/PrivateRoute.component";
import CreateProfile from "./components/profile-forms/CreateProfile.component.jsx";
import EditProfile from "./components/profile-forms/EditProfile.component";
import Profiles from "./components/profiles/Profiles.component";
import Profile from "./components/profile/Profile.component";
import AddExperience from "./components/profile-forms/AddExperience.component";
import AddEducation from "./components/profile-forms/AddEducation.component";
import Posts from "./components/posts/Posts.component";
import Post from "./components/post/Post.component";
import Alert from "./components/layout/Alert/Alert.component";
import NotFound from "./components/404/NotFound.component";
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
				<Route path="/profiles" element={<Profiles />} />
				<Route path="/profile/:id" element={<Profile />} />
				<Route
					path="/dashboard"
					element={<PrivateRoute component={Dashboard} />}
				/>
				<Route path="/posts" element={<PrivateRoute component={Posts} />} />
				<Route path="/posts/:id" element={<PrivateRoute component={Post} />} />
				<Route
					path="/create-profile"
					element={<PrivateRoute component={CreateProfile} />}
				/>
				<Route
					path="/edit-profile"
					element={<PrivateRoute component={EditProfile} />}
				/>
				<Route
					path="/add-experience"
					element={<PrivateRoute component={AddExperience} />}
				/>
				<Route
					path="/add-education"
					element={<PrivateRoute component={AddEducation} />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
