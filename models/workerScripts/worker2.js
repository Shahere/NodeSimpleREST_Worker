const { parentPort, workerData } = require('worker_threads')
let increment = add(0);

function add(i) {
  if (i !== 10) {
    setTimeout(() => { add(i + 1) }, 1000)
  } else {
    const message = workerData + ' Intensive CPU task is done ! Result is : ' + increment
    parentPort.postMessage(message)
  }
  return i
}

