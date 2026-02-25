export const CategoryPurpose = {
    Income: 1, // Receita
    Expense: 2, // Despesa
    Both: 3 // Ambas
} as const;

// Criamos um tipo baseado nos valores do objeto acima
export type CategoryPurposeType = typeof CategoryPurpose[keyof typeof CategoryPurpose];

export interface Category {
    id: string;          
    description: string;
    purpose: CategoryPurposeType;
}

export interface CreateCategoryDTO {
    description: string;
    purpose: CategoryPurposeType;
}