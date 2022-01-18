const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017')
function connect(){
    return new Promise( (resolve, reject) => {

        client.connect().then( co => {
            let db = client.db("deputies");
            const collection = db.collection('deputies');
            resolve(db);

        }).catch(e => { 
            console.log('err', e );
            reject(e)
        });
    });

};
const removeAccents = function(str){
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
const loadDeputes = async () => {
   

    connect().then( db => {

        const collection = db.collection('deputies') ;
        const cursor = collection.find();

        cursor.forEach( depute => {

            let newNom = '' ;
            let newPrenom = '' ;

            if ( depute.Prenom ){
                let i = 0 ;
                while ( i < depute.Prenom.length && depute.Prenom[i] !== ',' ){
                    newPrenom += depute.Prenom[i] ;
                    i++ ;
                }

                newPrenom = removeAccents(newPrenom).toLowerCase();

                collection.findOneAndUpdate({ _id : depute._id }, { $set : { Prenom : newPrenom}}, { returnOriginal : false }, (err, res) => {
                    
                });        

            }
            if ( depute.Nom ){
                let i = 0 ;
                while ( i < depute.Nom.length ){
                    if ( depute.Nom[i] === '\n' ){
                        i = depute.Nom.length + 1 ;
                        break ;
                    }else if ( i + 1 < depute.Nom.length && depute.Nom[i+1] === "(" ){
                        i = depute.Nom.length + 1 ;
                        break ;
                    }else{
                        newNom += depute.Nom[i] ;
                        i++ ;
                    }
                }
                
                newNom = removeAccents(newNom).toUpperCase();

                collection.findOneAndUpdate({ _id : depute._id }, { $set : { Nom : newNom}}, { returnOriginal : false }, (err, res) => {
                    
                });        
            }


            console.log(newNom, newPrenom);


        })
        .then( res => {
            console.log('deputes modified successfully')
                success();
        }).catch( err => { console.log('fail error') } );

    });

}
loadDeputes();

