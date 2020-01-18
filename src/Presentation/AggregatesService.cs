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
        public AggregatesService(EndpointConfiguration config, IServiceCollection collection, IServiceProvider provider)
        {
            this.config = config;
            this.collection = collection;
            this.provider = provider;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            return Aggregates.Configuration.Build(c => c
                   .Microsoft(collection, provider)
                   .NewtonsoftJson()
                   .NServiceBus(config)
                   .SetUniqueAddress(Defaults.Instance.ToString())
                   .SetPassive()
                   .SetRetries(20)
               );
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return endpoint.Stop();
        }

        IEndpointInstance endpoint;
        readonly EndpointConfiguration config;
        readonly IServiceCollection collection;
        readonly IServiceProvider provider;
    }
}
