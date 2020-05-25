import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col } from 'reactstrap'

class Leaderboard extends Component {
    render() {
        const {topUsers} = this.props
        return (
            <div>
                <Container>
                <Col md={{size: 8, offset: 2}}>
                    <ul>
                        {topUsers.map((userId) => (
                            <li key={userId}>
                                {userId}
                            </li>
                        ))}
                    </ul>
                </Col>
                </Container>
            </div>
        )
    }
}

function mapStateToProps({users}) {

    const topUsers = (Object.keys(users)).sort((a, b) => {
        const scoreA = (Object.keys(users[a].answers)).length + users[a].questions.length
        const scoreB = (Object.keys(users[b].answers)).length + users[b].questions.length
        return scoreB - scoreA
      })
    
    return {
        topUsers,
    }
}

export default connect(mapStateToProps)(Leaderboard)