import {ref, uploadBytesResumable, getDownloadURL} from "@firebase/storage";
import {productStorage, logoStorage} from "@config/firebase-storage/index.js";


function getDate(){
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }
    return Date.now();
}

export const filterSubdomainName = (string) => {
    let subdomain = string.toLowerCase();
    subdomain = subdomain.replaceAll(' ','');
    subdomain = /[a-z0-9]+/g.exec(subdomain);
    subdomain = subdomain[0].slice(0,20);
    return subdomain;
}

export const getPlanLevel = (nivel) =>{
    const PLAN_LEVELS = {
        1: "GRATIS",
        2: "BASICO"
    }
    return PLAN_LEVELS[nivel] || "INVALIDO";
}


export async function uploadLogoFirebase(image,urlTienda){
    return new Promise((resolve, reject) => {
        const date = getDate();
        const newName = `${urlTienda}-${date}`;
        const storageRef = ref(logoStorage, "/logos/"+newName);
        const task = uploadBytesResumable(storageRef,image);

        task.on('state_changed',
            async function progress(snaptshot){
            },
            async function error(err){
                reject({ status: false });
            },
            async function complete(){
                getDownloadURL(task.snapshot.ref)
                .then((url) => {
                    resolve({
                        url: url.slice(44),
                        status: true
                    });
                })
                .catch((err) => {
                    reject({ status: false });
                })
        })
    })
}


export async function uploadProductFirebase(image,sequence,urlTienda){
    return new Promise((resolve, reject) => {
        const date = getDate();
        const newName = `${urlTienda}-${date}-${sequence}`;
        const storageRef = ref(productStorage,"/productos/"+newName);
        const task = uploadBytesResumable(storageRef,image);

        task.on('state_changed',
            async function progress(snaptshot){
            },
            async function error(err){
                reject({ status: false });
            },
            async function complete(){
                getDownloadURL(task.snapshot.ref)
                .then((url) => {
                    resolve({
                        url: url.slice(44),
                        status: true
                    });
                })
                .catch((err) => {
                    reject({ status: false});
                })
            })
    });
}