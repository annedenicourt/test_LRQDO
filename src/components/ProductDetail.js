import Card from 'react-bootstrap/Card'
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'
import logo from '../assets/nutriscore-logo.png'
import Banner from './Banner';

export default function ProductDetail() {

    const [product, setProduct] = useState([])
    const { id } = useParams();

    useEffect(() => {
        axios.get('https://fr.openfoodfacts.org/api/v0/product/' + id + '.json', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res =>
                setProduct(res.data.product),
            )
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }, [])

    return (<>
        <Banner />
        <div className="row mx-O mt-5 justify-content-center ">
            <h2 className="mb-5 text-center">FICHE DÉTAIL PRODUIT</h2>
            <div className="col col-md-8" >
                <Card className=" mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <Card.Img src={product.image_small_url} className="detail_image img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <Card.Body className="">
                                <Card.Title className="text-center">{product.product_name_fr}</Card.Title>
                                <Card.Text className="">Ingrédients : {product.ingredients_text_fr}</Card.Text>
                                <Card.Text className="">Allergènes : {product.allergens}</Card.Text>
                                <img src={logo} width="200" alt="logo nutriscore" />
                                <Card.Text className="text-uppercase">Nutriscore : {product.nutriscore_grade}</Card.Text>
                            </Card.Body>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </>
    )
}