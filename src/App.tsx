import React from 'react';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LinkInput from "./components/LinkInput";
import MainMenu from "./components/MainMenu";
import List from "./components/List";

function App() {

    return (
            <React.Fragment>
                <MainMenu/>
                <Container fluid>
                    <Row className='mt-4'>
                        <Col></Col>
                        <Col className='align-middle'>
                            <LinkInput/>
                        </Col>
                        <Col></Col>
                    </Row>
                    <List/>
                </Container>
            </React.Fragment>
    );
}

export default App;
