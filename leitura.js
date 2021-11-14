const readline = require('readline')
const fs = require('fs')
const readable = fs.createReadStream('pf0022pu.htm')

const rl = readline.createInterface({
    input: readable,
    output: process.stdount
})

rl.on('line', (line)=>{
    var resultado = line.toUpperCase();
    // console.log('>>>',resultado);
    resultado = resultado.replace('Ã', 'A');
    resultado = resultado.replace('À', 'A');
    resultado = resultado.replace('Á', 'A');
    resultado = resultado.replace('Â', 'A');
    resultado = resultado.replace('Ç', 'C');
    resultado = resultado.replace('Ê', 'E');
    resultado = resultado.replace('É', 'E');
    resultado = resultado.replace('Í', 'I');
    resultado = resultado.replace('Ó', 'O');
    resultado = resultado.replace('Õ', 'O');
    resultado = resultado.replace('Ú', 'U');
    // resultado = resultado.replace(/[^a-zA-Z]/g, ' ');
    // resultado = resultado.split(' ');
    console.log('<<<',resultado);
})
// 