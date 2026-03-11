import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"

function RootLayout() {
  return (
    <div>
        <Header/>
        <div>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout