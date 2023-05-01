import { createContext, useEffect, useState } from "react";
import { baseURLAxios } from "../config/Axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

/* CLIENTES */
const datosClientes = {
  Nombres: "",
  Apellidos: "",
  Telefono: "",
  Email: "",
};

/* DOCUMENTOS */
const datosDocumentos = {
  Nombredocumento: "",
  numero: ""
};

const crudContext = createContext();

export const CrudProvider = ({ children }) => {

/*   const {idDocumento} = useParams();
  console.log(idDocumento); */

  const [agregarCliente, setAgregarCliente] = useState(datosClientes);// guardo o edito
  const [clientes, setClientes] = useState([]); // state para obtener los clientes


  const [agregarDocumento, setAgregarDocumento] = useState(datosDocumentos);// guardo o edito
  const [documentos, setDocumentos] = useState([]); // state para obtener los documentos


  //const [idPrueba, setIdPrueba] = useState(0)

  

  const [modal, setModal] = useState(false); // para saber estado del modal

  const prueba = (idprueba) =>{
    setIdPrueba(idprueba)
    console.log(idPrueba);
  }

  const handleClickModel = () => {
    setModal(!modal); //capturo
    setAgregarCliente(datosClientes); // limpia los campos del cliente  
    setAgregarDocumento(datosDocumentos);
  };

  useEffect(() => {
    mostrarCliente();
  }, []);

  const mostrarCliente = async () => {
    try {
      const { data } = await baseURLAxios.get("clientes");
      //console.log(data);
      setClientes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const capturarDatosClientes = (e) => {
    e.preventDefault();
    setAgregarCliente({
      ...agregarCliente,
      [e.target.name]: e.target.value, // asigna valores acada campo del formulario
    });
  };

  //crea un cliente
  const guardarDatosFormulario = async (datos) => {
    try {
      const { data } = await baseURLAxios.post("clientes", datos);
      mostrarCliente(); // muestra el nuevo usuario
      setAgregarCliente(datosClientes); // limpia los campos del cliente  
      handleClickModel(); // para cerrar modal
      toast.success(data.message); //mensaje de ok
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // buscar cliente para actualizar por su Id
  const buscarClienteId = async(id) => {
    try {
      const {data} = await baseURLAxios.get(`clientes/${id}`);
      console.log(data);
      setAgregarCliente(data);
    } catch (error) {
      console.log(error);
    }
  }

  // actualizar cliente
  const actualizarCliente = async(datos, id) => {
    try {
      const {data} = await baseURLAxios.put(`clientes/${id}`,datos);
      mostrarCliente(); // muestra el nuevo usuario
      setAgregarCliente(datosClientes); // limpia los campos del cliente  
      handleClickModel(); // para cerrar modal
      toast.success(data.message); //mensaje de ok
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // buscar documentos para el cliente con Id
  const buscarDocumentosClienteId = async(id) => {
    try {
      
      console.log('Documentos del Cliente con Id: ' + id);
      
    } catch (error) {
      console.log(error);
    }
  }

      //mensaje de eliminar
      const handleClickEliminarUsuarioMSG = id => {
  
        // console.log(id);
        Swal.fire({
            title: "¿estas seguro?",
            text: "Una ves eliminado ya no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'eliminar'
        }).then((result) => {
 
            if (result.isConfirmed) {
              eliminarCliente(id)
            }
 
        })
    }



  // eliminar Cliente
  const eliminarCliente = async(id) => {
    try {
      const {data} = await clienteAxios.delete(`clientes/${id}`);
      mostrarCliente(); // muestra el nuevo usuario
      toast.success(data.message); //mensaje de ok
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }


  /***************************  DOCUMENTOS  *********************************** */
/*   const handleClickModelDocumentos = () => {
    setModal(!modal); //capturo
    setAgregarDocumento(datosDocumentos); // limpia los campos del cliente  
  }; */

  const capturarDatosDocumentos = (e) => {
    e.preventDefault();
    setAgregarDocumento({
      ...agregarDocumento,
      [e.target.name]: e.target.value, // asigna valores acada campo del formulario
    });
  };

  // muestra documentos por cliente
  const mostrarDocumento = async (idCliente) => {
    try {
      const { data } = await baseURLAxios.get(`documentos/mostrar/${idCliente}`);
      console.log(data);
      setDocumentos(data);
    } catch (error) {
      console.log(error);
    }
  };

    //crea un Documento
    const guardarDatosFormularioDoc = async (datos) => {
      try {
        const { data } = await baseURLAxios.post("documentos", datos);
        mostrarDocumento(); // muestra el nuevo usuario
        setAgregarDocumento(datosDocumentos); // limpia los campos del Documento  
        handleClickModel(); // para cerrar modal
        toast.success(data.message); //mensaje de ok
        //console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  
  

  return (
    <crudContext.Provider
      value={{
        modal,
        handleClickModel,
        clientes,
        agregarCliente,
        capturarDatosClientes,
        guardarDatosFormulario,
        buscarClienteId,
        actualizarCliente,
        handleClickEliminarUsuarioMSG,
        prueba,
        buscarDocumentosClienteId,
        capturarDatosDocumentos,
        documentos,
        agregarDocumento,
        mostrarDocumento,
        setDocumentos,
        guardarDatosFormularioDoc,
        setAgregarDocumento
      }}
    >
      {children}
    </crudContext.Provider>
  );
};

export default crudContext;
