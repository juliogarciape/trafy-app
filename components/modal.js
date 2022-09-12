export default function ModalWrapper({children}){
    return(
    
    <>
    <div className="Overlay">
        <div className="Modal">
            {children}
        </div>
    </div>
    <style jsx global>{`
    
    body{
        overflow: hidden;
    }

    `}</style>
    </>
    
    )
}