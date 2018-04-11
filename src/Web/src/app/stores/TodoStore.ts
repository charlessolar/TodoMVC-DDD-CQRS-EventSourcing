import { observable, computed, action, runInAction } from 'mobx';

import { inject, Client } from '../utils';
import { DTOs } from '../utils/Todo.dtos';

import { TodoModel } from 'app/models';

export class TodoStore {
  @inject(Client)
  private _client: Client;

  @observable
  public loading: boolean;
  @observable
  public todos: Array<TodoModel>;

  constructor() {
    this.loading = false;
    this.todos = new Array<TodoModel>();
  }

  @computed
  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  @computed
  get completedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  @action
  public async getAllTodos() {
    this.loading=true;
    const request = new DTOs.AllTodos();

    try {
      const response = await this._client.query(request);

      this.pushTodos(response.records);
      this.loading=false;
    } catch {
      throw 'failed to get todos';
    }
  }
  @action
  public async getActiveTodos() {
    this.loading=true;
    const request = new DTOs.ActiveTodos();

    try {
      const response = await this._client.query(request);

      this.pushTodos(response.records);
      this.loading=false;
    } catch {
      throw 'failed to get todos';
    }
  }
  @action
  public async getCompletedTodos() {
    this.loading=true;
    const request = new DTOs.CompleteTodos();

    try {
      const response = await this._client.query(request);

      this.pushTodos(response.records);
      this.loading=false;
    } catch {
      throw 'failed to get todos';
    }
  }

  @action
  private pushTodos(todos: DTOs.TodoResponse[]) {

    todos.forEach((todo) => {
      this.todos.push(new TodoModel(todo.message, todo.active, todo.id));
    });
  }

  @action
  public async addTodo(message: string) {
    const model = new TodoModel(message, false);
    const request = new DTOs.AddTodo();

    request.todoId = model.id;
    request.message = model.text;

    try {
      await this._client.command(request);

      runInAction("add todo", () => {
        this.todos.push(model);
      });
    } catch {
      throw 'failed to save todo';
    }
  }

  public editTodo(message: string) {
    throw 'editing disabled for now'
  }

  @action
  public async deleteTodo(id: string) {
    const request = new DTOs.RemoveTodo();

    request.todoId = id;

    try {
      await this._client.command(request);

      runInAction('delete todo', () => {
        this.todos = this.todos.filter((todo) => todo.id == id);
      });
    } catch {
      throw 'failed to remove todo';
    }
  }

  @action
  public async completeAll() {
    
    await Promise.all(this.todos.map(async (todo) => {
      const request = new DTOs.MarkTodoComplete();
      request.todoId = todo.id;

      await this._client.command(request);

      runInAction('complete todo', () => {
        todo.completed = true;
      });
    }));
  };

  @action
  public async clearCompleted() {
    
    await Promise.all(this.todos.map(async (todo) => {
      const request = new DTOs.MarkTodoActive();
      request.todoId = todo.id;

      await this._client.command(request);

      runInAction('activate todo', () => {
        todo.completed = false;
      });
    }));
  };
}

export default TodoStore;
