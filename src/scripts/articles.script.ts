const filePath = process.env.FILE_PATH ;
import { decodeAndSavePdfInDB } from "../engine/articles.engine" ;
if ( filePath ){

    // console.log('filePath', filePath);
    const articles = decodeAndSavePdfInDB(filePath);
}else{
    console.log('Need a variable FILE_PATH in environment.');
}
console.log('run articles');