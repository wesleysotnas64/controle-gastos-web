import { useEffect, useState } from 'react';
import './ListTransaction.css';
import type { TransactionListItemDTO } from '../../../types/Transaction';
import api from '../../../services/api';
import { API_ROUTES } from '../../../services/apiRoutes';
import { CategoryPurpose } from '../../../types/Category';

function ListTransaction(){
    const [transactions, setTransactions] = useState<TransactionListItemDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            const response = await api.get(API_ROUTES.TRANSACTION.GET_ALL);
            setTransactions(response.data);
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
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

    return(
        <div className="list-container">
            <h2>Transações Cadastradas</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Pessoa</th>
                            <th>Categoria</th>
                            <th style={{textAlign: 'center'}}>Tipo</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t.id}>
                                <td>{t.description}</td>
                                <td>{t.personName}</td>
                                <td>{t.categoryDescription}</td>
                                <td style={{textAlign: 'center'}}>
                                    <span className={`purpose-tag ${getPurposeStyle(t.type)}`}>
                                        {getPurposeLabel(t.type)}
                                    </span>
                                </td>
                                <td className={t.type === 1 ? "value-income" : "value-expense"}>
                                    {t.type === 1 ? "+ " : "- "}
                                    {t.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListTransaction;