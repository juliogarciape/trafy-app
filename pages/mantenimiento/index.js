import {MAINTENANCE} from "@consts/index";
import Head from 'next/head';
import styles from "@styles/pages/404.module.css";

export async function getServerSideProps(){

    if(!MAINTENANCE){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            "greeting": "Hi Marlen !!",
        },
    }
}

export default function Mantenimiento(){
    
    return(
    
    <>
    <Head>
        <title>Trafy Shop - En mantenimiento</title>
        <meta name="robots" content="noindex" />
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' name='viewport'/>
    </Head>
        
    <div className={styles.ErrorContainer}>
        <div className={styles.ErrorContainer_image}>
            <img draggable={false} loading="lazy" width="400" src="images/mantenimiento.png" alt="imagen de mantenimiento"/>
        </div>
        <div className={styles.ErrorContainer_error}>
            <h2>Esperanos</h2>
            <p>Trabajamos para hacer Trafy tu lugar favorito, regresa en unos minutos</p>
        </div>
    </div>
    </>
    
    )
}