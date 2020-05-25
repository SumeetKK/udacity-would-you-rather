import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Card, CardHeader, CardBody, Button, Row, Col, CardTitle, CardText} from 'reactstrap'
import { connect } from 'react-redux'

class ListQuestion extends Component{

    render(){
        return (<Card className="my-2">
            <CardHeader style={{fontWeight: '500'}}>{this.props.user.name} Asks:</CardHeader>
            <CardBody>
                <Row>
                    <Col xs='4'>
                        <img src={this.props.user.avatarURL} style={{maxHeight: '120px', width: 'auto'}} className='img-fluid' alt="Avatar for Person" />
                    </Col>
                    <Col xs='8'>
                        <CardTitle><strong>Would You Rather</strong></CardTitle>
                        <CardText>...{this.props.question.optionOne.text.substr(0,25)}...</CardText>
                        <Button tag={Link} to={`/questions/${this.props.question.id}`} outline color='success' block>View Poll</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>)
    }
}

function mapStateToProps({questions, users}, props)
{
    return {
        question: questions[props.id],
        user: users[questions[props.id].author]
    }
}

export default connect(mapStateToProps)(ListQuestion)