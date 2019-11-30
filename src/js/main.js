/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
const TS_API_URL = 'http://localhost:8000/tsensor/'
const HS_API_URL = 'http://localhost:8000/hsensor/'
const LS_API_URL = 'http://localhost:8000/lsensor/'
const GS_API_URL = 'http://localhost:8000/gsensor/'

const D_API_URL = 'http://localhost:8000/device/'
const A_API_URL = 'http://localhost:8000/alarm/'

let tsensors = []
let hsensors = []
let lsensors = []
let gsensors = []

let devices = []
let alarms = []

const getTemperatureSensors = () => {
    fetch(`${TS_API_URL}all/`).then(resp => resp.json()).then(data => {
        tsensors = []
        for(let i = 0; i < data.length; i++){
            tsensors.push(data[i])
        }
    })

    const tsensorsTable = document.getElementById('tsensors_table_body')

    let body = ''
    
    for(let i = 0; i < tsensors.length; i++){
        body += `<tr><td>${tsensors[i].id}</td><td>${tsensors[i].name}</td><td></td><td></td></tr>`
    }

    tsensorsTable.innerHTML = body
}

setTimeout(() => getTemperatureSensors(), 100)

const gts = setInterval(() => getTemperatureSensors(), 10000)

const getHumiditySensors = () => {
    fetch(`${HS_API_URL}all/`).then(resp => resp.json()).then(data => {
        hsensors = []
        for(let i = 0; i < data.length; i++){
            hsensors.push(data[i])
        }
    })

    const hsensorsTable = document.getElementById('hsensors_table_body')

    let body = ''
    
    for(let i = 0; i < hsensors.length; i++){
        body += `<tr><td>${hsensors[i].id}</td><td>${hsensors[i].name}</td><td></td><td></td></tr>`
    }

    hsensorsTable.innerHTML = body
}

setTimeout(() => getHumiditySensors(), 100)

const ghs = setInterval(() => getHumiditySensors(), 10000)


const getLightSensors = () => {
    fetch(`${LS_API_URL}all/`).then(resp => resp.json()).then(data => {
        lsensors = []
        for(let i = 0; i < data.length; i++){
            lsensors.push(data[i])
        }
    })

    const lsensorsTable = document.getElementById('lsensors_table_body')

    let body = ''
    
    for(let i = 0; i < lsensors.length; i++){
        body += `<tr><td>${lsensors[i].id}</td><td>${lsensors[i].name}</td><td></td><td></td></tr>`
    }

    lsensorsTable.innerHTML = body
}

setTimeout(() => getLightSensors(), 100)

const gls = setInterval(() => getLightSensors(), 10000)


const getGasSensors = () => {
    fetch(`${GS_API_URL}all/`).then(resp => resp.json()).then(data => {
        gsensors = []
        for(let i = 0; i < data.length; i++){
            gsensors.push(data[i])
        }
    })

    const gsensorsTable = document.getElementById('gsensors_table_body')

    let body = ''
    
    for(let i = 0; i < gsensors.length; i++){
        body += `<tr><td>${gsensors[i].id}</td><td>${gsensors[i].name}</td><td></td><td></td></tr>`
    }

    gsensorsTable.innerHTML = body
}

setTimeout(() => getGasSensors(), 100)
const ggs = setInterval(() => getGasSensors(), 10000)

const getDevices = () => {
    fetch(`${D_API_URL}all/`).then(resp => resp.json()).then(data => {
        devices = []
        for(let i = 0; i < data.length; i++){
            devices.push(data[i])
        }
    })

    const devicesTable = document.getElementById('devices_table_body')

    let body = ''
    
    for(let i = 0; i < devices.length; i++){
        if(devices[i].state){
            body += `<tr><td>${devices[i].id}</td><td>${devices[i].name}</td><td><input type="checkbox" checked></td></tr>`
        }
        else {
            body += `<tr><td>${devices[i].id}</td><td>${devices[i].name}</td><td><input type="checkbox"></td></tr>`
        }
    }

    devicesTable.innerHTML = body
}

setTimeout(() => getDevices(), 100)
const gd = setInterval(() => getDevices(), 10000)

const getAlarms = () => {
    fetch(`${A_API_URL}all/`).then(resp => resp.json()).then(data => {
        alarms = []
        for(let i = 0; i < data.length; i++){
            alarms.push(data[i])
        }
    })

    const alarmsTable = document.getElementById('alarms_table_body')

    let body = ''
    
    for(let i = 0; i < alarms.length; i++){
        if(alarms[i].state) {
            body += `<tr><td>${alarms[i].id}</td><td>${alarms[i].name}</td><td>${alarms[i].time}</td><td><input type="checkbox" checked></td></tr>`
        }
        else {
            body += `<tr><td>${alarms[i].id}</td><td>${alarms[i].name}</td><td>${alarms[i].time}</td><td><input type="checkbox"></td></tr>`
        }
    }

    alarmsTable.innerHTML = body
}


setTimeout(() => getAlarms(), 100)
const ga = setInterval(() => getAlarms(), 10000)

async function onSaveDevicesButtonClicked(e) {
    let id = 0
    let data = {}

    const devicesTable = document.getElementById('devices_table_body')

    const rows = devicesTable.rows

    for(let i = 0; i < rows.length; i++){
        data = {}
        const cols = rows[i].find('td')
        id = cols[0]
        data.name = cols[1]
        if(cols[2].prop('checked')){
            data.state = true
        }
        else {
            data.state = false
        }

        await fetch(`${D_API_URL}update/${id}`, {method: 'POST', body: data, headers: { 'Content-Type': 'application/json'}})
        .then(resp => resp.json())
        .then(dat => console.log(dat))
    }
}

async function onSaveAlarmsButtonClicked(e)  {
    let id = 0
    let data = {}

    const alarmsTable = document.getElementById('alarms_table_body')

    const rows = alarmsTable.rows

    for(let i = 0; i < rows.length; i++){
        data = {}
        const cols = rows[i].find('td')
        id = cols[0]
        data.name = cols[1]
        data.time = cols[2]
        if(cols[3].prop('checked')){
            data.state = true
        }
        else {
            data.state = false
        }

        await fetch(`${D_API_URL}update/${id}`, {method: 'POST', body: data, headers: { 'Content-Type': 'application/json'}})
        .then(resp => resp.json())
        .then(dat => console.log(dat))
    }
}