import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component }) => {
	const auth = useSelector((state) => state.auth);
	if (auth.isAuthenticated) {
		return <Component />;
	}
	return <Navigate to="/login" />;
};

export default PrivateRoute;
