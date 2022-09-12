import {
    VALIDATE_SESSION_URL,
    FIREBASE_URL,
    CONNECTION_ERROR
} from "@consts/index";
import {getProduct,updateProduct} from "@services/index";
import {useState,useEffect} from "react";
import Layout from "@layouts/panel";
import Message from "@components/message";
import toast from 'react-hot-toast';
import Loading from "@components/loading";
import Link from "next/link";
import card from "@styles/components/Card.module.css";
import styles from "@styles/components/Form.module.css";


export async function getServerSideProps({req,params}){
    const token = req.cookies.TokenShop;
    const {id} = params;
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
            id,
        },
    }
}


export default function Editar({token,id}){

    const [nombreProducto, setnombreProducto] = useState('');
    const [precioBase,setprecioBase] = useState(0);
    const [stockDisponible, setstockDisponible] = useState(0);
    const [infoProducto, setinfoProducto] = useState('');
    const [categoriaProducto, setcategoriaProducto] = useState('');
    const [infoExtra, setinfoExtra] = useState('');
    const [imageOne, setImageOne] = useState(null);
    const [imageTwo, setImageTwo] = useState(null);

    /* ================= SETTINGS ============== */

    const [loading, setLoading] = useState(true);
    const [screen, setScreen] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);

    
    useEffect(() => {
        let unmounted = false;

        getProduct(token,id)
        .then((res) => {
            if(!unmounted){
            if(res.length){

            const {nombre_producto,precio_base,stock_disponible,info_producto,categoria_producto,url_imagen,info_extra} = res[0];

            setnombreProducto(nombre_producto);
            setprecioBase(precio_base);
            setstockDisponible(stock_disponible);
            setinfoProducto(info_producto);
            setcategoriaProducto(categoria_producto);
            setinfoExtra(info_extra);
            setImageOne(url_imagen[0] || null);
            setImageTwo(url_imagen[1] || null);
            setLoading(false);
            setScreen(true);
            
            }else window.location = "/inicio"
            }
        })
        .catch((err) => {
            if(!unmounted) toast.error(CONNECTION_ERROR);
        })

        return () => { unmounted = true };
    }, []);


    const handleSubmit = async(e) => {
        e.preventDefault();
        setBtnDisabled(true);
        const toastEditProduct = toast.loading("Cargando...");

        const data = {
            nombreProducto,
            precioBase,
            stockDisponible,
            infoProducto,
            categoriaProducto,
            infoExtra: infoExtra || null
        }

        updateProduct(token,id,data)
        .then(({message,status}) => {
            if(status){
                toast.success(message,{
                    id: toastEditProduct,
                });
                window.scrollTo(0,0);
                setBtnDisabled(false);
            }else{
                toast.error(message,{
                    id: toastEditProduct,
                });
                setBtnDisabled(false);
            }
        })
        .catch((err) => {
            toast.error(CONNECTION_ERROR,{
                id: toastEditProduct,
            });
            setBtnDisabled(false);
        })
    }

    return(

    <>
    <Layout>
    <Message content={`Editando ${nombreProducto ? nombreProducto : "producto"}...`}/>
    
    <div className={card.Main}>
    <div className={styles.GoBack}>
        <Link href="/inicio">
        <a>
            <img width="30" draggable={false} loading="lazy" src="/icons/arrow-white.png" alt="<-"/>
            <span>REGRESAR</span>
        </a>
        </Link>
    </div>
    
    { loading && <Loading top="40"/> }

    { screen &&

    <form onSubmit={handleSubmit} method="POST" className={styles.FormAdd}>
        <input defaultValue={nombreProducto} spellCheck={false} className={styles.FormAdd_nombre} type="text" placeholder="Nombre del producto" maxLength="50" autoComplete="off" required={true} onChange={(e)=>setnombreProducto(e.target.value)} />
        <input defaultValue={precioBase} spellCheck={false} className={styles.FormAdd_precio} onChange={(e)=>setprecioBase(e.target.value)} type="number" placeholder="Precio S/" autoComplete="off" step="0.01" min="0.50" max="1500.00" required={true}/>
        <input defaultValue={stockDisponible} spellCheck={false} className={styles.FormAdd_stock} onChange={(e)=>setstockDisponible(e.target.value)} type="number" placeholder="Stock disponible" autoComplete="off" min="0" max="5000" step="1" required={true}/>
        <input defaultValue={infoProducto} spellCheck={false} className={styles.FormAdd_descripcion} onChange={(e)=>setinfoProducto(e.target.value)} type="text" placeholder="Descripción del producto" maxLength="500" autoComplete="off" required={true}/>
        <input defaultValue={categoriaProducto} spellCheck={false} className={styles.FormAdd_categoria} onChange={(e)=>setcategoriaProducto(e.target.value.toUpperCase())} type="text" placeholder="Categoría" maxLength="30" name="categoriaProducto" autoComplete="off" required={true}/>
        <input defaultValue={infoExtra} spellCheck={false} className={styles.FormAdd_extra} onChange={(e)=>setinfoExtra(e.target.value)} type="text" placeholder="Descuentos o Promociones (opcional)" autoComplete="off" maxLength="200" required={false}/>
        <div className="FileForm">

        {
            imageOne &&
            <img width="108" height="108" draggable={false} loading="lazy" src={FIREBASE_URL+imageOne} alt="Cargando..."/>
        }

        {
            imageTwo &&
            <img width="108" height="108" draggable={false} loading="lazy" src={FIREBASE_URL+imageTwo} alt="Cargando..."/>
        }
        
        </div>
        <div className={styles.FormAdd_btn}>
            <input disabled={btnDisabled} type="submit" value="ACTUALIZAR PRODUCTO"/>
        </div>
    </form>

    }

    </div>
    </Layout>
    
    <style jsx>{`

    .FileForm{
        display: grid;
        grid-area: files;
        height: 108px;
        grid-template-columns: 108px 108px;
        gap: 25px;
        margin: 10px 0;
    }

    .FileForm img{
        object-fit: contain;
        object-position: center;
    }

    @media only screen and (max-width: 768px){
        .FileForm{
            justify-content: center;
            margin: 10px 0;
        }
    }

    `}

    </style>
    </>

    )
}