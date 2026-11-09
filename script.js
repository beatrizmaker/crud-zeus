const botoesCor = document.querySelectorAll(".cor");

botoesCor.forEach(function(botao) {

    botao.addEventListener("click", function() {

        let corCobra = botao.dataset.cor;

        localStorage.setItem("corCobra", corCobra);

    });

});

const canvas = document.getElementById("canvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    const tamanho = 20;

    let corCobra = localStorage.getItem("corCobra") || "pink";

    let cobra = [
        {
            x: 300,
            y: 300
        }
    ];

    let direcaoX = 0;
    let direcaoY = 0;

    let jogoComecou = false;
    let jogoAtivo = true;

    let pontuacao = 0;

    let morango = {
        x: 100,
        y: 100
    };

    document.addEventListener("keydown", function(event) {

        let tecla = event.key.toLowerCase();


        if (tecla === "w" && direcaoY === 0) {

            direcaoX = 0;
            direcaoY = -tamanho;

            jogoComecou = true;
        }
      
        if (tecla === "s" && direcaoY === 0) {

            direcaoX = 0;
            direcaoY = tamanho;

            jogoComecou = true;
        }

        if (tecla === "a" && direcaoX === 0) {

            direcaoX = -tamanho;
            direcaoY = 0;

            jogoComecou = true;
        }

        if (tecla === "d" && direcaoX === 0) {

            direcaoX = tamanho;
            direcaoY = 0;

            jogoComecou = true;
        }

    });

    function desenharCobra() {

        ctx.fillStyle = corCobra;

        cobra.forEach(function(parte) {

            ctx.fillRect(
                parte.x,
                parte.y,
                tamanho,
                tamanho
            );

        });

    }

    function desenharMorango() {

        ctx.font = "20px Arial";

        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        ctx.fillText(
            "🍓",
            morango.x,
            morango.y
        );

    }

    function desenhar() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        desenharMorango();

        desenharCobra();

    }

    function atualizar() {

        if (!jogoAtivo || !jogoComecou) {
            return;
        }

        const novaCabeca = {

            x: cobra[0].x + direcaoX,

            y: cobra[0].y + direcaoY

        };

        if (
            novaCabeca.x < 0 ||
            novaCabeca.x >= canvas.width ||
            novaCabeca.y < 0 ||
            novaCabeca.y >= canvas.height
        ) {

            gameOver();

            return;
        }

        for (let i = 0; i < cobra.length; i++) {

            if (
                novaCabeca.x === cobra[i].x &&
                novaCabeca.y === cobra[i].y
            ) {

                gameOver();

                return;
            }

        }


        cobra.unshift(novaCabeca);

        if (
            novaCabeca.x === morango.x &&
            novaCabeca.y === morango.y
        ) {

            pontuacao++;

            gerarMorango();

        }

        else {

            cobra.pop();

        }

    }

    function gerarMorango() {

        let posicaoValida = false;


        while (!posicaoValida) {

            morango.x =
                Math.floor(
                    Math.random() * (canvas.width / tamanho)
                ) * tamanho;


            morango.y =
                Math.floor(
                    Math.random() * (canvas.height / tamanho)
                ) * tamanho;


            posicaoValida = true;

            for (let i = 0; i < cobra.length; i++) {

                if (
                    morango.x === cobra[i].x &&
                    morango.y === cobra[i].y
                ) {

                    posicaoValida = false;

                    break;
                }

            }

        }

    }

    function gameOver() {

        jogoAtivo = false;

        document.getElementById("gameOver").style.display = "block";

    }

    const botaoReiniciar =
        document.getElementById("reiniciar");


    if (botaoReiniciar) {

        botaoReiniciar.addEventListener("click", function() {

            location.reload();

        });

    }

    function jogo() {

        atualizar();

        desenhar();

    }

    desenhar();

    setInterval(jogo, 100);

}
