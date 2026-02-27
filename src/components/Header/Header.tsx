import { Link } from 'react-router-dom';
import './Header.css';

function Header () {
    return (
        <>
        <div className="header-main-container">
            <h1>Controle de Gastos</h1>
            <div className="header-navigation-area">
                <Link to="/" className="header-nav-link">Dashboard</Link>
                <Link to="/transacoes" className="header-nav-link">Transações</Link>
                <Link to="/pessoas" className="header-nav-link">Pessoas</Link>
                <Link to="/categorias" className="header-nav-link">Categorias</Link>
            </div>
        </div>
        </>
    );
}

export default Header;