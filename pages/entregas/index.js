import moment from 'moment';
import 'moment/locale/es';
import {useState,useEffect} from "react";
import toast from 'react-hot-toast';
import Layout from "@layouts/panel/index";
import Loading from "@components/loading";
import Message from "@components/message";
import card from "@styles/components/Card.module.css";
import {getEntregas,getInfoProductos,postEntrega} from "@services/index";
import {VALIDATE_SESSION_URL,CONNECTION_ERROR,LIMITE_ENTREGAS} from "@consts/index";
import styles from "@styles/pages/Entregas.module.css";
import {FirstGoal} from "@components/goals";



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

    return {
        props: {
            token,
            nivelPlan
        },
    }
}



export default function Entregas({token,nivelPlan}){

    const [infoProductos, setInfoProducts] = useState(null);
    const [entregas, setEntregas] = useState(null);

    /* ==================== States ==================== */

    const getTipoEntrega = (intEntrega) => {
        const TIPO_ENTREGA = {
            1: "Entregado por delivery",
            2: "Retirado en tienda",
            3: "Enviado por contra entrega",
            4: "Entregado en punto de encuentro"
        }
        return TIPO_ENTREGA[intEntrega] || 'Inválido';
    }

    const [loading, setLoading] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState({
        "direccion": "",
        "fecha": moment.utc().format('YYYY-MM-DD'),
        "tipo": "",
        "idProducto": "",
        "stockEntregado": 1
    });


    useEffect(() => {
        let unmounted = false;

        Promise.all([getEntregas(token),getInfoProductos(token)])
        .then((res) => {
            if(!unmounted){
                setLoading(false);
                setEntregas(res[0]);
                setInfoProducts(res[1]);
            }
        })
        .catch((err) => {
            if(!unmounted) toast.error(CONNECTION_ERROR);
        })

        return () => { unmounted = true };
    }, [refresh]);
    

    const saveEntrega = async(e) => {
        e.preventDefault();

        if(LIMITE_ENTREGAS === entregas.length && nivelPlan === 1){
            toast.error("Actualiza tu plan para seguir");
            return;
        }

        const filterP = infoProductos.find((index)=> index.id_producto.toString() === data.idProducto);

        if(data.stockEntregado > filterP.stock_disponible){
            alert(`${filterP.nombre_producto} no tiene suficiente stock para entregar`);
            return;
        }

        setBtnDisabled(true);
        const toastNewEntrega = toast.loading('Cargando...');

        postEntrega(token,data)
        .then(({status,message}) => {
            if(status){

                toast.success("Nueva entrega y stock actualizado",{
                    id: toastNewEntrega,
                })

                document.getElementById("formEntrega").reset();
                setRefresh(!refresh);
                setData({
                    "direccion": "",
                    "fecha": moment.utc().format('YYYY-MM-DD'),
                    "tipo": "",
                    "idProducto": "",
                    "stockEntregado": 1
                });
                setBtnDisabled(false);

            }else{
                toast.error(message,{
                    id: toastNewEntrega,
                })
                setBtnDisabled(false);
            }
        })
        .catch((err) => {
            toast.error(CONNECTION_ERROR,{
                id: toastNewEntrega,
            })
            setBtnDisabled(false);
        })
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    

    return(
    
    <Layout>
    <Message content="Registra las entregas de tus productos y actualiza tu stock automáticamente"/>

    <div className={card.Main}>

    { loading && <Loading top="40"/> }

    { infoProductos && !infoProductos.length && <FirstGoal content="Para gestionar tus entregas, registra al menos un producto en tu tienda" image="entregas"/> }

    { infoProductos && (infoProductos.length >= 1) &&
    
    <div className={styles.Entregas}>
        <div>
            <div className="Section_head">
                <span>NUEVA ENTREGA</span>
                <img draggable={false} loading="lazy" width="20" src="/icons/arrow-down-white.png" alt=">"/>
            </div>
            <div className={styles.Entrega_body}>
            <form id="formEntrega" onSubmit={saveEntrega} method="POST">
                
            <input onChange={handleChange} spellCheck={false} maxLength="100" name="direccion" placeholder="Dirección de entrega (opcional)" autoComplete="off" type="text" required={false}/>
            <input defaultValue={moment.utc().format('YYYY-MM-DD')} onChange={handleChange} name="fecha" min="2022-01-01" max="2022-12-31" type="date" required={true}/>
            <select defaultValue={data.tipo} onChange={handleChange} name="tipo" required={true}>
                <option value="" disabled>Tipo de entrega</option>
                <option value="1">Delivery</option>
                <option value="2">Retiro en tienda</option>
                <option value="3">Contra entrega</option>
                <option value="4">Punto de encuentro</option>
            </select>
            <div className={styles.Entrega_producto}>
            <select defaultValue={data.idProducto} onChange={handleChange} name="idProducto" required={true}>
                <option value="" disabled>Producto entregado</option>
            
                { infoProductos.map((index) => (
                    <option key={index.id_producto} value={index.id_producto}>{index.nombre_producto}</option>
                ))}
                
            </select>
            <input step="1" min="1" max="5000" onChange={handleChange} name="stockEntregado" placeholder="Stock Entregado" autoComplete="off" type="number" required={true}/>
            </div>
            <input disabled={btnDisabled} type="submit" value="REGISTRAR ENTREGA"/>
            </form>
            </div>
        </div>

        { entregas && entregas.length >= 1 &&

        <div>
            <div className="Section_head">
                <span>MIS ENTREGAS</span>
                <img draggable={false} loading="lazy" width="20" src="/icons/arrow-down-white.png" alt=">"/>
            </div>
            <div className={styles.Entrega_historial}>
            
            {
                entregas.map((index) => (
                    <div key={index.id_entrega}>
                        <span>{`- ${index.stock_entregado} de stock`}</span>
                        <span>{getTipoEntrega(index.tipo)}</span>
                        <span>{moment.utc(index.fecha).format('LL')}</span>
                    </div>
                ))
            }

            </div>
        </div>

        }

    </div>

    }
    
    </div>
    </Layout>

    )
}