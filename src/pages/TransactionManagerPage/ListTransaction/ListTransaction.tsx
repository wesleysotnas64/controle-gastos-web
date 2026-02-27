import { useEffect, useState } from 'react';
import './ListTransaction.css';
import type { TransactionListItemDTO } from '../../../types/Transaction';
import api from '../../../services/api';
import { API_ROUTES } from '../../../services/apiRoutes';
import VisualPurpose from '../../../components/VisualPurpose/VisualPurpose';

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

    return(
        <div className="transaction-list-container">
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
                            <th>Tipo</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t.id}>
                                <td>{t.description}</td>
                                <td>{t.personName}</td>
                                <td>{t.categoryDescription}</td>
                                <td>
                                    <VisualPurpose purpose={t.type} />
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