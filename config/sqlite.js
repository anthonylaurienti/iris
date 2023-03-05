const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
const IRIS_DB = process.env.IRIS_DB || "irisDB"
const db = new sqlite3.Database(`./db/${IRIS_DB}`);


const tableModel = 'CREATE TABLE patients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT )'
// need to rename the data, check and type fields becouse they are reserved
const tableModelIMG = `CREATE TABLE images (
    id INTEGER PRIMARY KEY AUTOINCREMENT ,
    empty INTEGER,
    Pid INTEGER,
    DataSended TEXT,
    devID TEXT,
    TypeIntegration TEXT,
    sessionID INTEGER,
    CheckIntegration TEXT,
    Meta TEXT,
    Image TEXT);`



function createTables(){
    let sqlchecktable =`SELECT
                        IIF(count(0)>0,1,0) exist
                    FROM
                        sqlite_master
                    WHERE
                        type = 'table'
                        AND name = 'patients';`

    db.each(sqlchecktable, (err, row) => {
        if(err){
            console.log(err)
        }
        if(row.exist != 1){
            console.log("Criando tabela!")
            db.run(tableModel);

            db.run(tableModelIMG);
        }
        console.log("Banco Ok!")
    });
}

function DataExt(sql, callback) {
    db.all(sql,[],(err,rows)=>{
        let rep = []
        if(err) throw(err);

        const tamanho = rows.length
        
        rows.forEach((row,key)=>{
            rep.push(row);
            if(key == tamanho-1){
                db.close();
                return callback(false, rep);
            }
        });
    });
}

module.exports = { createTables,DataExt,db};