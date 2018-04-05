using FluentValidation;
using Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo.Validators
{
    public class MarkComplete : AbstractValidator<Commands.MarkComplete>
    {
        public MarkComplete()
        {
            RuleFor(x => x.TodoId).NotEmpty();
        }
    }
}
