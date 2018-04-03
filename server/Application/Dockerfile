FROM microsoft/dotnet
MAINTAINER charlessolar@gmail.com

ARG CONT_IMG_VER
ENV CONT_IMG_VER ${CONT_IMG_VER:-v0.0.1}

LABEL Description="Application" Vendor="Pulse Inc" Version=${CONT_IMG_VER}

WORKDIR /app
COPY . .

ENTRYPOINT ["dotnet", "Application.dll"]
