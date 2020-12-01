import React, { Component } from 'react'
import TextWidget from '../Components/TextWidget/TextWidget'
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import Graph from '../Components/Graph/Line/Graph';
import Pie from '../Components/Graph/Pie/Graph';

export class Dashboard extends Component {
    render() {
        return (
            <div className='dashboard'>
                <Container fluid>
                    <Row>
                        <Col><TextWidget title='Website' value='580' description='50% of the total appointments' icon={<IoIcons.IoIosGlobe/>}/></Col>
                        <Col><TextWidget title='Email' value='580' description='50% of the total appointments' icon={<FaIcons.FaRegEnvelope/>}/> </Col>
                        <Col><TextWidget title='Total' value='1160' description='50% of the total appointments' icon={<FaIcons.FaRegCalendar/>}/></Col>
                    </Row>
                    <Row>
                        <Col><Graph/></Col>
                        <Col><Pie/></Col>
                    </Row>
                    
                </Container>
            </div>
        )
    }
}

export default Dashboard
