import {useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import {
    VALIDATE_SESSION_URL,
    CONNECTION_ERROR,
    FIREBASE_URL
} from "@consts/index";
import {getProducts, deleteProduct as deleteProductService} from "@services/index";
import ModalWrapper from "@components/modal";
import {FirstGoal} from "@components/goals";
import Link from "next/link";
import Layout from "@layouts/panel/index";
import Message from "@components/message";
import Loading from "@components/loading";
import card from "@styles/components/Card.module.css";
import styles from "@styles/pages/Home.module.css";


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



const Modal = ({estadoModal,cambiarEstadoModal,idProducto,urlTienda,token,changeProducts,products}) => {

    const deleteP = async() => {
        const toastProductDelete = toast.loading("Cargando...");

        deleteProductService(idProducto,token)
        .then(({status,message}) => {
            if(status){
                const newList = products.filter((index) => index.id_producto != idProducto);
                changeProducts(newList);
                cambiarEstadoModal(false);
                toast.success(message,{
                    id: toastProductDelete,
                });
            }else{
                cambiarEstadoModal(false);
                toast.error(message,{
                    id: toastProductDelete,
                });
            }
        })
        .catch((err) => {
            cambiarEstadoModal(false);
            toast.error(CONNECTION_ERROR,{
                id: toastProductDelete,
            })
        })
    }

    return(
    
    <ModalWrapper>
        <div className="Modal_head">
            <button onClick={()=>cambiarEstadoModal(false)}>CERRAR</button>
        </div>
        <div className="Modal_body">
            <Link href={`/editar/${idProducto}`}><a>Editar</a></Link>
            <a target="_blank" href={`https://${urlTienda}.trafy.shop/p/${idProducto}`}>Visitar</a>
            <span onClick={deleteP}>Eliminar</span>
        </div>
    </ModalWrapper>

    )
}

export default function Inicio({token}){

    const [products,setProducts] = useState(null);

    /* ======================================= */

    const [loading, setLoading] = useState(true);
    const [showStartMsg, setShowStartMsg] = useState(false);
    const [modal, setModal] = useState(false);
    const [idProducto, setIdProducto] = useState(0);
    const [urlTienda, setUrlTienda] = useState('');


    useEffect(() => {
        let unmounted = false;

        if(!localStorage.getItem('msg-trafy-welcome')){
            setShowStartMsg(true);
        }

        getProducts(token)
        .then((res) => {
            if(!unmounted){
                setLoading(false);
                setProducts(res);
            }
        })
        .catch((err) => {
            if(!unmounted) toast.error(CONNECTION_ERROR);
        })

        return () => { unmounted = true };
    }, []);


    const buttonAction = (idProducto, urlTienda) => {
        setIdProducto(idProducto);
        setUrlTienda(urlTienda);
        setModal(true);
    }

    const closeWelcome = () => {
        localStorage.setItem("msg-trafy-welcome",true);
        setShowStartMsg(false);
    }


    return(
    
    <Layout>
    <Message content="Administra los productos de tu tienda online desde aquí, te deseamos exitos"/>

    <div className={card.Main}>

    { modal && <Modal urlTienda={urlTienda} idProducto={idProducto} estadoModal={modal} cambiarEstadoModal={setModal} products={products} changeProducts={setProducts} token={token} /> }

    { showStartMsg &&
    
    <div className={`${card.Main_card} ${card.Main_card__black}`}>
        <div className={card.Main_head}>
            <img src="/icons/go-home.svg" draggable={false} loading="lazy" alt="Icono de casa"/>
            <span>ANTES DE VENDER</span>
        </div>
        <div className={`${card.Main_body} ${card.Main_body__home}`}>
            <p>Prepara tu tienda y selecciona los siguientes puntos clave</p>
            <div>
                <Link href="/nuevo">
                <a>
                    <span>Publica tu primer producto</span>
                    <img draggable={false} loading="lazy" height="18" src="/icons/link.png" alt=">"/>
                </a>
                </Link>
                <Link href="/personalizar">
                <a>
                    <span>Personaliza los colores de tu tienda</span>
                    <img draggable={false} loading="lazy" height="18" src="/icons/link.png" alt=">"/>
                </a>
                </Link>
                <Link href="/configuracion">
                <a>
                    <span>Comparte el link con clientes</span>
                    <img draggable={false} loading="lazy" height="18" src="/icons/link.png" alt=">"/>
                </a>
                </Link>
            </div>
        </div>
        <div className={card.Main_buttons}>
            <button className={card.Button__outline} onClick={closeWelcome}>Ocultar mensaje</button>
        </div>
    </div>

    }

    { loading && <Loading top="40"/> }

    { products && !products.length && <FirstGoal/> }

    { products && products.length >= 1 && 
    
    <div className={styles.Gallery}>

    { products.map((index)=>(
    
    <div className={styles.Gallery_card} key={index.id_producto}>
        <div className={styles.Gallery_image}>
            <img decoding="async" draggable={false} width="270" height="270" src={FIREBASE_URL+index.url_imagen[0]} loading="lazy" alt={`Imagen de ${index.nombre_producto}`}/>
        </div>
        <div className={styles.Gallery_main}>
            <div className={styles.Gallery_text}>
                <span>S/{index.precio_base}</span>
                <h3>{index.nombre_producto}</h3>
            </div>
            <img width="25" loading="lazy" src="/icons/dots.png" className={styles.Gallery_dots} onClick={()=>buttonAction(index.id_producto,index.url_tienda)}/>
        </div>
    </div>
    
    ))}

    </div>

    }

    </div>
    </Layout>

    )
}