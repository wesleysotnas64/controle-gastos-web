import { CategoryPurpose, type CategoryPurposeType } from "../../types/Category";
import "./VisualPurpose.css";

interface VisualPurposeProps {
    purpose: CategoryPurposeType;
}

function VisualPurpose({ purpose }: VisualPurposeProps) {

    const getPurposeLabel = (purpose: number) => {
        if (purpose === CategoryPurpose.Income) return "Receita";
        if (purpose === CategoryPurpose.Expense) return "Despesa";
        return "Ambas";
    };

    // Função auxiliar para definir a classe de cor baseada no propósito
    const getPurposeStyle = (purpose: number) => {
        switch (purpose) {
            case CategoryPurpose.Income: return "visual-tag-income";   // Receita
            case CategoryPurpose.Expense: return "visual-tag-expense"; // Despesa
            case CategoryPurpose.Both: return "visual-tag-both";       // Ambas
            default: return "";
        }
    };

    return (
        <div className="visual-purpose-main">
            <span className={`visual-purpose-tag ${getPurposeStyle(purpose)}`}>
                {getPurposeLabel(purpose)}
            </span>
        </div>
    );
}

export default VisualPurpose;