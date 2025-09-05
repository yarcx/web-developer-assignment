import { Route, Routes } from "react-router-dom";
import Home from "./pages/UserHome";
import UserPost from "./pages/UserPost";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Home />} />
        <Route path="/:postId" element={<UserPost />} />
      </Route>
    </Routes>
  );
}

export default App;
