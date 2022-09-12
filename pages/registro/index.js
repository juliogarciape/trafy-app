import {useEffect,useState} from "react";
import {Toaster} from 'react-hot-toast';
import Head from "next/head";
import Layout from "@layouts/main/index";
import OnboardingOne from "@components/register/onboardingOne";
import OnboardingTwo from "@components/register/onboardingTwo";
import LoadingPage from "@components/register/loading";


export default function Registro(){

    const [page, setPage] = useState(1);
    const [nivelPlan, setNivelPlan] = useState(1);
    const [pageDataOne, setPageDataOne] = useState({
        nombreTienda: "",
        urlTienda: "",
        infoTienda: "",
        imagenLogo: null,
        categoriaTienda: "",
        numeroTelefono: "",
        password: ""
    });
    const [pageDataTwo, setPageDataTwo] = useState({
        infoPagos: "",
        direccionPrincipal: "",
        infoReclamos: "",
        nombreFundador: "",
        infoEntrega: ""
    })

    useEffect(()=>{
        
        const values = window.location.search;
        const urlParams = new URLSearchParams(values);
        const urlPlan = urlParams.get('plan');
        const urlTienda = urlParams.get('tienda');

        if(urlPlan){
            setNivelPlan(urlPlan === "gratis" ? 1:2);
        }
        
        if(urlTienda){
            const nombreTienda = urlTienda.replaceAll("%20","")
            setPageDataOne({
                ...pageDataOne,
                ['nombreTienda']: nombreTienda,
                ['urlTienda']: nombreTienda
            })
        }

    },[]);

    
    return(

    <>
    <Head>
        <meta name="title" content="Trafy Shop: Crea tu tienda online en 1 minuto"/>
        <meta name="keywords" content="trafy, shop, emprendedor, peru, negocios, tiendas, registro"/>
        <meta content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no" name="viewport"/>
        <meta property="og:url" content="https://trafy.store/registro"/>
        <meta property="og:title" content="Trafy Shop: Crea tu tienda online en 1 minuto"/>
        <meta name="description" content="Crea gratis tu tienda online con Trafy Shop. Pruebalo hoy y accede a nuestras 4 herramientas para administrar tu emprendimiento."/>
        <meta property="og:description" content="Crea gratis tu tienda online con Trafy Shop. Pruebalo hoy y accede a nuestras 4 herramientas para administrar tu emprendimiento."/>
        <title>Trafy Shop - Crea tu tienda online - ¡En 1 minuto!</title>
        <link rel="canonical" href="https://trafy.store/registro"/>
    </Head>
    
    <Toaster/>
    <Layout title="REGISTRA TU TIENDA" footer={false}>
    
    <div className="Form">
    <div className="Form_wrap">

    { page === 1 && <OnboardingOne setData={setPageDataOne} setPage={setPage} data={pageDataOne} /> }
    { page === 2 && <OnboardingTwo setData={setPageDataTwo} setPage={setPage} data={pageDataTwo} /> }
    { page === 3 && <LoadingPage pageDataOne={pageDataOne} pageDataTwo={pageDataTwo} nivelPlan={nivelPlan} setPage={setPage} /> }

    </div>
    </div>
    
    </Layout>
    
    <style jsx global>{`

    body{background: #f2f6f9;}
    .Form{padding: 40px 0;}
    .Form_wrap{width: 96%;margin: auto;}

    @media only screen and (max-width: 768px){
        .Form{padding: 25px 0;}
        .Form_wrap{width: 100%;}
    }
    
    `}</style>

    </>

    )
}