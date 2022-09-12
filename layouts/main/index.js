import Header from "@components/header";
import Footer from "@components/footer";


export default function Layout({children, title, footer = true}){
    
    return(
    
    <>
    
    <Header title={title}/>
    
    <div className="Layout">
        {children}
    </div>
    
    {
        footer && <Footer/>
    }
    
    </>

    )
}