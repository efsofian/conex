import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import Spinner from "../layout/Spinner/Spinner.component";
import DashboardActions from "./DashboardActions.component";
import Experience from "./Experience.component";
import Education from "./Education.component";
import {
	getCurrentProfile,
	deleteAccount,
} from "../../redux/profile/profile.actions";

const Dashboard = () => {
	const {
		auth,
		profile,
		auth: { isAuthenticated },
	} = useSelector((state) => ({
		auth: state.auth,
		profile: state.profile,
	}));
	let user = null;
	let name = null;
	if (auth.user) {
		user = auth.user;
		name = auth.user.user.name;
	}

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrentProfile());
		// eslint-disable-next-line
	}, []);

	if (isAuthenticated && profile.loading && profile.profile == null) {
		return <Spinner />;
	}

	if (!isAuthenticated && profile.loading && profile.profile == null) {
		return <Navigate to="/" />;
	}
	return (
		<section className="container">
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user"> Welcome {user && name} </i>
			</p>
			{profile.profile !== null ? (
				<>
					<DashboardActions />
					<Experience experience={profile.profile.experience} />
					<Education education={profile.profile.education} />
					<div className="my-2">
						<button
							className="btn btn-danger"
							onClick={() => dispatch(deleteAccount())}>
							<i className="fas fa-user-minus"></i> Delete my account
						</button>
					</div>
				</>
			) : (
				<>
					<p>You have not yet set up your profile, please add some info</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</>
			)}
		</section>
	);
};

export default Dashboard;
