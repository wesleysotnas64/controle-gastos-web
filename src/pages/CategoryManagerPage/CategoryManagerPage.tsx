import { useState } from 'react';
import './CategoryManagerPage.css'
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
        <div className="manager-container">
            <div className="registration-area">
                <input className="input-description"
                    type="text"
                    placeholder="Descrição (ex: Lazer, Salário...)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    value={purpose}
                    onChange={(e) => setPurpose(Number(e.target.value) as CategoryPurposeType)}
                    className="select-purpose"
                >
                    <option value={CategoryPurpose.Income}>Receita</option>
                    <option value={CategoryPurpose.Expense}>Despesa</option>
                    <option value={CategoryPurpose.Both}>Ambas (Receita/Despesa)</option>
                </select>

                <button onClick={handleRegister} className="btn-register">
                    Cadastrar
                </button>
            </div>

            <ListCategory />
        </div>
        </>
    );
}

export default CategoryManagerPage;