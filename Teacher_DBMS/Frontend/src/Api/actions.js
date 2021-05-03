import axios from 'axios';

const baseURI = `http://localhost:3030`; // localhost:6000

const path = (table, id) => {
  return `${baseURI}/${table}/${id !== undefined ? id : ''}`; // localhost:6000/courses/64
};

const get = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const post = async (url, body) => {
  try {
    const { data } = await axios.post(url, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

// axios({
//   method: 'PUT',
//   data: JSON.stringify(body),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

const put = async (url, body) => {
  try {
    const { data } = await axios.put(url, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

const del = async (url) => {
  try {
    const { data } = await axios.delete(url);
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

export { path, get, post, put, del };
