using Aggregates;
using Infrastructure;
using NServiceBus;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables("TODOMVC_");

// Add services to the container.

builder.Services.AddControllersWithViews();

var endpointConfiguration = new EndpointConfiguration("Web");

var transport = endpointConfiguration.UseTransport<RabbitMQTransport>();
transport.UseConventionalRoutingTopology(QueueType.Classic);
transport.ConnectionString(GetRabbitConnectionString(builder.Configuration));

endpointConfiguration.Pipeline.Register(
            behavior: typeof(IncomingLoggingMessageBehavior),
            description: "Logs incoming messages"
        );
endpointConfiguration.Pipeline.Register(
            behavior: typeof(OutgoingLoggingMessageBehavior),
            description: "Logs outgoing messages"
        );

builder.Host
    .AddAggregatesNet(c => c
            .NewtonsoftJson()
            .NServiceBus(endpointConfiguration)
            .SetCommandDestination("Domain"));

var app = builder
    .Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();


static string GetRabbitConnectionString(IConfiguration config)
{
    var host = config["RabbitConnection"];
    var user = config["RabbitUserName"];
    var password = config["RabbitPassword"];

    if (string.IsNullOrEmpty(user))
        return $"host={host}";

    return $"host={host};username={user};password={password};";
}


