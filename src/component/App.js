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
        const login = this.props.login;
        return (
            <Router>
                {this.props.login === true
                    ? (<Fragment>
                        <NavBar login={login} />
                        <Login />
                    </Fragment>)
                    : (<Fragment>
                            <NavBar />
                            <Route exact path="/" component={ Home }/> 
                            <Route exact path="/questions/:question_id" component={ ViewQuestion }/>
                            <Route exact path="/add" component={ NewQuestion }/>
                            <Route exact path="/leaderboard" component={ Leaderboard }/>            
                    </Fragment>)}
            </Router>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
      login: authedUser === null
    }
  }

  
export default connect(mapStateToProps)(App)