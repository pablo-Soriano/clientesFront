import { createContext, useEffect, useState } from "react";
import { baseURLAxios } from "../config/Axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';


const datosDocumentos = {
  Nombredocumento: "",
  numero: "",
  Estado: "",
  idCliente: "",
};

const crudContextDocumento = createContext();

export const CrudProviderDocumento = ({ children }) => {

/*   const {idDocumento} = useParams();
  console.log(idDocumento); */

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
    setAgregarDocumento(datosDocumentos); // limpia los campos del Documento  
  };

  useEffect(() => {
    mostrarDocumento();
  }, []);

  const mostrarDocumento = async () => {
    try {
      const { data } = await baseURLAxios.get("documentos");
      //console.log(data);
      setDocumentos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const capturarDatosDocumentos = (e) => {
    e.preventDefault();
    setAgregarDocumento({
      ...agregarDocumento,
      [e.target.name]: e.target.value, // asigna valores acada campo del formulario
    });
  };

  //crea un Documento
  const guardarDatosFormulario = async (datos) => {
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

  // buscar documento para actualizar por su Id
  const buscarDocumentoId = async(id) => {
    try {
      const {data} = await baseURLAxios.get(`documentos/${id}`);
      console.log(data);
      setAgregarDocumento(data);
    } catch (error) {
      console.log(error);
    }
  }

  // actualizar documento
  const actualizarDocumento = async(datos, id) => {
    try {
      const {data} = await baseURLAxios.put(`documentos/${id}`,datos);
      mostrarDocumento(); // muestra el nuevo usuario
      setAgregarDocumento(datosDocumentos); // limpia los campos del Documento  
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



  // eliminar Documento
  const eliminarDocumento = async(id) => {
    try {
      const {data} = await clienteAxios.delete(`documentos/${id}`);
      mostrarCliente(); // muestra el nuevo usuario
      toast.success(data.message); //mensaje de ok
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <crudContextDocumento.Provider
      value={{
        modal,
        handleClickModel,
        documentos,
        agregarDocumento,
        capturarDatosDocumentos,
        guardarDatosFormulario,
        buscarDocumentoId,
        actualizarDocumento,
        handleClickEliminarUsuarioMSG,
        prueba,
        buscarDocumentosDocumentoId
      }}
    >
      {children}
    </crudContextDocumento.Provider>
  );
};

export default crudContextDocumento;
