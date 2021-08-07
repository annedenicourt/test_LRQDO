import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import ProductDetail from './ProductDetail';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/product/:id" component={ProductDetail} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
