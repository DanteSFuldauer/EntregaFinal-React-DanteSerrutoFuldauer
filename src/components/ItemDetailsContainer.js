import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import ItemDetails from "./ItemDetails";

const ItemDetailsContainer = () => {
  const { itemId } = useParams(); //obtiene id de los parametros url
  const [item, setItem] = useState(null); //almacena datos del prod
  const [loading, setLoading] = useState(true); //carga de datos

  useEffect(() => {

    // Funcion para obtener prod
    const getItem = async () => {
      setLoading(true); 

      const itemDoc = doc(db, "products", itemId); //referencia al prod en db
      const itemSnapshot = await getDoc(itemDoc); //obtiene el doc del prod

      if (itemSnapshot.exists()) { //si existe el doc
        setItem({ id: itemSnapshot.id, ...itemSnapshot.data() }); //almacena datos del prod
      } else {
        console.log("El producto no existe en la base de datos");
      }

      setLoading(false); 
    };

    getItem();
  }, [itemId]);

  if (loading) {
    return <h1 className="text is-size-4">Cargando detalles ...</h1>; 
  }

  return item ? <ItemDetails item={item} /> : <h1 className="text is-size-4">Producto no encontrado</h1>;
};

export default ItemDetailsContainer;
