import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerIndex from "../pages/customers";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<CustomerIndex />} />
                <Route path="/" element={<CustomerIndex />} />
            </Routes>
        </Router>
    );
}
export default App;
