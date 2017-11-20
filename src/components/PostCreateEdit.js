import React, { Component } from 'react'
import '../styles/bootstrap/css/bootstrap.css'
import { connect } from 'react-redux'
import { uploadPost, updatePost } from '../actions/posts'

class PostCreateEdit extends Component {

    state = {
        title: this.props.data.title,
        body: this.props.data.body,
        author: this.props.data.author,
        category: 'react',
        isEditing: this.props.isEditing
    }

    handleSubmit = (e) => {
        const { title, body, author, category, isEditing } = this.state

        if (isEditing) {
            const { id }= this.props.data
            this.props.editPost(id, {title, body})
            
        } else {
            if (title && body && author && category){
                this.props.uploadPost({title, body, author, category}) 
            }
        }
        
        e.preventDefault()
        this.props.close()
    }

    handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value

        console.log(e.target.id)
        this.setState({[id]: value})
    }

    renderFooter = () => {
        const isEditing = this.state.isEditing

        if (isEditing) {
            return (
                <div className='footer'>
                <div className='send'>
                    <input type='submit' value='UPDATE' className='btn btn-primary' />
                </div> 
                </div>
            )
        } else {
            return (
                <div className='footer'>
                <input id='author' type='text' placeholder='Author' onChange={(e) => this.handleChange(e)}/>
                <div className='send'>
                    <select id='category' onChange={(e) => this.handleChange(e)}>
                        <option value='react'>react</option>
                        <option value='redux'>redux</option>
                        <option value='udacity'>udacity</option>
                    </select>
                    <input type='submit' value='SAVE' className='btn btn-primary' />
                </div> 
                </div>
            )
        }
    }

    render() {
        return(
            <div className="card">
                <h4 className="card-header">Add New Post</h4>
                <div className="card-body">
                    <form onSubmit={(e) => this.handleSubmit(e)} className='card-body'>
                        <p className="card-text"><input id='title' type='text' value={this.state.title} placeholder='Enter post title' onChange={(e) => this.handleChange(e)} className="input-group input-group-sm" /></p>
                        <p />
                        <p className="card-text"><textarea id='body' type='text' value={this.state.body} placeholder='Write your post...' onChange={(e) => this.handleChange(e)}  className="input-group input-group-sm" rows="8" cols="60"/></p>
                        {this.renderFooter()} 
                    </form>
                </div>
            </div>
        ) 
    }
}

PostCreateEdit.defaultProps = {
    data: {
        title: '',
        body: '',
        author: ''
    },
    isEditing: false
}

const mapDispatchToProps = dispatch => ({
    uploadPost: (post) => dispatch(uploadPost(post)),
    editPost: (id, post) => dispatch(updatePost(id, post))
})

export default connect(null, mapDispatchToProps)(PostCreateEdit)