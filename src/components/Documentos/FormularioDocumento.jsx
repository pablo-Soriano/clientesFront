import React, { useState } from 'react'
import useCrud from '../../hooks/useCrud';
import { useParams } from 'react-router-dom';



const FormularioDocumento = () => {
 

    const {handleClickModel, capturarDatosDocumentos,  guardarDatosFormularioDoc, actualizarDocumento, agregarDocumento } = useCrud();
    const { Nombredocumento, numero, id} = agregarDocumento;

  


    
    const handleSubmitGuardar = e => {
      e.preventDefault();
      //guardarDatosFormularioDoc(agregarDocumento);
      // si tiene id de documento, es un actualizar, sino es un documento nuevo (guardar)
      if(id) {
        actualizarDocumento(agregarDocumento, id);
      } else {
        guardarDatosFormularioDoc(agregarDocumento);
      }
    }

  return (
    <div style={{ width: 800 }}>
    <h1 className="text-center">{ id ? "Editar" : "Guardar" } Documento</h1>

    <form
      onSubmit={handleSubmitGuardar}
    >
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="Nombredocumento"
          name="Nombredocumento"
          placeholder="Nombre de documento"
          
          onChange={capturarDatosDocumentos}
            
          value={Nombredocumento} 
        />
        <label htmlFor="Nombres">Tipo de Documento</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="numero"
          placeholder="numero"
          name="numero"
           onChange={capturarDatosDocumentos}
          value={numero} 
        />
        <label htmlFor="Apellidos">Numero Documento</label>
      </div>
     
      <div className="row text-center  mr-5 d-inline-block">
        <input
          type="submit"
          value={ id ? "Editar" : "Guardar" }
          className="btn btn-lg btn-outline-primary"
        />
      </div>

      <div
        className="row text-center  mr-5 d-inline-block"
        style={{ marginLeft: 20 }}
      >
        <input
          type="button"
          value="Cancelar"
          className="btn btn-lg btn-outline-danger"
          onClick={handleClickModel}
        />
      </div>
    </form>
  </div>
  )
}

export default FormularioDocumento
