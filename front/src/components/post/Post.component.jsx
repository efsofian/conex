import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "../posts/PostItem.component";
import CommentItem from "./CommentItem.component";
import Spinner from "../layout/Spinner/Spinner.component";
import { getPost } from "../../redux/post/post.actions";
import CommentForm from "./CommentForm";

const Post = () => {
	const { post, loading } = useSelector((state) => state.post);
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPost(id));
	}, [dispatch, post, id]);
	return loading || post === null ? (
		<Spinner />
	) : (
		<section className="container">
			<Link to="/posts" className="btn">
				Back To Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className="comments">
				{post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</section>
	);
};

export default Post;
