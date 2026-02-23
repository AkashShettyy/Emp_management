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
    // eslint-disable-next-line
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const res = await getEmployeeById(id);
      setEmployee(res.data);
    } catch (error) {
      console.error(error);
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
        const res = await createEmployee(employee);
        console.log("Created:", res.data);
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee. Check console.");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
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

          <div className="form-actions">
            <button className="btn btn-success" type="submit">
              {isEdit ? "Update" : "Create"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
