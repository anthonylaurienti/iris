const sqlite3 = require('sqlite3').verbose();

const tableModel = 'CREATE TABLE patients (id INT, name TEXT )'


// need to rename the data, check and type fields becouse they are reserved
const tableModelIMG = `CREATE TABLE images (empty INTEGER,
                        Pid INTEGER,
                        DataSended TEXT,
                        devID TEXT,
                        TypeIntegration TEXT,
                        sessionID INTEGER,
                        CheckIntegration TEXT,
                        Meta TEXT,
                        Image TEXT )`



function createTables(){
    let db = new sqlite3.Database('./db/irisDB');
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
    db.close();
}


function saveimageData(imageData,filePath){
    let db = new sqlite3.Database('./db/irisDB');
    let sql = `insert into images VALUES(
        ${imageData.empty},
        ${imageData.Pid},
        '${imageData.Data}',
        '${imageData.devID}',
        '${imageData.Type}',
        ${imageData.sessionID},
        '${imageData.Check}',
        '${imageData.meta}',
        '${filePath}'
    )`

    db.run(sql);
    db.close();
}


function getLast(devId,callback){

    let response = []
    let sql=`select
            *
        from
            images
        where 
            devID = ${devId}
        order by DataSended DESC 
        limit 1`
    DataExt(sql, function(err, content) {
        if(err) throw(err);
        callback(content[0])
    })
}

function getImages(pid,sessionID,devID,callback){
    let sql =`select
          *
        from
          images
        where 
          Pid = ${pid}
          and 
            sessionID = ${sessionID}
          and 
            devID = ${devID}` 
    DataExt(sql, function(err, content) {
        if(err) throw(err);
        callback(content)
    })
}


function DataExt(sql, callback) {
    let db = new sqlite3.Database('./db/irisDB');

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


module.exports = { createTables,saveimageData,getLast,getImages};