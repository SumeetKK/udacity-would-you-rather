import React from 'react'
import { Card, CardHeader, CardBody, Col, Row, CardText } from 'reactstrap'

const LeaderboardCard = (props) => {

        const {user} = props
        return <Card className="my-2">
            <CardHeader style={{fontWeight: '500'}}>{props.user.name}</CardHeader>
            <CardBody>
                <Row>
                    <Col xs='3'>
                        <img src={user.avatarURL} style={{maxHeight: '120px', width: 'auto'}} className='img-fluid' alt="Avatar for Person" />
                    </Col>
                    <Col xs='6'>
                        <CardText>Answered Questions: {Object.keys(user.answers).length}</CardText>
                        <CardText>Created Question: {user.questions.length}</CardText>
                    </Col>
                    <Col xs='3'>
                        <Card className="text-center">
                            <CardHeader style={{fontWeight: '500'}}>Score</CardHeader>
                            <CardBody>
                                <CardText>{Object.keys(user.answers).length + user.questions.length}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CardBody>
        </Card>
}

export default LeaderboardCard