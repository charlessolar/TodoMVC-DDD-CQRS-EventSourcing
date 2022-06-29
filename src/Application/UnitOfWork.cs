using Aggregates;
using Aggregates.UnitOfWork.Query;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class UnitOfWork : Aggregates.UnitOfWork.IApplicationUnitOfWork, Aggregates.UnitOfWork.IBaseUnitOfWork
    {
        private static ConcurrentDictionary<Guid, object> MemoryDB = new ConcurrentDictionary<Guid, object>();

        private enum Operation
        {
            Add,
            Update,
            Remove,
        }
        private ConcurrentBag<(Operation Operation, object document)> _pending = new ConcurrentBag<(Operation Operation, object document)>();

        public dynamic Bag { get; set; }

        public Task Add<T>(Id id, T todo) where T : class
        {
            _pending.Add((Operation.Add, todo));
            return Task.CompletedTask;
        }
        public Task Update<T>(Id id, T todo) where T : class
        {
            _pending.Add((Operation.Update, todo));
            return Task.CompletedTask;
        }

        public Task<T> Get<T>(Id id) where T : class
        {
            if (MemoryDB.TryGetValue(id, out var todo))
                return Task.FromResult((T)todo);
            throw new ArgumentException("Unknown todo");
        }
        public Task<T> TryGet<T>(Id id) where T : class
        {
            if (MemoryDB.TryGetValue(id, out var todo))
                return Task.FromResult((T)todo);
            return Task.FromResult((T)null);
        }

        public Task Delete<T>(Id id) where T : class
        {
            if (MemoryDB.TryGetValue(id, out var todo))
                _pending.Add((Operation.Remove, todo));
            return Task.CompletedTask;
        }

        public Task<IQueryResult<T>> Query<T>(IDefinition query) where T : class
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Example.Todo.Models.TodoResponse> GetAll()
        {
            return MemoryDB.Values.Cast<Example.Todo.Models.TodoResponse>().ToList();
        }

        public Task Begin()
        {
            return Task.CompletedTask;
        }

        public Task End(Exception ex = null)
        {
            if (ex != null)
                return Task.CompletedTask;

            foreach(var todo in _pending)
            {
                var model = (Example.Todo.Models.TodoResponse)todo.document;
                switch (todo.Operation)
                {
                    case Operation.Add:
                        if (!MemoryDB.TryAdd(model.Id, new Example.Todo.Models.TodoResponse
                        {
                            Id = model.Id,
                            Message = model.Message,
                            Active = true
                        }))
                            throw new InvalidOperationException($"Todo {model.Id} already exists");
                        break;
                    case Operation.Update:
                        if (!MemoryDB.TryGetValue(model.Id, out var existing))
                            throw new InvalidOperationException($"Todo {model.Id} doesn't exist");

                        if (!MemoryDB.TryUpdate(model.Id, new Example.Todo.Models.TodoResponse
                        {
                            Id = model.Id,
                            Message = model.Message,
                            Active = model.Active
                        }, existing))
                            throw new InvalidOperationException($"Failed to update {model.Id}");
                        break;
                    case Operation.Remove:
                        if (!MemoryDB.TryRemove(model.Id, out var temp))
                            throw new InvalidOperationException($"Todo {model.Id} doesn't exist");
                        break;
                }
            }

            return Task.CompletedTask;
        }
    }
}
