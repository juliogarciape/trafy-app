import styles from "@styles/components/Goals.module.css";
import Link from "next/link";


export function FirstGoal({content,image}){

    return(
    <div className={styles.Goal}>
        <img width="200" draggable={false} loading="lazy" alt="Imagen cargando" src={image === "entregas" ? "/icons/repartidor.png" : "/images/goals.png"}/>
        <span> { content || "Agrega tu primer producto para empezar a vender"}</span>
        <Link href="/nuevo">
            <a>AGREGAR</a>
        </Link>
    </div>
    )
}