import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col } from 'reactstrap'
import LeaderboardItem from './LeaderboardItem'

class Leaderboard extends Component {
    render() {
        const {topUsers, users} = this.props
        return (
            <div>
                <Container>
                <Col md={{size: 8, offset: 2}}>
                    <ul>
                        {topUsers.map((userId) => (
                            <LeaderboardItem user={users[userId]} />
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
        users,
    }
}

export default connect(mapStateToProps)(Leaderboard)