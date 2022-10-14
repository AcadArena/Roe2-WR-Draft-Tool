# WildRift Draft tool

## What is this?

This is a draft tool for Wild Rift, this is still process is very manual because wild rift doesn't have an API to get the data from the game.

## Requirements

This tool required NodeJS and NPM to be installed on your computer. You can download NodeJS from [here](https://nodejs.org/en/download/). This tool also requires `yarn` to be installed. You can install it by running `npm install -g yarn` in your terminal.

## Installation

1. Clone this repository
2. Run `yarn install` in the root directory of this repository
3. Run `yarn start` to start the application

## Usage

1. Run `yarn start` to start the application
2. Open your browser and go to [`localhost:1337`][controller-link]. You can use the example overlay at [`localhost:1337/allgs2`][allg-link]

## Development

1. Install the packages by running `yarn` at the root folder
2. Run `yarn dev` to start the development server
3. Can create you own version of the overlay in the `apps/frontend/src/pages` folder. You can use the `allgs2` as an example.

## License

This program is under MIT license - [Read the license here][license-link]

[license-link]: LICENSE.md
[controller-link]: localhost:1337
[allg-link]: localhost:1337/allgs2
