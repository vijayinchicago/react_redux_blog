import React, { Component } from 'react'
import { sort } from '../utils/helper_sort'
import { connect } from 'react-redux'
import PostsNav from './PostsNav'
import { Route, Switch } from 'react-router-dom'
import PostDetails from './PostDetails'
import { sortPosts } from '../actions/user_actions'


class AllPosts extends Component {


  componentDidMount(){
    this.props.sortPosts({
      parameter: 'voteScore',
      lowestFirst: false
    })
  }

    render() {

        const { showDetails } = this.props
        return(
          <div>
            {showDetails ? null : <div>{this.renderPosts()}</div>}
            <div>
            <Switch>
              {this.renderPostsRoutes()}
              <Route path='/' render={() => <PostDetails data={{}}/>}/>
            </Switch>
            </div>
          </div>
        )
    }

renderPostsRoutes = () => {
  const { posts } = this.props

    const postsRoutes = posts.filter( post => post.deleted === false).map( post => {
      return (
        <Route exact path={`/${post.category}/${post.id}`} key={post.id} render={()=> <PostDetails data={post}/>}/>
      )
    })
      
    return postsRoutes
}

renderPosts = () => {
    const { posts } = this.props
    console.log(posts)

    const postsViews = posts.filter( post => post.deleted === false).map( post => {
      console.log({post})
        return (

            <PostsNav key={post.id} data={post}/>
        )
    })

    if (postsViews.length < 1) {
        return (<p>No posts in this category.</p>)
    } else {
        return postsViews
    }
}

}

const mapDispatchToProps = dispatch => ({
  sortPosts: (sorting) => dispatch(sortPosts(sorting))
})

const mapStateToProps = (state, props) => {
    const filter = state.user_actions.postFilter
    const sorting = state.user_actions.postSorting
    
    const postsArray = Object.entries(state.posts).map( post => post[1])
  
    if (sorting) {
      if (filter) {
        const filtered = postsArray.filter( post => {
          return post.category === filter
        })
        const sorted = sort(filtered, sorting.parameter, sorting.lowestFirst)
        return {
          categories: state.categories,
          posts: sorted,
          showDetails: state.user_actions.showDetails
        }
      } else {
        const sorted = sort(postsArray, sorting.parameter, sorting.lowestFirst)
        if(state.user_actions.showDetails==="notfound"){
          return {
            categories: state.categories,
            posts: sorted,
            showDetails: null
          }} else {
            return {
            categories: state.categories,
            posts: sorted,
            showDetails: state.user_actions.showDetails
          }
        }  
      }
    } 
    
    return {}

  }

AllPosts.defaultProps = {
  posts: []
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(AllPosts);