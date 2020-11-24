import firebaseInit from './config.js'

const database  = firebaseInit.database()
var getValues   = qry(database)

function qry(database){
    let date        = new Date()
    let d           = date.getDate()
    let m           = date.getMonth() + 1
    let y           = date.getFullYear()
    let now         = y + "-" + m + "-" + d
    let val_pc1     = []
    let val_pc2     = []
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
                        if(disp == false) {
                            if("Total_people1" === key2) {
                                val_pc1[0] = pc2[key2]           //ตัวแปรเก็บค่าจำนวนคนที่จะนำเข้า MySQL
                            }
                            else if("Total_car1" === key2) {
                                val_pc1[1] = pc2[key2]           //ตัวแปรเก็บค่าจำนวนรถที่จะนำเข้า MySQL
                            }
                            else if("Total_people2" === key2){
                                val_pc2[0] = pc2[key2]
                            }
                            else if("Total_car2" === key2){
                                val_pc2[1] = pc2[key2]
                            }
                        }
                    }
                }
            }    
        })

        console.log(`val_pc1 = ${val_pc1}`);
        console.log(`valp1 = ${val_pc1[0]}`);
        console.log(`valc1 = ${val_pc1[1]}`);
        console.log("-----------------------------------------------------------------------------------");
        console.log(`val_pc2 = ${val_pc2}`);
        console.log(`valp2 = ${val_pc2[0]}`);
        console.log(`valc2 = ${val_pc2[1]}`);
        console.log("-----------------------------------------------------------------------------------");
        console.log(`perple1 = ${getValues[0][0]} and people2 = ${getValues[1][0]}`);
        console.log(`car1 = ${getValues[0][1]} and car2 = ${getValues[1][1]}`);
        console.log("###################################################################################");
    },3000)
    return [ val_pc1, val_pc2 ]
}

export { getValues }