import { NavLink } from 'react-router-dom';

function Banner() {
    return (
        <div className='row mx-O'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink className="nav-link fw-bold" to="/">ACCUEIL</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Banner

