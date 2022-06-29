
FROM mcr.microsoft.com/dotnet/runtime:6.0-bullseye-slim AS base


FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim AS build
WORKDIR /src
COPY ["/", "/"]
RUN dotnet restore "Application/Application.csproj"
WORKDIR /src/Application
RUN dotnet build "Application.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Application.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Application.dll"]
