import React from 'react'
import useCrud from '../../hooks/useCrud';
import ReactModal from 'react-modal';
import Modal from 'react-modal';

const DetalleDirecciones = ({direccion}) => {
  const { handleClickModel, buscarDireccion, handleClickEliminarDireccionMSG } = useCrud();
  const {id ,Municipio, Departamento, Direccion} = direccion

  return (
    <tr>
    <td>{id}</td>
    <td>{Municipio}</td>
    <td>{Departamento}</td>
    <td>{Direccion}</td>
    <td>Activo</td>
    <td>      
      <button
        type="button"
        className="btn btn-outline-warning mr-1"
        title="editar"
         onClick={()=>{
         buscarDireccion(id)
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
          handleClickEliminarDireccionMSG(id)
         
        }} 
        
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>
  )
}

export default DetalleDirecciones
