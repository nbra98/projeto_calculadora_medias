const form = document.querySelector('#form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji Comemorando">';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji Decepcionado">';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
let notaMinima = parseFloat(prompt('Digite a nota mínima para aprovação: (Se não for preenchido, a nota mínima será 6!)'));
const notaMinimaNaPagina = document.querySelector('header #nota-minima').innerHTML = `<h2>Nota mínima: <span>${notaMinima}</span></h2><br>`;
let linhas = '';

if (notaMinima) {
  notaMinimaNaPagina.innerHTML = `<h2>Nota mínima: <span>${notaMinima}</span></h2><br>`;
} else {
  notaMinima = 6;
  document.querySelector('header #nota-minima span').innerText = notaMinima;
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  adicionarLinha();
  atualizaTabela();
  atualizaMediaFinal();
})

function adicionarLinha() {
  const inputNomeAtividade = document.querySelector('#nome-atividade');
  const inputNotaAtividade = document.querySelector('#nota-atividade');

  if (atividades.includes(inputNomeAtividade.value)) {
    alert(`(ERRO) A atividade '${inputNomeAtividade.value}' já existe!`);
  } else {
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado: imgReprovado}</td>`;
    linha += `</tr>`;

    linhas += linha;
  }

  inputNomeAtividade.value = '';
  inputNotaAtividade.value = '';
}

function atualizaTabela() {
  const corpoTabela = document.querySelector('tbody');
  corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {  
  const mediaFinal = calculaMediaFinal();

  document.querySelector('#media-final-valor').innerHTML = mediaFinal.toFixed(2);
  document.querySelector('#media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
  let somaDasNotas = 0;
  
  for (let i = 0; i < notas.length; i++) {
    somaDasNotas += notas[i];
  }
  return somaDasNotas / notas.length;
}