import { path, get, post, put, del } from './actions';

export const getAll = async (table) => {
  // getAll('courses')
  const url = path(table); // localhost:6000/courses/
  const response = await get(url); // {status: true, message:{}}
  return response;
};

export const insert = async (table, data) => {
  const url = path(table);
  const response = await post(url, data);
  return response;
};

export const update = async (table, data, id) => {
  const url = path(table, id);
  const response = await put(url, data);
  return response;
};

export const remove = async (table, id) => {
  const url = path(table, id); // localhost:6000/remove/154
  const response = await del(url);
  return response;
};
