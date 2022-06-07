let environment : {
    mode : string, 
    db : string,
    url : string
} = {
    mode : "dev",
    db : "mongodb://localhost:27017/assemblee_nationale",
    url : "http://13.36.233.177"
}
if ( process.env.MODE === "prod" ){
    environment.mode = "prod" ;
    // environment.db = "mongodb+srv://User:Password@cluster.any.mongodb.net/assemblee_nationale?retryWrites=true&w=majority"
}

export default environment ;