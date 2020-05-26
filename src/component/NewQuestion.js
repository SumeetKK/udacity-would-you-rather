import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {handleQuestion} from '../actions/shared'


class QuestionForm extends Component {
    state = {
        optionOne: null,
        optionTwo: null,
        toHome: false,
        stopSubmit: true,
    }

    handleEdgeCases = () => {
        if(this.state.optionOne !== null && this.state.optionTwo !== null){
            (this.state.optionOne !== this.state.optionTwo)
            ? this.setState({ stopSubmit: false })
            : this.setState({ stopSubmit: true })
        }
        else{
            this.setState({ stopSubmit: true })
        }

            
    }

    changeOptionOne = (e) => {
        this.setState({ optionOne: e.target.value}, () => { 
            this.handleEdgeCases()
        })
    }

    changeOptionTwo = (e) => {
        this.setState({ optionTwo: e.target.value}, () => { 
            this.handleEdgeCases()
        })

    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {authedUser, dispatch} = this.props
        this.handleEdgeCases()
        if(!this.state.stopSubmit){
            dispatch(handleQuestion(authedUser, this.state.optionOne, this.state.optionOne))
            this.setState({
                toHome: true
            })
        }
        else {
            alert(`Options shouldn't be empty or same`)
        }
        
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
                                    <Input required type="text" id="OptionOne" placeholder="Enter Option One Text Here"  onChange={this.changeOptionOne} />
                                </FormGroup> 
                                <div style={{width: "100%", height: "1em", borderBottom: "1px solid #565656", textAlign: "center", marginBottom: '20px'}}>
                                    <span style={{fontWeight: '500', fontSize: '1.2em', backgroundColor: '#fff', padding:'0 10px', }}>
                                       Or
                                    </span>
                                </div>
            
                                <FormGroup>
                                    <Label for="OptionTwo">Option Two</Label>
                                    <Input required type="text" id="OptionTwo" placeholder="Enter Option Two Text Here" onChange={this.changeOptionTwo} />
                                </FormGroup>
                                <Button color='success' block type='submit' disabled={this.state.stopSubmit}>Submit</Button> 
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