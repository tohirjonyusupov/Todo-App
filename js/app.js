const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')
let editItemId


// check --- tekshiruv
let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

if (todos.length) showTodos()

// set todos to localStorage --- todoni localStorage ga o'rnatish
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}

// show todos --- localStorage dan ma'lumot olish
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))

    listGroupTodo.innerHTML = ''
    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
         <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${item.completed == true ? 'completed' : ''}">
          ${item.text}
          <div class="todo-icons">
            <span class="opacity-50 ms-2">${item.time}</span>
            <img onclick=(editTodo(${i})) src="img/edit.svg" alt="edit-icons" width="25" height="25">
            <img onclick=(deleteTodo(${i})) src="img/delete.svg" alt="delete-icons" width="25" height="25">
          </div>
        </li> 
        `
    })
}

// show error message
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message

    setTimeout(() => {
        document.getElementById(`${where}`).textContent = ''
    }, 2500)
}

// Time 
function getTime() {
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
    const year = now.getFullYear()
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'Noverber',
        'December'
    ]

    const month_title = now.getMonth()

    fullDay.textContent = `${date} ${months[month_title]}, ${year}`
    hourEl.textContent = hour
    minuteEl.textContent = minute
    secondEl.textContent = second

    return `${hour}:${minute}, ${date}.${month}.${year}`
}
setInterval(getTime, 1000)

// Delete todo --- todoni o'chirish
function deleteTodo(id) {
    const deletedTodos = todos.filter((_, i) => {
        return i !== id
    })

    todos = deletedTodos
    setTodos()
    showTodos()
}

// Completed todo --- bajarilganini ko'rsatish
function setCompleted(id) {
    const completedTodos = todos.map((item, i) => {
        if (id == i) {
            return {
                ...item,
                completed: item.completed == true ? false : true
            }
        } else {
            return {
                ...item
            }
        }
    })

    todos = completedTodos
    setTodos()
    showTodos()
}


// Form create --- forma yaratish
formCreate.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = formCreate['input-create'].value.trim()
    formCreate.reset()
    if (todoText.length) {
        todos.push({
            text: todoText,
            time: getTime(),
            completed: false
        })
        setTodos()
        showTodos()
    } else {
        showMessage('message-create', 'Please enter some text...')
    }
})

// Form edit --- formani tahrirlash
formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = formEdit['input-edit'].value.trim()
    formEdit.reset()
    if (todoText.length) {
        todos.splice(editItemId, 1, {
            text: todoText,
            time: getTime(),
            completed: false
        })
        setTodos()
        showTodos()
        close()
    } else {
        showMessage('message-edit', 'Please enter some text...')
    }
})


// Edit function
function editTodo(id) {
    open()
    editItemId = id
}
function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

// Events --- hodisalar
closeEl.addEventListener('click', close)
overlay.addEventListener('click', close)
document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape') {
        close()
    }
})