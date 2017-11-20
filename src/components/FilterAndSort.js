import React, { Component } from 'react';
import '../styles/bootstrap/css/bootstrap.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { filterPosts, showPostDetails, sortPosts } from '../actions/user_actions'

class FilterAndSort extends Component {

    componentDidUpdate() {
        const filter = this.props.filter
        this.props.showDetails(null)
        this.props.filterPosts(filter)
    }

    componentDidMount() {
        const filter = this.props.filter
        this.props.showDetails(null)
        this.props.filterPosts(filter)
    }

    handleSort = (e) => {
        
        const value = e.target.value
        const sorts = value.split('_')
        
        if (sorts[0] === 'descending') {
            this.props.sortPosts({
                parameter: sorts[1],
                lowestFirst: false
            })
        } else {
            this.props.sortPosts({
                parameter: sorts[1],
                lowestFirst: true
            })
        }  
    }
    

    render() {
        const filter = this.props.filter
        
        if (filter) {
            return(
                <div className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div className="navbar-brand mb-0 h1"><Link to='/' className='link'>All Categories & Posts</Link>/{filter}</div>
                    <div className="btn btn-secondary btn-sm dropdown-toggle">
                    <select onChange={(e) => this.handleSort(e)}>
                        <option value='descending_voteScore' name='voteScore' className="dropdown-item">Sort by score (highest first)</option>
                        <option value='ascending_voteScore' name='voteScore' className="dropdown-item">Sort by score (lowest first)</option>
                        <option value='descending_timestamp' name='timestamp' className="dropdown-item">Sort by time (newest first)</option>
                        <option value='ascending_timestamp' name='timestamp' className="dropdown-item">Sort by time (oldest first)</option>
                    </select>
                </div>
                </div>
            )
        } else {
            return(
                <div className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className="navbar-brand mb-0 h1">All Categories & Posts</div>
                <div className='sort'>
                <select onChange={(e) => this.handleSort(e)}>
                    <option value='descending_voteScore' name='voteScore' className="dropdown-item">Sort by score (highest first)</option>
                    <option value='ascending_voteScore' name='voteScore' className="dropdown-item">Sort by score (lowest first)</option>
                    <option value='descending_timestamp' name='timestamp' className="dropdown-item">Sort by time (newest first)</option>
                    <option value='ascending_timestamp' name='timestamp' className="dropdown-item">Sort by time (oldest first)</option>
                </select>
            </div>
            </div>
            )
        }
        
    }

}

FilterAndSort.defaultProps = {
    filter: ''
}


const mapDispatchToProps = dispatch => ({
    filterPosts: (filter) => dispatch(filterPosts(filter)),
    showDetails: (id) => dispatch(showPostDetails(id)),
    sortPosts: (sorting) => dispatch(sortPosts(sorting))
})


export default connect(null, mapDispatchToProps, null, {pure:false})(FilterAndSort);

