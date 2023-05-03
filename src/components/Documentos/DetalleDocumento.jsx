import React, { useState } from 'react'
import useCrud from '../../hooks/useCrud';
import { Link } from 'react-router-dom';


const DetalleDocumento = ({documento}) => {
    const {handleClickModel, buscarClienteId,  handleClickEliminarDocumentoMSG, buscarDocumentoId } = useCrud();
    const {id, Nombredocumento, numero, } = documento
    //console.log(id);


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
            buscarDocumentoId(id)
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
            handleClickEliminarDocumentoMSG(id)
           
          }} 
          
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  )
}

export default DetalleDocumento
