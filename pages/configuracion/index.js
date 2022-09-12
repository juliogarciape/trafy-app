import Layout from "@layouts/panel/index";
import card from "@styles/components/Card.module.css";
import styles from "@styles/pages/Tienda.module.css";
import Message from "@components/message";
import Loading from "@components/loading";
import {useEffect, useState} from "react";
import {getMyData,updateUrl,updateMyData} from "@services/index";
import {VALIDATE_SESSION_URL,CONNECTION_ERROR} from "@consts/index";
import {filterSubdomainName} from "@utils/index";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import Link from "next/link";




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
        var {status} = data;
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
        },
    }
}




export default function Tienda({token}){

    const [storeData, setStoreData] = useState(null);
    const [newData, setNewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadButton, setLoadButton] = useState(false);
    const [subdomain, setSubdomain] = useState(false);
    const [subdomainName, setSubdomainName] = useState("");
    const [pageRefresher, setPageRefresher] = useState(false);

    useEffect(() => {
        let unmounted = false;

        getMyData(token)
        .then((res) => {
            if(!unmounted){
                
                setLoading(false);
                setStoreData(res);

                //! Crear una ruta de api que solo llame al subdominio

                setNewData({
                    nombreTienda: res.nombre_tienda,
                    infoTienda: res.info_tienda,
                    whatsappPrincipal: res.whatsapp_principal,
                    categoriaTienda: res.categoria_tienda,
                    infoPagos: res.info_pagos,
                    direccionPrincipal: res.ubicacion_principal.direccion,
                    infoReclamos: res.info_reclamos,
                    infoEntrega: res.info_entrega,
                    nombreFundador: res.nombre_fundador
                });
            }
        })
        .catch((err) => {
            if(!unmounted){
                toast.error(CONNECTION_ERROR);
            }
        });

        return () => { unmounted = true };
    }, [pageRefresher]);


    const copyText = (e) => {
        e.preventDefault();
        toast.success("Copiado en el portapapeles");
    }

    const updateSubdomain = async(e) => {
        e.preventDefault();

        if(subdomain){
            
            const filterUrl = filterSubdomainName(subdomainName);

            if(storeData.url_tienda === filterUrl){
                toast.success("Subdominio actualizado");
                setSubdomain(false);
                return;
            }
            
            const data = {urlTienda: filterUrl};
            
            updateUrl(token,data)
            .then(({status,message}) => {
                if(status){
                    setPageRefresher(!pageRefresher);
                    toast.success(message);
                    setSubdomain(false);
                }else{
                    toast.error(message);
                    setSubdomain(false);
                }
            })
            .catch((err) => {
                toast.error(CONNECTION_ERROR);
                setSubdomain(false);
            })

        }else{
            setSubdomain(true);
            setSubdomainName(storeData.url_tienda);
        }
    }

    const handleSubdomain = (e) => {
        setSubdomainName(e.target.value);
    }

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        });
    }

    const updateStore = async(e) => {
        e.preventDefault();
        setLoadButton(true);

        updateMyData(token,newData)
        .then(({status,message}) => {
            if(status){
                //! duda refrescar: setPageRefresher(!pageRefresher);
                toast.success(message);
                setLoadButton(false);
            }else{
                toast.error(message);
                setLoadButton(false);
            }
        })
        .catch((err) => {
            toast.error(CONNECTION_ERROR);
            setLoadButton(false);
        });
    }

    return(
    
    <Layout>
    <Message content="Mantén tu tienda siempre actualizada y lista para compartirla con todos tus clientes"/>

    <div className={card.Main}>

    { loading && <Loading top="40"/> }

    { storeData &&

    <>
    
    <div className="InternalLink">
        <Link href="/personalizar">
            <a>
            PERSONALIZAR TIENDA
            <img width="30" draggable={false} loading="lazy" src="/icons/arrow-black.png" alt="->"/>
            </a>
        </Link>
    </div>

    <div className={styles.Setup}>
        <div className="Section_head">
            <span>COMPARTIR TIENDA</span>
            <img draggable={false} loading="lazy" width="20" src="/icons/arrow-down-white.png" alt=">"/>
        </div>
        <div className={styles.Setup_body}>
            <div className={styles.Setup_url}>
                <div>
                
                { subdomain ?
                
                <input spellCheck={false} autoFocus={true} defaultValue={storeData.url_tienda} autoComplete="off" maxLength="20" onChange={handleSubdomain} type="text"/>
                : <span>{`${storeData.url_tienda}.trafy.shop`}</span>
                }

                <button onClick={updateSubdomain}>{subdomain ? "Guardar Cambios": "Cambiar Subdominio"}</button>

                </div>
                
                <p>Para conseguir ventas exitosas. ¡Comparte tu tienda online en Facebook, Instagram, TikTok o WhatsApp!</p>
            </div>
            <div className={styles.Setup_links}>
                <CopyToClipboard text={`https://${storeData.url_tienda}.trafy.shop/`}>
                    <a onClick={copyText} href="/copy">Copiar link de mi tienda</a>
                </CopyToClipboard>
                <a href={`https://${storeData.url_tienda}.trafy.shop/`} target="_blank">Visitar mi tienda online</a>
                <a href={`https://api.whatsapp.com/send?text=*¡Hola!* échale un vistazo a mi tienda online:%0Ahttps://${storeData.url_tienda}.trafy.shop/%0A%0AIngresa ahora y descubre las últimas novedades que tengo para ti`}>Compartir por WhatsApp</a>
            </div>
        </div>
    </div>

    <div className={styles.Setup}>
        <div className="Section_head">
            <span>DATOS DE MI NEGOCIO</span>
            <img draggable={false} loading="lazy" width="20" src="/icons/arrow-down-white.png" alt=">"/>
        </div>
        <div className={styles.Setup_body}>
            <form onSubmit={updateStore} method="POST">
            <div>
                <input spellCheck={false} maxLength="40" type="text" placeholder="Nombre del negocio" onChange={handleChange} defaultValue={storeData.nombre_tienda} autoComplete="off" name="nombreTienda" required={true}/>
            </div>
            <div>
                <input spellCheck={false} minLength="100" maxLength="500" type="text" defaultValue={storeData.info_tienda} onChange={handleChange} placeholder="Descripción de la tienda o su historia" autoComplete="off" name="infoTienda" required={true}/>
            </div>
            <div>
                <input spellCheck={false} maxLength="20" type="text" placeholder="Número de teléfono principal" onChange={handleChange} defaultValue={storeData.whatsapp_principal} autoComplete="off" name="whatsappPrincipal" required={true}/>
            </div>
            <div>
                <select defaultValue={storeData.categoria_tienda} onChange={handleChange} name="categoriaTienda" required={true}>
                    <option value="" disabled>Rubro</option>
                    <option value="1">Productos Físicos</option>
                    <option value="2">Comidas y Bebidas</option>
                    <option value="3">Productos Digitales</option>
                    <option value="4">Todo lo anterior</option>
                </select>
            </div>
            <div>
                <input spellCheck={false} maxLength="250" type="text" placeholder="Métodos de pago aceptados" onChange={handleChange} defaultValue={storeData.info_pagos} name="infoPagos" autoComplete="off" required={true}/>
            </div>
            <div>
                <input spellCheck={false} maxLength="100" type="text" placeholder="Ubicación (Ciudad o Dirección física)" onChange={handleChange} name="direccionPrincipal" defaultValue={storeData.ubicacion_principal.direccion} autoComplete="off" required={true}/>
            </div>
            <div>
                <input spellCheck={false} maxLength="500" type="text" placeholder="Zonas de reparto o Delívery" onChange={handleChange} defaultValue={storeData.info_entrega} autoComplete="off" name="infoEntrega" required={true}/>
            </div>
            <div>
                <input spellCheck={false} maxLength="250" type="text" placeholder="Aviso sobre cambios y devoluciones" onChange={handleChange} defaultValue={storeData.info_reclamos} name="infoReclamos" autoComplete="off" required={true}/>
            </div>
            <div>
                <input spellCheck={false} maxLength="40" type="text" name="nombreFundador" placeholder="Nombre completo del fundador(a)" onChange={handleChange} defaultValue={storeData.nombre_fundador} autoComplete="off" required={true}/>
            </div>
            <div>
            {
                loadButton ? <Loading/> : <input className={styles.Setup_btn} type="submit" value="ACTUALIZAR DATOS"/>
            }
            </div>
            </form>
        </div>
    </div>
    </>

    }
    
    </div>
    </Layout>

    )
}
