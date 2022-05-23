const mariadb = require('mariadb/callback');
const pool = mariadb.createConnection({
      host: '192.168.0.226', 
      user:'danvaldes',
      password: 'Sen4cyt$pragmatic',
      database: 'fichatecnica'
    });

