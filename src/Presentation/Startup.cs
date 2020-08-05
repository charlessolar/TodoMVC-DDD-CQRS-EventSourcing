using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aggregates;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NServiceBus;
using Presentation.Extensions;

namespace Presentation
{
    public class Startup
    {


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });

            var config = new EndpointConfiguration("presentation2");

            // Configure RabbitMQ transport
            var transport = config.UseTransport<RabbitMQTransport>();
            transport.UseConventionalRoutingTopology();
            transport.ConnectionString(GetRabbitConnectionString());

            config.UsePersistence<InMemoryPersistence>();

            config.Pipeline.Remove("LogErrorOnInvalidLicense");


            services.AddAggregatesNet(config);

            services.AddControllers();

            services.AddLogging(loggingBuilder => loggingBuilder.AddDebug());
        }
        private string GetRabbitConnectionString()
        {
            var host = Configuration.GetValue<string>("RabbitConnection");
            var user = Configuration.GetValue<string>("RabbitUserName", "");
            var password = Configuration.GetValue<string>("RabbitPassword", "");

            if (string.IsNullOrEmpty(user))
                return $"host={host}";

            return $"host={host};username={user};password={password};";
        }


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
