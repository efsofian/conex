import axios from "axios";
import { setAlert } from "../alert/alert.actions";
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
} from "./profile.types";

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (e) {
		console.log(JSON.stringify(e.response));
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const createProfile =
	(formData, navigate, edit = false) =>
	async (dispatch) => {
		try {
			const options = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const res = await axios.post("/api/profile", formData, options);
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
			dispatch(
				setAlert(edit ? "Profile Updated" : "Profile Created", "success")
			);
			if (!edit) {
				navigate("/dashboard");
			}
		} catch (e) {
			const errors = e.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, "danger", 5000))
				);
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: e.response.data.msg, status: e.response.status },
			});
		}
	};

export const addExperience = (formData, navigate) => async (dispatch) => {
	try {
		const options = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const res = await axios.put("/api/profile/experience", formData, options);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Experience Added", "success"));
		navigate("/dashboard");
	} catch (e) {
		const errors = e.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 5000)));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const addEducation = (formData, navigate) => async (dispatch) => {
	try {
		const options = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const res = await axios.put("/api/profile/education", formData, options);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Education Added", "success"));
		navigate("/dashboard");
	} catch (e) {
		const errors = e.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 5000)));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Experience Removed", "success"));
	} catch (e) {
		const errors = e.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 5000)));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Education Removed", "success"));
	} catch (e) {
		const errors = e.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 5000)));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const deleteAccount = () => async (dispatch) => {
	if (window.confirm("Are you sure ?")) {
		try {
			const res = await axios.delete(`/api/profile`);
			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });
			dispatch(setAlert("Your account has been permanantly deleted"));
		} catch (e) {
			const errors = e.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, "danger", 5000))
				);
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: e.response.data.msg, status: e.response.status },
			});
		}
	}
};
