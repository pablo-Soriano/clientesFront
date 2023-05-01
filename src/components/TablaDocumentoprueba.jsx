import React from 'react'
import { useParams } from 'react-router-dom'
import useCrud from '../hooks/useCrud';

const TablaDocumentoPrueba = () => {

    const { prueba } = useCrud();

    const idCliente = useParams()
    //console.log(idCliente)
    //setIdPrueba(idCliente)
    prueba(idCliente)

  return (
    <div>
      <h1>hola desde tabla documentos</h1>
    </div>
  )
}

export default TablaDocumentoPrueba
