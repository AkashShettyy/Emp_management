import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  // Load employee when editing
  useEffect(() => {
    if (isEdit) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const res = await getEmployeeById(id);
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
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
    <div className="container">
      <h2 className="page-title">
        {isEdit ? "Edit Employee" : "Create Employee"}
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={employee.website}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-success" type="submit">
          {isEdit ? "Update Employee" : "Create Employee"}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>

      </form>
    </div>
  );
};

export default EmployeeForm;
