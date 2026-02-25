import { useEffect, useState } from "react";
import type { Person, PersonDeleteDTO } from "../../../types/Person";
import { API_ROUTES } from "../../../services/apiRoutes";
import './ListPeople.css';
import api from "../../../services/api";

interface ListPeopleProps {
    onEditClick: (person: Person) => void;
}

function ListPeople({ onEditClick }: ListPeopleProps) {
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPeople = async () => {
        try {
            setLoading(true);
            const response = await api.get(API_ROUTES.PERSON.GET_ALL);
            setPeople(response.data);
        } catch (error) {
            console.error("Erro ao buscar pessoas: ", error);
            alert("Não foi possível carregar a lista.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (personDeleteDTO: PersonDeleteDTO) => {
        if (window.confirm(`Tem certeza que deseja remover ${personDeleteDTO.name}?`)) {
            try {
                await api.delete(API_ROUTES.PERSON.DELETE(personDeleteDTO.id));
                alert("Pessoa removida com sucesso!");
                fetchPeople();
            } catch (error) {
                console.error("Erro ao deletar:", error);
            }
        };
    };

    useEffect(() => {
        fetchPeople();
    }, []);

    return(
        <>
            <div className="list-container">
                <h2>Pessoas Cadastradas</h2>
                
                {
                    loading ?
                    (
                        <p>Carregando...</p>
                    ) :
                    (
                        <table className="people-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Idade</th>
                                    <th style={{textAlign: 'center'}}>Operações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    people.map((person) => (
                                        <tr key={person.id}>
                                            <td>{person.name}</td>
                                            <td>{person.age} {person.age <= 1 ? "ano" : "anos"}</td>
                                            <td className="actions-cell">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => onEditClick(person)}
                                                >
                                                    Alterar
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDelete({ id: person.id, name: person.name })}
                                                >
                                                    Remover
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }

                {!loading && people.length === 0 && <p>Nenhuma pessoa encontrada.</p>}
            </div>
        </>
    );
}

export default ListPeople;
