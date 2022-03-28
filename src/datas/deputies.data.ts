import mongoose, { ObjectId } from "mongoose" ;
let db = null ;

export type type = {
    Nom : string,
    Prenom : string,
    datas : any
};
export type typeInDB = type & {
    _id : ObjectId 
}

export const schema = new mongoose.Schema({
    Nom : { type : String},
    Prenom : { type : String}
}, { strict: false });
schema.index( { Nom : 1, Prenom : 1 });
let model : mongoose.Model<type> ;

export const init = ( db_: mongoose.Connection ) => {
    db = db_ ;
    model = db.model('deputies', schema);
}
export const create = async ( datas : type ) : Promise<typeInDB> => {
    return await new model(datas).save();
}
export const readOne = async ( _id : ObjectId ) : Promise<typeInDB | null>  => {
    return await model.findOne({ _id }) ;
}
export const readOneByDatas = async ( datas : any ) : Promise<typeInDB | null>  => {
    return await model.findOne(datas) ;
}