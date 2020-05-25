import React, {Component} from 'react'
import { connect } from  'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Home from './Home'

class App extends Component{

    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }

    render(){
        return (
            <div>
                {this.props.loading === true
                    ? <Login />
                    : <Home />}
            </div>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
      loading: authedUser === null
    }
  }

  
export default connect(mapStateToProps)(App)