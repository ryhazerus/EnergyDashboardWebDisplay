<h1 align="center">
  ⚡ P1 Energy Dashboard
</h1>

<p align="center">
    <i align="center">Self-hosted P1 meter energy dashboard for the HomeWizard 🚀</i>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/status-in_development-red" />
</p>

![alt text](/docs/hero.png)

## Getting Started

To get started, simply follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/ryhazerus/EnergyDashboardWebDisplay
   cd EnergyDashboardWebDisplay
   ```

2. Build and start the system using Docker Compose:

   ```bash
   docker compose up --build -d
   ```

   > If you are on an older version of Docker that does not include the Compose plugin, use the standalone command instead:
   > ```bash
   > docker-compose up --build -d
   > ```

3. Access the application:

   - Frontend: [http://localhost:8001](http://localhost:8001)
   - Backend: [http://localhost:8000](http://localhost:8000) (you shouldn't really need this one)

The web-app will guide you through the setup process, including configuring the connection to your local P1 meter.

---

## Introduction 📑

> **NOTE:** Temperature, functionality is not included in current build

`P1 Energy Dashboard` is a self-hosted webapp for displaying information of a P1 smart meter. The system is in development and only supports the `HomeWizard P1 Smart Meter`. The easiest way to get started with the project is to clone or download this repository and run the docker compose file, but before you start make sure you have the prerequisites installed on your deployment environment.

The web-app is easy to use and provides a setup screen once deployed to be able to configure the connection to your local P1 meter.

### Key Features

- Local graphing of daily energy and gas usage.
- Configurable tariffs for gas prices.
- Simple setup process.

## Prerequisites 🛠️

Check that you have the following dependencies installed before running the system.

- NodeJS v20+ & NPM
- Python 3.12
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
- [x] Configurable tariffs for gas prices
- [ ] Configurable tariffs for energy prices
- [ ] Configurable Meters for users
- [ ] Export data is available for users

## Authors 🤵👲

Contributors names and contact info

- [@Ryhazerus](http://github.com/ryhazerus)

## License 📑

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgements 🤝

This project is inspired by the HomeWizard Energy Display hardware device.

- [HomeWizard Energy Display](https://www.homewizard.com/)
