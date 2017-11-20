import { combineReducers } from 'redux'
// import the 4 types of actions
import {GET_ALL_CATEGORIES} from '../actions/categories'
import {LOAD_POSTS, CREATE_POST, EDIT_POST, DELETE_POST, UPDATE_POST_SCORE} from '../actions/posts'
import {LOAD_COMMENTS, UPDATE_COMMENT_SCORE, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT} from '../actions/comments'
import {SORT_POSTS, SORT_COMMENTS,FILTER_POSTS,SHOW_POST_DETAILS} from '../actions/user_actions'


//reducer for categories
const categories = (state = {}, action) => {
    const { categories } = action

    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return Object.assign(...state , categories)
    
        default:
            return state
    }
}




//reducer for posts

const posts = (state = {}, action) => {
    const { posts, post } = action

    switch (action.type) {
        case LOAD_POSTS:
            return Object.assign(...state , posts)
         case CREATE_POST:
            return {
                ...state,
                [post.id]: {post}
            }
        case DELETE_POST:
            return {
                ...state,
                [post.id]: {...state[post.id],
                    deleted: post.deleted
                }
            }

        case EDIT_POST:
            return {
                ...state,
                [post.id]: post
            }




        case UPDATE_POST_SCORE:
            return {
                ...state,
                [post.id]: {
                    ...state[post.id],
                    voteScore: post.voteScore
                }
            }
        default:
            return state

    }
}



//reducer for comments
const comments = (state = {}, action) => {
    const { comments, comment } = action
    
    switch (action.type) {
        case LOAD_COMMENTS:
            return Object.assign(...state, comments)
        case DELETE_COMMENT:
            return {
                ...state,
                [comment.id]: {
                    ...state[comment.id],
                    deleted: comment.deleted
                }
            }
        case UPDATE_COMMENT_SCORE:
            return {
                ...state,
                [comment.id]: {
                    ...state[comment.id],
                    voteScore: comment.voteScore
                }
            }
        case EDIT_COMMENT:
            return {
                ...state,
                [comment.id]: comment
            }

        case CREATE_COMMENT:
            return {
                ...state,
                [comment.id]: {
                    ...comment
                }
            }
        default:
            return state
    }
}


//reduce for sort, filter
const user_actions = (state = {}, action) => {
    const { sorting, filter, id } = action

    switch (action.type) {
        case SORT_POSTS:
            return {
                ...state,
                postSorting: sorting
            }
        case SORT_COMMENTS:
            return {
                ...state,
                commentsSorting: sorting
            }
        case FILTER_POSTS:
            return {
                ...state,
                postFilter: filter
            }

        case SHOW_POST_DETAILS:
            return {
                ...state,
                showDetails: id
            }
        default:
            return state
    }
}


const reducer = combineReducers({
    categories, posts, comments, user_actions
})

export default reducer