export interface Person {
    id: string;
    name: string;
    age: number;
}

export interface PersonCreateDTO{
    name: string;
    age: number;
}

export interface PersonDeleteDTO {
    id: string;
    name: string;
}