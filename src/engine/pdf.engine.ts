import pdf from 'pdf-parse' ;    
const {TextDecoder, TextEncoder} = require("util");

const eraseUnlessSpaces = ( text : string ) => {
    try{
        let newText = '' ;
        let space = 0 ;
        for ( let i = 0 ; i < text.length ; i ++ ){
            if ( text.charAt(i) === " " ){
                space ++ ;
            }else{
                space = 0 ;
            }
            if ( space <= 1 ){
                newText += text.charAt(i) ;
            }
        }
        return newText ;

    }catch(e){
        console.log(e);
        return '' ;
    }
};

export const transformPDFtoWordsArray = async ( file : Buffer ) : Promise<any[]> => { 


    const datas = await pdf(file);
    //@ts-ignore
    const txt = eraseUnlessSpaces(datas.text) ;
    const articles = [] ;
    let startArticle = 0 ;
    for ( let i = 0 ; i < txt.length ; i ++ ){
        if ( i > 4 && (txt.slice(i-4, i) === "(M. " || txt.slice(i-4, i) === "(Mme" || txt.slice(i-4, i) === "(Mll")){
            let prenom = '' ;
            let i2 = i ;
            while( txt.charAt(i2) !== ')' ){
                prenom += txt.charAt(i2) ;
                i2 ++ ;
            }
            let i3 = i - 5 ;
            while ( txt.charAt(i3) === " " ){
                i3 -- ;
            }
            let ei = i3 + 1 ;
            while ( txt.charAt(i3) !== " " && txt.charAt(i3) !== "\n"){
                i3 -- ;
            }
            let nom = txt.slice(i3, ei);
            const article = {
                Nom : nom.replace(/(\r\n|\n|\r)/gm, ""),
                Prenom : prenom.replace(/(\r\n|\n|\r)/gm, ""),
                text : txt.slice(startArticle, i3).replace(/(\r\n|\n|\r)/gm, "")
            }
            articles.push(article);

            startArticle = i2 + 1;
        }
    }
    return articles ;


}