using Aggregates;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NServiceBus;
using Infrastructure;
using System.Threading.Tasks;
using System;
using System.Threading;

var configurationBuilder = new ConfigurationBuilder();
configurationBuilder.AddEnvironmentVariables("TODOMVC_");

var configuration = configurationBuilder.Build();

var endpointConfiguration = new EndpointConfiguration("Application");

endpointConfiguration.UsePersistence<InMemoryPersistence>();
var transport = endpointConfiguration.UseTransport<RabbitMQTransport>();
transport.UseConventionalRoutingTopology();
transport.ConnectionString(GetRabbitConnectionString(configuration));

endpointConfiguration.Pipeline.Register(
            behavior: typeof(IncomingLoggingMessageBehavior),
            description: "Logs incoming messages"
        );
endpointConfiguration.Pipeline.Register(
            behavior: typeof(OutgoingLoggingMessageBehavior),
            description: "Logs outgoing messages"
        );


var host = Host.CreateDefaultBuilder(args)
    .UseConsoleLifetime()
    .AddAggregatesNet(c => c
            .EventStore(es => es.AddClient(GetEventStoreConnectionString(configuration), "Application"))
            .NewtonsoftJson()
            .Application<Application.UnitOfWork>()
            .NServiceBus(endpointConfiguration)
            .SetCommandDestination("Domain"))
    .ConfigureServices((context, services) =>
    {
        services.AddLogging(builder =>
        {
            builder.ClearProviders();
            builder.AddConfiguration(context.Configuration.GetSection("Logging"));
            builder.AddFile(o => o.RootPath = AppContext.BaseDirectory);
        });
    }).Build();


await host.RunAsync();


static string GetRabbitConnectionString(IConfiguration config)
{
    var host = config["RabbitConnection"];
    var user = config["RabbitUserName"];
    var password = config["RabbitPassword"];

    if (string.IsNullOrEmpty(user))
        return $"host={host}";

    return $"host={host};username={user};password={password};";
}
static string GetEventStoreConnectionString(IConfiguration config)
{
    var host = config["EventStoreConnection"];
    var user = config["EventStoreUserName"] ?? "admin";
    var password = config["EventStorePassword"] ?? "changeit";
    return $"esdb://{user}:{password}@{host}?tls=false";
}


