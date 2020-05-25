import React, {Component, Fragment} from 'react'
import { connect } from  'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import NavBar from './Navbar'
import Home from './Home'
import ViewQuestion from './ViewQuestion'

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
                        <NavBar />
                        <ViewQuestion />
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