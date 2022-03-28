import mongoose, { ObjectId } from "mongoose" ;
let db : any = null ;

export type type = {
    Nom : string,
    Prenom : string,
    text : string
};
export type typeInDB = type & {
    _id : ObjectId 
}

export const schema = new mongoose.Schema({
    Nom : { type : String},
    Prenom : { type : String},
    text : { type : String, index : true },
});
schema.index( { Nom : 1, Prenom : 1 });
schema.index( { text : "text" } );
let model : mongoose.Model<type> ;

export const init = ( db_: mongoose.Connection ) => {
    db = db_ ;
    model = db.model('articles', schema);
}
export const create = async ( datas : type ) : Promise<typeInDB> => {
    //@ts-ignore
    return await new model(datas).save();
}
export const readOne = async ( _id : ObjectId | string ) : Promise<typeInDB | null>  => {
    return await model.findOne({ _id }) ;
}
export const findOnText = async ( words : string ) : Promise<any>  => {
    return await model.find(  {$text:
        {
          $search: words,
          $language: "fr"
        }}) ;
}