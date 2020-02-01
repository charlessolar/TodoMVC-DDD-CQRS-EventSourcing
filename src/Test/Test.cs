
using AutoFixture;
using AutoFixture.AutoFakeItEasy;
using FakeItEasy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Test
{
    public abstract class Test
    {
        protected IFixture Fixture { get; private set; }

        public Test()
        {
            Fixture = new Fixture().Customize(new AutoFakeItEasyCustomization { ConfigureMembers = true });

        }

        protected T Fake<T>() => Fixture.Create<T>();
        protected T[] Many<T>(int count = 3) => Fixture.CreateMany<T>(count).ToArray();
        protected void Inject<T>(T instance) => Fixture.Inject(instance);
    }
}
