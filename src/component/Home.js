import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Nav, NavLink, NavItem, TabPane, TabContent} from 'reactstrap';
import ListQuestion from './ListQuestion'

class Home extends Component {

    state = { activeTab: 'answered' }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({ activeTab: tab });
        }
      }

  render() {
      const answered = 'answered'
      const unanswered = 'unanswered'
    return (
      <Container>
        <Row>
            <Col md={{size: 8, offset: 2}}>
                <Nav tabs className='nav-justified'>
                    <NavItem>
                        <NavLink active={this.state.activeTab === answered } onClick={() => { this.toggle(answered); }}>
                            Answered
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={this.state.activeTab === unanswered } onClick={() => { this.toggle(unanswered); }}>
                            Unanswered
                        </NavLink>
                    </NavItem>
                </Nav>
            </Col>
        </Row>
        <Row>
            <Col md={{size: 8, offset: 2}}>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={answered}>
                        { this.state.activeTab === answered
                            && this.props.answered.map((id) => (
                                <ListQuestion key={id} id={id} />
                            ))}
                    </TabPane>
                    <TabPane tabId={unanswered}>
                        { this.state.activeTab === unanswered
                            && this.props.unAnswered.map((id) => (
                                <ListQuestion key={id} id={id} />
                            ))}
                    </TabPane>
                </TabContent>
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