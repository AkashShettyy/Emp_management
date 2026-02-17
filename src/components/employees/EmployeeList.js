import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      console.log("API Response:", res.data);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to fetch employees. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
  <div className="container">

    <div className="header">
      <h2 className="page-title">Employee Management</h2>

      <div className="header-actions">
        <button
          className="btn btn-success"
          onClick={() => navigate("/create")}
        >
          + Add Employee
        </button>
      </div>
    </div>

    {employees.length === 0 ? (
      <div className="empty-state">
        <h3>No Employees Found</h3>
        <p>Start by adding your first employee</p>
      </div>
    ) : (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/view/${emp.id}`)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/edit/${emp.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

  </div>
);

};

export default EmployeeList;
