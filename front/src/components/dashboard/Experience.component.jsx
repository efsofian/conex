import React from "react";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../redux/profile/profile.actions";

const Experience = ({ experience }) => {
	const dispatch = useDispatch();
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className="hide-sm">{exp.title}</td>
			<td>
				<Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
				{exp.to === null ? (
					"Now"
				) : (
					<Moment format="YYYY/MM/DD">{exp.to}</Moment>
				)}
			</td>
			<td>
				<button
					className="btn btn-danger"
					onClick={(e) => dispatch(deleteExperience(exp._id))}>
					Delete
				</button>
			</td>
		</tr>
	));
	return (
		<>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</>
	);
};

export default Experience;
