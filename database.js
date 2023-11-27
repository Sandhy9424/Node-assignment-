const {Pool} = require('pg')

const pool=new Pool({
    user:"postgres",
    password:"post1234",
    host:"database-1.cwdtoy3mxidy.eu-north-1.rds.amazonaws.com",
    database:"books",
    port:5432,
    ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }
})

module.exports=pool;
