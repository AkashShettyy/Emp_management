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
    <div>
      <h2>Employee Details</h2>

      <p><strong>ID:</strong> {employee.id}</p>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone}</p>
      <p><strong>Website:</strong> {employee.website}</p>

      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default EmployeeView;
