import {uploadLogoFirebase, filterSubdomainName} from "@utils/index";
import {useEffect} from "react";
import {CONNECTION_ERROR} from "@consts/index";
import {registrationService} from "@services/index";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import Loading from "@components/loading";
import styles from "@styles/pages/Registro.module.css";


//! revisar el cleanUp de este useEffect
//! URGENTE: envio el logo a firebase pero si ocurre un error de duplicación, el logo ocupará espacio en firebase


export default function LoadingPage({pageDataOne,pageDataTwo,nivelPlan, setPage}){

    const {imagenLogo,infoTienda,nombreTienda,numeroTelefono,urlTienda,password,categoriaTienda} = pageDataOne;
    const {direccionPrincipal,infoPagos,infoReclamos,infoEntrega,nombreFundador} = pageDataTwo;
    const finalUrlTienda = filterSubdomainName(urlTienda);
    let filterPhone = numeroTelefono.replace("+51","");
    filterPhone = numeroTelefono.replace(/^51/,"");


    const saveShop = async() => {
        try{
            var {url} = await uploadLogoFirebase(imagenLogo,finalUrlTienda);
        }catch(err){
            toast.error("Error de imagen, Inténta otra vez");
            setPage(1);
            return;
        }
        
        const data = {
            nombreTienda,
            urlTienda: finalUrlTienda,
            infoTienda,
            numeroTelefono: filterPhone,
            nombreFundador,
            password,
            nivelPlan,
            infoEntrega,
            urlLogo: url,
            direccionPrincipal,
            infoPagos,
            categoriaTienda,
            infoReclamos
        };
        
        registrationService(data)
        .then(({message, status, token}) => {
            if(status){
                Cookies.set('TokenShop',token,{ expires: 7 });
                toast.success(message);
                window.location = "/inicio";
            }else{
                toast.error(message);
                setPage(1);
                //! Revisar que pasa cuando cambio a la pantalla OneBoard
            }
        })
        .catch((err) => {
            toast.error(CONNECTION_ERROR);
            setPage(1);
        })
    }

    useEffect(() => {
        saveShop();
    }, []);

    return(
    
    <div className={styles.LoadPage}>
        <img width="400" src="/images/building.png" draggable={false} alt="icon-page-register"/>
        <span>En Perú las ventas no presenciales suben un 15% con el uso de una tienda online</span>
        <Loading/>
    </div>

    )
}