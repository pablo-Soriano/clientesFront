import React, { useState } from "react";
import DetalleDocumento from "./DetalleDocumento";
import Modal from "react-modal";
import ReactModal from "react-modal";
import FormularioDocumento from "./FormularioDocumento";
import useCrud from "../../hooks/useCrud";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

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

const TablaDocumento = () => {
 const { modal, handleClickModel, documentos } = useCrud();

 
 
  return (
    <div className="row">
      <div>
        <button
          type="button"
          className="btn btn-outline-success btn-lg m-3"
          onClick={handleClickModel}
        >
          Agregar Documentos
        </button>
      </div>
documentos
      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th scope="col" style={{width: 100}} >Id</th>
            <th scope="col" style={{width: 250}} >Documento</th>
            <th scope="col" style={{width: 300}}>Numero</th>
            <th scope="col" style={{width: 300}}>Estado</th>
            <th scope="col" style={{width: 300}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
      {/*  { <DetalleDocumento />} */}
       {documentos.map((documento) => (
            <DetalleDocumento documento={documento} key={documento.id} />
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
        <FormularioDocumento />
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

export default TablaDocumento;
