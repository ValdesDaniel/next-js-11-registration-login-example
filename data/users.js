const mariadb = require("mariadb/callback");

// Initialize Pool
const pool = mariadb.createPool({
     host: "192.168.0.226",
     user: "danvaldes",
     password: "Sen4cyt$pragmatic",
     database: "fichatecnica",
     connectionLimit: 100,
 });

 function main() {
    let conn;
    try {
       pool.getConnection((err, conn) => {
          if (err) {
             console.log("Error in obtaining connection: " + err);
          } else {
             console.log("Connected. Connection id is " + conn.threadId);
             conn.query(
                "SELECT * from fite_usuario",
                (err,res,meta) => {
                   if (err) {
                      console.error("Error querying data: ", err);
                   } else {
                      console.log(res);
                      console.log(meta);
                   }
                }
             );
             // release connection to pool
             conn.end(err => {if(err){console.error("Error releasing connection to pool   : ", err);}});
           }
        });

     } catch (err) {

        // Manage Errors
        console.log(err);

     } finally {

        // Return Connection to the Pool
        if (conn) conn.end(err => {
           if(err) {
              console.log("SQL error in closing connection: ", err);
           }
        })
     }
   }

main();