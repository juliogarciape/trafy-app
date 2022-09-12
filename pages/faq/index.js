import Layout from "@layouts/main/index";
import styles from "@styles/pages/Faq.module.css";
import Head from "next/head";


export default function Faq(){

    return(
    
    <>
    <Head>
        <meta name="title" content="Trafy Shop: Preguntas Frecuentes"/>
        <meta name="keywords" content="trafy, shop, emprendedor, peru, negocios, tiendas, faq"/>
        <meta content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no" name="viewport"/>
        <meta property="og:url" content="https://trafy.store/faq"/>
        <meta property="og:title" content="Trafy Shop: Preguntas Frecuentes"/>
        <meta name="description" content="¿Tienes preguntas? Conoce más sobre Trafy Shop y como crear una tienda online en 1 minuto."/>
        <meta property="og:description" content="¿Tienes preguntas? Conoce más sobre Trafy Shop y como crear una tienda online en 1 minuto."/>
        <title>Trafy Shop - Preguntas Frecuentes</title>
        <link rel="canonical" href="https://trafy.store/faq"/>
    </Head>

    <Layout title="PREGUNTAS FRECUENTES">
        <div className={styles.ContainerFaq}>
            <details open>
                <summary>¿QUE ES TRAFY?</summary>
                <p>Trafy es una plataforma onlíne que ofrece la creación de tiendas online en 1 minuto, además de 4 herramientas digitales para administrar tu emprendimiento. Con una suscripción gratis o de paga podrás crear tu tienda online, calcular tus finanzas, gestionar tus entregas y recibir los pedidos directos a tu whatsapp.</p>
            </details>
            <details open>
                <summary>¿COMO FUNCIONA?</summary>
                <p>Ofrecemos una suscripción gratis durante 6 meses con limitaciones sin embargo la suscripción básica es desde S/21.00 al mes con todas las funciones disponibles. En cualquier plan se incluye un soporte dedicado a escuchar a nuestros emprendedores.</p>
            </details>
            <details open>
                <summary>¿POR DONDE EMPIEZO?</summary>
                <p>Ingresa <a href="/registro">aquí</a> y registrate gratis, inicia este nuevo periodo y comprueba que es la mejor solución en el mercado peruano para incrementar tus ventas y tu presencia onlíne.</p>
            </details>
            <details>
                <summary>MEDIOS DE PAGO</summary>
                <p>Solo aceptamos transferencias bancarias y los cobros del plan básico se realizan después de consumir el mes de tu plan (NUNCA por adelantado). Todo contacto siempre será por medio de nuestro Instagram Oficial: <a href="https://www.instagram.com/trafy.shop">@trafy.shop</a></p>
            </details>
            <details>
                <summary>PROBLEMAS CON LA APP</summary>
                <p>Después de realizado algún pago no se realizan reembolsos sin embargo si existen problemas con la plataforma. Trafy está dispuesto a negociar el precio de su plan con la finalidad de mantener a un cliente satisfecho y feliz con su inversión.</p>
            </details>
            <details>
                <summary>ELIMINAR MI CUENTA</summary>
                <p>Toda cuenta que presente +60 días de inactividad será eliminada automaticamente. Así que si deseas eliminar tus datos simplemente debes <b>NO</b> renovar tu plan (en caso tengas el plan básico) y si eres usuario gratuito simplemente debes dejar de utilizar la plataforma, luego de estos 60 días tus datos y los de tu negocio serán eliminados permanentemente con el fin de proteger tu privacidad.</p>
            </details>
            <details>
                <summary>TENGO OTRA PREGUNTA</summary>
                <p>Cualquier otra duda o problema estamos para ayudarte, comunicate con nosotros por medio de nuestro Instagram Oficial: <a href="https://www.instagram.com/trafy.shop">@trafy.shop</a> y cuéntanos que es lo que necesitas, estamos aquí para ti.</p>
            </details>
        </div>

    </Layout>

    </>
    
    )
}