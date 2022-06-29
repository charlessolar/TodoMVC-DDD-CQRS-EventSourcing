using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Example.DTOs
{
    public class Todo
    {
        public Guid TodoId { get; set; }
        public string Message { get; set; } = "";
    }
}
