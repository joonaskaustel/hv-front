import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import axios from 'axios';

function List() {

    const apiUrl = process.env.REACT_APP_API_URL || '';
    const [items, setItems] = useState<{urlLink: string, price: number}[]>([])


    useEffect(() => {
       // get all items
        axios.get(`${apiUrl}/item/list`).then((res) => {
            console.log('res ', res.data)
            setItems(res.data)
        })

    }, []);

    return (
        <React.Fragment>

                <Row className='mt-4'>
                    <Col>
                        <ListGroup>
                            {items.map((i) => {
                                return (<ListGroup.Item>
                                    {i.urlLink} <b>{i.price}</b>
                                </ListGroup.Item>)
                            })}
                        </ListGroup>
                    </Col>

                    <Col></Col>
                </Row>
        </React.Fragment>
    );
}

export default List;
