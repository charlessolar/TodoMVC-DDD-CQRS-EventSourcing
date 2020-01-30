using Aggregates;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NServiceBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Presentation
{
    public class AggregatesService : IHostedService
    {
        public AggregatesService(IServiceProvider provider)
        {
            this.provider = provider;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            return MSConfigure.MicrosoftStart(provider);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Aggregates.Bus.Instance.Stop();
        }

        readonly IServiceProvider provider;
    }
}
