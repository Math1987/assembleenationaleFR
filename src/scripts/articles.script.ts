const filePath = process.env.FILE_PATH ;
import { decodeAndSavePdfInDB } from "../engine/articles.engine" ;
import { init } from "../datas/index.data" ;
const {TextDecoder, TextEncoder} = require("util");
if ( filePath ){

    init().then( () => {
        const articles = decodeAndSavePdfInDB(filePath);
    }).catch( e => {
        console.log('error init db');
    })
    // console.log('filePath', filePath);
}else{
    console.log('Need a variable FILE_PATH in environment.');
}
console.log('run articles');