class Post {
	readonly postId: string;

	title: string;

	content: string;

	authorId: string;
}

interface IPost {
	postId: string;
	title: string;
	content: string;
	authorId: string;
}

export { Post, IPost }
