import Head from "next/head";
import styles from "@styles/pages/Creditos.module.css";
import Layout from "@layouts/main/index";


export default function Creditos(){
    
    return(
    
    <>
    <Head>
        <meta name="title" content="Trafy Shop: Creditos"/>
        <meta name="keywords" content="trafy, shop, emprendedor, peru, negocios, tiendas, creditos"/>
        <meta content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no" name="viewport"/>
        <meta property="og:url" content="https://trafy.store/creditos"/>
        <meta property="og:title" content="Trafy Shop: Creditos"/>
        <meta name="description" content="Conoce un poco más sobre la plataforma Trafy Shop y sus creditos técnicos."/>
        <meta property="og:description" content="Conoce un poco más sobre la plataforma Trafy Shop y sus creditos técnicos."/>
        <title>Trafy Shop - Creditos de la plataforma</title>
        <link rel="canonical" href="https://trafy.store/creditos"/>
    </Head>
    
    <Layout title="CREDITOS">

    <div className={styles.ContainerCreds}>
        <div>
            <h3>DESARROLLADORA</h3>
            <ul>
                <li><a href="mailto:soporte.trafyshop@gmail.com">soporte.trafyshop@gmail.com</a></li>
            </ul>
        </div>
                
        <div>
            <h3>BIBLIOTECA VISUAL</h3>
            <ul>
                <li>
                <div>Iconos diseñados por <a href="https://www.flaticon.es/autores/freepik" title="Freepik">Freepik</a> de <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
                </li>

                <li>
                <div>Iconos diseñados por <a href="" title="Zulfa Mahendra">Zulfa Mahendra</a> de <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </li>

                <li><div>Iconos diseñados por <a href="https://www.flaticon.es/autores/fliqqer" title="Fliqqer">Fliqqer</a> de <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
                </li>
            </ul>
        </div>

        <div>
            <h3>VERSION ACTUAL</h3>
            <ul>
                <li>1.3.1</li>
            </ul>
        </div>

        <div>
            <h3>ULTIMA ACTUALIZACION</h3>
            <ul>
                <li>01 de Abril del 2022</li>
            </ul>
        </div>
    
    </div>

    </Layout>

    </>
    )
}