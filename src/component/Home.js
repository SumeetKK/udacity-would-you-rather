import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button} from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
            <Col sm='6'>
                <Button color='primary' block>UnAnswered Questions</Button>
            </Col>
            <Col sm='6'>
                <Button outline color='primary' block>Answered Questions</Button>
            </Col>
        </Row>
        <Row>
            <Col sm='12'>
                <h3>Unanswered</h3>
                <ul>
                    {this.props.unAnswered.map((id) => (
                            <li key={id}>
                                {id}
                            </li>
                    ))}
                </ul>
                <h3>Answered</h3>
                <ul>
                    {this.props.answered.map((id) => (
                        <li key={id}>
                            {id}
                        </li>
                    ))}
                </ul>
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