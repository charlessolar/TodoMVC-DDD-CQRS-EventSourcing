using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NServiceBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddAggregatesNet(this IServiceCollection services, EndpointConfiguration configuration)
        {
            services.AddSingleton<IHostedService>(provider => new AggregatesService(configuration, services, provider));
            
            services.AddSingleton<IMessageSession>(_ => Aggregates.Bus.Instance);

            return services;
        }
    }
}
