import axios from "axios";
import { BASE_URL } from "../utils/apiConfig";
import { mockEmployees } from "../utils/mockData";

const USE_MOCK = false;

const getStoredEmployees = () => {
  const stored = localStorage.getItem("employees");
  return stored ? JSON.parse(stored) : [...mockEmployees];
};

const saveEmployees = (employees) => {
  localStorage.setItem("employees", JSON.stringify(employees));
};

// GET ALL
export const getEmployees = async () => {
  if (USE_MOCK) return { data: getStoredEmployees() };
  return await axios.get(BASE_URL);
};

// GET BY ID
export const getEmployeeById = async (id) => {
  if (USE_MOCK)
    return { data: getStoredEmployees().find((e) => e.id === parseInt(id)) };
  return await axios.get(`${BASE_URL}/${id}`);
};

// CREATE
export const createEmployee = async (data) => {
  if (USE_MOCK) {
    const employees = getStoredEmployees();
    const maxId =
      employees.length > 0 ? Math.max(...employees.map((e) => e.id)) : 0;
    const newEmployee = { ...data, id: maxId + 1 };
    employees.push(newEmployee);
    saveEmployees(employees);
    return { data: newEmployee };
  }
  return await axios.post(BASE_URL, data);
};

// UPDATE
export const updateEmployee = async (id, data) => {
  if (USE_MOCK) {
    const employees = getStoredEmployees();
    const index = employees.findIndex((e) => e.id === parseInt(id));
    if (index !== -1) {
      employees[index] = { ...data, id: parseInt(id) };
      saveEmployees(employees);
    }
    return { data };
  }
  return await axios.put(`${BASE_URL}/${id}`, data);
};

// DELETE
export const deleteEmployee = async (id) => {
  if (USE_MOCK) {
    const employees = getStoredEmployees().filter((e) => e.id !== parseInt(id));
    saveEmployees(employees);
    return { data: {} };
  }
  return await axios.delete(`${BASE_URL}/${id}`);
};
