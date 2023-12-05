import { useEffect, useState } from "react";
import { getAllByKey } from "../helpers/data";

function useDropdown({ table, multiple, initialItems, itemKey = "nombre" }) {
  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState(multiple ? [] : null);
  const [items, setItems] = useState(initialItems || []);

  useEffect(() => {
    const cargar_datos = async () => {
      if (items.length) return;
      setIsLoading(true);
      const data = await getAllByKey(table);
      const dataFormatted = data.map((item) => ({
        label: item[itemKey],
        value: item[itemKey],
      }));
      setItems(dataFormatted);
      setIsLoading(false);
    };
    cargar_datos();
  }, []);

  return { isLoading, value, setValue, items, setItems };
}

export { useDropdown };