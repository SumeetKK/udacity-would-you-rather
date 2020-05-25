import React, {Component, Fragment} from 'react'
import { connect } from  'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import NavBar from './Navbar'
import Home from './Home'
import ViewQuestion from './ViewQuestion'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component{

    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }

    render(){
        console.log("Login:", this.props.login)
        return (
            <div>
                {this.props.login === true
                    ? <Login />
                    : (<Fragment>
                        <Router>            
                            <NavBar />
                            <Route exact path="/" component={ Home }/> 
                            <Route exact path="/questions/:id" component={ ViewQuestion }/>
                            <Route exact path="/new" component={ NewQuestion }/>
                            <Route exact path="/leaderboard" component={ Leaderboard }/>
                        </Router>            
                    </Fragment>)}
            </div>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
      login: authedUser === null
    }
  }

  
export default connect(mapStateToProps)(App)