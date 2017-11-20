import React, { Component } from 'react'
import '../styles/Comment.css'

import { calcTimeSince } from '../utils/helper_time'
import { connect } from 'react-redux'
import { voteComment, removeComment } from '../actions/comments'
import CommentCreateEdit from './CommentCreateEdit'
import Modal from 'react-modal'
import '../styles/bootstrap/css/bootstrap.css'

//import icons to use on page
import VoteUp from 'react-icons/lib/fa/hand-o-up'
import VoteDown from 'react-icons/lib/fa/hand-o-down'
import Edit from 'react-icons/lib/md/edit'
import Delete from 'react-icons/lib/md/delete'
const cStyle = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
}

class Comment extends Component {

    state = {
        modalIsOpen: false
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    voteComment = (vote) => {
        this.props.voteComment(vote, this.props.data.id)
    }

    deleteComment = () => {
        this.props.deleteComment(this.props.data.id)
    }

    render() {

        const { voteScore, body, author, timestamp } = this.props.data

        return(
            <div className='card'>
                <div className='comment-details-container'>
                    <div className='card-text'>
                        {body}
                    </div>                   
                     <div className='card-footer'>
                        By: {author}  • {calcTimeSince(timestamp)} • Vote: 
                        <button id='arrow-up' onClick={() => { this.voteComment('upVote') }}><VoteUp size={18} /></button>
                        &nbsp;&nbsp;{voteScore}&nbsp;&nbsp;
                        <button id='arrow-down' onClick={() => { this.voteComment('downVote') }}><VoteDown size={18}/></button>
                            <Edit id='edit' size={16} onClick={this.openModal}/>
                            <Delete id='delete' size={16} onClick={this.deleteComment}/>
                            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} class="modal" tabindex="-1" >
                                <CommentCreateEdit close={this.closeModal} data={this.props.data} isEditing={true}/>
                            </Modal>
                </div>
            </div>
                    </div>            
        )
    }
}

const mapDispatchToProps = dispatch => ({
    voteComment: (vote, id) => dispatch(voteComment(vote, id)),
    deleteComment: (id) => dispatch(removeComment(id)),
  })

export default connect(null, mapDispatchToProps)(Comment)