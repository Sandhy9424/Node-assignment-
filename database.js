const {Pool} = require('pg')

const pool=new Pool({
    user:"postgres",
    password:"post1234",
    host:"database-1.cwdtoy3mxidy.eu-north-1.rds.amazonaws.com",
    database:"books",
    port:5432,
})

module.exports=pool;
