<h1 align="center">
  ⚡ P1 Energy Dashboard
</h1>

<p align="center">
    <i align="center">Self-hosted P1 meter energy dashboard for your home 🚀</i>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/status-in_development-red" />
</p>

![alt text](/docs/hero.png)

## Introduction 📑

> **NOTE:** Temperature, tariffs and solar is not included in current build

`P1 Energy Dashboard` is a self-hosted webapp for displaying information of a P1 smart meter. Currently the system is in development and only supports the `HomeWizard P1 Smart Meter`.
The easiest way to get started with the project is to clone or download this repository and run the docker compose file, but before you start make sure you have the prerequisites installed on your deployment environment.

The web-app is easy to use and provides a setup screen once deployed to be able to configure the connection to your local P1 meter.

## Prerequisites 🛠️

Check that you have the following depencies installed before running the system.

- NodeJS & NPM
- Docker

## Built with 🛠️

This project uses the following technologies:

- FastAPI & Python 3.12
- NextJS & Typescript
- Poetry
- Docker

### Roadmap 🗺️

- [x] Nothing is currently working but everything is there
- [x] Meters for Energy and Gas are included
- [x] Local db for graphing daily usage is available
- [x] Meter for water is included
- [ ] Configurable tariffs for gas/energy prices
- [ ] Configurable Meters for users
- [ ] Export data is available for users
- [ ] Support other smart meters

## Authors 🤵👲

Contributors names and contact info

- [@Ryhazerus](http://github.com/ryhazerus)

## License 📑

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgements 🤝

This project is inspired by the HomeWizard Energy Display hardware device.

- [HomeWizard Energy Display](https://www.homewizard.com/)
