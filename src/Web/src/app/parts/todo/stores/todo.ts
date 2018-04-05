import { observable, action } from 'mobx';
import * as validate from 'validate.js';
import Debug from 'debug';

import { CommandStore } from '../../../utils/commandStore';
import rules from '../../../utils/validation';
import { Context } from '../../../context';

import { DTOs } from '../../../utils/Todo.dtos';

const debug = new Debug('todo');


export class TodoStore {

  private _createOp: CommandStore<DTOs.AddTodo>;
  private _deleteOp: CommandStore<DTOs.RemoveTodo>;
  private _markActiveOp: CommandStore<DTOs.MarkTodoActive>;
  private _markCompleteOp: CommandStore<DTOs.MarkTodoComplete>;

  constructor(private _context: Context) {
    this._createOp = new CommandStore<DTOs.AddTodo>(_context);
    this._deleteOp = new CommandStore<DTOs.RemoveTodo>(_context);
    this._markActiveOp = new CommandStore<DTOs.MarkTodoActive>(_context);
    this._markCompleteOp = new CommandStore<DTOs.MarkTodoComplete>(_context);
  }
}
