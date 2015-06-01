#!/usr/bin/env node
// modules =================================================

var program	= require('commander');




program
  .version('0.0.1')
  .option('-ga, --generatelist', 'Generate list')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);
