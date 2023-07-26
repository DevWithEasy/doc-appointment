import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout(){
    return(
        <div className="h-screen pt-16 bg-[#F8F8F8] overflow-y-auto font-bangla">
            <Header/>
            <Outlet/>
            <Toaster/>
        </div>
    )
}