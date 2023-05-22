import * as fs from 'fs';
import * as file1 from './file1.js';
import * as file2 from './file2.js';

// Create the new const object
const newConstData = {
  code: file1.file1Data.code,
  name: file2.file2Data.label,
  lat: file2.file2Data.latitude,
  lon: file2.file2Data.longitude,
};

// Convert the object to a string with the necessary export statement
const newConstOutput = `exports.newConstData = ${JSON.stringify(newConstData, null, 2)};`;

// Write the new const object to a .js file
fs.writeFileSync('newConstData.js', newConstOutput);