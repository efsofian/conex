import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfiles } from "../../redux/profile/profile.actions";
import ProfileItem from "./ProfileItem.component";
import Spinner from "../layout/Spinner/Spinner.component";

const Profiles = () => {
	const { profiles, loading } = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);
	return (
		<section className="container">
			{loading ? (
				<Spinner />
			) : (
				<>
					<h1 className="large text-primary">Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop"></i> Browse and connect with
						developers
					</p>
					<div className="profiles">
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						) : (
							<h4>No profiles found</h4>
						)}
					</div>
				</>
			)}
		</section>
	);
};

export default Profiles;
