export const SORT_POSTS = 'SORT_POSTS'
export const SORT_COMMENTS = 'SORT_COMMENTS'
export const FILTER_POSTS = 'FILTER_POSTS'
export const SHOW_POST_DETAILS = 'SHOW_POST_DETAILS'

export const sortPosts = (sorting) => {
    return {
        type: SORT_POSTS,
        sorting
    }
}

export const sortComments = (sorting) => {
    return {
        type: SORT_COMMENTS,
        sorting
    }
}

export const filterPosts = (filter) => {
    return {
        type: FILTER_POSTS,
        filter
    }
}

export const showPostDetails = (id) => {
    return {
        type: SHOW_POST_DETAILS,
        id
    }
}

