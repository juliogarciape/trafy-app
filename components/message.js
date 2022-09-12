import styles from "@styles/components/Message.module.css";

export default function Message({content}){
    
    return(

    <div className={styles.Message}>
        <p>{content}</p> 
    </div>

    )
}