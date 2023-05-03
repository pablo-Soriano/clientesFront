import React, { useState } from "react";
import DetalleCliente from "./DetalleCliente";
import Modal from "react-modal";
import ReactModal from "react-modal";
import FormularioCliente from "./FormularioCliente";
import useCrud from "../../hooks/useCrud";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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

const TablaCliente = () => {
  const { modal, handleClickModel, clientes } = useCrud();

  return (
    <div className="row">
      <div>
        <button
          type="button"
          className="btn btn-outline-success btn-lg m-3"
          onClick={handleClickModel}
        >
          Agregar Cliente
        </button>
      </div>



      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th scope="col" style={{width: 100}} >Id</th>
            <th scope="col" style={{width: 250}} >Nombres</th>
            <th scope="col" style={{width: 300}}>Apellidos</th>
            <th scope="col" style={{width: 300}}>Telefono</th>
            <th scope="col"style={{width: 300}}>Email</th>
            <th scope="col" style={{width: 150}}>Estado</th>
            <th scope="col" style={{width: 300}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <DetalleCliente cliente={cliente} key={cliente.id} />
          ))}
        </tbody>
      </table>

      <ReactModal
        isOpen={modal} //estado que por defecto viene false
        /*   onAfterOpen={afterOpenModal}*/
        onRequestClose={handleClickModel} //cualquier lado salga
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="modal-fondo OVERLAY_STYLE" //modal fondo negro
      >
        <FormularioCliente />
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

export default TablaCliente;
