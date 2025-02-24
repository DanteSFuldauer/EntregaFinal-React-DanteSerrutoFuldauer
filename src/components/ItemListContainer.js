
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]); //almacenado de items
  const [loading, setLoading] = useState(true); //estado de carga
  const { categoryId } = useParams(); //obtengo categoria de los parametros

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      try {
        const collectionRef = categoryId
          ? query(collection(db, "products"), where("category", "==", categoryId))
          : collection(db, "products");

        const response = await getDocs(collectionRef);
        const itemsAdapted = response.docs.map((doc) => {
          const data = doc.data();
          console.log('Product data:', data);
          return {id: doc.id, ...data};
        });

        setItems(itemsAdapted);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryId]);

  if (loading) {
    return <h1 className="text is-size-4">Cargando detalles ...</h1>;
  }

  return (
    <div className="container">
      <h2 className="title">{greeting}</h2>
      <h3 className="has-text-centered is-size-3 mb-5">Listado de productos</h3>
      <div className="columns is-multiline"> <ItemList items={items}/> </div>
    </div>
  );
}

export default ItemListContainer;
