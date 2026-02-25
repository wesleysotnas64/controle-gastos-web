import { useEffect, useState } from "react";
import { CategoryPurpose, type Category } from "../../../types/Category";
import api from "../../../services/api";
import { API_ROUTES } from "../../../services/apiRoutes";
import './ListCategory.css'

function ListCategory() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await api.get(API_ROUTES.CATEGORY.GET_ALL);
            setCategories(response.data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Função auxiliar para definir a classe de cor baseada no propósito
    const getPurposeStyle = (purpose: number) => {
        switch (purpose) {
            case CategoryPurpose.Income: return "tag-income";   // Receita
            case CategoryPurpose.Expense: return "tag-expense"; // Despesa
            case CategoryPurpose.Both: return "tag-both";       // Ambas
            default: return "";
        }
    };

    const getPurposeLabel = (purpose: number) => {
        if (purpose === CategoryPurpose.Income) return "Receita";
        if (purpose === CategoryPurpose.Expense) return "Despesa";
        return "Ambas";
    };

    return (
        <div className="list-container">
            <h2>Categorias Cadastradas</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <table className="category-table">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th style={{textAlign: 'center'}}>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            
                            <tr key={cat.id}>
                                <td>{cat.description}</td>
                                <td style={{textAlign: 'center'}}>
                                    <span className={`purpose-tag ${getPurposeStyle(cat.purpose)}`}>
                                        {getPurposeLabel(cat.purpose)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListCategory;