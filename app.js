let listadenumerosorteados = [];
let quantidadelimite = 1000
let numerosecreto = numeroaleatorio();
let tentativas = 1

function textonatela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensageminicial() {
    textonatela('h1', 'Jogo do Número Secreto');
    textonatela('p', 'Escolha um número entre 1 e 1000');

}

mensageminicial();  

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numerosecreto) {
        textonatela('h1', 'Acertou');
        let palavratentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemtentativas = `Você descobriu o número secreto em ${tentativas} ${palavratentativa}!`
        textonatela('p', `${mensagemtentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numerosecreto) {
            textonatela('p', 'O número secreto é menor!');
        } else {
            textonatela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparcampo()
    }
}

function numeroaleatorio() {
    let numeroescolhido = parseInt(Math.random() * quantidadelimite + 1);
    let quantidadedeelementosnalista = listadenumerosorteados.length;
    
    if (quantidadedeelementosnalista == quantidadelimite) {
        listadenumerosorteados = [];
    }

    if (listadenumerosorteados.includes(numeroescolhido)) {
        return numeroaleatorio();
    } else {
        listadenumerosorteados.push(numeroescolhido);
        return numeroescolhido;
    }
}

function limparcampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarjogo() {
    numerosecreto = numeroaleatorio();
    limparcampo();
    tentativas = 1;
    mensageminicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}