import axios from "axios";
import { BASE_URL } from "../utils/apiConfig";

// GET ALL
export const getEmployees = async () => {
  return await axios.get(BASE_URL);
};

// GET BY ID
export const getEmployeeById = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

// CREATE
export const createEmployee = async (data) => {
  return await axios.post(BASE_URL, data);
};

// UPDATE
export const updateEmployee = async (id, data) => {
  return await axios.put(`${BASE_URL}/${id}`, data);
};

// DELETE
export const deleteEmployee = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};
