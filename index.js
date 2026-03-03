import fs from 'fs/promises'
import {
    readFile,
    writeFile
} from 'node:fs/promises'

const fileName = 'tasks.json'


async function checkFileExists() {
    try {
        // fs.access throws an error if the file doesn't exist
        await fs.access(fileName, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

async function fetchTasks() {
    try {
        const fileExists = await checkFileExists()
        if (fileExists) {
            const data = await readFile(fileName,
                'utf8')
            return JSON.parse(data)
        } else {
            return ''
        }
    }
    catch(err) {
        if (err) {
            console.error('Error r eading file:', err)
            throw err
        }
    }

}

async function addTask(task) {
    try {
        let str = ''
        const tasks = await fetchTasks()
        if (tasks) {
            tasks.push(task)
            str = JSON.stringify(tasks)
        } else {
            str = JSON.stringify(task)
            str = `[${str}]`
        }

        await writeFile(fileName,
            str)
        console.log('Task added successfully with id', task.id)
    } catch(err) {
        if (err) {
            console.error('Error writing to file:', err)
        }
    }
}

async function updateTask(id, desc) {
    try {
        const tasks = await fetchTasks()
        if (!tasks) {
            console.log(`Task with id ${id} does not exist`)
            return
        }
        tasks[id -1].description = desc

        const d = new Date()
        const dateTimeStr = d.toLocaleString()

        tasks[id -1].updatedAt = dateTimeStr

        const str = JSON.stringify(tasks)

        await writeFile(fileName,
            str)
        console.log('Task updated with id', id)
    } catch(err) {
        if (err) {
            console.error('Error writing to file:', err)
        }
    }
}

async function deleteTask(id) {
    try {
        const tasks = await fetchTasks()
        if (!tasks) {
            console.log(`Task with id ${id} does not exist`)
            return
        }
        tasks.splice(id-1, 1)
        let str = JSON.stringify(tasks)

        await writeFile(fileName,
            str)
        console.log('Task deleted with id', id)
    } catch(err) {
        if (err) {
            console.error('Error writing to file:', err)
        }
    }
}

async function markTask(id, status) {
    try {
        const tasks = await fetchTasks()
        if (!tasks) {
            console.log(`Task with id ${id} does not exist`)
            return
        }
        tasks[id -1].status = status

        const d = new Date()
        const dateTimeStr = d.toLocaleString()

        tasks[id -1].updatedAt = dateTimeStr

        const str = JSON.stringify(tasks)

        await writeFile(fileName,
            str)
        console.log('Task marked as', status)
    } catch(err) {
        if (err) {
            console.error('Error writing to file:', err)
        }
    }
}

async function listTasks(status) {
    try {
        const tasks = await fetchTasks()
        if (!tasks) {
            console.log(`Task list is empty`)
            return
        }

        let str = ''
        for (let key in tasks[0]) {
            str += key + " | "
        }
        console.log(str)
        
        for (let task of tasks) {
            if ((status && status == task.status) || !status) {
                str = ''
                for (let key in task) {
                    str += task[key] + " | "
                }
                console.log('')
                console.log(str)
            }
        }
    } catch(err) {
        if (err) {
            console.error('Error writing to file:', err)
        }
    }
}


const args = process.argv.slice(2)

if (args[0] == "add") {
    const tasks = await fetchTasks()

    const id = tasks.length + 1

    const desc = args[1] 
    const status = 'todo'

    const d = new Date()
    const dateTimeStr = d.toLocaleString()

    const createdAt = dateTimeStr
    const updatedAt = dateTimeStr

    const task = {
        id: id,
        description: desc,
        status: status,
        createdAt: createdAt,
        updatedAt: updatedAt
    }

    addTask(task)
} else if (args[0] == "update") {
    const id = args[1]
    const desc = args[2]

    updateTask(id, desc)
} else if (args[0] == "delete") {
    const id = args[1]

    deleteTask(id)
} else if (args[0] == "mark-in-progress") {
    const id = args[1]

    markTask(id, 'in-progress')
} else if (args[0] == "mark-done") {
    const id = args[1]

    markTask(id, 'done')
} else if (args[0] == "list") {
    const status = args[1]

    listTasks(status)
}