import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {handleQuestion} from '../actions/shared'


class QuestionForm extends Component {
    state = {
        optionOne: null,
        optionTwo: null,
        toHome: false
    }

    changeOptionOne = (e) => {
        this.setState({
            optionOne: e.target.value
        })
    }
    changeOptionTwo = (e) => {
        this.setState({
            optionTwo: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {authedUser, dispatch} = this.props
        dispatch(handleQuestion(authedUser, this.state.optionOne, this.state.optionOne))
        this.setState({
            toHome: true
        })
    }
    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/' />
        }

        return (<Container>
                <Col md={{size: 8, offset: 2}}>
                    <Card className='my-5'>
                        <CardBody>
                            <CardTitle><strong>Would You Rather</strong></CardTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="OptionOne">Option One</Label>
                                    <Input type="text" id="OptionOne" placeholder="Enter Option One Text Here"  onChange={this.changeOptionOne} />
                                </FormGroup> 
                                <div style={{width: "100%", height: "1em", borderBottom: "1px solid #565656", textAlign: "center", marginBottom: '20px'}}>
                                    <span style={{fontWeight: '500', fontSize: '1.2em', backgroundColor: '#fff', padding:'0 10px', }}>
                                       Or
                                    </span>
                                </div>
            
                                <FormGroup>
                                    <Label for="OptionTwo">Option Two</Label>
                                    <Input type="text" id="OptionTwo" placeholder="Enter Option Two Text Here" onChange={this.changeOptionTwo} />
                                </FormGroup>
                                <Button color='success' block type='submit'>Submit</Button> 
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
        </Container>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionForm)