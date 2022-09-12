export default function Loading({top = 0,bottom = 0}){
    
    return (
    
    <>
    <div className="WrapperLoading">
        <span className="Loading"></span>
    </div>
    

    <style jsx>{`

    .WrapperLoading{
        width: 100%;
        padding-top: ${top}px;
        padding-bottom: ${bottom}px;
    }
    
    .Loading{
        width: 45px;
        height: 45px;
        background: transparent;
        border-radius: 50%;
        border-left: solid 4px transparent;
        border-right: solid 4px #2196f3;
        border-top: solid 4px #2196f3;
        border-bottom: solid 4px #2196f3;
        display: flex;
        margin: 0 auto;
        animation: Loading .7s infinite;
    }

    @keyframes Loading {
        from {transform: rotateZ(360deg);}
        to {transform: rotateZ(0deg);}
    }
    
    `}    
    
    </style>
    
    </>
    
    )
}