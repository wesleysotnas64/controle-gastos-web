import { useState } from "react";
import ListPeople from "./ListPeople/ListPeople";
import api from "../../services/api";
import { API_ROUTES } from "../../services/apiRoutes";
import type { Person } from "../../types/person/Person";
import './PeopleManagerPage.css'

function PeopleManagerPage () {

    const [name, setName] = useState("");
    const [age, setAge] = useState<number | "">("");
    const [registrationMode, setRegistrationMode] = useState<boolean>(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    const startEdit = (person: Person) => {
        setRegistrationMode(false);
        setEditingId(person.id);
        setName(person.name);
        setAge(person.age);
    };

    const clearForm = () => {
        setName("");
        setAge("");
        setEditingId(null);
        setRegistrationMode(true);
    };

    const handleRegister = async () => {
        if (!name || age === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try{
            const newPerson = {name, age: Number(age)};
            await api.post(API_ROUTES.PERSON.CREATE, newPerson);
            alert("Pessoa cadastrada com sucesso!");

            clearForm();

            window.location.reload(); // Solução temporária rápida para a lista atualizar sozinha
        } catch (error: any) {
            alert(error.response?.data?.message || "Erro ao cadastrar pessoa.");
        };
    };

    const handleUpdate = async () => {
        if (!editingId) return;

        try {
            const personData = {
                name: name,
                age: Number(age)
            };
            await api.put(API_ROUTES.PERSON.UPDATE(editingId), personData);
            alert("Dados atualizados!");
            window.location.reload();
        } catch (error) {
            alert("Erro ao atualizar.");
        }
    };

    return (
        <>
            <div className="manager-container">
                <div className="registration-area">
                    <input 
                        type="text"
                        placeholder="Nome da Pessoa"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    
                    <input
                        type="number"
                        placeholder="Idade"
                        min="0"
                        max="150"
                        value={age}
                        onChange={(e) => {
                            const val = e.target.value;
                            if(val === "" || (Number(val) >= 0 && Number(val) < 151)){
                                setAge(val === "" ? "" : Math.floor(Number(val)));
                            }
                        }}
                    />
                    {
                        registrationMode ?
                        (
                            <button className="btn-register" onClick={handleRegister}>Cadastrar</button>
                        ) :
                        (
                            <>
                                <button className="btn-save" onClick={handleUpdate}>Salvar Alterações</button>
                                <button className="btn-cancel" onClick={clearForm}>Cancelar</button>
                            </>
                        )
                    }
                </div>

                <ListPeople onEditClick={startEdit} />
            </div>
        </>
    );
}

export default PeopleManagerPage;