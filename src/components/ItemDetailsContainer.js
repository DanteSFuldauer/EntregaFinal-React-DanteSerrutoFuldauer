import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import ItemDetails from "./ItemDetails";

const ItemDetailsContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItem = async () => {
      const itemDoc = doc(db, "items", itemId);
      const itemSnapshot = await getDoc(itemDoc);

      if (itemSnapshot.exists()) {
        setItem({ id: itemSnapshot.id, ...itemSnapshot.data() });
      } else {
        console.log("El producto no existe en la base de datos");
      }
      
      setLoading(false);
    };

    getItem();
  }, [itemId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return item ? <ItemDetails item={item} /> : <p>Producto no encontrado</p>;
};

export default ItemDetailsContainer;
