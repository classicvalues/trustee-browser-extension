import React from 'react'
import {Button, ListGroup} from 'react-bootstrap'


export default function HomeScreen(props) {

    async function handleDisconnect() {

    }

    return (
        <div className='container'>
            <ListGroup>
            {
                props.walletAddressList.map((address) =>
                    <ListGroup.Item>{address}</ListGroup.Item>
                )
            }
            </ListGroup>
            <Button onClick={handleDisconnect} block size='lg' type='submit'>
                Logout
            </Button>
        </div>
    )
}
