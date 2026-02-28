# 💻 Controle de Gastos - Web

Esta é a interface do usuário (Front-end) do sistema **Controle de Gastos**, desenvolvida gestão financeira pessoal.

---

### 🚀 Demonstração Online
Acesse o projeto em produção:
👉 **[https://controledegastosweb.netlify.app/](https://controledegastosweb.netlify.app/)**

---

### ⚠️ Informação Importante sobre o Carregamento
A API deste sistema está hospedada na camada gratuita do **Render**. 
Se o site estiver demorando para listar os dados ou mostrar algum erro inicial:
* **O servidor da API pode estar "acordando" (Cold Start).**
* Isso pode levar de **50 a 60 segundos** na primeira requisição do dia.
* Após esse período, as operações de cadastro, edição e dashboard funcionarão instantaneamente. ✨

---

### 🛠️ Tecnologias e Ambiente
* **Framework:** ⚡ [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
* **Linguagem:** 🟦 TypeScript
* **Ambiente de Execução:** 🟢 Node.js v22.16 (LTS)
* **Requisições:** 📡 Axios
* **Hospedagem:** 🧊 Netlify

---

### 🔗 Integração Full Stack
Este projeto depende da **ControleDeGastosAPI** para persistência e validação de dados.
👉 **Repositório da API (.NET 10):** [github.com/wesleysotnas64/ControleDeGastosAPI](https://github.com/wesleysotnas64/ControleDeGastosAPI)

---

### ⚙️ Como Rodar Localmente

**Pré-requisitos:** Node.js v22.16+.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/wesleysotnas64/controle-gastos-web.git](https://github.com/wesleysotnas64/controle-gastos-web.git)
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configuração de Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto:
    ```env
    VITE_API_URL=https://localhost:44346
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
---

### 📸 Prints da Interface
#### Dashboard totais por pessoas
<img width="1761" height="934" alt="{B4C9AE12-E402-468A-8D1D-460D3B337812}" src="https://github.com/user-attachments/assets/51253808-12b3-46a8-8f0f-a6b6a7345ff2" />

#### Listagem de transações
<img width="1848" height="938" alt="{A202D6CD-3357-4989-9EC7-F9E26E2375AF}" src="https://github.com/user-attachments/assets/afbd246e-f8ab-4d48-aed2-8a071413e75b" />

#### Dashboard totais por categoria
<img width="1763" height="936" alt="{2F0DFEC4-397D-4D46-B8DE-DA8FFAD2A569}" src="https://github.com/user-attachments/assets/d787767a-25d9-49b8-85fb-a4a661e22b31" />

---

## 🙏 Agradecimento

Obrigado por visitar este repositório!  
Acesse meu portfólio completo para conhecer outros projetos:

🔗 [wesleysantos.portfolio](https://wesley-santos-dev-portfolio.netlify.app/)
