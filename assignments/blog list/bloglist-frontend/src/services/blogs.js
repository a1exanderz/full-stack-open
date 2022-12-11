import axios from "axios";
const baseUrl = "http://localhost:3001/api/blog-entries";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  axios.delete(`${baseUrl}/${id}`, config);
  return id;
};

const incrementLike = async (id) => {
  const object = await axios.get(`${baseUrl}/${id}`);
  const updatedObject = {
    ...object,
    likes: object.data.likes + 1,
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

export default { setToken, getAll, create, deleteBlog, incrementLike };
