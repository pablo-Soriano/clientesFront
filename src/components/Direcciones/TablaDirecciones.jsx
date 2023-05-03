import React from "react";
import ReactModal from "react-modal";
import DetalleDirecciones from "./DetalleDirecciones";
import { Link } from "react-router-dom";
import useCrud from "../../hooks/useCrud";
import Modal from 'react-modal';
import FormularioDireccion from "./FormularioDireccion";
import { ToastContainer } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    maxheight: "100vh",
    overflowy: "auto",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const TablaDirecciones = () => {
  const { modal, handleClickModel, direcciones, agregarCliente } = useCrud();
  const { Nombres, Apellidos } = agregarCliente;

  return (
    <div className="row">

      <h1 className="text-center">Documento de {Nombres} {Apellidos} </h1>
      <div>
        <div className="d-inline-block">
          <button
            type="button"
            className="btn btn-outline-success btn-lg m-3"
             onClick={handleClickModel} 
          >
            Agregar Direccion
          </button>
        </div>

        <div className="d-inline-block">
          <Link
            type="button"
            className="btn btn-outline-primary btn-lg m-3"
            to={"/"}
          >
            Atras
          </Link>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th scope="col" style={{ width: 100 }}>
              Id
            </th>
            <th scope="col" style={{ width: 250 }}>
              Municipio
            </th>
            <th scope="col" style={{ width: 300 }}>
              Departamento
            </th>
            <th scope="col" style={{ width: 300 }}>
              Direccion
            </th>
            <th scope="col" style={{ width: 300 }}>
              Estado
            </th>
            <th scope="col" style={{ width: 300 }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>

          {direcciones.length === 0 ? (
            <td colspan="6" className="text-center fs-1">No hay dirección aun</td>
          ) : (
            direcciones.map((direccion) => (
              <DetalleDirecciones direccion={direccion} key={direccion.id} />
            ))
          )}
          
{/*              {direcciones.map((direccion) => (
          <DetalleDirecciones direccion={direccion} key={direccion.id} />
        ))}  */}
        </tbody>
      </table>

      <ReactModal
        isOpen={modal} //estado que por defecto viene false
        //onAfterOpen={afterOpenModal}
        onRequestClose={handleClickModel} //cualquier lado salga
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="modal-fondo OVERLAY_STYLE" //modal fondo negro
      >
         <FormularioDireccion /> 
      </ReactModal>
      
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </div>
  );
};

export default TablaDirecciones;
