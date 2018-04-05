
import { observable, action } from 'mobx';
import isString from 'lodash/isString';

import { Context } from '../context';

import { Rest } from './rest';
import { DTOs } from './Todo.dtos';

export class CommandStore<TPayload extends DTOs.IReturnVoid> {
  constructor(private _context: Context) {
  }

  @observable
  public loading: boolean;
  @observable
  public error: any;

  @action
  public async send(input: TPayload) {
    try {
      this.loading = true;
      this.error = null;
      await this._context.rest.post(input);
      return;
    } catch (error) {
      this.error = error;
      const { response: { status } } = error;
      if (![401, 422].includes(status)) {
        // context.alertStack.add(<Alert.Danger {...createHttpError(error)} />)
      }
      throw error;
    } finally {
      this.loading = false;
    }
  }

}
