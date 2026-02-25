import { useEffect, useState } from "react";
import type { Person } from "../../../types/person/Person";
import { API_ROUTES } from "../../../services/apiRoutes";
import './ListPeople.css';
import api from "../../../services/api";

function ListPeople() {
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    people.map((person) => (
                                        <tr key={person.id}>
                                            <td>{person.name}</td>
                                            <td>{person.age}</td>
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
