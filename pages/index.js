import Head from "next/head";
import Layout from "@layouts/main/index";
import styles from "@styles/pages/Welcome.module.css";
import {useState} from 'react';
import {VALIDATE_SESSION_URL} from "@consts/index";


export async function getServerSideProps({req}){
    const token = req.cookies.TokenShop;
    if(token !== undefined){
    try{
        const res = await fetch(VALIDATE_SESSION_URL+token);
        const data = await res.json();
        var {status} = data;
    }catch(err){
        console.log("Error del Index");
    }
    if(status){
        return {
            redirect: {
                destination: '/inicio',
                permanent: false,
            },
        }
    }
    }

    return {
        props: {
            "greeting": "Welcome Guy !!",
        },
    }
}


export default function Index(){

    const [nombreTienda, setNombreTienda] = useState('');
    const handleChange = (e) => setNombreTienda(e.target.value);

    return(
    
    <>
    <Head>
        <meta name="title" content="Trafy Shop: Crea gratis tu tienda online"/>
        <meta name="description" content="Prueba gratis Trafy Shop, la plataforma de emprendedores para crear tu tienda online en 1 minuto. ¡Inicia ahora y acelera tus ventas!"/>
        <meta name="keywords" content="trafy, shop, emprendedor, peru, negocios, tiendas"/>
        <meta content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no" name="viewport"/>
        <meta property="og:title" content="Trafy Shop: Crea gratis tu tienda online"/>
        <meta property="og:site_name" content="Trafy Shop"/>
        <meta property="og:description" content="Prueba gratis Trafy Shop, la plataforma de emprendedores para crear tu tienda online en 1 minuto. ¡Inicia ahora y acelera tus ventas!"/>
        <meta property="og:url" content="https://trafy.store"/>
        <title>Trafy Shop - Crea gratis tu tienda online - Inicia ahora y acelera tus ventas</title>
        <link rel="canonical" href="https://trafy.store"/>
        <link rel="alternate" hrefLang="x-default" href="https://trafy.store"/>
        <link rel="alternate" hrefLang="es" href="https://trafy.store"/>
        <link rel="alternate" hrefLang="es_pe" href="https://trafy.store"/>
    </Head>
    
    <Layout title="TRAFY SHOP">
    
    <div className={styles.Slider}>
        <div className={styles.Slider_welcome}>
            <h2>Crea tu tienda en <span className={styles.Slider_animate}>1 minuto</span> y acelera tus ventas</h2>
            <p>Prueba Trafy la plataforma para crear en 60 segundos una tienda online. Comienza gratis y accede a nuestras 4 herramientas para administrar tu emprendimiento.</p>
            <div className={styles.StartFree}>
                <input spellCheck={false} maxLength="40" onChange={handleChange} type="text" placeholder="Nombre de tu negocio"/>
                <a href={nombreTienda ? `/registro?plan=gratis&tienda=${nombreTienda}` : "/registro"}>
                    CREAR TIENDA 
                    <img width="20" draggable={false} loading="lazy" src="icons/arrow-white.png" alt="->"/>
                </a>
            </div>
        </div>
    </div>

    <div className={styles.Benefits}>
        <div>
            <h3 className={styles.Benefits_line__pink}>
                <img draggable={false} width="30" src="/icons/others/store.png" alt="icono de tienda web"/>
                Tienda Online
            </h3>
            <p>Crea tu primera tienda online en 1 minuto y personalizala según tus gustos para vender tus productos.</p>
        </div>
        <div>
            <h3 className={styles.Benefits_line__blue}>
                <img draggable={false} width="30" src="/icons/others/product.png" alt="icono de catalogo virtual"/>
                Registra Entregas
            </h3>
            <p>Solo registra las entregas de tus productos y Trafy sincronizará tu stock automáticamente.</p>
        </div>
        <div>
            <h3 className={styles.Benefits_line__green}>
                <img draggable={false} width="30" src="/icons/others/benefit3.png" alt="icono de finanzas"/>
                Calcula Finanzas
            </h3>
            <p>Administra tus ingresos y/o egresos mensuales con Trafy y olvídate del viejo amigo llamado "Excel".</p>
        </div>
        <div>
            <h3 className={styles.Benefits_line__yellow}>
            <img draggable={false} width="30" src="/icons/others/explore.png" alt="icono de explorar"/>WhatsApp</h3>
            <p>Comparte tu tienda y recibe pedidos rápidos directamente a tu chat de WhatsApp o de Facebook.</p>
        </div>
    </div>

    <div className={styles.PricingTables}>
    <div className={styles.PricingTables_title}>
        <h3>Una gran experiencia no tiene precio</h3>
        <img draggable={false} loading="lazy" width="65" src="/icons/invertir.png" alt="Invertir"/>
    </div>
    <div className={styles.PricingTables_wrap}>
        <div className={styles.PricingTables_board}>
            <div className={styles.PricingTables_head}>
                <h3>Plan Gratis</h3>
                <h4>disfrutalo durante 6 meses</h4>
            </div>
            <div className={styles.PricingTables_list}>
            <ul>
                <li>Tienda Web Online <b>(subdominio y SSL incorporado)</b></li>
                <li>Sube tus productos <b>(hasta 25 visibles en línea)</b></li>
                <li>Entregas y stock sincronizados <b>(hasta 70 registros)</b></li>
                <li>Calcula tus ingresos y/o engresos <b>(hasta 100 registros)</b></li>
                <li>Canales de venta <b>(WhatsApp, Facebook, Instagram)</b></li>
                <li>0% de comisiones <b>(no interferimos con tu dinero)</b></li>
                <li>Soporte y Atención 24/7 <b>(nos encanta oirte)</b></li>
            </ul>
            </div>
            <div className={styles.PricingTables_button}>
                <a href="/registro?plan=gratis">UTILIZAR PLAN</a>
            </div>
        </div>

        <div className={styles.PricingTables_board}>
            <div className={styles.PricingTables_head}>
                <h3>Plan Básico</h3>
                <h4>una aventura por S/21.00 al mes</h4>
            </div>
            <div className={styles.PricingTables_list}>
            <ul>
                <li>Tienda Web Online <b>(subdominio y SSL incorporado)</b></li>
                <li>Sube tus productos <b>(hasta 125 visibles en línea)</b></li>
                <li>Entregas y stock sincronizados <b>(registros ilimitados)</b></li>
                <li>Calcula tus ingresos y/o egresos <b>(registros ilimitados)</b></li>
                <li>Canales de venta <b>(WhatsApp, Facebook, Instagram)</b></li>
                <li>0% de comisiones <b>(no interferimos con tu dinero)</b></li>
                <li>Soporte y Atención 24/7 <b>(prioritario)</b></li>
            </ul>
            </div>
            <div className={styles.PricingTables_button}>
                <a href="/registro?plan=basico">UTILIZAR PLAN</a>
            </div>
        </div>
    </div>
    </div>

    <div className={styles.TrafyEnd}>
        <h3>Deja de emprender solo(a), ahora Trafy te acompaña</h3>
        <a href="/registro">¡ME GUSTA EMPRENDER!</a>
    </div>
    
    </Layout>
    </>
    
    )
}
