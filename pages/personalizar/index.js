import Layout from "@layouts/panel/index";
import Message from "@components/message";
import Loading from "@components/loading";
import {useEffect, useState} from "react";
import {getPreferences,updatePreferences} from "@services/index";
import {VALIDATE_SESSION_URL,CONNECTION_ERROR} from "@consts/index";
import Link from "next/link";
import toast from 'react-hot-toast';
import styles from "@styles/pages/Tienda.module.css";


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


export default function Personalizar({token}){

    const [loading, setLoading] = useState(true);
    const [themes, setThemes] = useState([
        {
            id: 1,
            name: "MARLEN"
        },{
            id: 2,
            name: "GERALD"
        },{
            id: 3,
            name: "LESLY"
        }
    ])
    const [colors, setColors] = useState([
        {
            id: 1,
            color: "000",
        },{
            id: 2,
            color: "067aeb"
        },{
            id: 3,
            color: "ffc300"
        },{
            id: 4,
            color: "ff5a60"
        },{
            id: 5,
            color: "00b382"
        },{
            id: 6,
            color: "9147ff"
        },{
            id: 7,
            color: "ff9900"
        },{
            id: 8,
            color: "e50914"
        }
    ])
    const [preferences, setPreferences] = useState(null);

    useEffect(() => {
        let unmounted = false;
    
        getPreferences(token)
        .then((res) => {
            if(!unmounted){
                setLoading(false);
                setPreferences(res[0]);
            }
        })
        .catch((err) => {
            if(!unmounted){
                toast.error(CONNECTION_ERROR);
            }
        })

        return () => { unmounted = true };
    }, []);

    
    const submitPreferences = async() => {
        const toastUpdate = toast.loading('Cargando...');
        const data = {colorPlantilla: preferences.color_plantilla};
        
        updatePreferences(token,data)
        .then(({status,message}) => {
            if(status){
                toast.success(message,{
                    id: toastUpdate,
                })
            }else{
                toast.error(message,{
                    id: toastUpdate,
                })
            }
        })
        .catch((err) => {
            toast.error(CONNECTION_ERROR,{
                id: toastUpdate,
            });
        })
    }


    const handlePreferences = (valColor) => {
        setPreferences({
            ...preferences,
            ['color_plantilla']: valColor
        })
    }


    return(
    
    <Layout>
    <Message content="Personaliza el diseño de tu tienda online y destácate del resto"/>

    <div className="CardMain">

    { loading && <Loading top="40"/> }

    { preferences &&

    <>
    <div className="GoBack">
        <Link href="/configuracion">
        <a>
            <img width="30" draggable={false} loading="lazy" src="/icons/arrow-white.png" alt="<-"/>
            <span>REGRESAR</span>
        </a>
        </Link>
    </div>

    <div className={styles.Setup}>
        <div className="Section_head">
            <span>DIVERSOS COLORES</span>
            <img draggable={false} loading="lazy" width="20" src="/icons/arrow-down-white.png" alt=">"/>
        </div>
        <div className={styles.Setup_preferencias}>
            <p>Selecciona el color preferido para utilizarlo por defecto en tu tienda</p>
            <div className={styles.Setup_colors}>

            {
                colors.map((index)=> (
                    <span onClick={()=>handlePreferences(index.color)} key={index.id}>
                        {preferences.color_plantilla === index.color && "X"}
                    </span>
                ))
            }

            </div>
            <div>
                <button onClick={submitPreferences}>UTILIZAR COLOR</button>
            </div>
        </div>
    </div>


    <div className={styles.Setup}>
        <div className="Section_head">
            <span>OTRAS PLANTILLAS</span>
            <img draggable={false} loading="lazy" width="20" src="/icons/arrow-down-white.png" alt=">"/>
        </div>
        <div className={styles.Setup_preferencias}>
            <p>¿Deseas otro estilo para tu tienda? Cambia de plantilla y elige el que más te guste</p>
            <div className={styles.Setup_themes}>
            
            {
                themes.map((index) => (
                <span key={index.id}>
                    <img loading="lazy" draggable={false} width="70" height="70" src="/sliders/adventure.jpg" alt={index.name}/>
                    {index.name}
                </span>
                ))
            }
            
            </div>
            <div>
                <button disabled={true}>PRONTO DISPONIBLE</button>
            </div>
        </div>
    </div>

    </>

    }

    </div>
    </Layout>

    )
}