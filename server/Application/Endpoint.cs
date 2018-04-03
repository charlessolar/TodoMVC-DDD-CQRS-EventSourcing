using Aggregates;
using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;
using FluentValidation;
using Infrastructure.Validation;
using NServiceBus;
using NServiceBus.Serilog;
using Serilog;
using StructureMap;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Example
{
    internal class Program
    {
        static readonly ManualResetEvent QuitEvent = new ManualResetEvent(false);
        private static IContainer _container;
        private static IEndpointInstance _bus;

        private static void UnhandledExceptionTrapper(object sender, UnhandledExceptionEventArgs e)
        {
            Log.Fatal("<{EventId:l}> Unhandled exception {Exception}", "Unhandled", e.ExceptionObject);
            Console.WriteLine("");
            Console.WriteLine("FATAL ERROR - Press return to close...");
            Console.ReadLine();
            Environment.Exit(1);
        }


        private static void Main(string[] args)
        {
            Console.Title = "Application";
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Warning()
               .WriteTo.Console(outputTemplate: "[{Level}] {Message}{NewLine}{Exception}")
               .CreateLogger();

            AppDomain.CurrentDomain.UnhandledException += UnhandledExceptionTrapper;

            NServiceBus.Logging.LogManager.Use<SerilogFactory>();

            _container = new Container(x =>
            {
                x.For<IValidatorFactory>().Use<StructureMapValidatorFactory>();

                x.Scan(y =>
                {
                    y.TheCallingAssembly();

                    y.WithDefaultConventions();
                });
            });

            // Start the bus
            _bus = InitBus().Result;

            Console.WriteLine("Press CTRL+C to exit...");
            Console.CancelKeyPress += (sender, eArgs) =>
            {
                QuitEvent.Set();
                eArgs.Cancel = true;
            };
            QuitEvent.WaitOne();

            _bus.Stop().Wait();
        }
        private static async Task<IEndpointInstance> InitBus()
        {
            var config = new EndpointConfiguration("application");

            config.UsePersistence<InMemoryPersistence>();
            config.UseContainer<StructureMapBuilder>(c => c.ExistingContainer(_container));

            config.Pipeline.Remove("LogErrorOnInvalidLicense");

            var endpoints = new[] { new IPEndPoint(IPAddress.Loopback, 2113) };
            var cred = new UserCredentials("admin", "changeit");
            var settings = EventStore.ClientAPI.ConnectionSettings.Create()
                .KeepReconnecting()
                .KeepRetrying()
                .SetGossipSeedEndPoints(endpoints)
                .SetClusterGossipPort(2113)
                .SetHeartbeatInterval(TimeSpan.FromSeconds(30))
                .SetGossipTimeout(TimeSpan.FromMinutes(5))
                .SetHeartbeatTimeout(TimeSpan.FromMinutes(5))
                .SetTimeoutCheckPeriodTo(TimeSpan.FromMinutes(1))
                .SetDefaultUserCredentials(cred);

            var client = EventStoreConnection.Create(settings, endpoints.First(), "Application");

            await client.ConnectAsync().ConfigureAwait(false);

            await Aggregates.Configuration.Build(c => c
                .StructureMap(_container)
                .EventStore(new[] { client })
                .NewtonsoftJson()
                .NServiceBus(config)
                .SetUniqueAddress(Defaults.Instance.ToString())
                .SetRetries(20)
            ).ConfigureAwait(false);

            return Aggregates.Bus.Instance;
        }
    }
}
