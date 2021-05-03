import axios from 'axios';

const baseURI = `http://localhost:3060`; // localhost:3060
const path = (table, id) => {
  return `${baseURI}/${table}/${id !== undefined ? id : ''}`; // localhost:3060/courses/64
};

// Retrieve -> Select * from <table>
const get = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data.message;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Insert
const post = async (url, body) => {
  try {
    const { data } = await axios.post(url, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data.message;
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

// Update
const put = async (url, body) => {
  try {
    const { data } = await axios.put(url, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data.message;
  } catch (err) {
    console.log(err);
    return {};
  }
};

// Remove
const del = async (url) => {
  try {
    const { data } = await axios.delete(url);
    return data.message;
  } catch (err) {
    console.log(err);
    return {};
  }
};

export { path, get, post, put, del };
