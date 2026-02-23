import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "../../services/employeeService";

const EmployeeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await getEmployeeById(id);
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!employee) return <h3>Loading...</h3>;

  return (
  <div className="container">
    <h2 className="page-title">Employee Details</h2>

    <div className="view-card">
      <div className="view-row"><span className="label">ID:</span><span>{employee.id}</span></div>
      <div className="view-row"><span className="label">Name:</span><span>{employee.name}</span></div>
      <div className="view-row"><span className="label">Email:</span><span>{employee.email}</span></div>
      <div className="view-row"><span className="label">Phone:</span><span>{employee.phone}</span></div>
      <div className="view-row"><span className="label">Website:</span><span>{employee.website}</span></div>

      <br />

      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back to List
      </button>
    </div>
  </div>
);

};

export default EmployeeView;
