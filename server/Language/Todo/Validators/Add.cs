using FluentValidation;
using Infrastructure.Commands;

namespace Example.Todo.Validators
{
    public class Add : AbstractValidator<Commands.Add>
    {
        public Add()
        {
            RuleFor(x => x.TodoId).NotEmpty();
            RuleFor(x => x.Message).NotEmpty();
        }
    }
}
