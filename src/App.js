import {Route, Routes, BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>HOME</div>} />
        <Route path="/logout" element={<div>LOGOUT</div>} />
        <Route path="/login" element={<div>LOGIN</div>} />
        <Route path="/register" element={<div>REGISTER</div>} />
        <Route path="/all-tasks" element={<div>ALL-TASKS</div>} />
        <Route path="/add-new-task" element={<div>ADD-NEW-TASK</div>} />
        <Route path="/update-task" element={<div>UPDATE-TASK</div>} />
        <Route path="/delete-task" element={<div>DELETE-TASK</div>} />
        <Route path="my-tasks-analytics" element={<div>MY-TASK-ANALYTICS</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;