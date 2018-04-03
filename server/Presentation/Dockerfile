FROM microsoft/aspnetcore:2.0
MAINTAINER charlessolar@gmail.com

ARG CONT_IMG_VER
ENV CONT_IMG_VER ${CONT_IMG_VER:-v0.0.1}

LABEL Description="Presentation" Vendor="Pulse Inc" Version=${CONT_IMG_VER}

WORKDIR /app
COPY . ./

ENV ASPNETCORE_URLS http://*:80
EXPOSE 80

ENTRYPOINT ["dotnet", "Presentation.dll"]
