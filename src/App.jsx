import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TablaCliente from "./components/Clientes/TablaCliente";
import { CrudProvider } from "./context/CrudProvider";
import TablaDocumento from "./components/Documentos/TablaDocumento";
import { CrudProviderDocumento } from "./context/CrudProviderDocumento";
import TablaDirecciones from "./components/Direcciones/TablaDirecciones";


function App() {
  const [count, setCount] = useState(0);

  return (
    <CrudProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TablaCliente />} />
          <Route path="/documentos/:idCliente" element={<TablaDocumento />} />
          <Route path="/direcciones/:idCliente" element={<TablaDirecciones />} />

        </Routes>
      </BrowserRouter>
    </CrudProvider>
  );
}

export default App;
