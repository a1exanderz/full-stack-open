import { useState } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // ...

  const create = (resource) => {
    // ...
  };

  const service = {
    create,
  };

  return [resources, service];
};

export default useResource;
