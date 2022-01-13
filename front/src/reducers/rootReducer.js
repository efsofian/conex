import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
	alert: alertReducer,
	auth: authReducer,
	post: postReducer,
	profile: profileReducer,
});
