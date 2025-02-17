const pg = require('pg');
const pool = new pg.Pool({

    user: 'postgres',
    host: 'localhost',
    database: 'DIGI_MENUCARD',		//database name
    password: 'tejas',
    port: 5432,			//default PostgreSQL port

});

module.exports = pool;