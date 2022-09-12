import moment from 'moment';
import 'moment/locale/es';
import Layout from "@layouts/panel/index";
import Message from "@components/message";
import {getFinanzas,deleteFinanza, postFinanza,getTotalFinanzas} from "@services/index";
import ModalWrapper from "@components/modal";
import Loading from "@components/loading";
import {useState,useEffect} from 'react';
import card from "@styles/components/Card.module.css";
import styles from "@styles/pages/Finanzas.module.css";
import {VALIDATE_SESSION_URL,CONNECTION_ERROR,LIMITE_FINANZAS} from "@consts/index";
import toast from "react-hot-toast";


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

    const limite = (nivelPlan === 1) ? "hasta 100 registros gratis":"registros ilimitados";

    return {
        props: {
            token,
            limite,
            nivelPlan,
        },
    }
}


const Modal = ({cambiarEstadoModal,tipoFinanza,token,refresh,setRefresh}) => {

    const [btnDisabled, setBtnDisabled] = useState(false);
    const [data, setData] = useState({
        asunto: "",
        fecha: moment.utc().format('YYYY-MM-DD'),
        monto: 0,
        tipoFinanza: tipoFinanza
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnDisabled(true);
        const toastNew = toast.loading("Cargando...");

        postFinanza(token,data)
        .then(({status,message}) => {
            if(status){
                cambiarEstadoModal(false);
                setRefresh(!refresh);
                toast.success(message,{
                    id: toastNew,
                });
            }else{
                cambiarEstadoModal(false);
                toast.error(message,{
                    id: toastNew,
                });
            }
        })
        .catch((err) => {
            toast.error(CONNECTION_ERROR,{
                id: toastNew,
            });
        })
    }

    return(

    <ModalWrapper>
        <div className="Modal_head">
            <button onClick={()=>cambiarEstadoModal(false)}>CERRAR</button>
        </div>
        <div className="Modal_body">
        <form onSubmit={handleSubmit} method="POST">        
            <input name="asunto" onChange={handleChange} maxLength="100" autoComplete="off" placeholder="Concepto" spellCheck={false} type="text" required={true}/>
            <input defaultValue={moment.utc().format('YYYY-MM-DD')} min="2022-01-01" max="2022-12-31" name="fecha" onChange={handleChange} type="date" required={true}/>
            <input name="monto" onChange={handleChange} placeholder="Monto S/" step="0.01" min="0.50" max="999.00" type="number" required={true}/>
            <input disabled={btnDisabled} value={`REGISTRAR ${tipoFinanza === 1 ? "INGRESO":"EGRESO"}`} type="submit"/>
        </form>
        </div>
    </ModalWrapper>
    
    )
}

export default function Finanzas({nivelPlan,limite,token}){

    const [finanzas,setFinanzas] = useState(null);
    const [totalFinanzas, setTotalFinanzas] = useState(null);
    const [tipoFinanza, setTipoFinanza] = useState(0);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        let unmounted = false;

        Promise.all([getFinanzas(token),getTotalFinanzas(token)])
        .then((res) => {
            if(!unmounted){
                setLoading(false);
                setFinanzas(res[0]);
                setTotalFinanzas(res[1]);
            }
        })
        .catch((err) => {
            if(!unmounted) toast.error(CONNECTION_ERROR);
        })

        return () => { unmounted = true };
    }, [refresh]);


    const handleModal = (e) => {
        if(LIMITE_FINANZAS === finanzas.length && nivelPlan === 1){
            toast.error("Actualiza tu plan para seguir");
            return;
        }

        e.target.name === 'ingreso' ? setTipoFinanza(1) : setTipoFinanza(2);
        setModal(true);
    }

    const deleteAccion = (id) => {
        const toastDelete = toast.loading('Cargando...');

        deleteFinanza(id,token)
        .then(({message,status}) => {
            if(status){
                setRefresh(!refresh);
                toast.success(message,{
                    id: toastDelete,
                });
            }else{
                toast.error(message,{
                    id: toastDelete
                });
            }
        })
        .catch((err) => {
            toast.error(CONNECTION_ERROR,{
                id: toastDelete,
            });
        })
    }

    return (

    <Layout>
    <Message content={`Olvídate del Excel y calcula tus finanzas desde aquí, tienes ${limite}`}/>

    <div className={card.Main}>

    { loading && <Loading top="40"/> }

    { modal && <Modal refresh={refresh} setRefresh={setRefresh} token={token} tipoFinanza={tipoFinanza} cambiarEstadoModal={setModal} /> }
    
    { finanzas && totalFinanzas &&

    <div className={styles.Dashboard}>
        <div className={styles.Dashboard_main}>
            <div className="Section_head">
                <span>SALDO ACTUAL</span>
                <img draggable={false} loading="lazy" width="20" src="/icons/arrow-down-white.png" alt=">"/>
            </div>
            <div className={styles.Dashboard_body}>
                <div className={styles.Dashboard_calc}>
                    <span>- S/{totalFinanzas.egresos}</span>
                    <div>
                        <h2>S/{totalFinanzas.utilidad}</h2>
                        <p>Utilidad Neta</p>
                    </div>
                    <span>+ S/{totalFinanzas.ingresos}</span>
                </div>
                <div className={styles.Dashboard_buttons}>
                    <button name="egreso" onClick={handleModal}>NUEVO EGRESO</button>
                    <button name="ingreso" onClick={handleModal}>NUEVO INGRESO</button>
                </div>
            </div>
        </div>

        { finanzas.length >= 1 &&

        <div className={styles.Dashboard_history}>
            <div className="Section_head">
                <span>ACTIVIDAD RECIENTE</span>
                <img draggable={false} loading="lazy" width="20" src="/icons/arrow-down-white.png" alt=">"/>
            </div>
            <div className={styles.Dashboard_body}>

            {
                finanzas.map((index) => (
                <div key={index.id_finanza} className={styles.Historial_card}>
                    <p>{index.asunto}</p>
                    <span className={`${index.tipo_finanza === 1 ?"ingreso":"egreso"}`}>S/{index.monto}</span>
                    <span>{moment.utc(index.fecha).format('LL')}</span>
                    <button onClick={()=>deleteAccion(index.id_finanza)}>Eliminar</button>
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
