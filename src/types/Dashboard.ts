import type { Person } from "./Person";

export interface DashboardPersonTotalDTO {
    person: Person;
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export interface DashboardPeopleSummaryDTO {
    peopleTotals: DashboardPersonTotalDTO[];
    grandTotalIncome: number;
    grandTotalExpense: number;
    grandBalance: number;
}