import type { CategoryPurposeType } from "./Category";

export interface TransactionListItemDTO {
    id: string;
    description: string;
    value: number;
    type: CategoryPurposeType; 
    personId: string;
    personName: string;
    categoryId: string;
    categoryDescription: string;
}

export interface TransactionCreateDTO {
    description: string;
    value: number;
    type: CategoryPurposeType; 
    personId: string;
    categoryId: string;
}