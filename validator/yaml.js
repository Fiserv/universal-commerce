#!/usr/bin/env node

const fs = require('fs');
const yaml = require('js-yaml');
const SwaggerParser = require('@apidevtools/swagger-parser');

const args = process.argv.slice(2);
const folder = '../' + (args?.[0] || 'references/1.0.0');

const failValidation = (message) => {
  console.log('------------------------- VALIDATOR FAILED --------------------------')
  console.log(message)
  process.exit(1);
};

const validateDir = async (dir) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    files.forEach(async file => {

      if (file.isDirectory()) {
        validateDir(`${dir}/${file.name}`);
      } else if (/\.yaml$/.test(file.name)){

        try {
          const fileName = `${dir}/${file.name}`;
          const content = fs.readFileSync(fileName, 'utf8');
          const apiJson = yaml.load(content);
          if (!apiJson.paths || !Object.keys(apiJson.paths).length) {
            failValidation('No path provided!');
          }
          const parsedData = await SwaggerParser.validate(apiJson, );
          console.log(`${fileName} - PASSED`);
        
        } catch (e) {
          failValidation(e.message);
        }
      }
    });
  });
};

try {
  validateDir(folder);
} catch (e) {
  failValidation(e.message);
}
