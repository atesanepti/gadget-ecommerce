import Navigation from "./pages/Auth/Navigation";
import { Outlet } from "react-router-dom";
import AdminMenu from "./components/AdminMenu";
import { useSelector } from "react-redux";
import NoticeContainer from "./components/NoticeContainer";

function App() {
  const user = useSelector((state) => state.auth.userInfo);

  return (
    <div>
      <Navigation />
      <NoticeContainer />
      {user?.isAdmin && <AdminMenu />}
      <section className="container">
        <Outlet />
      </section>
    </div>
  );
}

export default App;
