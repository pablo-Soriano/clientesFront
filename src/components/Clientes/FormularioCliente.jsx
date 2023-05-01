import React from 'react'
import useCrud from '../../hooks/useCrud';

const FormularioCliente = () => {

    const {handleClickModel, capturarDatosClientes, agregarCliente, guardarDatosFormulario, actualizarCliente } = useCrud();
    const { Nombres, Apellidos, Telefono, Email, id} = agregarCliente;
    
    const handleSubmitGuardar = e => {
      e.preventDefault();

      // si tiene id de cliente, es un actualizar, sino es un cliente nuevo (guardar)
      if(id) {
        actualizarCliente(agregarCliente, id);
      } else {
        guardarDatosFormulario(agregarCliente);
      }
    }

  return (
    <div style={{ width: 800 }}>
    <h1 className="text-center">{ id ? "Editar" : "Guardar" } Cliente</h1>

    <form
      onSubmit={handleSubmitGuardar}
    >
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="Nombres"
          name="Nombres"
          placeholder="Nombres"
          onChange={capturarDatosClientes}
          value={Nombres}
        />
        <label htmlFor="Nombres">Nombres</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="Apellidos"
          placeholder="Apellidos"
          name="Apellidos"
          onChange={capturarDatosClientes}
          value={Apellidos}
        />
        <label htmlFor="Apellidos">Apellidos</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="Telefono"
          placeholder="Telefono"
          name="Telefono"
          onChange={capturarDatosClientes}
          value={Telefono}
        />
        <label htmlFor="Telefono">Telefono</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="Email"
          placeholder="Email"
          name="Email"
          onChange={capturarDatosClientes}
          value={Email}
        />
        <label htmlFor="Email">Email</label>
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

export default FormularioCliente
