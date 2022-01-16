import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOG_OUT,
} from "./auth.types";
import { CLEAR_PROFILE } from "../profile/profile.types";
import { setAlert } from "../alert/alert.actions";
import sethAuthToken from "../../utils/setAuthToken";

export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const options = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify({ name, email, password });
		try {
			const res = await axios.post("/api/users", body, options);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			dispatch(loadUser());
		} catch (e) {
			const errors = e.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, "danger", 5000))
				);
			}
			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

export const login = (email, password) => async (dispatch) => {
	const options = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post("/api/auth", body, options);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (e) {
		const errors = e.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 5000)));
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		sethAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get("/api/auth");
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (e) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const logout = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOG_OUT });
};
