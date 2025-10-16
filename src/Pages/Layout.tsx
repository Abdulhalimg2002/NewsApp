import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const layout=()=>{
    return(<>
        <Navbar/>
         <main className="p-4 bg-black" >
        <Outlet /> {/* هنا تظهر الصفحة الفرعية: Home أو Category */}
      </main>
        </>
    )
}
export default layout;