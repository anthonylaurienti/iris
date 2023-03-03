const sqlite3 = require('sqlite3').verbose();

const tableModel = `CREATE TABLE patients (id INT, name TEXT, devID TEXT,providerID TEXT, lastSync DATETIME)`



function createTables(){
    let db = new sqlite3.Database('./db/irisDB');
    sqlchecktable =`SELECT
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
            db.run('CREATE TABLE patients (id INT, name TEXT )');

            // need to rename the data, check and type fields becouse they are reserved
            db.run(`CREATE TABLE images (empty INTEGER,
                Pid INTEGER,
                DataSended TEXT,
                devID TEXT,
                TypeIntegration TEXT,
                sessionID INTEGER,
                CheckIntegration TEXT,
                Meta TEXT,
                Image TEXT )`);
        }
        console.log("Banco Ok!")
    });
    db.close();
}


function saveimageData(imageData){
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
        '${imageData.ImageName}'
    )`

    db.run(sql);
    db.close();
}





module.exports = { createTables,saveimageData};