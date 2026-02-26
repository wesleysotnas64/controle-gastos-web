import { useState } from "react";
import "./DashboardManagerPage.css";
import TotalsByPerson from "./TotalsByPerson/TotalsByPerson";
import TotalsByCategory from "./TotalsByCategory/TotalsByCategory";

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
                    <TotalsByCategory />
                )}
            </main>
        </div>
    );
}

export default DashboardManagerPage;