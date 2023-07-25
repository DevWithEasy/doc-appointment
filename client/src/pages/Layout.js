import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout(){
    return(
        <div className="bg-[#F8F8F8] pt-16">
            <Header/>
            <Outlet/>
            <Toaster/>
        </div>
    )
}