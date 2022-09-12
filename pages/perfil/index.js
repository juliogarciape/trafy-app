import moment from 'moment';
import 'moment/locale/es';
import Layout from "@layouts/panel/index";
import Loading from "@components/loading";
import Cookies from 'js-cookie';
import styles from "@styles/pages/Perfil.module.css";
import {MAIN_NUMBER,HELP_URL,VALIDATE_SESSION_URL,CONNECTION_ERROR} from "@consts/index";
import {getPlanLevel} from "@utils/index";
import {getProfile} from "@services/index";
import {useEffect,useState} from "react";
import toast from 'react-hot-toast';


export async function getServerSideProps({req}){
    const token = req.cookies.TokenShop;
    if(token === undefined){
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
    }
    try{
        const res = await fetch(VALIDATE_SESSION_URL+token);
        const data = await res.json();
        var {status,nivelPlan} = data;
    }catch(err){
        return {
			redirect: {
				destination: '/mantenimiento',
				permanent: false,
			},
		}
    }
    if(!status){
        return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
    }

    return {
        props: {
            token,
            nivelPlan,
        },
    }
}



export default function Perfil({token,nivelPlan}){

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unmounted = false;

        getProfile(token)
        .then((res) => {
            if(!unmounted){
                setLoading(false);
                setProfileData(res);
            }
        })
        .catch((err) => {
            if(!unmounted){
                toast.error(CONNECTION_ERROR);
            }
        });

        return () => { unmounted = true };
    }, []);


    const deleteSession = (e) =>{
        e.preventDefault();
        Cookies.remove('TokenShop');
        window.location = "/login";
    }
    
    return(
        
    <Layout>

    { loading && <Loading top="60"/> }

    { profileData && (profileData.length === 1) &&

        <>
        <div className={styles.Profile}>
            <div className={styles.Profile_card}>
                <img draggable={false} width="75" loading="lazy" src="/icons/avatars/user.png" alt="Icono Avatar"/>
                <h3>{profileData[0].nombre_fundador} fundador(a) de <b>{profileData[0].nombre_tienda}</b></h3>
            </div>
            <div className={styles.Profile_plan}>
                <h4 className={styles.Profile_plan__strong}>PLAN {getPlanLevel(nivelPlan)}</h4>
                <h4>Vence el {moment.utc(profileData[0].fecha_validez).format('LL')}</h4>
            </div>
        </div>

        <div className={styles.List}>
            <a href={HELP_URL} target="_blank">
                <img draggable={false} loading="lazy" width="25" src="/icons/panel/help.png" alt="icon-help"/>
                <h4>Centro de ayuda</h4>
            </a>

            {
        
            nivelPlan === 1 && 
            <a href={`https://api.whatsapp.com/send?phone=${MAIN_NUMBER}&text=*¡Hola!* deseo actualizar mi cuenta al *plan mensual básico* de S/21.00 mi tienda es *${profileData[0].nombre_tienda}*`}>
                <img draggable={false} loading="lazy" width="25" src="/icons/panel/upgrade.png" alt="icon-upgrade"/>
                <h4>Actualizar Plan</h4>
            </a>
            
            }

            <a href="/logout" onClick={deleteSession}>
                <img draggable={false} loading="lazy" width="25" src="/icons/panel/logout.png" alt="icon-session"/>
                <h4>Cerrar Sesión</h4>
            </a>
        </div>
        </>
    }

    </Layout>

    )
}