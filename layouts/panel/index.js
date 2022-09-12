import { Toaster } from 'react-hot-toast';
import Navbar from "@components/navbar";

export default function Layout({children}){
    return(
    
    <>
        <Navbar/>
        <Toaster />
        <div className="Layout">
            {children}
        </div>
    </>
    
    )
}