# Computation

A demonstrator running an algorithm for finding the winner and the winning price of a second price sealed-bid auction.

## Installing

A quick introduction of the minimal setup you need to make program running.

```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install --lts
nvm use --lts
```

Commands above allow use to install nvm in order to manage the version of Node, install the LTS version and set it as functional.

## Initial Configuration

Some actions must be performed, before to launch the program:

```shell
git clone https://github.com/romad90/sealed-bid-auction.git
cd sealed-bid-auction/
npm install
npm run docs            #Generate api docs, launch index.html in docs folder
npm run test            #Launch all unit tests
```

And state what happens step-by-step.

## Features

The program run as node-cli program:
* The main goal is to run computation in order the determine the winner and the winning price of a second price sealed-bid-auction.
* It can be run locally, and be target as REST API server, run computation --help for more information.

## Licensing

"The code in this project is licensed under MIT license."
