import React, { useState } from 'react'
import useCrud from '../../hooks/useCrud';
import { Link } from 'react-router-dom';


const DetalleDocumento = ({documento}) => {
    const {handleClickModel, buscarClienteId, buscarDocumentosClienteId, handleClickEliminarUsuarioMSG } = useCrud();
    const {id, Nombredocumento, numero, } = documento

  return (
    <tr>
      <td>{id}</td>
      <td>{Nombredocumento}</td>
      <td>{numero}</td>
      <td>Activo</td>
      <td>      
        <button
          type="button"
          className="btn btn-outline-warning mr-1"
          title="editar"
          onClick={()=>{
            //buscarClienteId(id)
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
  /*         onClick={() => {
            handleClickEliminarUsuarioMSG(id)
           
          }} */
          
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  )
}

export default DetalleDocumento
