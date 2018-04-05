
import { observable, action } from 'mobx';
import isString from 'lodash/isString';

import { Context } from '../context';

import { Rest } from './rest';
import { DTOs } from './Todo.dtos';

function createHttpError(payload: any = {}) {
  const { response = {} } = payload;
  function name() {
    if (isString(response)) {
      return response;
    }
    return response.statusText;
  }
  function message() {
    const data = response.data;
    if (isString(data)) {
      return data;
    } else if (data && isString(data.message)) {
      return data.message;
    } else if (payload.message) {
      return payload.message;
    }
  }
  const errorOut = {
    name: name(),
    code: response.status,
    message: message(),
  };
  return errorOut;
}

export class QueryStore<TPayload extends DTOs.IReturn<TResponse>, TResponse> {
  constructor(private _context: Context) {
  }

  @observable
  public loading: boolean;
  @observable
  public data: TResponse;
  @observable
  public error: any;

  @action
  public async fetch(input?: TPayload) {
    try {
      this.loading = true;
      this.error = null;
      const response = await this._context.rest.get(input);
      this.data = response;
      return response;
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

export class PagedStore<TPayload extends DTOs.IReturn<DTOs.Paged<TResponse>>, TResponse> {
  constructor(private _context: Context) {
  }

  @observable
  public loading: boolean;
  @observable
  public error: any;
  @observable
  public data: TResponse[];
  @observable
  public total: number;

  @action
  public async fetch(input: TPayload) {
    try {
      this.loading = true;
      this.error = null;
      const response = await this._context.rest.get(input);
      this.data = response.Records;
      this.total = response.Total;
      return response;
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
