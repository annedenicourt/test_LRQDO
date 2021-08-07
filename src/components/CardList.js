import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import '../styles/App.css'

export default function CardList(props) {
    return (
        <>
            <Card key={props.id}>
                <Card.Img className="card_image" variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>Allergènes : {props.allergens}</Card.Text>
                    <Link to={{ pathname: `/product/${props.id}` }}><button className="btn fw-bold text-info"><i className="bi bi-plus-circle-fill"></i> D'INFOS</button></Link>
                </Card.Body>
            </Card>
        </>
    )
}