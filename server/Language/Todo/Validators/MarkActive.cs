using FluentValidation;
using Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo.Validators
{
    public class MarkActive : AbstractValidator<Commands.MarkActive>
    {
        public MarkActive()
        {
            RuleFor(x => x.TodoId).NotEmpty();
        }
    }
}
