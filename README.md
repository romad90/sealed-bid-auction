# Computation

A demonstrator running an algorithm for finding the winner and the winning price of a second price sealed-bid auction. It was an home work done, for a company few years ago.

## Instructions

Teads development test

Problem

Let's consider a second-price, sealed-bid auction:
An object is for sale with a reserve price.
We have several potential buyers, each one being able to place one or more bids.
The buyer winning the auction is the one with the highest bid above the reserve price.
The winning price is the highest bid price from a non-winning buyer above the reserve price (or the reserve price if none applies)
.
Example

Consider 5 potential buyers (A, B, C, D, E) who compete to acquire an object with a reserve price set at 100 euros, bidding as follows:

A: 2 bids of 110 and 130 euros
B: 0 bid
C: 1 bid of 125 euros
D: 3 bids of 105, 115 and 90 euros
E: 3 bids of 132, 135 and 140 euros

The buyer E wins the auction at the price of 130 euros.
Goal

The goal is to implement an algorithm for finding the winner and the winning price. Please implement the solution in the language of your choice (preferably Scala). Tests should be separated from your algorithm.

Be careful, the problem is non-deterministic on purpose. Be smart!

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
npm run docs            #Generate api docs, jsdoc
npm run test            #Launch all unit tests
```

And state what happens step-by-step.

## Features

The program run as node-cli program:
* The main goal is to run computation in order the determine the winner and the winning price of a second price sealed-bid-auction.
* It can be run locally, and be target as REST API server, run computation --help for more information.

## Licensing

"The code in this project is licensed under MIT license."
