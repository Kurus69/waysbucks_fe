import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Foto from '../assets/image/card.png';
export default function Cards() {
    return (
        <>
        <Container>
            <Card style={{ display: 'flex', alignItems: 'start',width:'90%', height: '400px', backgroundColor: '#BD0707', position: 'relative', marginTop: '30px', borderRadius: '10px', justifyContent: "center", color: 'white', }}>
                <Card.Img variant="right" src={Foto} style={{ width: "450px", position: 'absolute', right: -100, borderRadius: '10px' }} />
                <Card.Body style={{ width: '50%', marginLeft: '20px', lineHeight: '1.5', lineClamp: 'unset' }}>
                    <Card.Title style={{ fontSize: '50px', fontWeight: 'bold', marginTop: '50px', }}>WAYSBUCKS</Card.Title>
                    <Card.Text style={{fontSize:'20px', fontWeight:'100', lineHeight:1.5}}>
                        Things are changing, but we’re still here for you
                    </Card.Text>
                    <Card.Text style={{ fontSize:'17px',lineHeight:1.5}}>
                        <p>
                            We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open.<br/> <b>Waysbucks</b> Drivers is also available
                        </p>
                        Let’s Order...
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}