// default store state for filter 
const defaultPostsState={ isEmpty: true, posts: [] }; //need to implement error prop to save and display errors from fetching posts

//filter reducer export
export default (postsstate = defaultPostsState, action) => {
    switch (action.type) {
        case "ADDALLPOSTS":
            return { isEmpty: false, posts:[...action.allPosts] };
        case "ADDPOST":
            return { isEmpty: false, posts: [...postsstate.posts, action.post] };
        case "DELETEPOST":
                if (postsstate.posts.length === 0) {
                    return { isEmpty: true, posts: [...postsstate.posts].filter(post => post.post_id !== action.id) };
                } else {
                    return { isEmpty: false, posts: [...postsstate.posts].filter(post => post.post_id !== action.id) };
                }
        default:
            return postsstate;
    }
}