﻿
FROM mcr.microsoft.com/dotnet/runtime:6.0-bullseye-slim AS base


FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim AS build
WORKDIR /src
COPY ["/", "/"]
RUN dotnet restore "Domain/Domain.csproj"
WORKDIR /src/Domain
RUN dotnet build "Domain.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Domain.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Domain.dll"]
