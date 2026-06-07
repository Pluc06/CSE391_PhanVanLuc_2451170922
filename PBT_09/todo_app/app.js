const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const itemsLeft = document.getElementById('itemsLeft');
const clearBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Lưu và Render
function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
}

function render() {
    todoList.textContent = ''; // Xóa hết list cũ
    
    const filtered = todos.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });

    filtered.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todo.id;

        const span = document.createElement('span');
        span.className = `todo-text ${todo.completed ? 'completed' : ''}`;
        span.textContent = todo.text;
        
        const delBtn = document.createElement('button');
        delBtn.textContent = '❌';
        delBtn.className = 'delete-btn';

        li.appendChild(span);
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });

    itemsLeft.textContent = `${todos.filter(t => !t.completed).length} items left`;
}

// Thêm todo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    todos.push({ id: Date.now(), text: input.value, completed: false });
    input.value = '';
    saveAndRender();
});

// Event Delegation cho list (Toggle, Delete, Edit)
todoList.addEventListener('click', (e) => {
    const id = Number(e.target.closest('.todo-item').dataset.id);
    
    // Toggle completed
    if (e.target.classList.contains('todo-text')) {
        todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveAndRender();
    }
    
    // Delete
    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        saveAndRender();
    }
});

// Edit todo (DblClick)
todoList.addEventListener('dblclick', (e) => {
    if (!e.target.classList.contains('todo-text')) return;
    
    const id = Number(e.target.closest('.todo-item').dataset.id);
    const todo = todos.find(t => t.id === id);
    
    const inputEdit = document.createElement('input');
    inputEdit.value = todo.text;
    inputEdit.className = 'edit-input';
    
    const parent = e.target.parentNode;
    parent.replaceChild(inputEdit, e.target);
    inputEdit.focus();

    inputEdit.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
            todo.text = inputEdit.value;
            saveAndRender();
        }
    });
});

// Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        render();
    });
});

// Clear completed
clearBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveAndRender();
});

// Chạy lần đầu
render();