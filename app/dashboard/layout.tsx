import ButtonSignOut from "../components/ButtonSignOut";
import DashboardNav from "../components/DashboardNav";
import { ToastContainer } from 'react-toastify';

export default function DashboardLayout({children}: Readonly<{children: React.ReactNode}>){
    return(
        <section className="max-w-[1200px] mx-auto md:flex md:items-center md:gap-4 w-full h-screen mt-2 p-2">

            <DashboardNav/>
            <div className="w-full h-full">
                <ButtonSignOut/>
                {children}
                <ToastContainer/>
            </div>
        </section>
    );
}