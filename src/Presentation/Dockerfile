FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
ENV ASPNETCORE_URLS https://+;http://+
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["/", "/"]
RUN dotnet restore "Presentation/Presentation.csproj"
WORKDIR /src/Presentation
RUN dotnet build "Presentation.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Presentation.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Presentation.dll"]