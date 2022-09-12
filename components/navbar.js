import styles from "@styles/components/Navbar.module.css";
import Link from "next/link";
import Head from "next/head";


export default function Navbar(){
    return(
    
    <>
    <Head>
	    <title>Trafy Shop - Panel de Administración</title>
	    <meta name="robots" content="noindex"/>
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' name='viewport'/>
	</Head>
    
    <div className={styles.Layout_navbar}>
        <Link href="/inicio">
		<a>
		    <img loading="lazy" draggable={false} width="25" src="/icons/panel-productos.png" alt="+"/>
		</a>
		</Link>

        <Link href="/nuevo">
        <a>
            <img loading="lazy" draggable={false} width="25" src="/icons/panel-nuevo.svg" alt="+"/>
		</a>
        </Link>
        
        <Link href="/entregas">
        <a>
		    <img loading="lazy" draggable={false} width="25" src="/icons/panel-entregas.png" alt="+"/>
		</a>
        </Link>
        
        <Link href="/finanzas">
        <a>
		    <img loading="lazy" draggable={false} width="25" src="/icons/panel-finanzas.png" alt="+"/>
		</a>
        </Link>

        <Link href="/configuracion">
        <a>
            <img loading="lazy" draggable={false} width="25" src="/icons/panel-configuracion.png" alt="+"/>
		</a>
        </Link>

        <Link href="/perfil">
        <a>
		    <img loading="lazy" draggable={false} width="25" src="/icons/panel-bookmark.svg" alt="+"/>
		</a>
        </Link>
    </div>

    <style jsx global>{`

    body{
        background: #eff3f6;
    }

    `}</style>
    
    </>

    )
}