/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
const TS_API_URL = 'http://localhost:8000/tsensor/'
const HS_API_URL = 'http://localhost:8000/hsensor/'
const LS_API_URL = 'http://localhost:8000/lsensor/'
const GS_API_URL = 'http://localhost:8000/gsensor/'

const TSD_API_URL = 'http://localhost:8000/tsensordata/'
const HSD_API_URL = 'http://localhost:8000/hsensordata/'
const LSD_API_URL = 'http://localhost:8000/lsensordata/'
const GSD_API_URL = 'http://localhost:8000/gsensordata/'

const D_API_URL = 'http://localhost:8000/device/'
const A_API_URL = 'http://localhost:8000/alarm/'

let tsensors = []
let tsensorsData = []

let hsensors = []
let hsensorsData = []

let lsensors = []
let lsensorsData = []

let gsensors = []
let gsensorsData = []

let devices = []
let alarms = []

async function getTemperatureSensors() {
    await fetch(`${TS_API_URL}all/`).then(resp => resp.json()).then(data => {
        tsensors = []
        for(let i = 0; i < data.length; i++){
            tsensors.push(data[i])
        }
    })

    tsensors.sort((a,b) => a.id - b.id)

    const tsensorsTable = document.getElementById('tsensors_table_body')

    let body = ''

    tsensorsData = []
    
    for(let i = 0; i < tsensors.length; i++){
        await fetch(`${TSD_API_URL}last/${tsensors[i].id}`).then(resp => resp.json()).then(data => {
            tsensorsData.push(data)
        })

        const last = tsensorsData[tsensorsData.length - 1]
        if(last.data < 18.0){
            body += `<tr class="table-primary"><td>${tsensors[i].id}</td><td>${tsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
        else if (last.data >= 18.0 && last.data < 36.0){
            body += `<tr class="table-warning"><td>${tsensors[i].id}</td><td>${tsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
        else {
            body += `<tr class="table-danger"><td>${tsensors[i].id}</td><td>${tsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
    }

    tsensorsTable.innerHTML = body
}

setTimeout(getTemperatureSensors)

const gts = setInterval(() => getTemperatureSensors(), 30000)

async function getHumiditySensors() {
    await fetch(`${HS_API_URL}all/`).then(resp => resp.json()).then(data => {
        hsensors = []
        for(let i = 0; i < data.length; i++){
            hsensors.push(data[i])
        }
    })

    hsensors.sort((a,b) => a.id - b.id)

    const hsensorsTable = document.getElementById('hsensors_table_body')

    let body = ''

    hsensorsData = []
    
    for(let i = 0; i < hsensors.length; i++){
        await fetch(`${HSD_API_URL}last/${hsensors[i].id}`).then(resp => resp.json()).then(data => {
            hsensorsData.push(data)
        })

        const last = hsensorsData[hsensorsData.length - 1]
        if(last.data < 30.0){
            body += `<tr class="table-warning"><td>${hsensors[i].id}</td><td>${hsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
        else if (last.data >= 30.0 && last.data <= 65.0){
            body += `<tr class="table-success"><td>${hsensors[i].id}</td><td>${hsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
        else {
            body += `<tr class="table-warning"><td>${hsensors[i].id}</td><td>${hsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
    }

    hsensorsTable.innerHTML = body
}

setTimeout(getHumiditySensors)

const ghs = setInterval(() => getHumiditySensors(), 30000)


async function getLightSensors(){
    await fetch(`${LS_API_URL}all/`).then(resp => resp.json()).then(data => {
        lsensors = []
        for(let i = 0; i < data.length; i++){
            lsensors.push(data[i])
        }
    })

    lsensors.sort((a,b) => a.id - b.id)

    const lsensorsTable = document.getElementById('lsensors_table_body')

    let body = ''

    lsensorsData = []
    
    for(let i = 0; i < lsensors.length; i++){
        await fetch(`${LSD_API_URL}last/${lsensors[i].id}`).then(resp => resp.json()).then(data => {
            lsensorsData.push(data)
        })

        const last = lsensorsData[lsensorsData.length - 1]
        if(last.data < 150){
            body += `<tr class="table-danger"><td>${lsensors[i].id}</td><td>${lsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
        else if (last.data >= 150 && last.data <= 200){
            body += `<tr class="table-success"><td>${lsensors[i].id}</td><td>${lsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
        else {
            body += `<tr class="table-warning"><td>${lsensors[i].id}</td><td>${lsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
    }

    lsensorsTable.innerHTML = body
}

setTimeout(getLightSensors)

const gls = setInterval(() => getLightSensors(), 30000)


async function getGasSensors() {
    await fetch(`${GS_API_URL}all/`).then(resp => resp.json()).then(data => {
        gsensors = []
        for(let i = 0; i < data.length; i++){
            gsensors.push(data[i])
        }
    })

    gsensors.sort((a,b) => a.id - b.id)

    const gsensorsTable = document.getElementById('gsensors_table_body')

    let body = ''

    gsensorsData = []
    
    for(let i = 0; i < gsensors.length; i++){
        await fetch(`${GSD_API_URL}last/${gsensors[i].id}`).then(resp => resp.json()).then(data => {
            gsensorsData.push(data)
        })

        const last = gsensorsData[gsensorsData.length - 1]
        if(last.data < 800){
            body += `<tr class="table-success"><td>${gsensors[i].id}</td><td>${gsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
        else if (last.data >= 800 && last.data <= 1400){
            body += `<tr class="table-warning"><td>${gsensors[i].id}</td><td>${gsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
        else {
            body += `<tr class="table-danger"><td>${gsensors[i].id}</td><td>${gsensors[i].name}</td><td>${last.data}</td><td>${last.date}</td></tr>`
        }
    }

    gsensorsTable.innerHTML = body
}

setTimeout(getGasSensors)
const ggs = setInterval(() => getGasSensors(), 30000)

async function getDevices() {
    await fetch(`${D_API_URL}all/`).then(resp => resp.json()).then(data => {
        devices = []
        for(let i = 0; i < data.length; i++){
            devices.push(data[i])
        }
    })

    devices.sort((a,b) => a.id - b.id)

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

setTimeout(getDevices)
const gd = setInterval(() => getDevices(), 30000)

async function getAlarms() {
    await fetch(`${A_API_URL}all/`).then(resp => resp.json()).then(data => {
        alarms = []
        for(let i = 0; i < data.length; i++){
            alarms.push(data[i])
        }
    })

    alarms.sort((a,b) => a.id - b.id)

    const alarmsTable = document.getElementById('alarms_table_body')

    let body = ''
    
    for(let i = 0; i < alarms.length; i++){
        if(alarms[i].state) {
            body += `<tr><td>${alarms[i].id}</td><td>${alarms[i].name}</td><td><input type="text" value="${alarms[i].time}"/></td><td><input type="checkbox" checked></td></tr>`
        }
        else {
            body += `<tr><td>${alarms[i].id}</td><td>${alarms[i].name}</td><td><input type="text" value="${alarms[i].time}"/></td><td><input type="checkbox"></td></tr>`
        }
    }

    alarmsTable.innerHTML = body
}


setTimeout(getAlarms)
const ga = setInterval(() => getAlarms(), 30000)

async function onSaveDevicesButtonClicked(e) {
    let id = 0
    let data = {}

    const devicesTable = document.getElementById('devices_table_body')

    const rows = devicesTable.rows

    let body = ''

    for(let i = 0; i < rows.length; i++){
        data = {}
        const cols = rows[i].cells
        id = cols[0].textContent
        data.name = cols[1].textContent
        if(cols[2].firstChild.checked){
            data.state = true
            body += `<tr><td>${id}</td><td>${data.name}</td><td><input type="checkbox" checked></td></tr>`
        }
        else {
            data.state = false
            body += `<tr><td>${id}</td><td>${data.name}</td><td><input type="checkbox"></td></tr>`
        }

        await fetch(`${D_API_URL}update/${id}`, {method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json'}})
        .then(resp => resp.json())
    }

    devicesTable.innerHTML = body
}

async function onSaveAlarmsButtonClicked(e)  {
    let id = 0
    let data = {}

    const alarmsTable = document.getElementById('alarms_table_body')

    const rows = alarmsTable.rows

    let body = ''

    for(let i = 0; i < rows.length; i++){
        data = {}
        const cols = rows[i].cells
        id = cols[0].textContent
        data.name = cols[1].textContent
        data.time = cols[2].firstChild.value
        if(cols[3].firstChild.checked){
            data.state = true
            body += `<tr><td>${id}</td><td>${data.name}</td><td><input type="text" value="${data.time}"/></td><td><input type="checkbox" checked></td></tr>`
        }
        else {
            data.state = false
            body += `<tr><td>${id}</td><td>${data.name}</td><td><input type="text" value="${data.time}"/></td><td><input type="checkbox"></td></tr>`
        }

        await fetch(`${A_API_URL}update/${id}`, {method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json'}})
        .then(resp => resp.json())
    }

    alarmsTable.innerHTML = body
}