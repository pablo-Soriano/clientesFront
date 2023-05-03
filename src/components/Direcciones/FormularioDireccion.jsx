import React from 'react'
import useCrud from '../../hooks/useCrud';

const FormularioDireccion = () => {
    const { handleClickModel, capturarDatosDirecciones, agregarEditarDirecciones, guardarDatosFormularioDirecciones, actualizarDireccion } = useCrud();
    const {id,Municipio, Departamento, Direccion} = agregarEditarDirecciones;

    const handleSubmitGuardar = e => {
        e.preventDefault();
       

        if(id) {
          actualizarDireccion(agregarEditarDirecciones, id);
        } else {
          guardarDatosFormularioDirecciones(agregarEditarDirecciones);
        }

      }

  return (
    <div style={{ width: 800 }}>
    <h1 className="text-center"> { id ? "Editar" : "Guardar" } Direccion</h1>

    <form
      onSubmit={handleSubmitGuardar}
    >
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="Municipio"
          name="Municipio"
          placeholder="Municipio"
           onChange={capturarDatosDirecciones}
          value={Municipio} 
        />
        <label htmlFor="Municipio">Municipio</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="Departamento"
          placeholder="Departamento"
          name="Departamento"
          onChange={capturarDatosDirecciones}
          value={Departamento}
        />
        <label htmlFor="Departamento">Departamento</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="Direccion"
          placeholder="Direccion"
          name="Direccion"
          onChange={capturarDatosDirecciones}
          value={Direccion}
        />
        <label htmlFor="Direccion">Direccion</label>
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

export default FormularioDireccion
