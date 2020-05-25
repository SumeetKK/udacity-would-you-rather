import React, {Component} from 'react'
import {Container, Card, CardHeader, CardBody, Button, Row, Col, CardTitle} from 'reactstrap'
import { connect } from 'react-redux'
import { FormGroup, Label, Input } from 'reactstrap'
import { handleAnswer } from '../actions/shared';


class ViewQuestion extends Component{


    state = {
        selected: null,
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, authedUser, questionId } =  this.props
        console.log('Items:', authedUser, questionId, this.state.selected);
        dispatch(handleAnswer(authedUser, questionId, this.state.selected))
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({selected: e.target.value})
    }

    
    render(){
        const {question, authedUser} = this.props
        const alreadyAnswered = (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
        return (<Container>
                <Col md={{size: 8, offset: 2}}>
                    {(alreadyAnswered) 
                        ? "Already Answered"
                        : <Card className="my-2">
                            <CardHeader style={{fontWeight: '500'}}>{this.props.user.name} Asks:</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs='4'>
                                        <img src={this.props.user.avatarURL} style={{maxHeight: '120px', width: 'auto'}} className='img-fluid' alt="Avatar for Person" />
                                    </Col>
                                        <Col xs='8'>
                                            <form onSubmit={this.handleSubmit} >
                                            <CardTitle><strong>Would You Rather</strong></CardTitle>
                                            <FormGroup tag="fieldset">
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name="options" onChange={this.handleChange} value='optionOne' />{' '}
                                                        {this.props.question.optionOne.text}
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name="options" onChange={this.handleChange} value='optionTwo'/>{' '}
                                                        {this.props.question.optionTwo.text}
                                                    </Label>
                                                </FormGroup>
                                            </FormGroup>
                                            <Button color='success' block>Submit</Button>
                                        </form>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>}
                </Col>
            </Container>)
    }
}

function mapStateToProps({questions, users, authedUser})
{
    const questionId = 'xj352vofupe1dqz9emx13r'
    console.log('users: ', users)
    return {
        question: questions[questionId],
        user: users[questions[questionId].author],
        authedUser,
        questionId,
    }
}

export default connect(mapStateToProps)(ViewQuestion)