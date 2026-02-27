import { useEffect, useState } from "react";
import type { DashboardCategorySummaryDTO, DashboardCategoryTotalDTO } from "../../../types/Dashboard";
import "./TotalsByCategory.css";
import api from "../../../services/api";
import { API_ROUTES } from "../../../services/apiRoutes";
import VisualPurpose from "../../../components/VisualPurpose/VisualPurpose";

function TotalsByCategory() {

    const [categoryTotals, setCategoryTotals] = useState<DashboardCategoryTotalDTO[]>([]);
    const [grandTotalIncome, setGrandTotalIncome] = useState<number>(0);
    const [grandTotalExpense, setGrandTotalExpense] = useState<number>(0);
    const [grandTotalBalance, setGrandTotalBalance] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                setLoading(true);
                const response = await api.get<DashboardCategorySummaryDTO>(API_ROUTES.DASHBOARD.TOTALS_BY_CATEGORY);
                
                setCategoryTotals(response.data.categoryTotals);
                setGrandTotalIncome(response.data.grandTotalIncome);
                setGrandTotalExpense(response.data.grandTotalExpense);
                setGrandTotalBalance(response.data.grandBalance);
            } catch (error) {
                console.error("Erro ao carregar totais por categoria:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return(
        <div className="total-by-category">
            <div className="total-values-area">
                <div className="box-total-area income-box">
                    <div className="value-area">
                        <p>{formatCurrency(grandTotalIncome)}</p>
                    </div>
                    <label>Receita Geral</label>
                </div>
                <div className="box-total-area expense-box">
                    <div className="value-area">
                        <p>{formatCurrency(grandTotalExpense)}</p>
                    </div>
                    <label>Despesa Geral</label>
                </div>
                <div className="box-total-area balance-box">
                    <div className="value-area">
                        <p className={grandTotalBalance >= 0 ? "value-income" : "value-expense"}>
                            {formatCurrency(grandTotalBalance)}
                        </p>
                    </div>
                    <label>Saldo Líquido</label>
                </div>
            </div>

            {loading ? (
                <p>Carregando categorias...</p>
            ) : (
                <table className="total-by-person-table"> {/* Reaproveitando a classe da outra tabela */}
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Finalidade</th>
                            <th>Receita</th>
                            <th>Despesa</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryTotals.map((item) => (
                            <tr key={item.category.id}>
                                <td>{item.category.description}</td>
                                <td>
                                    <VisualPurpose purpose={item.category.purpose} />
                                </td>
                                <td>{formatCurrency(item.totalIncome)}</td>
                                <td>{formatCurrency(item.totalExpense)}</td>
                                <td className={item.balance >= 0 ? "value-income" : "value-expense"}>
                                    {formatCurrency(item.balance)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="table-footer">
                        <tr>
                            <td>TOTAL GERAL</td>
                            <td></td>
                            <td className="value-income">{formatCurrency(grandTotalIncome)}</td>
                            <td className="value-expense">{formatCurrency(grandTotalExpense)}</td>
                            <td className={grandTotalBalance >= 0 ? "value-income" : "value-expense"}>
                                <strong>{formatCurrency(grandTotalBalance)}</strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}

export default TotalsByCategory;