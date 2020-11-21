import firebaseInit from './config.js'

const database  = firebaseInit.database()
var getValues   = qry(database)

function qry(database){
    let date        = new Date()
    let d           = date.getDate()
    let m           = date.getMonth() + 1
    let y           = date.getFullYear()
    let now         = y + "-" + m + "-" + d
    let val_pc      = []
    let disp        = false

    setInterval(() => {
        let refonce = database.ref("pnc").once('value')
        refonce.then((snapshot) => {
            if(snapshot.exists()) {
                var pc = snapshot.val()                     //ดึงข้อมูลจาก Firebase Database
                for(var key of Object.keys(pc)) {
                    var pc2 = pc[key]

                    for(var key2 of Object.keys(pc2)) {
                        if("date" === key2){
                            var day = pc2[key2]
                            if(now == day){
                                disp = true
                            }
                            else {
                                disp = false
                            }
                        }
                        if(disp == true) {
                            if("Total_people" === key2) {
                                val_pc[0] = pc2[key2]           //ตัวแปรเก็บค่าจำนวนคนที่จะนำเข้า MySQL
                            }
                            else if("Total_car" === key2) {
                                val_pc[1] = pc2[key2]           //ตัวแปรเก็บค่าจำนวนรถที่จะนำเข้า MySQL
                            }
                        }
                    }
                }
            }    
        })

        // console.log(`val_pc = ${val_pc}`);
        // console.log(`valp = ${val_pc[0]}`);
        // console.log(`valc = ${val_pc[1]}`);
        // console.log("-----------------------------------------------------------------------------------");
        
    },3000)
    return val_pc
}

export { getValues }