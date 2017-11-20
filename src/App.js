import React, { Component } from 'react';
import Modal from 'react-modal'
import { connect } from 'react-redux'

/* import all the actions*/
import {getAllCategories} from './actions/categories'
import {getPosts} from './actions/posts'
import { fetchComments,} from './actions/comments'
import { sortPosts } from './actions/user_actions'
/*import all components*/
import CategoryNav from './components/CategoryNav' // have a side bar that lists all categories
import MainContent from './components/MainContent' // main content window that shows all posts, comments, etc.
import PostCreateEdit from './components/PostCreateEdit'

import './styles/bootstrap/css/bootstrap.css'
import './App.css'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class App extends Component {

  state = {
    modalIsOpen: false
  }

  componentDidMount() {
    this.props.loadPosts()
    this.props.loadCategories()
    this.props.loadComments()
  }

  render() {
    return (
      <div className='body'>
          <div className='column left'>
            <CategoryNav open={this.openModal}/>
          </div>
          <div className='column right'>
            <MainContent />
          </div>

          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
              <PostCreateEdit close={this.closeModal}/>
          </Modal>

      </div>
    );
  }



  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }
}


const mapDispatchToProps = dispatch => ({
  loadCategories:() => dispatch(getAllCategories()),
  loadPosts:() => dispatch(getPosts()),
  loadComments: () => dispatch(fetchComments()),
  sortPosts: (sorting) => dispatch(sortPosts(sorting))
})
export default connect(null, mapDispatchToProps, null, {pure:false})(App);
