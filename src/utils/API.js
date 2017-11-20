import UUID from 'uuid/v4'
const url = 'http://localhost:3001'

let token = sessionStorage.token

if(!token){
   token = sessionStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

export const getAllCategories = () => (
    fetch(`${url}/categories`, {
      headers
    }).then( res => res.json().then( json => json ))
)

export const getAllPosts = () => (
    fetch(`${url}/posts`, {
        headers
    }).then( res => res.json().then( json => json ))
)

export const getPostFromCategory = (category) => (
    fetch(`${url}/${category}/posts`, {
        headers
    }).then( res => res.json().then( json => json ))
)  

export const createNewPost = (post) => (
    fetch(`${url}/posts`, {
        method: 'post',
        headers,
        body: JSON.stringify({
            ...post,
            id: UUID(),
            timestamp: Date.now()
        })
    }).then( res => res.json().then( json => json ))
)

export const getPostDetails = (id) => (
    fetch(`${url}/posts/${id}`, {
        headers
    }).then( res => res.json().then( json => json ))
)

export const submitVote = (vote, id) => (
    fetch(`${url}/posts/${id}`, {
        method: 'post',
        headers,
        body: JSON.stringify({
            option: vote
        })
    }).then( res => res.json().then( json => json ))
)

export const editPost = (id, post) => (
    fetch(`${url}/posts/${id}`, {
        method: 'put',
        headers,
        body: JSON.stringify(post)
    }).then( res => res.json().then( json => json ))
)

export const deletePost = (id) => (
    fetch(`${url}/posts/${id}`, {
        method: 'delete',
        headers
    }).then( res => res.json().then( json => json ))
)

export const getAllComments = (postId) => (
    fetch(`${url}/posts/${postId}/comments`, {
        headers
    }).then( res => res.json().then( json => json ))
)

export const createNewComment = (comment) => (
    fetch(`${url}/comments`, {
        method: 'post',
        headers,
        body: JSON.stringify({
            ...comment,
            id: UUID(),
            timestamp: Date.now()
        })
    }).then( res => res.json().then( json => json ))
)

export const getCommentDetails = (id) => (
    fetch(`${url}/comments/${id}`, {
        headers
    }).then( res => res.json().then( json => json ))
)

export const voteComment = (vote, id) => (
    fetch(`${url}/comments/${id}`, {
        method: 'post',
        headers,
        body: JSON.stringify({
            option: vote
        })
    }).then( res => res.json().then( json => json ))
)

export const editComment = (id, comment) => (
    fetch(`${url}/comments/${id}`, {
        method: 'put',
        headers,
        body: JSON.stringify({
            ...comment,
            timestamp: Date.now()})
    }).then( res => res.json().then( json => json ))
)

export const deleteComment = (id) => (
    fetch(`${url}/comments/${id}`, {
        method: 'delete',
        headers
    }).then( res => res.json().then( json => json ))
)

