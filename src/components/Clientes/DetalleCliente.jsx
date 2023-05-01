import React, { useState } from 'react'
import useCrud from '../../hooks/useCrud';
import { Link } from 'react-router-dom';

const DetalleCliente = ({cliente}) => {
    const {handleClickModel, buscarClienteId, buscarDocumentosClienteId, handleClickEliminarUsuarioMSG,mostrarDocumento } = useCrud();
    const {id, Nombres, Apellidos, Telefono, Email} = cliente

  return (
    <tr>
      <td>{id}</td>
      <td>{Nombres}</td>
      <td>{Apellidos}</td>
      <td>{Telefono}</td>
      <td>{Email}</td>
      <td>Activo</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-success mr-2"
          title="Direcciones"
          style={{marginRight: 10}}

        >
          <i className="fa-solid fa-address-book"></i>
        </button>

        <Link
          type="button"
          className="btn btn-outline-primary mr-2"
          title="Documentos"
          onClick={()=>{
            mostrarDocumento(id)
          }}
          style={{marginRight: 10}}
          to={`/documentos/${id}`}

        >
          <i className="fa-solid fa-folder"></i>
        </Link>
        
        <button
          type="button"
          className="btn btn-outline-warning mr-1"
          title="editar"
          onClick={()=>{
            buscarClienteId(id)
            handleClickModel()
          }}
          style={{marginRight: 10}}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        <button
          type="button"
          className="btn btn-outline-danger"
          title="eliminar"
          onClick={() => {
            handleClickEliminarUsuarioMSG(id)
           
          }}
          
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  )
}

export default DetalleCliente
