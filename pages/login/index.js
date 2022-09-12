import Head from "next/head";
import Cookies from "js-cookie";
import styles from "@styles/pages/Login.module.css";
import Layout from "@layouts/main/index";
import {CONNECTION_ERROR,VALIDATE_SESSION_URL} from "@consts/index";
import {getUserSession} from "@services/index";
import toast, {Toaster} from 'react-hot-toast';
import {useState} from "react";


export async function getServerSideProps({req}){
    const token = req.cookies.TokenShop;
    if(token !== undefined){
    try{
        const res = await fetch(VALIDATE_SESSION_URL+token);
        const data = await res.json();
        var {status} = data;
    }catch(err){
        return {
            redirect: {
                destination: '/mantenimiento',
                permanent: false,
            },
        }
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
            "greeting": "Hi Guy !!",
        },
    }
}


export default function Login(){

    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setBtnDisabled(true);
        const toastLogin = toast.loading("Cargando...");

        let filterPhone = phone.replace("+51","");
        filterPhone = phone.replace(/^51/,"");

        const data = {
            phone: filterPhone,
            password
        };

        getUserSession(data)
        .then(({message,status,token}) => {
            if(status){

                Cookies.set('TokenShop', token, { expires: 7 })
                toast.success(message,{
                    id: toastLogin,
                });
                window.location = "/inicio";

            }else{
                toast.error(message,{
                    id: toastLogin,
                });
                setBtnDisabled(false);
            }
        })
        .catch((err) => {
            toast.error(CONNECTION_ERROR,{
                id: toastLogin,
            });
            setBtnDisabled(false);
        });
    }
    
    return(

    <>
    <Head>
        <meta name="title" content="Trafy Shop: Iniciar Sesión"/>
        <meta name="keywords" content="trafy, shop, emprendedor, peru, negocios, tiendas, login"/>
        <meta content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no" name="viewport"/>
        <meta property="og:url" content="https://trafy.store/login"/>
        <meta property="og:title" content="Trafy Shop: Iniciar Sesión"/>
        <meta name="description" content="Ingresa y gestiona desde el panel de control, tu tienda, productos y finanzas. Tranquilo(a): Protegemos tu privacidad como si fuera nuestra &#128521;"/>
        <meta property="og:description" content="Ingresa y gestiona desde el panel de control, tu tienda, productos y finanzas. Tranquilo(a): Protegemos tu privacidad como si fuera nuestra &#128521;"/>
        <title>Trafy Shop - Iniciar Sesión</title>
        <link rel="canonical" href="https://trafy.store/login"/>
    </Head>

    <Toaster/>
    <Layout title="INICIAR SESIÓN" footer={false}>
    <div className={styles.LayoutLogin}>
        <div className={styles.LayoutLogin_center}>
            <img className={styles.LayoutLogin_avatar} width="150" loading="lazy" draggable={false} src="/icons/avatars/spacecraft-2.png" alt="Icono de nave espacial"/>
        <form onSubmit={handleSubmit} method="POST">
            <input name="numeroTelefono" min="9999999" max="99999999999999999999" className="inputNumber" onChange={(e)=>setPhone(e.target.value)} type="number" placeholder="Número de teléfono" required={true} autoComplete="off"/>
            <input autoComplete="current-password" id="current-password" maxLength="100" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Contraseña" required={true}/>   
            <input disabled={btnDisabled} type="submit" value="Iniciar Sesión"/>
        </form>
        <h3>¿Nuevo(a) en Trafy Shop? <a href="/registro">Registrate Gratis</a></h3>
        </div>
    </div>
    
    </Layout>
    </>

    )
}
