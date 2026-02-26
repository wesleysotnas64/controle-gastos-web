import { useEffect, useState } from "react";
import ListTransaction from "./ListTransaction/ListTransaction";
import './TransactionManagerPage.css'
import { CategoryPurpose, type Category, type CategoryPurposeType } from "../../types/Category";
import type { Person } from "../../types/Person";
import api from "../../services/api";
import { API_ROUTES } from "../../services/apiRoutes";
import type { TransactionCreateDTO } from "../../types/Transaction";

function TransactionManagerPage(){
    // Estados do Formulário
    const [description, setDescription] = useState("");
    const [value, setValue] = useState<number>(0);
    const [type, setType] = useState<CategoryPurposeType>(CategoryPurpose.Income);
    const [personId, setPersonId] = useState("");
    const [categoryId, setCategoryId] = useState("");

    // Estados para carregar os Selects
    const [people, setPeople] = useState<Person[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    
    // Carregar dados iniciais
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [resPeople, resCategories] = await Promise.all([
                    api.get(API_ROUTES.PERSON.GET_ALL),
                    api.get(API_ROUTES.CATEGORY.GET_ALL)
                ]);
                setPeople(resPeople.data);
                setCategories(resCategories.data);
            } catch (error) {
                console.error("Erro ao carregar dados para o formulário:", error);
            }
        };
        loadInitialData();
    }, []);

    //Lógica de máscara "da direita para a esquerda"
    const handleMoneyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Pega apenas os dígitos numéricos
        const rawValue = e.target.value.replace(/\D/g, "");
        
        //Transforma em número e "anda" com a vírgula 2 casas para a esquerda
        //Ex: "250" vira 2.50
        const numericValue = Number(rawValue) / 100;
        
        setValue(numericValue);
    };

    const handleRegister = async () => {
        if (!description || value <= 0 || !personId || !categoryId) {
            alert("Preencha todos os campos!");
            return;
        }

        const selectedPerson = people.find(p => p.id === personId);
        // Trava de segurança: Pessoa menor de idade + Transação de Receita
        if (type === CategoryPurpose.Income && selectedPerson && selectedPerson.age < 18) {
            alert("Operação bloqueada: Menores de 18 anos não podem ter registros de receita.");
            return;
        }

        const newTransaction: TransactionCreateDTO = {
            description,
            value: value,
            type,
            personId,
            categoryId
        };

        try {
            await api.post(API_ROUTES.TRANSACTION.CREATE, newTransaction);
            alert("Transação registrada!");
            window.location.reload(); // Temporário para atualizar a lista abaixo
        } catch (error) {
            alert("Erro ao salvar transação.");
        }
    };

    useEffect(() => {
        //Sempre limpa a categoria ao trocar o tipo
        setCategoryId("");

        //Se mudou para Receita, verifica se a pessoa selecionada é menor de idade
        if (type === CategoryPurpose.Income && personId) {
            const selectedPerson = people.find(p => p.id === personId);
            if (selectedPerson && selectedPerson.age < 18) {
                setPersonId(""); // Remove o menor de idade da seleção
                alert("Pessoas menores de 18 anos não podem registrar receitas.");
            }
        }
    }, [type, people, personId]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="manager-container">
            <div className="transaction-registration-area">
                <div className="transaction-input-area">
                    <input
                        className="input-description" 
                        type="text"
                        placeholder="Descrição" 
                        value={description} onChange={(e) => setDescription(e.target.value)} 
                    />

                    <input
                        className="input-value" 
                        type="text"
                        inputMode="numeric"
                        value={formatCurrency(value)}
                        onChange={handleMoneyInput} 
                    />
                </div>
                <div className="transaction-select-area">
                    {/* Select de Tipo (Income/Expense) */}
                    <select className="select-type" value={type} onChange={(e) => setType(Number(e.target.value) as CategoryPurposeType)}>
                        <option value={CategoryPurpose.Income}>Receita</option>
                        <option value={CategoryPurpose.Expense}>Despesa</option>
                    </select>

                    {/* Select de Pessoas */}
                    <select className="select-people" value={personId} onChange={(e) => setPersonId(e.target.value)}>
                        <option value="">Selecione uma Pessoa</option>
                        {people
                            .filter(p => {
                                // Se for Receita, só mostra quem tem 18 anos ou mais
                                if (type === CategoryPurpose.Income) {
                                    return p.age >= 18;
                                }
                                // Se for Despesa, mostra todo mundo
                                return true;
                            })
                            .map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name} ({p.age} anos)
                                </option>
                            ))
                        }
                    </select>

                    {/* Select de Categorias */}
                    <select 
                        className="select-category"
                        value={categoryId} 
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">Selecione uma Categoria</option>
                        {categories
                            // propósito da categoria deve ser igual ao tipo da transação
                            // OU o propósito deve ser "Ambas" (CategoryPurpose.Both)
                            .filter(c => c.purpose === type || c.purpose === CategoryPurpose.Both)
                            .map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.description}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button onClick={handleRegister} className="btn-register">Registrar</button>
            </div>
            <ListTransaction />
        </div>
        
    );
}

export default TransactionManagerPage;