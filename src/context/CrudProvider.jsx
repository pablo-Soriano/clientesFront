import { createContext, useEffect, useState } from "react";
import { baseURLAxios } from "../config/Axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

/* CLIENTES */
const datosClientes = {
  Nombres: "",
  Apellidos: "",
  Telefono: "",
  Email: "",
};

const crudContext = createContext();

export const CrudProvider = ({ children }) => {
  /*   const {idDocumento} = useParams();
  console.log(idDocumento); */

  const [documentoIdCliente, setdocumentoIdCliente] = useState(0);
  const [agregarCliente, setAgregarCliente] = useState(datosClientes); // guardo o edito
  const [clientes, setClientes] = useState([]); // state para obtener los clientes

  /* DOCUMENTOS */

  const datosDocumentos = {
    Nombredocumento: "",
    numero: "",
    idCliente: documentoIdCliente, //0
  };

  const [agregarDocumento, setAgregarDocumento] = useState(datosDocumentos); // guardo o edito //null

  const [documentos, setDocumentos] = useState([]); // state para obtener los documentos

  //const [idPrueba, setIdPrueba] = useState(0)

  /* DIRECCIONES */
  const [direccionIdCliente, setdireccionIdCliente] = useState(0); // para obtener el idcliente en direcciones

  const datosDirecciones = {
    Municipio: "",
    Departamento: "",
    Direccion: "",
    idCliente: direccionIdCliente,
  };

  const [direcciones, setDirecciones] = useState([]); // para obtener las direcciones de la BD
  const [agregarEditarDirecciones, setAgregarEditarDirecciones] = useState(datosDirecciones);

  const [modal, setModal] = useState(false); // para saber estado del modal

  const prueba = (idprueba) => {
    setIdPrueba(idprueba);
    console.log(idPrueba);
  };

  const handleClickModel = () => {
    setModal(!modal); //capturo
    setAgregarCliente(datosClientes); // limpia los campos del cliente
    setAgregarDocumento(datosDocumentos);
    setAgregarEditarDirecciones(datosDirecciones);
  };

  useEffect(() => {
    mostrarCliente();
  }, []);

  const mostrarCliente = async () => {
    try {
      const { data } = await baseURLAxios.get("clientes");
      setdocumentoIdCliente(0);
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
  const buscarClienteId = async (id) => {
    try {
      const { data } = await baseURLAxios.get(`clientes/${id}`);
      // console.log(data);
      setAgregarCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  // actualizar cliente
  const actualizarCliente = async (datos, id) => {
    try {
      const { data } = await baseURLAxios.put(`clientes/${id}`, datos);
      mostrarCliente(); // muestra el nuevo usuario
      setAgregarCliente(datosClientes); // limpia los campos del cliente
      handleClickModel(); // para cerrar modal
      toast.success(data.message); //mensaje de ok
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  /*   // buscar documentos para el cliente con Id
  const buscarDocumentosClienteId = async(id) => {
    try {
      
      console.log('Documentos del Cliente con Id: ' + id);
      
    } catch (error) {
      console.log(error);
    }
  } */

  //mensaje de eliminar
  const handleClickEliminarUsuarioMSG = (id) => {
    // console.log(id);
    Swal.fire({
      title: "¿estas seguro?",
      text: "Una ves eliminado ya no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonText: "eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCliente(id);
      }
    });
  };

  // eliminar Cliente
  const eliminarCliente = async (id) => {
    try {
      const { data } = await baseURLAxios.delete(`clientes/${id}`);
      mostrarCliente(); // muestra el nuevo usuario
      toast.success(data.message); //mensaje de ok
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
  const mostrarDocumento = async (id) => {
    try {
      const { data } = await baseURLAxios.get(`documentos/mostrar/${id}`);
      //console.log(data);
      setdocumentoIdCliente(id);
      setDocumentos(data);
    } catch (error) {
      console.log(error);
    }
  };

  //crea un Documento
  const guardarDatosFormularioDoc = async (datos) => {
    try {
      const { data } = await baseURLAxios.post("documentos", datos);
      //console.log(data);
      mostrarDocumento(documentoIdCliente); // muestra el nuevo usuario
      setAgregarDocumento(datosDocumentos); // limpia los campos del Documento
      handleClickModel(); // para cerrar modal
      toast.success(data.message); //mensaje de ok
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // buscar documento por su id para actualizar
  const buscarDocumentoId = async (id) => {
    try {
      const { data } = await baseURLAxios.get(`documentos/${id}`);
      setAgregarDocumento(data);
      // console.log(data);
      setAgregarCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  // actualizar Documento
  const actualizarDocumento = async (datos, id) => {
    try {
      const { data } = await baseURLAxios.put(`documentos/${id}`, datos);
      mostrarDocumento(documentoIdCliente); // muestra el nuevo usuario
      setAgregarDocumento(datosDocumentos); // limpia los campos del Documento
      handleClickModel(); // para cerrar modal
      toast.success(data.message); //mensaje de ok */
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  /* Eliminar documentos */

  //mensaje de eliminar
  const handleClickEliminarDocumentoMSG = (id) => {
    // console.log(id);
    Swal.fire({
      title: "¿estas seguro?",
      text: "Una ves eliminado ya no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonText: "eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarDocumento(id);
      }
    });
  };

  // eliminar Documento
  const eliminarDocumento = async (id) => {
    try {
      const { data } = await baseURLAxios.delete(`documentos/${id}`);
      mostrarDocumento(documentoIdCliente); // muestra el nuevo usuario
      toast.success(data.message); //mensaje de ok
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  /***************************  DIRECIONES  *********************************** */

  // mostrar direcciones por cliente
  const mostrarDirecciones = async (id) => {
    setdireccionIdCliente(id);
    try {
      const { data } = await baseURLAxios.get(`direcciones/mostrar/${id}`);

      setDirecciones(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // capturar datos de direccciones

  const capturarDatosDirecciones = (e) => {
    e.preventDefault();
    setAgregarEditarDirecciones({
      ...agregarEditarDirecciones,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar Direcciones
  const guardarDatosFormularioDirecciones = async (datos) => {
    try {
      const { data } = await baseURLAxios.post("direcciones", datos);
      //      console.log(data);
      mostrarDirecciones(direccionIdCliente);  // muestra el nuevo usuario
      setAgregarEditarDirecciones(datosDirecciones); // limpia los campos de direcciones
      handleClickModel(); // para cerrar modal
      toast.success(data.message); //mensaje de ok
    } catch (error) {
      console.log(error);
    }
  };

  // buscar Direccion por IdCliente
  const buscarDireccion = async(id) => {
    try {
      const {data} = await baseURLAxios.get(`direcciones/${id}`);
      //console.log(data);
      setAgregarEditarDirecciones(data); // llenar formulario con informacion mediante la busqueda

    } catch (error) {
      console.log(error);
    }
  }

  // actualizar direccion 
  const actualizarDireccion = async(datos, id) => {
    try {
      const {data} = await baseURLAxios.put(`direcciones/${id}`, datos );
      //console.log(data);
      mostrarDirecciones(direccionIdCliente); // muestra las direcciones por idcliente.
      setAgregarEditarDirecciones(datosDirecciones); // limpia los campos de direcciones
      handleClickModel(); // para cerrar modal
      toast.success(data.message); //mensaje de ok
    } catch (error) {
      console.log(error);
    }
  }

  /* Eliminar documentos */

  //mensaje de eliminar
  const handleClickEliminarDireccionMSG = (id) => {
    // console.log(id);
    Swal.fire({
      title: "¿estas seguro?",
      text: "Una ves eliminado ya no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonText: "eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarDireccion(id);
      }
    });
  };

  // eliminar Documento
  const eliminarDireccion = async (id) => {
    try {
      const { data } = await baseURLAxios.delete(`direcciones/${id}`);
      mostrarDirecciones(direccionIdCliente); // muestra las direcciones por idcliente.
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
        capturarDatosDocumentos,
        documentos,
        agregarDocumento,
        mostrarDocumento,
        setDocumentos,
        guardarDatosFormularioDoc,
        setAgregarDocumento,
        buscarDocumentoId,
        actualizarDocumento,
        handleClickEliminarDocumentoMSG,
        mostrarDirecciones,
        direcciones,
        agregarEditarDirecciones,
        capturarDatosDirecciones,
        guardarDatosFormularioDirecciones,
        buscarDireccion,
        actualizarDireccion,
        handleClickEliminarDireccionMSG
      }}
    >
      {children}
    </crudContext.Provider>
  );
};

export default crudContext;
