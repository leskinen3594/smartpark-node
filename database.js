// import { createConnection } from 'mysql'
import pkg from 'mysql'
const { createConnection } = pkg

const getConnection = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Smartpark"
})

//เชื่อมต่อฐานข้อมูล MySQL
getConnection.connect((err) => {
    !err ? console.log("Connected Successfully.") : console.log("Connected failed. Error: "+JSON.stringify(err, undefined, 2));
})

export default getConnection