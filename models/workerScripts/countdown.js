const { parentPort, workerData } = require('worker_threads')
console.log(workerData.time)
console.log(workerData.name)
i = workerData.time
while(i != 0) {
    console.log(i)
    i=i-1
}

return i