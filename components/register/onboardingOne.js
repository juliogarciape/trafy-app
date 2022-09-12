import styles from "@styles/pages/Registro.module.css";
import toast from 'react-hot-toast';


export default function OnboardingOne({setData,data,setPage}){

    let {nombreTienda,infoTienda,numeroTelefono,imagenLogo,categoriaTienda} = data;

    const handleFile = (e) => {
		if(e.target.files[0]){
            if(e.target.files[0].size > 5000000){
                toast.error("Tamaño Máximo: 5MB");
                return false;
            }

            setData({
                ...data,
                [e.target.name]: e.target.files[0]
            })
		}
    }
    
    const handleChange = (e) =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const goNextPage = (e) =>{
        e.preventDefault();
        if (!imagenLogo) toast.error("Agrega el logo");
        else setPage(page => page+1);
    }

    const handleDue = (e) => {
        if(e.target.value){
            setData({
                ...data,
                ['nombreTienda']: e.target.value,
                ['urlTienda']: e.target.value
            })
        }
    }

    return(
    
    <>
    <form className={`${styles.GroupForm} ${styles.FormOne}`} onSubmit={goNextPage} method="POST" encType="multipart/form-data">
    
    <div className={styles.Form_tienda}>
        <input spellCheck={false} onChange={handleDue} maxLength="40" type="text" name="nombreTienda" defaultValue={nombreTienda} placeholder="Nombre de tu negocio" autoComplete="off" required={true}/>
	</div>
    <div className={styles.Form_descripcion}>
		<input spellCheck={false} maxLength="500" minLength="100" type="text" placeholder="Descripción de tu negocio" defaultValue={infoTienda} name="infoTienda" autoComplete="off" onChange={handleChange} required={true}/>
	</div>
    <div className={styles.Form_logo}>
        <input onChange={handleFile} type="file" className="Form_file" name="imagenLogo" required={imagenLogo ? false:true} accept="image/*"/>
    </div>
    <div className={styles.Form_categoria}>
        <select defaultValue={categoriaTienda} name="categoriaTienda" onChange={handleChange} required={true}>
            <option value="" disabled>Rubro</option>
            <option value="1">Productos Físicos</option>
            <option value="2">Alimentos y Bebidas</option>
            <option value="3">Productos Digitales</option>
            <option value="4">Todo lo anterior</option>
        </select>
    </div>
    <div className={styles.Form_telefono}>
        <span>+51</span>
        <input className="inputNumber" min="9999999" max="99999999999999999999" type="number" placeholder="Teléfono principal" name="numeroTelefono" defaultValue={numeroTelefono} onChange={handleChange} autoComplete="off" required={true}/>
    </div>
    <div className={styles.Form_password}>
		<input autoComplete="new-password" id="new-password" maxLength="50" onChange={handleChange} name="password" type="password" placeholder="Contraseña segura" required={true}/>
	</div>
    <div className={styles.Form_buttons}>
        <input type="submit" value="SIGUIENTE"/>
    </div>

    </form>

    <style jsx>{`

    .Form_file{
        width: 100%;
        display: grid;
        padding: 20px 0;
        border: solid 1px transparent;
        font-size: 1.025rem;
        position: relative;
    }

    .Form_file::before{
        content: '${imagenLogo ? imagenLogo.name : "Selecciona el logo de tu negocio"}';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: #F3D800;
        color: #000;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media only screen and (max-width: 768px){

        .Form_file{
            font-size: 1.025rem;
            margin: 0 auto;
            padding: 10px 0;
            border: solid 1.5px transparent;
        }

        .Form_file::before{
            content: '${imagenLogo ? "✓" : "Logo"}';
            font-weight: bold;
        }
    }
	
    `}
    
    </style>
    </>
    
    )
}
