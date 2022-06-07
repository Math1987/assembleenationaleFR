import { init as initDatas } from "./datas/index.data" ;
import * as articles from "./engine/articles.engine" ;
import { readOne as readArticle } from "./datas/articles.data" ;
import { readOneByDatas as readDeputie } from "./datas/deputies.data" ;

initDatas();
import express from "express";

export const app = express();

import routeExample from "./routes/example.route" ;

app.get('', (req, res) => {
    res.status(200).send('Assemblée Nationale recherche députés et articles API.')
})

app.use(routeExample);

app.get("/loadArticles", ( req, res) => {

    if ( req.query['path'] ){
        articles.decodeAndSavePdfInDB(req.query['path'] as string).then( r => {
            res.status(200).send('file loaded');
        }).catch( err => {
            res.status(500).send("error");
        })
    }else{
        res.status(400).send('need path');
    }

});


app.get("/find", ( req, res) => {

    if ( req.query['words'] ){
        articles.findArticles(req.query['words'] as string).then( ars => {
            console.log(ars);
            res.status(200).send(ars);
        }).catch( err => {
            res.status(50).send('error fetching articles.');
        })
    }else{
        res.status(400).send('need words. Exemple : /find?words=agriculteurs');
    }

});

app.get("/article", ( req, res) => {

    if ( req.query['id'] ){
        readArticle( req.query['id'] as string ).then( article => {
            res.status(200).send(article);
        }).catch( err => {
            res.status(500).send('error fetching article.');
        })
    }else{
        res.status(400).send('need words. Exemple : /find?words=agriculteurs');
    }

});

app.get("/deputie", ( req, res) => {

    if ( req.query['Nom'] && req.query['Prenom'] ){
        readDeputie( { Nom : (req.query['Nom'] as string), Prenom : (req.query['Prenom'] as string) } ).then( deputie => {

            let txt = "" ;
            for( let key of Object.keys(deputie as Object) ){
                //@ts-ignore
                txt += "<div>" + key + " : " + deputie[key] + "</div>" ;
            }

            res.status(200).send(txt);
        }).catch( err => {
            res.status(500).send('error fetching article.');
        })
    }else{
        res.status(400).send('need words. Exemple : /find?words=agriculteurs');
    }

});

app.listen(6060);
app.listen(80);


console.log('Hello world!');
