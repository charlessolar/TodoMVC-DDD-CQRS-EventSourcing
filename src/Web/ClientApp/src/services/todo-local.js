

export class TodoLocal {
    static async loadTodos() {
        const response = await fetch('todo/all');
        const todos = await response.json();
        return todos.records.map(todo => ({id: todo.id, name: todo.message, completed: !todo.active}));
    }
    static async createTodo(todo) {
        await fetch('todo/add', {
            method: 'POST',
            body: JSON.stringify({
                todoId: todo.id,
                active: !todo.completed,
                message: todo.name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static async markComplete(todo) {
        await fetch('todo/complete', {
            method: 'POST',
            body: JSON.stringify({
                todoId: todo.id,
                active: !todo.completed,
                message: todo.name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static async markActive(todo) {
        await fetch('todo/active', {
            method: 'POST',
            body: JSON.stringify({
                todoId: todo.id,
                active: !todo.completed,
                message: todo.name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static async removeTodo(todo) {
        await fetch('todo/remove', {
            method: 'DELETE',
            body: JSON.stringify({
                todoId: todo.id,
                active: !todo.completed,
                message: todo.name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}
