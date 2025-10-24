const blk_pitn = {
        block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
        block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
        block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
        block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
        block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
        block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
        block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]], /* 3 */
        block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
        block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
        block11: [[2, 0], [0, 0], [-1, 0], [1, 0]], /* — */
        block12: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
        block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]], /* 7 */
        block17: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block19: [[0, -1], [0, 0], [-1, 0], [1, 0]], /* 9 */
        block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block22: [[1, 1], [0, 0], [-1, 0], [1, 0]], /* 14 */
        block23: [[0, 2], [0, 0], [0, -1], [0, 1]]      /* | */
    },
    offset_pitn = {
        block1: [5, 3],
        block2: [5, 1],
        block3: [3, 4],
        block4: [3, 2],
        block5: [3, -1],
        block6: [2, 5],
        block7: [2, 1],
        block8: [1, -1],
        block9: [1, -3],
        block10: [1, 2],
        block11: [0, 3],
        block12: [0, 0], 
        block13: [-1, -4],
        block14: [0, -2],
        block15: [-2, 4],
        block16: [-2, 2],
        block17: [-2, 0],
        block18: [-3, -2],
        block19: [-4, 0],
        block20: [-3, 5],
        block21: [-5, 3],
        block22: [-4, 1],
        block23: [-6, 1]   
    };

// Função para calcular o tamanho do bloco baseado no tamanho da tela
function calcularTamanhoBloco() {
    const width = window.innerWidth;
    if (width <= 360) return 6;
    if (width <= 480) return 8;
    if (width <= 600) return 9;
    if (width <= 768) return 10;
    if (width <= 1024) return 15;
    return 20;
}

const tamanhoBloco = calcularTamanhoBloco();


let blocks = document.getElementsByClassName("block"),
    block = blocks[0],
    love = document.getElementsByClassName("love")[0],
    timer = null,
    index = 0, 
    clone_block;    

block.style.top = "50%";
block.style.left = "50%";
block.style.margin = "-20px 0 0 -20px";

const block_left = parseFloat(window.getComputedStyle(block, null).left.slice(0, -2)),
    block_top = parseFloat(window.getComputedStyle(block, null).top.slice(0, -2));

function Next() {
    if (++index >= 24) {
        clearInterval(timer);

        Rise();
        return;
    }

    block.style.visibility = "visible"; 

    block.style.left = block_left + tamanhoBloco * offset_pitn["block" + index][0] + "px";
    block.style.top = block_top - tamanhoBloco * offset_pitn["block" + index][1] + "px";
    for (let i = 0; i < block.children.length; i++) {
        block.children[i].style.left = blk_pitn["block" + index][i][0] * -tamanhoBloco + "px";
        block.children[i].style.top = blk_pitn["block" + index][i][1] * -tamanhoBloco + "px";
    }

    clone_block = block.cloneNode(true);
    love.appendChild(clone_block);

    if (love.children.length >= 24) {
        blocks[blocks.length - 1].children[2].style.display = "none";
        block.style.display = "none";   
    }
}

function Rise() {
    console.log("Te Amo");
    let timer2 = null,
        distance = 0;
    const target = 120, 
        speed = 1;

    let love_top = parseFloat(window.getComputedStyle(love, null).top.slice(0, -2));


    timer2 = setInterval(() => {
        distance += speed;
        // console.log(distance);
        if (distance >= target) {
            clearInterval(timer2);
            mostrarMensagemFinal();

            console.log("Te Amo");

        }

        love.style.top = (love_top - distance) + "px";

    }, 22);

    // Fazer o coração desaparecer após 10 segundos
    setTimeout(() => {
        fadeOutCoracao();
    }, 10000);
}

function fadeOutCoracao() {
    const coracao = document.querySelector('.love');
    if (coracao) {
        coracao.style.transition = 'opacity 2s ease-out';
        coracao.style.opacity = '0';
        
        // Remover completamente após a transição
        setTimeout(() => {
            coracao.style.display = 'none';
        }, 2000);
    }
}

function mostrarMensagemFinal() {
    const mensagem = document.createElement("h1");
    mensagem.innerHTML = "Miguel Calzadilla Bastardo,<br> razón de mi sonrisa 💞";
    mensagem.setAttribute("aria-label", "Te Amo");
    mensagem.style.position = "fixed";
    mensagem.style.top = "75%";
    mensagem.style.left = "50%";
    mensagem.style.transform = "translate(-50%, -50%)";
    mensagem.style.width = "90%";
    mensagem.style.maxWidth = "700px";
    mensagem.style.textAlign = "center";
    mensagem.style.fontSize = "clamp(32px, 6vw, 56px)";
    mensagem.style.fontFamily = '"Great Vibes", cursive';
    mensagem.style.fontWeight = "400";
    mensagem.style.color = "#ffffff";
    mensagem.style.textShadow = "0 6px 25px rgba(0, 0, 0, 0.4), 0 2px 10px rgba(255, 182, 193, 0.3)";
    mensagem.style.lineHeight = "1.2";
    mensagem.style.zIndex = 1000;
    mensagem.style.opacity = "0";
    mensagem.style.animation = "fadeInUp 2s ease forwards";
    mensagem.style.letterSpacing = "1px";
    mensagem.id = "mensagemRomantica"; // Adicionar ID para facilitar identificação

    // Adicionar estilos de animação
    const style = document.createElement("style");
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) translateY(40px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) translateY(0);
            }
        }
        
        @keyframes romanticGlow {
            0%, 100% { 
                text-shadow: 0 6px 25px rgba(0, 0, 0, 0.4), 0 2px 10px rgba(255, 182, 193, 0.3);
            }
            50% { 
                text-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 0 4px 15px rgba(255, 182, 193, 0.5);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar animação de brilho romântico após a animação inicial
    setTimeout(() => {
        mensagem.style.animation = "romanticGlow 3s ease-in-out infinite";
        // Garantir que a mensagem permaneça visível
        mensagem.style.opacity = "1";
        mensagem.style.visibility = "visible";
    }, 2000);
    
    document.body.appendChild(mensagem);
    
    // Fazer a mensagem desaparecer após 15 segundos
    setTimeout(() => {
        fadeOutMensagem();
    }, 15000);
}

function fadeOutMensagem() {
    const mensagem = document.getElementById("mensagemRomantica");
    if (mensagem) {
        mensagem.style.animation = "fadeOut 3s ease forwards";
        
        // Remover completamente após a transição
        setTimeout(() => {
            mensagem.style.display = "none";
        }, 3000);
    }
}

// Função para ajustar o layout quando a tela for redimensionada
function ajustarLayoutResponsivo() {
    const novoTamanhoBloco = calcularTamanhoBloco();
    
    // Atualizar o tamanho do bloco se necessário
    if (novoTamanhoBloco !== tamanhoBloco) {
        // Recarregar a página para aplicar as novas dimensões
        window.location.reload();
    }
}

// Listener para redimensionamento da janela
window.addEventListener('resize', ajustarLayoutResponsivo);

window.onload = function () {

    const audio = document.getElementById("audioFundo");

  function iniciarSom() {
    audio.play();
        // Remove o evento depois de tocar
        document.removeEventListener("click", iniciarSom);
    }

    // Quando a pessoa tocar/clicar em qualquer lugar, inicia a música
    document.addEventListener("click", iniciarSom);


    setTimeout(() => {

        timer = setInterval(() => {
            Next();
        }, 300);


    }, 12000);
};
