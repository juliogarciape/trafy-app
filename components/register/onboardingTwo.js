import styles from "@styles/pages/Registro.module.css";


export default function OnboardingTwo({setData,data,setPage}){

    let {infoPagos,direccionPrincipal,infoReclamos,infoEntrega,nombreFundador} = data;

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const goPreviousPage = () => setPage(page => page-1);
    
    const goNextPage = (e) =>{
        e.preventDefault();
        setPage(page => page+1);
    }

    return(

    <form className={`${styles.GroupForm} ${styles.FormTwo}`} onSubmit={goNextPage} method="POST">

    <div className={styles.Form_fundador}>
		<input autoFocus={true} spellCheck={false} defaultValue={nombreFundador} name="nombreFundador" onChange={handleChange} maxLength="40" type="text" placeholder="Nombre del fundador(a)" autoComplete="off" required={true}/>
	</div>
    <div className={styles.Form_pagos}>
		<input spellCheck={false} name="infoPagos" defaultValue={infoPagos} maxLength="250" onChange={handleChange} type="text" placeholder="Formas de pago aceptadas" autoComplete="off" required={true}/>
	</div>
    <div className={styles.Form_entrega}>
		<input spellCheck={false} name="infoEntrega" maxLength="500" type="text" placeholder="Formas de entrega" onChange={handleChange} defaultValue={infoEntrega} autoComplete="off" required={true}/>
	</div>
    <div className={styles.Form_ubicacion}>
        <input spellCheck={false} maxLength="100" name="direccionPrincipal" defaultValue={direccionPrincipal} type="text" placeholder="Ubicación (ciudad o dirección física)" onChange={handleChange} autoComplete="off" required={true}/>
    </div>
    <div className={styles.Form_reclamos}>
        <input spellCheck={false} maxLength="250" type="text" placeholder="Aviso sobre cambios o devoluciones" onChange={handleChange} name="infoReclamos" defaultValue={infoReclamos} autoComplete="off" required={true}/>
    </div>
    <div className={styles.Form_buttons_two}>
        <input onClick={goPreviousPage} type="button" value="ATRAS"/>
        <input type="submit" value="CREAR"/>
    </div>

    </form>

    )
}