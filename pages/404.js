import Head from 'next/head';
import styles from "@styles/pages/404.module.css";


export default function Custom404(){
    
    return(
    
    <>
    <Head>
        <title>Trafy Shop - Error 404</title>
        <meta name="robots" content="noindex" />
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' name='viewport'/>
    </Head>
        
    <div className={styles.ErrorContainer}>
        <div className={styles.ErrorContainer_image}>
            <img draggable={false} loading="lazy" width="300" src="/icons/others/404-error.png" alt="icon-404"/>
        </div>
        <div className={styles.ErrorContainer_error}>
            <h2>Ooops...</h2>
            <p>No encontramos lo que buscas. Verifica la ruta e inténtalo de nuevo</p>
        </div>
    </div>
    </>
    
    )
}