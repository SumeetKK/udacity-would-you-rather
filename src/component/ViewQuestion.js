import React, {Component} from 'react'
import {Container, Card, CardHeader, CardBody, Button, Row, Col, CardTitle, CardText, FormGroup, Label, Input, Badge, Progress } from 'reactstrap'
import { connect } from 'react-redux'
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
        const answerOne = question.optionOne.votes.includes(authedUser)
        const answerTwo = question.optionTwo.votes.includes(authedUser)
        const alreadyAnswered = ( answerOne || answerTwo)
        
        return (<Container>
                <Col md={{size: 8, offset: 2}}>
                    {(alreadyAnswered) 
                        ? (<Card className="my-2">
                            <CardHeader style={{fontWeight: '500'}}>Asked By {this.props.user.name}</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs='4' className='d-flex flex-wrap align-items-center'>
                                        <img src={this.props.user.avatarURL} style={{maxHeight: '120px', width: 'auto'}} className='img-fluid mx-auto' alt="Avatar for Person" />
                                    </Col>
                                    <Col xs='8'>
                                        <CardText>Results:</CardText>
                                        <div className='px-1'>
                                            <Button block color="success" outline={!answerOne}>
                                                {answerOne && (<Badge href="#" color="warning" className='float-right' style={{borderRadius: '200px', padding: '8px', marginRight: '-35px', marginTop: '-25px'}}>Your<br />Vote</Badge>)}
                                                Would You Rather {question.optionOne.text}
                                                <Progress striped  color="primary" value={(question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100 } />
                                                <CardText>{question.optionOne.votes.length} out of {(question.optionOne.votes.length + question.optionTwo.votes.length)} Votes </CardText>

                                            </Button>
                                        </div>
                                        <div className='px-1'>
                                            <Button block color="success" outline={!answerTwo} className="my-4">
                                                {answerTwo && (<Badge href="#" color="warning" className='float-right' style={{borderRadius: '200px', padding: '8px', marginRight: '-35px', marginTop: '-25px'}}>Your<br />Vote</Badge>)}
                                                Would You Rather {question.optionTwo.text}
                                                <Progress striped  color="warning"  value={question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100 } />
                                                <CardText>{question.optionTwo.votes.length} out of {(question.optionOne.votes.length + question.optionTwo.votes.length)} Votes </CardText>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>)
                        : <Card className="my-2">
                            <CardHeader style={{fontWeight: '500'}}>{this.props.user.name} Asks:</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs='4'>
                                        <img src={this.props.user.avatarURL} style={{maxHeight: '120px', width: 'auto'}} className='img-fluid my-auto' alt="Avatar for Person" />
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

function mapStateToProps({questions, users, authedUser}, props)
{

    const {id} = props.match.params 
    const questionId = id
    return {
        question: questions[questionId],
        user: users[questions[questionId].author],
        authedUser,
        questionId,
    }
}

export default connect(mapStateToProps)(ViewQuestion)