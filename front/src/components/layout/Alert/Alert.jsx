import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
	console.log("JE SUIS RENDER");
	const alerts = useSelector((state) => state.alert);

	return (
		alerts !== null &&
		alerts.length > 0 &&
		alerts.map((alert) => {
			console.log(alert);
			return (
				<div key={alert.id} className={`alert alert-${alert.alertType}`}>
					{alert.msg}
				</div>
			);
		})
	);
};

export default Alert;