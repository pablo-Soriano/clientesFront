import { useContext } from 'react'
import crudContext from '../context/CrudProvider';

const useCrud = () => {
  return useContext(crudContext);
}

export default useCrud
