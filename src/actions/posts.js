import * as API from '../utils/API'

export const LOAD_POSTS = 'LOAD_POSTS'
export const CREATE_POST='CREATE_POST'
export const EDIT_POST='EDIT_POST'
export const DELETE_POST='DELETE_POST'
export const UPDATE_POST_SCORE='UPDATE_POST_SCORE'


export const SHOW_POST_DETAILS = 'SHOW_POST_DETAILS'


export const getPosts = () => dispatch => {
    API.getAllPosts().then( res => {

        const obj = res.reduce((acc, cur) => {
            acc[cur.id] = cur
            return acc
        }, {})
        dispatch(loadPosts(obj))
    })
}

export const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    }
}


export const createPost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}


export const deletePost = (post) => {
    return {
        type: DELETE_POST,
        post
    }
}



export const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}

export const removePost = (id) => dispatch => {
    API.deletePost(id).then( res => {
        dispatch(deletePost(res))
    })
}

export const showPostDetails = (id) => {
    return {
        type: SHOW_POST_DETAILS,
        id
    }
}



export const uploadPost = (post) => dispatch => {
    API.createNewPost(post).then( res => {
        dispatch(createPost(res))
    }).then( () => dispatch(getPosts()))
}

export const updatePost = (id, post) => dispatch => {
	//console.log(id, post)
    API.editPost(id, post).then( res => {
        dispatch(editPost(res))
    }).then( () => dispatch(getPosts()))
}




export const votePost = (vote, id) => dispatch => {
    API.submitVote(vote, id).then( res => {
        dispatch(updatePostScore(res))
    })
}

export const updatePostScore = (post) => {
    return {
        type: UPDATE_POST_SCORE,
        post
    }
}