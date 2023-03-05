const {db,DataExt} = require("../config/sqlite")

function saveimageData(imageData,filePath){
    let sql = `insert into images VALUES(
        null,
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

module.exports = { saveimageData,getLast,getImages};