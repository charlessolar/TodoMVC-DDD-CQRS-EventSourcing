
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo.Models
{
    public class TodoResponse 
    {
        public Guid Id { get; set; }
        
        public bool Active { get; set; }
        public string Message { get; set; }
    }
}
