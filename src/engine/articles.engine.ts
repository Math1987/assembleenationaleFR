import { create, findOnText } from "../datas/articles.data";
import fs from "fs" ;
import {transformPDFtoWordsArray} from "./pdf.engine" ;
import environment from "../environment" ;
const {TextDecoder, TextEncoder} = require("util");

export const decodeAndSavePdfInDB = async ( path : string ) => {
    
    const file = fs.readFileSync(path);
    const articles = await transformPDFtoWordsArray(file);
    let i = 1 ;
    while ( i < articles.length ) {
        await create(articles[i]);
        i ++ ;
    }
    console.log('save files in db done');
    return true ;
}

const removeAccents = function(str : string){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
     
    return ''+str;
}

export const findArticles = async ( words : string ) => {

    const articles = await findOnText(words);
    let value = '' ;



    //@ts-ignore
    articles.forEach( a => {
        value += `<div>
        <a href="${environment.url}/deputie?Nom=${removeAccents(a.Nom.toUpperCase())}&Prenom=${removeAccents(a.Prenom.toLowerCase())}">Nom: ${a.Nom} Prénom: ${a.Prenom}</a>
         => 
         <a href="${environment.url}/article?id=${a._id}">ARTICLE</a>
         </div>` ;
    });
    return value ;
}