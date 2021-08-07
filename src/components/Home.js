import Banner from './Banner';
import React from 'react';
import CardList from './CardList';
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            errors: {},
            products: [],
            allProducts: [],
            count: '',
            isSearched: false,
            page: 1,
            pageSearch: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.incrementPagination = this.incrementPagination.bind(this);
        this.decrementPagination = this.decrementPagination.bind(this)
    }

    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts() {
        axios.get('https://fr.openfoodfacts.org/cgi/search.pl?action=process&sort_by=unique_scans_n&page_size=48&page=' + this.state.page + '&sort_by=unique_scans_n&json=1')
            .then(res => {
                this.setState({ allProducts: res.data.products });
                console.log(this.state.allProducts)
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleValidation() {
        let formIsValid = true
        let errors = {};

        // validation champ de recherche 
        if (!this.state.value) {
            formIsValid = false;
            errors['search'] = 'Vous devez renseigner un produit';
        }
        this.setState({ errors });
        return formIsValid;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            axios.get('https://fr.openfoodfacts.org/cgi/search.pl?action=process&search_terms=' + this.state.value + '&sort_by=unique_scans_n&page_size=24&page=' + this.state.pageSearch + '&sort_by=unique_scans_n&json=1')
                .then(res => {
                    this.setState({ products: res.data.products });
                    this.setState({ count: res.data.count });
                    console.log(this.state.products)
                    this.setState({ isSearched: true });
                })
                .catch(err => {
                    console.log(err);
                    window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
                })
        }
    }

    onChangeFilter(event) {
        this.setState({ filter: event.target.value })
    }
    incrementPagination() {
        if (this.state.isSearched) {
            this.setState({ pageSearch: this.state.pageSearch + 1 }, () => {
                axios.get('https://fr.openfoodfacts.org/cgi/search.pl?action=process&search_terms=' + this.state.value + '&sort_by=unique_scans_n&page_size=24&page=' + this.state.pageSearch + '&sort_by=unique_scans_n&json=1')
                    .then(res => {
                        this.setState({ products: res.data.products });
                        this.setState({ count: res.data.count });
                        console.log(this.state.products)
                        this.setState({ isSearched: true });
                    })
                    .catch(err => {
                        console.log(err);
                        window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
                    })
            })
        }
        this.setState({ page: this.state.page + 1 }, () => {
            this.getAllProducts()
        })
        console.log(this.state.page)

    }

    decrementPagination() {
        if (this.state.isSearched) {
            this.setState({ pageSearch: this.state.pageSearch - 1 }, () => {
                axios.get('https://fr.openfoodfacts.org/cgi/search.pl?action=process&search_terms=' + this.state.value + '&sort_by=unique_scans_n&page_size=24&page=' + this.state.pageSearch + '&sort_by=unique_scans_n&json=1')
                    .then(res => {
                        this.setState({ products: res.data.products });
                        this.setState({ count: res.data.count });
                        console.log(this.state.products)
                        this.setState({ isSearched: true });
                    })
                    .catch(err => {
                        console.log(err);
                        window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
                    })
            })
        }
        this.setState({ page: this.state.page - 1 }, () => {
            this.getAllProducts()
        })
        console.log(this.state.page)
    }

    render() {
        let { errors, products, allProducts, isSearched, count } = this.state;
        return (
            <div>
                <div className="row mx-O mt-5 mb-5 justify-content-center ">
                    <div className="col-6">
                        <form className='rounded' noValidate onSubmit={this.handleSubmit}>
                            <h3 className='text-center mb-4 pt-4 pb-2'>BIENVENUE CHEZ OPEN FOOD FACTS</h3>
                            <label htmlFor="search" className="form-label"></label>
                            <input type="search" name="search" id="search" className="form-control mb-4" placeholder="Quel produit cherchez-vous ?" value={this.state.value} onChange={this.handleChange} />
                            {errors['search'] ?
                                <p className="">{errors['search']}</p>
                                : ''
                            }
                            <div className='text-center'><button type="submit" className="btn btn-secondary mt-4" >CHERCHER</button></div>
                        </form>
                    </div>
                </div>

                <div className="row mx-O justify-content-center ">
                    {isSearched ? <h2 className="text-center mb-2">Résultats de votre recherche</h2> : ''}
                    {isSearched ? <div className="mb-5 text-center">Nous avons trouvé {count} produits</div> : ''}
                    {isSearched === false ?
                        allProducts.map(product => (
                            <div className="col col-md-2 mx-3 mb-5 text-center" key={product.id}>
                                <CardList
                                    id={product.id}
                                    name={product.product_name_fr}
                                    allergens={product.allergens}
                                    image={product.selected_images.front.display.fr}
                                />
                            </div>
                        ))
                        : products.map(product => (
                            <div className="col col-md-2 mx-3 mb-5 text-center" key={product.id}>
                                <CardList
                                    id={product.id}
                                    name={product.product_name_fr}
                                    allergens={product.allergens}
                                    image={product.image_small_url}
                                />
                            </div>
                        ))}

                    <div className="text-center mb-5">
                        {this.state.page > 1 || this.state.pageSearch > 1 ?
                            <button className="btn btn-secondary me-2" onClick={this.decrementPagination}>Précedent</button>
                            : <button className="btn btn-secondary me-2" disabled>Précedent</button>}
                        <button className="btn btn-secondary ms-2" onClick={this.incrementPagination}>Suivant</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;
