import { useState } from 'react';
import './CategoryManagerPage.css';
import { CategoryPurpose, type CategoryPurposeType, type CreateCategoryDTO } from '../../types/Category';
import api from '../../services/api';
import { API_ROUTES } from '../../services/apiRoutes';
import ListCategory from './ListCategory/ListCategory';

function CategoryManagerPage() {
    const [description, setDescription] = useState("");
    const [purpose, setPurpose] = useState<CategoryPurposeType>(CategoryPurpose.Income);

    const handleRegister = async () => {
        if (!description.trim()) {
            alert("A descrição é obrigatória.");
            return;
        }

        try{
            const newCategory: CreateCategoryDTO = {
                description: description,
                purpose: purpose 
            };

            await api.post(API_ROUTES.CATEGORY.CREATE, newCategory);
            alert("Categoria cadastrada com sucesso!");

            setDescription("");
            setPurpose(CategoryPurpose.Income);

            window.location.reload();
        } catch (error: any){
            console.error("Erro ao cadastrar categoria:", error);
            alert(error.response?.data?.message || "Erro ao conectar com o servidor.");
        }
    };

    return (
        <>
        <div className="category-container">
            <div className="category-registration-area">
                <div className="category-inputs-btns">
                    <input
                        className="category-input-description"
                        type="text"
                        placeholder="Descrição (ex: Lazer, Salário...)"
                        maxLength={400}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select
                        className="category-select-purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(Number(e.target.value) as CategoryPurposeType)}
                    >
                        <option value={CategoryPurpose.Income}>Receita</option>
                        <option value={CategoryPurpose.Expense}>Despesa</option>
                        <option value={CategoryPurpose.Both}>Ambas (Receita/Despesa)</option>
                    </select>

                    <button
                        className="category-btn-register"
                        onClick={handleRegister}
                    >
                        Cadastrar
                    </button>
                </div>
                <span className={`char-counter ${description.length === 400 ? "limit-reached" : ""}`}>
                    {description.length}/400
                </span>
            </div>

            <ListCategory />
        </div>
        </>
    );
}

export default CategoryManagerPage;