using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Queries
{

    // Used when replying to a query
    public class Reply<T> : Aggregates.Messages.IMessage
    {
        public string ETag { get; set; }

        public T Payload { get; set; }
    }
    public class PagedReply<T> : Aggregates.Messages.IMessage
    {
        public long ElapsedMs { get; set; }

        public long Total { get; set; }

        public IEnumerable<T> Records { get; set; }
    }
}
