import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Toaster } from 'react-hot-toast';

export default function Layout(){
    return(
        <div className="flex justify-between h-screen bg-gray-50">
            <div className="hidden md:block md:w-2/12">
                <Sidebar/>
            </div>
            <div className="relative w-full md:w-10/12 h-screen p-2 pt-14 space-y-2  overflow-x-auto">
                <Header/>
                <Outlet/>
            </div>
            <Toaster/>
        </div>
    )
}