import { useState } from "react";
import ListPeople from "./ListPeople/ListPeople";
import api from "../../services/api";
import { API_ROUTES } from "../../services/apiRoutes";
import './PeopleManagerPage.css'

function PeopleManagerPage () {

    const [name, setName] = useState("");
    const [age, setAge] = useState<number | "">("");

    const handleRegister = async () => {
        if (!name || age === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try{
            const newPerson = {name, age: Number(age)};
            await api.post(API_ROUTES.PERSON.CREATE, newPerson);
            alert("Pessoa cadastrada com sucesso!");

            setName("");
            setAge("");

            window.location.reload(); // Solução temporária rápida para a lista atualizar sozinha
        } catch (error: any) {
            alert(error.response?.data?.message || "Erro ao cadastrar pessoa.");
        };

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
                    <button onClick={handleRegister}>Cadastrar</button>
                </div>

                <ListPeople />
            </div>
        </>
    );
}

export default PeopleManagerPage;