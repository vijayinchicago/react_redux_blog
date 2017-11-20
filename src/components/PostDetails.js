import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showPostDetails, sortComments } from '../actions/user_actions'
import PostsNav from './PostsNav'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import { fetchComments } from '../actions/comments'
import '../styles/PostDetails.css'
import '../styles/bootstrap/css/bootstrap.css'
import { sort } from '../utils/helper_sort'
import Modal from 'react-modal'
import CommentCreateEdit from './CommentCreateEdit'

const pStyle = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
}

class PostDetails extends Component {

    state = {
        modalIsOpen: false
    }

    componentDidMount() {
        const { id } = this.props.data

        if (id) {
            this.props.showPostDetails(id)
            this.props.loadComments(id)
            this.props.sortComments({
                parameter: 'voteScore',
                lowestFirst: false
            })
        } else {
            this.props.showPostDetails('notfound')
        }
        
    }

    componentWillUnmount() {
        this.props.loadComments(null)
    }

    renderComments = () => {
        const { comments } = this.props

        const commentsView = comments.filter( comment => comment.deleted === false).map( comment => {
            return (
                <Comment key={comment.id} data={comment}/>
            )
        })

        if (commentsView.length < 1) {
            return (<p id='no-comments'>No comments in this post.</p>)
        } else {
            return commentsView
        }
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }
    
    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    handleSort = (e) => {
        
        const value = e.target.value
        const sorts = value.split('_')
        
        if (sorts[0] === 'highest') {
            this.props.sortComments({
                parameter: sorts[1],
                lowestFirst: false
            })
        } else {
            this.props.sortComments({
                parameter: sorts[1],
                lowestFirst: true
            })
        }  
    }

    render() {
        console.log(this.props.data)
        const { category, id } = this.props.data

        if (id) {
            return (
                <div>
                    <div className='nav-bar'>
                        <div className="navbar-brand mb-0 h1">
                            <Link to='/' className='link'>All Categories & Posts</Link>
                            <Link to={`/${category}`} className='link'>/{category}</Link>
                            /post
                        </div>
                    </div>
    
                    <div>
                        <PostsNav data={this.props.data} editEnable={true} />
                        <div className='comments-section'>
                            <div className='comments-section-title'>
                            <div><p>All Comments</p></div>
                            <div className='comments-sort'>
                                <select onChange={(e) => this.handleSort(e)}>
                                    <option value='highest_voteScore' name='voteScore'>Sort by score (highest first)</option>
                                    <option value='lowest_voteScore' name='voteScore'>Sort by score (lowest first)</option>
                                    <option value='highest_timestamp' name='timestamp'>Sort by time (newest first)</option>
                                    <option value='lowest_timestamp' name='timestamp'>Sort by time (oldest first)</option>
                                </select>
                            </div>
                            </div>
                            <div>
                            <button onClick={this.openModal} className="btn btn-primary">NEW COMMENT</button>
                            </div>
                        </div>
                        <div className='comments-feed'>
                            {this.renderComments()}
                        </div>
                        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={pStyle}>
                            <CommentCreateEdit close={this.closeModal} parent={id}/>
                        </Modal>
                    </div>
                </div>
            )
        } else {
            return  (
                <div>
                </div>
            ) 
        }
    }
}

const mapDispatchToProps = dispatch => ({
    showPostDetails: (id) => dispatch(showPostDetails(id)),
    loadComments: (id) => dispatch(fetchComments(id)),
    sortComments: (sorting) => dispatch(sortComments(sorting))
})

const mapStateToProps = (state, props) => {
    const sorting = state.user_actions.commentsSorting
    const commentsArray = Object.entries(state.comments).map( comment => comment[1])

    if (sorting) {
        const sorted = sort(commentsArray, sorting.parameter, sorting.lowestFirst)
        
        return {
            comments: sorted
        }
    }

    return{}

}

PostDetails.defaultProps = {
    comments: []
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)