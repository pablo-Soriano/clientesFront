import { useContext } from 'react'
import crudContextDocumento from '../context/CrudProviderDocumento';

const useCrudDocumento = () => {
  return useContext(crudContextDocumento);
}

export default useCrudDocumento