using AutoFixture;
using System;
using System.Collections.Generic;
using System.Text;

namespace Test
{
    public abstract class TestSubject<T> : Test, IDisposable
    {
        private Lazy<T> _lazy;
        protected T Sut => _lazy.Value;
        protected Aggregates.TestableContext Context;

        public TestSubject()
        {
            _lazy = new Lazy<T>(CreateSut);
            Context = new Aggregates.TestableContext();
            Context.Extensions.Set("CommandDestination", "domain");
        }
        public void Dispose()
        {
            if (Sut is IDisposable)
                (Sut as IDisposable).Dispose();
        }

        protected virtual T CreateSut() => Fixture.Create<T>();
    }
}