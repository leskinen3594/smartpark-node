import { getValues } from './firebase/query.js'
import getConnection from './database.js'

// function เก็บค่าเวลาและวันที่ เป็นแบบ locale
function startTime(){
    // Format datetime : 2020-11-17 07:31:00
    let today       = new Date()
    let year        = today.getFullYear()
    let month       = today.getMonth() + 1  //month เริ่มจาก 0
    let date        = today.getDate()
    let h           = today.getHours()
    let m           = today.getMinutes()
    let s           = today.getSeconds()
    m               = checkFormatTime(m)
    s               = checkFormatTime(s)
    var date_time   = year + "-" + month + "-" + date + " " + h + ":" + m + ":" + s
    var time        = h + ":" + m + ":" + s
    setTimeout(startTime, 1000)
    // console.log(date_time);
    return [ date_time, time ]
}

// function จัดรูปแบบของหน่วยเวลา นาทีและวินาที
function checkFormatTime(i) {
    if (i < 10) {i = "0" + i};  // fomat if m < 10 || s < 10 = 00...09
    return i;
}

setInterval(() => {
    // รับข้อมูลจาก query.js
    let people_total    = getValues[0]
    let cars_total      = getValues[1]
    console.log(`people = ${people_total}`);
    console.log(`cars = ${cars_total}`);

    // เรียกใช้ function startTime เพื่อรับค่าวันที่และเวลามาเก็บไว้ในตัวแปร
    let date_time = startTime()[0]
    let time      = startTime()[1]    
    console.log(`date_time = ${date_time}`);

    let sql = `INSERT INTO total(total_id, total_people, total_car, date) VALUES(${null}, ${people_total}, ${cars_total}, "${date_time}")`
    if("13:00:00" === time){    //13.00(UTC +0) เวลาไทยคือ 20.00(UTC/GMT +7)
        getConnection.query(sql, (err, res) => {
            !err ? console.log("Insert Successfully. Increase id: " + res.insertId) : console.log("Insert " + err);
        })
        // getConnection.end()
    }
    else { }
    
},1000)
