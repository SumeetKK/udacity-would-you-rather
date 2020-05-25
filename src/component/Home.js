import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button} from 'reactstrap';
import ListQuestion from './ListQuestion'

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
            <Col md={{size: 4, offset: 2}}>
                <Button color='primary' block>UnAnswered Questions</Button>
            </Col>
            <Col md='4'>
                <Button outline color='primary' block>Answered Questions</Button>
            </Col>
        </Row>
        <Row>
            <Col md={{size: 8, offset: 2}}>
                <h3>Unanswered</h3>
                    {this.props.unAnswered.map((id) => (
                            <ListQuestion key={id} id={id} />
                    ))}
                <h3>Answered</h3>
                    {this.props.answered.map((id) => (
                        <ListQuestion key={id} id={id} />
                    ))}
            </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
    let questionIDs = Object.keys(questions)
    let userAnswers = users[authedUser] ? Object.keys(users[authedUser].answers) : []
    return {
        answered : questionIDs.filter((question) => userAnswers.includes(question))
                                        .sort((a, b) => b.timestamp - a.timestamp),
        unAnswered: questionIDs.filter((question) => !userAnswers.includes(question))
                                        .sort((a, b) => b.timestamp - a.timestamp)
    }
  }

export default connect(mapStateToProps)(Home) 