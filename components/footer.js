import styles from "@styles/components/Footer.module.css";
import {MAIN_NUMBER} from "@consts/index";

export default function Footer(){
    
    return(
        
    <footer className={styles.Footer}>
        <div>
            <h3>Acerca de Trafy Shop</h3>
            <div className={styles.Footer_links}>
                <a href="/">Página de Inicio</a>
                <a href="/faq">Preguntas Frecuentes</a>
                <a href="/creditos">Creditos Legales</a>
            </div>
        </div>
        <div>
            <h3>¿Empezamos?</h3>
            <div className={styles.Footer_links}>
                <a href="/registro">Registrate Gratis</a>
                <a href="/login">Inicia Sesión</a>
            </div>
        </div>
        <div>
            <h3>Contáctanos</h3>
            <div className={styles.Footer_links}>
                <a href="https://www.instagram.com/trafy.shop/">Cuenta de Instagram</a>
                <a href={`https://api.whatsapp.com/send?phone=${MAIN_NUMBER}&text=¡Hola Trafy Shop!%0Anecesito más información sobre:`}>Número de Whatsapp</a>
                <a href="mailto:soporte.trafyshop@gmail.com">Correo Electrónico</a>
            </div>
        </div>
        <div>
            <h3>Otros Servicios</h3>
            <div className={styles.Footer_links}>
                <a target="_blank" href="https://www.instagram.com/trafy.shop/">Asesoría a negocios de Instagram</a>
            </div>
        </div>
    </footer>

    )
}