#!/usr/bin/env node

`use strict`

const program = require('commander')

program
  .version('1.0.0')
  .description(`A demonstrator running an algorithm for finding the winner and the winning price of a second price sealed-bid auction. \n*DISCLAIMER: Only processes inputs with the required format. All amount are integers.\n{\n	"auctions":[\n			{\n				"reserve_price": 100,\n				"bidderNameA": [ 110, 130 ],\n				"bidderNameB": [],
		    		"bidderNameC": [ 125 ],
		    		"bidderNameD": [ 105, 115, 90 ],
		    		"bidderNameE": [ 132, 135, 140 ],
				"bidderNameZ": [ ... ]
			},
			...
	]
}\n#required: auctions, reserve_price`)

program
  .command("local <source>")
  .description(`run the computation locally on the .json path file specified\n$ computation local '/open/some/file.json'\n`)
  .action(require('./src/local-processing.js'))

program
  .command("api")
  .description(`run the computation via a REST API\n $ computation api`)
  .action(require('./src/fastify/server.js'))

program.parse(process.argv)

process.stdin.resume();
process.on('SIGINT', function () {
  process.exit(0);
});
