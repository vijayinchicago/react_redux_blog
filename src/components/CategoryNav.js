import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const CategoryNav = (props) => {
	const showCategories = () => {
		const { categories } = props
			if(categories.length) {
			    const catLinks = categories.map( category => {
			        return(
			            <Link key={category.path} to={`/${category.path}`} className='link'>
			                <div className='nav-link'>
			                      {category.name}
			                </div>
			            </Link>
			            )
			        })
			    return catLinks
			    }
			}

			return (
				<div className='card'>
			    <div className='nav flex-column nav-pills'>
			        <button onClick={props.open} className="btn btn-primary">ADD NEW POST</button>
            		<p/>
			            <div className='card-header'>Categories:</div>
			            {showCategories()}
			    </div>
			    </div>
			    )
			}
	
const mapStateToProps = (state, props) => {
    	return{
    		categories: state.categories
    	}
}

CategoryNav.defaultProps = {
    categories: []
}

export default connect(mapStateToProps)(CategoryNav)