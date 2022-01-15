import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../layout/Spinner/Spinner.component";

const PrivateRoute = ({ component: Component }) => {
	const auth = useSelector((state) => state.auth);
	if (auth.isAuthenticated && !auth.loading) {
		return <Component />;
	} else if (!auth.isAuthenticated && auth.loading) {
		return <Navigate to="/login" />;
	}
	return <Spinner />;
};

export default PrivateRoute;
