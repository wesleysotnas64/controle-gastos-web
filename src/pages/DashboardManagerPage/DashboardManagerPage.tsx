import { useState } from "react";
import "./DashboardManagerPage.css";
import TotalsByPerson from "./TotalsByPerson/TotalsByPerson";

function DashboardManagerPage () {

    const [activeTab, setActiveTab] = useState<"person" | "category">("person");

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Dashboard Financeiro</h2>
                
                {/* Menu de Navegação */}
                <div className="dashboard-nav">
                    <button 
                        className={`nav-button ${activeTab === "person" ? "active" : ""}`}
                        onClick={() => setActiveTab("person")}
                    >
                        Totais por Pessoa
                    </button>
                    <button 
                        className={`nav-button ${activeTab === "category" ? "active" : ""}`}
                        onClick={() => setActiveTab("category")}
                    >
                        Totais por Categoria
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                {activeTab === "person" ? (
                    <TotalsByPerson />
                ) : (
                    <div className="placeholder-area">
                        <h3>Consulta por Categorias</h3>
                        <p>O componente de análise por categorias será implementado aqui em breve.</p>
                        <div className="skeleton-loader"></div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default DashboardManagerPage;