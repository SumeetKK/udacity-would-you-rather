import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Card, Col, Container, CardHeader, CardBody, Button, CardTitle, Form, FormGroup, Label, CustomInput} from 'reactstrap';

class Login extends Component{

     state = {text: ''}

    handleSubmit = (e) => {
        e.preventDefault()
        const  { dispatch } = this.props
        dispatch(setAuthedUser(this.state.text))
    }

    handleChange = (e) => {
        e.preventDefault()
        const text = e.target.value
        this.setState(() => ({text}))
    }


    render(){
        return (
            <Container>
                <Col md={{ size: '6', offset: 3 }}>
                    <Card className='my-5'>
                        <CardHeader>Would You Rather?</CardHeader>
                        <CardBody>
                            <Form onSubmit={this.handleSubmit}>
                                <CardTitle style={{ fontSize: '2em', fontWeightt: '600', textAlign: 'center' }}>Login</CardTitle>
                                <FormGroup>
                                    <Label for="userSelect" >Select Username</Label>
                                    <CustomInput type="select" id="userSelect" onChange={this.handleChange}>
                                    <option value="">Select</option>
                                    {this.props.users.map((userId) => (
                                        <option key={userId} value={userId}>
                                            @{userId}
                                        </option>
                                    ))}
                                    </CustomInput>
                                </FormGroup>
                                <Button color='secondary' block disabled={this.state.text === ''}>Log In</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Container>
                
        )
    }
}

function mapStateToProps({users}){
    return{
        users: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login)