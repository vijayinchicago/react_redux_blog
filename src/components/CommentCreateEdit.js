import React, { Component } from 'react'
import '../styles/CommentCreateEdit.css'
import { connect } from 'react-redux'
import { uploadComment, updateComment } from '../actions/comments'

class PostCreateEdit extends Component {

    state = {
        title: this.props.data.title,
        body: this.props.data.body,
        author: this.props.data.author,
        category: 'react',
        isEditing: this.props.isEditing
    }

    handleSubmit = (e) => {
        const { body, author, isEditing } = this.state

        if (isEditing) {
            const { id } = this.props.data
            this.props.editComment(id, {body})
            
        } else {
            const parentId = this.props.parent
            if(body && author && parentId) {
                this.props.uploadComment({ body, author, parentId}) 
            }
            
        }
        
        e.preventDefault()
        this.props.close()
    }

    handleChange = (e) => {
        const idValue = e.target.id.split('-')
        const id = idValue[0]
        const value = e.target.value

        console.log(e.target.id)
        this.setState({[id]: value})
    }

    renderFooter = () => {
        const isEditing = this.state.isEditing

        if (isEditing) {
            return (
                <div className='footer-comment'>
                <div className='send-comment'>
                    <input type='submit' value='UPDATE'/>
                </div> 
                </div>
            )
        } else {
            return (
                <div className='footer-comment'>
                <input id='author-comment' type='text' placeholder='Author' onChange={(e) => this.handleChange(e)}/>
                <div className='send-comment'>
                    <input type='submit' value='SAVE'/>
                </div> 
                </div>
            )
        }
    }

    render() {
        return(
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <textarea id='body-comment' type='text' value={this.state.body} placeholder='Write your comment here...' onChange={(e) => this.handleChange(e)}/>
                    {this.renderFooter()} 
                </form>
        ) 
    }
}

PostCreateEdit.defaultProps = {
    data: {
        body: '',
        author: ''
    },
    isEditing: false
}

const mapDispatchToProps = dispatch => ({
    uploadComment: (comment) => dispatch(uploadComment(comment)),
    editComment: (id, comment) => dispatch(updateComment(id, comment))
})

export default connect(null, mapDispatchToProps)(PostCreateEdit)