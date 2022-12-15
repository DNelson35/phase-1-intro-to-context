// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(array){
    return array.map(obj => {
        return createEmployeeRecord(obj)
    })
}

function createTimeInEvent(obj, date){
    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.slice(-4,)),
        date: date.slice(0,-5)
    })
    return obj
}

function createTimeOutEvent(obj, date){
    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.slice(-4,)),
        date: date.slice(0,-5)
    })
    return obj
}

function hoursWorkedOnDate(obj, date){
    const inTime = obj.timeInEvents.find((event) => event.date === date)
    const outTime = obj.timeOutEvents.find((event) => event.date === date)
  
    return (outTime.hour - inTime.hour) / 100
  }

function wagesEarnedOnDate(obj, date){
    const time = hoursWorkedOnDate(obj, date)
    return obj.payPerHour * time
}

function allDates(obj){
    const arr = []
    obj.timeInEvents.forEach(day => {
        arr.push(day.date)  
    });
    return arr
}
function allWagesFor(obj){
    let total = 0
    const days = allDates(obj)
    for(let i of days){
        total += wagesEarnedOnDate(obj, i)
    }
    return total
}

function calculatePayroll(array){
    let total = 0
    array.forEach((record) => {
       total += allWagesFor(record)
    })
    return total
}