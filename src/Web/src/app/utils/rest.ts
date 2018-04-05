import { JsonServiceClient, IRequestFilterOptions, IReturn } from '@servicestack/client';

import Debug from 'debug';

import { config } from '../config';
import { DTOs } from './Todo.dtos';

const debug = new Debug('rest');

export class Rest {
  private _client: JsonServiceClient;

  constructor(private _options: any = {}) {
    this._client = new JsonServiceClient(config.apiUrl);
  }

  public get<TReturn>(request: DTOs.IReturn<TReturn>) {
    return this._client.get(request);
  }
  public post(request: DTOs.IReturnVoid) {
    return this._client.post(request);
  }
  public put(request: DTOs.IReturnVoid) {
    return this._client.put(request);
  }
  public delete(request: DTOs.IReturnVoid) {
    return this._client.delete(request);
  }
}
