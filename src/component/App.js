import React, {Component} from 'react'
import { connect } from  'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
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
                    : <ViewQuestion />}
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