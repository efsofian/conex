import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner/Spinner.component";
import ProfileTop from "./ProfileTop.component.jsx";
import ProfileAbout from "./ProfileAbout.component";
import ProfileExperience from "./ProfileExperience.component";
import ProfileEducation from "./ProfileEducation.component";
import ProfileGithub from "./ProfileGithub.component.jsx";
import { getProfileById } from "../../redux/profile/profile.actions";

const Profile = () => {
	const {
		profile: { profile, loading },
		auth,
	} = useSelector((state) => state);
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProfileById(id));
	}, [dispatch, loading, id]);
	return (
		<>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<section className="container">
					<Link to="/profiles" className="btn btn-white">
						Back To Profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user.user._id === profile.user._id && (
							<Link to="/edit-profile" className="btn btn-dark">
								Edit Profile
							</Link>
						)}
					<div className="profile-grid my-1">
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className="profile-exp bg-white p-2">
							<h2 className="text-primary">Experience</h2>
							{profile.experience.length > 0 ? (
								<>
									{profile.experience.map((experience) => (
										<ProfileExperience
											key={experience._id}
											experience={experience}
										/>
									))}
								</>
							) : (
								<h4>No Experience credentials</h4>
							)}
						</div>
						<div className="profile-edu bg-white p-2">
							<h2 className="text-primary">Education</h2>
							{profile.education.length > 0 ? (
								<>
									{profile.education.map((education) => (
										<ProfileEducation
											key={education._id}
											education={education}
										/>
									))}
								</>
							) : (
								<h4>No Education credentials</h4>
							)}
						</div>
						{profile.githubusername && (
							<ProfileGithub username={profile.githubusername} />
						)}
					</div>
				</section>
			)}
		</>
	);
};

export default Profile;
