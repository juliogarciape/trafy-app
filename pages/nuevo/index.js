import Layout from "@layouts/panel/index";
import Loading from "@components/loading";
import Message from "@components/message";
import toast from 'react-hot-toast';
import card from "@styles/components/Card.module.css";
import styles from "@styles/components/Form.module.css";
import Link from "next/link";
import {getLimits, saveProduct as saveProductService} from "@services/index";
import {uploadProductFirebase} from "@utils/index";
import {
    VALIDATE_SESSION_URL,
    CONNECTION_ERROR
} from "@consts/index";
import {useState,useEffect} from "react";



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
        var {status,nivelPlan} = data;
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

    const planLimit = nivelPlan === 1 ? 25 : 125;
    
    return {
        props: {
            token,
            nivelPlan,
            planLimit,
        },
    }
}



export default function Nuevo({token,nivelPlan,planLimit}){

    const [nombreProducto, setnombreProducto] = useState('');
    const [precioBase,setprecioBase] = useState(0);
    const [stockDisponible, setstockDisponible] = useState(0);
    const [infoProducto, setinfoProducto] = useState('');
    const [categoriaProducto, setcategoriaProducto] = useState('');
    const [infoExtra, setinfoExtra] = useState('');
    const [imageOne, setImageOne] = useState(null);
    const [imageTwo, setImageTwo] = useState(null);

    /* ========== Settings ========== */

    const [currentCount, setCurrentCount] = useState(0);
    const [urlTienda, setUrlTienda] = useState(null);
    const [updateCounter, setUpdateCounter] = useState(false);
    const [loading, setLoading] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [showCongratuMsg, setShowCongratuMsg] = useState(false);

    
    useEffect(() => {
        let unmounted = false;

        getLimits(token)
        .then(({status,count,urlTienda}) => {
            if(!unmounted){
            if(status){
                setLoading(false);
                setCurrentCount(count);
                setUrlTienda(urlTienda);
                if(count === 1){
                    setShowCongratuMsg(true);
                    window.scrollTo(0,0);
                }
            }else toast.error(CONNECTION_ERROR)
            }
        })
        .catch((err) => {
            if(!unmounted) toast.error(CONNECTION_ERROR);
        });

        return () => { unmounted = true };
    }, [updateCounter]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        setBtnDisabled(true);
        const toastNewProduct = toast.loading("Cargando...");

        if(nivelPlan === 1 && currentCount >= planLimit || nivelPlan === 2 && currentCount >= planLimit){
            toast.error("Mejora tu plan para seguir",{
                id: toastNewProduct,
            });
            setBtnDisabled(false);
            return;
        }

        if(!imageOne && !imageTwo){
            toast.error("Agrega una imagen",{
                id: toastNewProduct,
            });
            setBtnDisabled(false);
            return;
        }

        /* =========== Configuracion Firebase =========== */

        const imageFiles = [];
        const fileNames = [];
        
        if (imageOne) imageFiles.push(imageOne);
        if (imageTwo) imageFiles.push(imageTwo);

        for (let index = 0; index < imageFiles.length; index++) {
            try{

            const {url} = await uploadProductFirebase(imageFiles[index],index+1,urlTienda);
            fileNames.push(url);
            
            }catch(err){
                toast.error("Error de imagen, Inténta otra vez",{
                    id: toastNewProduct,
                });
                setBtnDisabled(false);
                return;
            }
        }

        /**=================================== */
    
        const data = {
            nombreProducto,
            precioBase,
            stockDisponible,
            infoProducto,
            categoriaProducto,
            urlImagen: fileNames,
            infoExtra: infoExtra || null,
            currentCount
        }

        saveProductService(token,data)
        .then(({message,status}) => {
            if(status){

                setUpdateCounter(!updateCounter);
                toast.success(message,{
                    id: toastNewProduct,
                });

                document.getElementById("formAdd").reset();
    
                /*Limpiamos los estados por el momento*/
                
                setnombreProducto('');
                setprecioBase(0);
                setstockDisponible(0);
                setinfoProducto('');
                setcategoriaProducto('');
                setinfoExtra('');
                setImageOne(null);
                setImageTwo(null);
                setBtnDisabled(false);
            }else{
                toast.error(message,{
                    id: toastNewProduct,
                });
                setBtnDisabled(false);
            }
        })
        .catch((err) => {
            toast.error(CONNECTION_ERROR,{
                id: toastNewProduct,
            });
            setBtnDisabled(false);
        });
    }


    const handleFile = (e) => {
        if(e.target.files[0]){
            if(e.target.files[0].size > 5000000){
                toast.error("Tamaño máximo: 5MB");
                return false;
            }

            if(e.target.name === "imageOne"){
                setImageOne(e.target.files[0]);
            }else if(e.target.name === "imageTwo"){
                setImageTwo(e.target.files[0]);
            }
        }else{
            if(e.target.name === "imageOne"){
                setImageOne(null);
            }else if(e.target.name === "imageTwo"){
                setImageTwo(null);
            }
        }
    }

    const closeCongratu = () => setShowCongratuMsg(false);

    return(
    
    <>
    <Layout>
    <Message content={`Aquí agrega los productos que vas a vender, el límite máximo es de ${planLimit} productos`}/>

    <div className={card.Main}>

    {
        showCongratuMsg &&
        <div className={`${card.Main_card} ${card.Main_card__white}`}>
            <div className={card.Main_head}>
                <img draggable={false} loading="lazy" src="/icons/check.png" alt="Check"/>
                <span>¡FELICIDADES! POR TU PRIMER PRODUCTO</span>
            </div>
            <div className={card.Main_buttons}>
                <Link href="/inicio">
                    <a className={card.Button__black}>Ver productos</a>
                </Link>
                <button className={card.Button__grey} onClick={closeCongratu}>Agregar más</button>
            </div>
        </div>
    }

    { loading && <Loading top="40"/> }

    { urlTienda &&

    <form id="formAdd" method="POST" className={styles.FormAdd} onSubmit={handleSubmit}>
        <input spellCheck={false} className={styles.FormAdd_nombre} type="text" placeholder="Nombre del producto" maxLength="50" autoComplete="off" required={true} onChange={(e)=>setnombreProducto(e.target.value)} />
        <input spellCheck={false} className={styles.FormAdd_precio} onChange={(e)=>setprecioBase(e.target.value)} type="number" placeholder="Precio S/" autoComplete="off" step="0.01" min="0.50" max="1500.00" required={true}/>
        <input spellCheck={false} className={styles.FormAdd_stock} onChange={(e)=>setstockDisponible(e.target.value)} type="number" placeholder="Stock disponible" autoComplete="off" min="0" max="5000" step="1" required={true}/>
        <input spellCheck={false} className={styles.FormAdd_descripcion} onChange={(e)=>setinfoProducto(e.target.value)} type="text" placeholder="Descripción del producto" maxLength="500" autoComplete="off" required={true}/>
        <input spellCheck={false} className={styles.FormAdd_categoria} onChange={(e)=>setcategoriaProducto(e.target.value.toUpperCase())} type="text" placeholder="Categoría" maxLength="30" name="categoriaProducto" autoComplete="off" required={true}/>
        <input spellCheck={false} className={styles.FormAdd_extra} onChange={(e)=>setinfoExtra(e.target.value)} type="text" placeholder="Descuentos o Promociones (opcional)" autoComplete="off" maxLength="200" required={false}/>
        <div className="FileForm">
            <input name="imageOne" className="FileForm_file" type="file" accept="image/*" onChange={handleFile} required={true} size="1"/>
            { (imageOne || imageTwo) && <input className="FileForm_file2" type="file" accept="image/*" onChange={handleFile} name="imageTwo" required={false} size="1"/> }
        </div>
        <div className={styles.FormAdd_btn}>
            <input disabled={btnDisabled} type="submit" value="PUBLICAR PRODUCTO"/>
        </div>
    </form>

    }

    </div>
    </Layout>

    <style jsx>{`

    .FileForm{
        display: grid;
        grid-area: files;
        height: 100px;
        grid-template-columns: 100px 100px;
        gap: 25px;
        margin: 10px 0;
    }

    .FileForm_file, .FileForm_file2{
        position: relative;
        margin: 0;
    }

    .FileForm_file::after{
        content: '${imageOne ? "✓": "+"}';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 100%;
        background: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5em;
        color: rgb(167, 164, 164);
    }

    .FileForm_file2::after{
        content: '${imageTwo ? "✓": "+"}';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 100%;
        background: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5em;
        color: rgb(167, 164, 164);
    }

    @media only screen and (max-width: 768px){

        .FileForm{
            justify-content: center;
            margin: 10px 0;
        }

        .FileForm_file::after,.FileForm_file2::after{
            font-size: 2.5rem;
        }
    }

    `}

    </style>
    </>
    
    )
}
