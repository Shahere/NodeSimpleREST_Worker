
const { Worker, workerData } = require('worker_threads')

const workerScripts = [];
workerScripts['worker1'] = './models/workerScripts/worker1.js';
workerScripts['worker2'] = './models/workerScripts/worker2.js';
workerScripts['countdown'] = './models/workerScripts/countdown.js'


class MyWorker {
    constructor({ workerName, scriptName, workersService }) {

        console.log({ workerName, scriptName })
        this.workerName = workerName;
        this.scriptFile = workerScripts[scriptName];
        this.workersService = workersService
    }

    async start() {
        return new Promise((resolve, reject) => {
            const worker = new Worker(this.scriptFile, { workerData: {name: this.workerName, time: 40} });
            this.job = worker
            worker.on(
                'online',
                () => {
                    console.log('Launching intensive CPU task')
                    this.workersService.touch(this.workerName, this);
                }
            );
            worker.on(
                'message',
                messageFromWorker => {
                    console.log(messageFromWorker)
                    return resolve
                }
            );
            worker.on(
                'error',
                reject
            );
            worker.on(
                'exit',
                code => {
                    this.workersService.remove(this.workerName);
                    /*if (code !== 0) {
                        reject(new Error(`Worker stopped with exit code ${code}`))
                    }*/
                }
            );
        })
    }

    dump() {
        return `This is worker ${this.workerName}`
    }

    kill() {
        console.log("Kill service...")
        this.job.terminate()
        console.log("Killed")
    }
}


module.exports = MyWorker;
