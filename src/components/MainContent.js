import React, { Component } from 'react';
import '../styles/bootstrap/css/bootstrap.css';
import { Route, Switch } from 'react-router-dom'
import FilterAndSort from './FilterAndSort'
import AllPosts from './AllPosts'

class MainContent extends Component {

    render() {
        return(
            <div>
                <Switch>
                        <Route exact path='/' render={() =><FilterAndSort />}/>
                        <Route exact path='/react' render={()=> <FilterAndSort filter='react'/>}/>
                        <Route exact path='/redux' render={() => <FilterAndSort filter='redux'/>}/>
                        <Route exact path='/udacity' render={() => <FilterAndSort filter='udacity'/>}/>
                </Switch>
                <div>
                    <AllPosts />
                </div>
            </div>
        )
        
    }
    
}
  
export default MainContent
