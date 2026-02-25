import { BrowserRouter, Routes, Route } from "react-router-dom";
import PeopleManagerPage from "./pages/PeopleManagerPage/PeopleManagerPage";
import Header from "./components/Header/Header";
import CategoryManagerPage from "./pages/CategoryManagerPage/CategoryManagerPage";


function App() {

  return (
    <BrowserRouter>
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<div>Tela Dashboard (Em breve)</div>} />
          <Route path="/transacoes" element={<div>Tela Transações (Em breve)</div>} />
          <Route path="/pessoas" element={<PeopleManagerPage />} />
          <Route path="/categorias" element={<CategoryManagerPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
