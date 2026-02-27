import { useEffect, useState } from "react";
import { type Category } from "../../../types/Category";
import api from "../../../services/api";
import { API_ROUTES } from "../../../services/apiRoutes";
import './ListCategory.css'
import VisualPurpose from "../../../components/VisualPurpose/VisualPurpose";

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

    return (
        <div className="category-list-container">
            <h2>Categorias Cadastradas</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <table className="category-table">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            
                            <tr key={cat.id}>
                                <td>{cat.description}</td>
                                <td>
                                    <VisualPurpose purpose={cat.purpose} />
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