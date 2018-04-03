using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Queries
{

    // Used when replying to a query
    public interface IReply<T> : Aggregates.Messages.IMessage
    {
        string ETag { get; set; }

        T Payload { get; set; }
    }
    public interface IPagedReply<T> : Aggregates.Messages.IMessage
    {
        long ElapsedMs { get; set; }

        long Total { get; set; }

        IEnumerable<T> Records { get; set; }
    }
}
