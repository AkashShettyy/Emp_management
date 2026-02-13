import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/employees/EmployeeList";
import EmployeeForm from "./components/employees/EmployeeForm";
import EmployeeView from "./components/employees/EmployeeView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/create" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />
        <Route path="/view/:id" element={<EmployeeView />} />
      </Routes>
    </Router>
  );
}

export default App;
