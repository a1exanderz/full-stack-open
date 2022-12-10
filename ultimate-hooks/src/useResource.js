import { useEffect, useState } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };

    fetchData();
  }, []);

  const create = (resource) => {
    const newResource = { ...resource, id: resources.length + 1 };
    setResources([...resources, newResource]);
  };

  const service = {
    create,
  };

  return [resources, service];
};

export default useResource;
