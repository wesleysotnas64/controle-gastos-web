import type { Category } from "./Category";
import type { Person } from "./Person";

interface BaseDashboardTotal {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

interface BaseDashboardSummary {
    grandTotalIncome: number;
    grandTotalExpense: number;
    grandBalance: number;
}

export interface DashboardPersonTotalDTO extends BaseDashboardTotal {
    person: Person;
}

export interface DashboardCategoryTotalDTO extends BaseDashboardTotal {
    category: Category;
}

export interface DashboardPeopleSummaryDTO extends BaseDashboardSummary {
    peopleTotals: DashboardPersonTotalDTO[];
}

export interface DashboardCategorySummaryDTO extends BaseDashboardSummary {
    categoryTotals: DashboardCategoryTotalDTO[];
}