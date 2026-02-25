import { Link } from 'react-router-dom';
import './Header.css';

function Header () {
    return (
        <>
        <div className="main-container">
            <h1>Controle de Gastos</h1>
            <div className="navigation-area">
                <Link to="/" className="nav-link">Dashboard</Link>
                <Link to="/transacoes" className="nav-link">Transações</Link>
                <Link to="/pessoas" className="nav-link">Pessoas</Link>
                <Link to="/categorias" className="nav-link">Categorias</Link>
            </div>
        </div>
        </>
    );
}

export default Header;