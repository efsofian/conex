import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "./PostItem.component";
import PostForm from "./PostForm.component";
import Spinner from "../layout/Spinner/Spinner.component";
import { getPosts } from "../../redux/post/post.actions";

const Posts = () => {
	const { posts, loading } = useSelector((state) => state.post);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPosts());
	}, [loading, dispatch]);
	return loading ? (
		<Spinner />
	) : (
		<section className="container">
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Welcome to the community
			</p>
			<PostForm />
			<div className="posts">
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</section>
	);
};

export default Posts;
