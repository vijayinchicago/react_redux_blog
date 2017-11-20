import * as API from '../utils/API'


export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export const fetchComments = (id) => dispatch => {
    API.getAllComments(id).then( res => {
        const obj = res.reduce((acc, cur) => {
            acc[cur.id] = cur
            return acc
        }, {})

        dispatch(loadComments(id, obj))
    })
}

export const loadComments = (id, comments) => {
    return {
        type:LOAD_COMMENTS,
        comments,
        id
    }
}

export const voteComment = (vote, id) =>dispatch => {
    API.voteComment(vote, id).then( res => {
        dispatch(updateCommentScore(res))
    })
}

export const updateCommentScore = (comment) => {
    return {
        type: UPDATE_COMMENT_SCORE,
        comment
    }
}

export const uploadComment = (comment) => dispatch => {
    API.createNewComment(comment).then( res => {
        dispatch(createComment(res))
    })
}

export const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

export const removeComment = (id) => dispatch => {
    API.deleteComment(id).then( res => {
        dispatch(deleteComment(res))
    })
}

export const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export const updateComment = (id, comment) => dispatch => {
    API.editComment(id, comment).then( res => {
        dispatch(editComment(res))
    })
}

export const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}


















