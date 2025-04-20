
import { fotos } from "./dados.js";

const galeria = document.getElementById("galeria-container");
const btnMais = document.getElementById("btn-mais");
const imgPorPag = 4;
let imgAtual = 0;

function carregarImg() {
    const imagemDaPagina = fotos.slice(imgAtual, imgPorPag + imgAtual);

    imagemDaPagina.forEach((foto) => {
        const fotoItens = document.createElement("div");
        fotoItens.className = 'fotos-itens';

        // Criando a tag de imagem
        const img = document.createElement('img');
        img.src = foto.url;
        img.alt = 'Imagem-GA';

        // Criando o botão de download
        const btndownlod = document.createElement('a');
        btndownlod.className = 'btn-download';
        btndownlod.innerHTML = 'Baixar';

        // Usando o fetch para obter a imagem como Blob e permitir o download
        fetch(foto.url)
            .then(response => response.blob())  // Converte a resposta em Blob
            .then(blob => {
                const urlBlob = URL.createObjectURL(blob); // Cria um URL temporário para o Blob
                btndownlod.href = urlBlob; // Atribui o URL temporário ao link
                btndownlod.download = foto.alt || 'imagem';  // Nome do arquivo de download
            })
            .catch(error => {
                console.error('Erro ao baixar a imagem:', error);
                btndownlod.innerHTML = 'Falha no download';
                btndownlod.style.color = 'red';
            });

        // Adicionando a imagem e o botão de download ao item da galeria
        fotoItens.appendChild(img);
        fotoItens.appendChild(btndownlod);

        // Adicionando o item à galeria
        galeria.appendChild(fotoItens);
    });

    // Atualizando o índice das imagens
    imgAtual += imgPorPag;

    // Se não houver mais imagens, esconde o botão "Mais"
    if (imgAtual >= fotos.length) {
        btnMais.style.display = 'none';
    }
}

// Carrega as imagens iniciais
carregarImg();

// Adicionando o evento de clique no botão "Mais"
btnMais.addEventListener('click', carregarImg);

// Implementação de scroll infinito
window.addEventListener('scroll', () => {
    const alturaJanela = window.innerHeight;
    const posiçãoAtualScroll = window.scrollY;
    const alturaTotalPagina = document.documentElement.scrollHeight;

    // Verifica se o usuário chegou ao final da página
    if (alturaJanela + posiçãoAtualScroll >= alturaTotalPagina - 5) {
        carregarImg();
    }
});


