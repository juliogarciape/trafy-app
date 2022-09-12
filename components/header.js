import styles from "../styles/components/Header.module.css";

export default function Header({title = "TRAFY"}){
    
    return(
        
    <header className={styles.Header}>
        <h3>{title}</h3>
    </header>
    
    )
}