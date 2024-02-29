import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientexs from "./components/ListadoPacientexs"


function App() {

  return (

    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario />
        <ListadoPacientexs />
      </div>
    </div>

  )
}

export default App
