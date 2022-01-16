import axios from "axios";
import { setAlert } from "../alert/alert.actions";
import {
	GET_POSTS,
	GET_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
	POST_ERROR,
	UPDATE_LIKES,
	ADD_POST,
	DELETE_POST,
} from "./post.types";

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/posts");
		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (e) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const getPost = (postId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${postId}`);
		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (e) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const addLike = (postid) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/like/${postid}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { postid, likes: res.data },
		});
	} catch (e) {
		dispatch(setAlert(e.response.data.msg, "danger", 5000));
		dispatch({
			type: POST_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const removeLike = (postid) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/unlike/${postid}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { postid, likes: res.data },
		});
	} catch (e) {
		dispatch(setAlert(e.response.data.msg, "danger", 5000));

		dispatch({
			type: POST_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const deletePost = (postid) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/${postid}`);
		dispatch({
			type: DELETE_POST,
			payload: postid,
		});
		dispatch(setAlert("Post Removed !", "success", 5000));
	} catch (e) {
		dispatch(setAlert(e.response.data, "danger", 5000));

		dispatch({
			type: POST_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const addPost = (formData) => async (dispatch) => {
	const options = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.post("/api/posts/", formData, options);
		dispatch({
			type: ADD_POST,
			payload: res.data,
		});
		dispatch(setAlert("Post Added !", "success", 5000));
	} catch (e) {
		dispatch(setAlert(e.response.data, "danger", 5000));

		dispatch({
			type: POST_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const addComment = (postId, formData) => async (dispatch) => {
	const options = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.post(
			`/api/posts/comment/${postId}`,
			formData,
			options
		);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});
		dispatch(setAlert("Comment Added !", "success", 5000));
	} catch (e) {
		dispatch(setAlert(e.response.data, "danger", 5000));

		dispatch({
			type: POST_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId,
		});
		dispatch(setAlert("Comment Removed !", "success", 5000));
	} catch (e) {
		dispatch(setAlert(e.response.data, "danger", 5000));

		dispatch({
			type: POST_ERROR,
			payload: { msg: e.response.data.msg, status: e.response.status },
		});
	}
};
