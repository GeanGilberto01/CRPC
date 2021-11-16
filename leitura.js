const readline = require('readline')
const fs = require('fs')
const readable = fs.createReadStream('pf0022pu.htm')
var texto = [];

const rl = readline.createInterface({
    input: readable,
    output: process.stdount
})

rl.on('line', (line)=>{
    var resultado = line.toUpperCase();
    // // console.log('>>>',resultado);
    resultado = acentuacao(resultado);

    resultado = tags(resultado);

    resultado = acentuacao(resultado);

    // TRATAMENTO DE CARACTERES ESPECIAIS E NUMERICOS
    resultado = resultado.replace(/[^a-zA-Z]/g, ' ');

    //TRATAMENTO NUMERICO
    resultado = resultado.replace(/[0-9]/g, ' ');

    //SEPARAÇÃO DAS PALAVRAS POR ESPAÇO
    resultado = resultado.split(' ');
    // console.log('<<<',resultado);
    vetor(resultado);
})

function acentuacao(resultado){
    //TRATAMRNTO DE ACENTUAÇÃO
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
    return resultado;
}

function tags(resultado){
    //TRATAMENTO DE TAGS
    resultado = resultado.replace('<HTML>', ' ');
    resultado = resultado.replace('<HEAD>', ' ');
    resultado = resultado.replace('<TITLE>', ' ');
    resultado = resultado.replace('ENTREVISTA Nº', ' ');
    resultado = resultado.replace('</TITLE>', ' ');
    resultado = resultado.replace('<LINK', ' ');
    resultado = resultado.replace('REL=STYLESHEET', ' ');
    resultado = resultado.replace('TYPE="TEXT/CSS"', ' ');
    resultado = resultado.replace('HREF="ESTILOS.CSS"', ' ');
    resultado = resultado.replace('</HEAD>', ' ');
    resultado = resultado.replace('<BODY', ' ');
    resultado = resultado.replace('BGCOLOR="#FFFFFF"', ' ');
    resultado = resultado.replace('TEXT="#000000"', ' ');
    resultado = resultado.replace('LINK="#009900"', ' ');
    resultado = resultado.replace('VLINK="#000000"', ' ');
    resultado = resultado.replace('ALINK="#000000"', ' ');
    resultado = resultado.replace('LEFTMARGIN=', ' ');
    resultado = resultado.replace('TOPMARGIN=', ' ');
    resultado = resultado.replace('MARGINWIDTH=', ' ');
    resultado = resultado.replace('MARGINHEIGHT=', ' ');
    resultado = resultado.replace('<TABLE', ' ');
    resultado = resultado.replace('CELLPADDING=', ' ');
    resultado = resultado.replace('CELLSPACING=', ' ');
    resultado = resultado.replace('BORDER=', ' ');
    resultado = resultado.replace('<TR', ' ');
    resultado = resultado.replace('VALIGN="TOP"', ' ');
    resultado = resultado.replace('<TD', ' ');
    resultado = resultado.replace('COLSPAN=', ' ');
    resultado = resultado.replace('BGCOLOR="#FFCC66"', ' ');
    resultado = resultado.replace('<FONT', ' ');
    resultado = resultado.replace('SIZE="+1"', ' ');
    resultado = resultado.replace('<B>', ' ');
    resultado = resultado.replace('</B>', ' ');
    resultado = resultado.replace('</FONT>', ' ');
    resultado = resultado.replace('<P>', ' ');
    resultado = resultado.replace('<A HREF="TABELA - CODIGOS DOS GRUPOS PROFISSIONAIS.HTM">', ' ');
    resultado = resultado.replace('</A>', ' ');
    resultado = resultado.replace('<BR>', ' ');
    resultado = resultado.replace('<A HREF="TABELA - CODIGOS DOS INQUIRIDORES DO PF.HTM">', ' ');
    resultado = resultado.replace('<A HREF="TABELA - CODIGOS DOS NIVEIS DE INSTRUCAO.HTM">', ' ');
    resultado = resultado.replace('</TD>', ' ');
    resultado = resultado.replace('</TR>', ' ');
    resultado = resultado.replace('</TABLE>', ' ');
    resultado = resultado.replace('WIDTH=', ' ');
    resultado = resultado.replace('HEIGHT=', ' ');
    resultado = resultado.replace('SIZE=', ' ');
    resultado = resultado.replace('&NBSP;', ' ');
    resultado = resultado.replace('FACE="COURIER NEW', ' ');
    resultado = resultado.replace('</P>', ' ');
    resultado = resultado.replace('A:', ' ');
    resultado = resultado.replace('X:', ' ');
    resultado = resultado.replace('</BODY>', ' ');
    resultado = resultado.replace('</HTML>', ' ');
    return resultado;
}

//CRIAÇÃO DO VETOR
function vetor(resultado){
    texto.push(resultado.filter(Boolean));
    for(var i = 0; i < 14; i++){
        delete texto[i];
    }
    // exclusao();
    console.log(texto);
}

function exclusao(){
    var teste = texto.filter(Boolean);
    console.log(teste);
    
}

Array.prototype.clean = function() {
    for (var i = 0; i < texto.length; i++) {
        for (var j = 0; j < texto[i].length; j++) {
            if (texto[i][j] === null) {         
                texto[i].splice(j, 1);
                j--;
            }
        }
    }
  };