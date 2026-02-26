import { useEffect, useState } from "react";
import type { DashboardPeopleSummaryDTO, DashboardPersonTotalDTO } from "../../../types/Dashboard";
import "./TotalsByPerson.css";
import api from "../../../services/api";
import { API_ROUTES } from "../../../services/apiRoutes";

function TotalsByPerson() {

    const [peopleTotals, setPeopleTotals] = useState<DashboardPersonTotalDTO[]>([]);
    const [grandTotalIncome, setGrandTotalIncome] = useState<number>(0);
    const [grandTotalExpense, setGrandTotalExpense] = useState<number>(0);
    const [grandTotalBalance, setGrandTotalBalance] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await api.get<DashboardPeopleSummaryDTO>(API_ROUTES.DASHBOARD.TOTALS_BY_PERSON);
                
                // Distribuindo os dados do DTO para os estados
                setPeopleTotals(response.data.peopleTotals);
                setGrandTotalIncome(response.data.grandTotalIncome);
                setGrandTotalExpense(response.data.grandTotalExpense);
                setGrandTotalBalance(response.data.grandBalance);
            } catch (error) {
                console.error("Erro ao carregar dados do dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Função para formatar moeda
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return(
        <div className="total-by-person">
            {/* Cards de Totais Gerais */}
            <div className="total-values-area">
                <div className="box-total-area income-box">
                    <div className="value-area">
                        <p>{formatCurrency(grandTotalIncome)}</p>
                    </div>
                    <label>Receita Total</label>
                </div>
                <div className="box-total-area expense-box">
                    <div className="value-area">
                        <p>{formatCurrency(grandTotalExpense)}</p>
                    </div>
                    <label>Despesa Total</label>
                </div>
                <div className="box-total-area balance-box">
                    <div className="value-area">
                        <p className={grandTotalBalance >= 0 ? "positive" : "negative"}>
                            {formatCurrency(grandTotalBalance)}
                        </p>
                    </div>
                    <label>Saldo Líquido</label>
                </div>
            </div>

            {loading ? (
                <div className="loading-area">
                    <p>Carregando dados do dashboard...</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="total-by-person-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Receita</th>
                                <th>Despesa</th>
                                <th>Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peopleTotals.map((item) => (
                                <tr key={item.person.id}>
                                    <td>{item.person.name}</td>
                                    <td className="value-income">{formatCurrency(item.totalIncome)}</td>
                                    <td className="value-expense">{formatCurrency(item.totalExpense)}</td>
                                    <td className={item.balance >= 0 ? "value-income" : "value-expense"}>
                                        {formatCurrency(item.balance)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="table-footer">
                            <tr>
                                <td>TOTAL GERAL</td>
                                <td className="value-income">{formatCurrency(grandTotalIncome)}</td>
                                <td className="value-expense">{formatCurrency(grandTotalExpense)}</td>
                                <td className={grandTotalBalance >= 0 ? "value-income" : "value-expense"}>
                                    <strong>{formatCurrency(grandTotalBalance)}</strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}

        </div>
    );
}

export default TotalsByPerson;