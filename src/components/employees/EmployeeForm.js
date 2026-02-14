import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // check if edit mode

  const isEdit = !!id;

  // Load employee data if editing
  useEffect(() => {
    if (isEdit) {
      fetchEmployee();
    }
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await getEmployeeById(id);
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateEmployee(id, employee);
      } else {
        await createEmployee(employee);
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Employee" : "Create Employee"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={employee.website}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
