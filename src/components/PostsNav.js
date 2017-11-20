import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import { votePost, removePost } from '../actions/posts'
import { showPostDetails } from '../actions/user_actions'

//import icons to use on page
import VoteUp from 'react-icons/lib/fa/hand-o-up'
import VoteDown from 'react-icons/lib/fa/hand-o-down'
import Edit from 'react-icons/lib/md/edit'
import Delete from 'react-icons/lib/md/delete'

import PostCreateEdit from './PostCreateEdit'
import PostDetails from './PostDetails'
import '../styles/bootstrap/css/bootstrap.css'

import {calcTimeSince} from'../utils/helper_time'
/// posts will show all the posts

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
}

class PostNav extends Component {

    state = {
        modalIsOpen: false
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    votePost = (vote) => {
        this.props.votePost(vote, this.props.data.id)
    }

    deletePost = () => {
        this.props.deletePost(this.props.data.id)
    }

    showDetails = (id) => {
        const { showDetails } = this.props

        if (showDetails) {
            return
        } else {
            this.props.showPostDetails(id)
        }
    }

    render() {

        const { id, voteScore, title, body, author, timestamp, commentCount, category } = this.props.data
        return(
            
            <div className='card'>
	                <div className='card-body'>
	                    <Link to={`/${category}/${id}`} className='no-link' onClick={() => this.showDetails(id)}>
	                    <div className='card-title'>
	                        {title}
	                    </div>
	                    </Link>
	                    <div className='card-text'>
	                        {body}
	                    </div>
	                </div>
	                    <div className='card-footer'>
	                            {`${author} • ${calcTimeSince(timestamp)} • ${commentCount} comments`}	                        
	                    <button id='arrow-up' onClick={() => { this.votePost('upVote') }}><VoteUp size={20} title="Like"  /></button>
	                    {voteScore}
	                    <button id='arrow-down' onClick={() => { this.votePost('downVote') }}><VoteDown size={20} title="Dislike"/></button>
                            <Edit id='edit' size={16} onClick={this.openModal}/>
	                            <Delete id='delete' size={16} onClick={this.deletePost}/>
	                            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
	                                <PostCreateEdit close={this.closeModal} data={this.props.data} isEditing={true}/>
	                            </Modal>
	                    </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state, props) => ({

    showDetails: state.user_actions.showDetails
})  

const mapDispatchToProps = dispatch => ({
    votePost: (vote, id) => dispatch(votePost(vote, id)),
    deletePost: (id) => dispatch(removePost(id)),
    showPostDetails: (id) => dispatch(showPostDetails(id)),
})

PostNav.defaultProps = {
    editEnable: true
}

export default connect(mapStateToProps, mapDispatchToProps)(PostNav)