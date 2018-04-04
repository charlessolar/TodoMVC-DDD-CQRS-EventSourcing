FROM microsoft/aspnetcore-build:2.0 AS build

MAINTAINER charlessolar@gmail.com

WORKDIR /src

# only copy the projects so restore layer isnt re-done for source changes
COPY *.sln .
COPY Domain/*.csproj ./Domain/
COPY Application/*.csproj ./Application/
COPY Presentation/*.csproj ./Presentation/
COPY Infrastructure/*.csproj ./Infrastructure/
COPY Language/*.csproj ./Language/

RUN dotnet restore

COPY . .
WORKDIR /src/Presentation
RUN dotnet build --no-restore -c Release -o /app

#FROM build AS testrunner
#WORKDIR /src/tests
#ENTRYPOINT ["dotnet", "test", "--logger:trx"]

#FROM build AS test
#WORKDIR /src/tests
#RUN dotnet test

FROM build AS publish
WORKDIR /src/Presentation
RUN dotnet publish --no-restore -c Release -o /app


FROM microsoft/aspnetcore:2.0 AS runtime
EXPOSE 80
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Presentation.dll"]
