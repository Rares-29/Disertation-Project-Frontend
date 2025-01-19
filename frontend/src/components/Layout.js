import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Appbar";
import "./Layout.css"

const Layout = () => {
    return (
      <>
      <div className="layout-box">
      <ResponsiveAppBar/>
      <Outlet/>
      </div>
      </>
    )
  }


export default Layout;