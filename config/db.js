
class DbClass{
    constructor(){
        this.pgUrl = process.env.PG_URL;
    }

    // Start connection
    connectDb(){
        return new Promise( (resolve, reject) => {

        });
    }
}
module.exports = DbClass;
