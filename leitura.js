//--------------------------------------------------------------//
//                    CRIAÇÃO DAS VARIAVEIS                     //
//--------------------------------------------------------------//
const readline = require('readline')
const fs = require('fs');
const { Console } = require('console');
const { DH_CHECK_P_NOT_SAFE_PRIME } = require('constants');
const readable = fs.createReadStream('ARQUIVOS/pf0022pu.htm');
var texto = [];
var final = [];
var teste = [];

const rl = readline.createInterface({
    input: readable,
    output: process.stdount,
    terminal: false
})

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'aula'
});

//--------------------------------------------------------------//
//                      EXECUÇÃO DO CODIGO                      //
//--------------------------------------------------------------//

//LEITURA DE CADA LINHA DO TEXTO
rl.on('line', (line) => {
    var resultado = line.toUpperCase();
    
    for (var i = 0; i < 3; i++) {
        resultado = acentuacao(resultado);
    }

    resultado = tags(resultado);

    // TRATAMENTO DE CARACTERES ESPECIAIS E NUMERICOS
    resultado = resultado.replace(/[^a-zA-Z]/g, ' ');

    //TRATAMENTO NUMERICO
    resultado = resultado.replace(/[0-9]/g, ' ');

    //SEPARAÇÃO DAS PALAVRAS POR ESPAÇO
    resultado = resultado.split(' ');
    vetor(resultado);
})

setTimeout(() => {
    conexaomysql();
    vfinal();
    ocorrencia();
    encerarmysql();
}, 3000);

//--------------------------------------------------------------//
//       MANIPULAÇÃO E AJUSTES DOS DADOS DO ARQUIVO HTM         //
//--------------------------------------------------------------//

//TRATAMRNTO DE ACENTUAÇÃO
function acentuacao(resultado) {
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

//TRATAMENTO DE TAGS
function tags(resultado) {
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
function vetor(resultado) {
    if (resultado.filter(Boolean).length > 0) {
        texto.push(resultado.filter(Boolean));
    }
}

//--------------------------------------------------------------//
//            MANIPULAÇÃO DOS DADOS NO MYSQL                    //
//--------------------------------------------------------------//

//conecta ao banco e cria a tabela 
function conexaomysql(){
    connection.connect();
    
    //criando tabela
    connection.query(
        'create table palavras(id smallint unsigned not null auto_increment, palavra varchar(50),PRIMARY KEY (id));',
        function (error, results, fields) {
            if (error) throw error;
    });
}

function vfinal() {
    var k = 1;
    for (var i = 0; i < texto.length; i++) {
        for (var j = 0; j < texto[i].length; j++) {
            final[k] = texto[i][j];
            const sql = 'insert into palavras values(?,?);'
            connection.query(sql,[k,final[k]], function (error, results, fields) {
                if (error) throw error;
                });
            k++;
        }
    }
}

//calcula o numero de ocorrencia mysql
function ocorrencia(){
    connection.query('select palavra,count(*) as ocorrencia from palavras group by palavra order by ocorrencia desc;',
     function (error, results, fields) {
        if (error) throw error;
        teste=results;
        console.log(teste);
        }); 
}

//finalizando conexao mysql
function encerarmysql(){
    connection.query('drop table palavras', function (error, results, fields) {
        if (error) throw error;
      });
    connection.end();
}