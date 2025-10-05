import { perguntas } from "./perguntas.js";

const pergunta = document.getElementById('pergunta')
const respostas = 
[
    document.getElementById('resp1'),
    document.getElementById('resp2'),
    document.getElementById('resp3'),
    document.getElementById('resp4')
]
const btnProx = document.getElementById('btnProx')
const textCab = document.getElementById('textCab')
const imgPergunta = document.getElementById('imgPergunta')

let indiceAtual = 0
const respUsuario = new Array(perguntas.length).fill(null)


/**
 * Carrega a pergunta e a imagem atual na tela e atualiza os botões de resposta
 * Marca visualmente a escolha do usuario
 * Faz a validação das opções
 * Salva a resposta do usuario
 * 
 * @author Alana Padilha <alanapadilhapng@gmail.com>
 * @author Julia Goes <juliafgoes@gmail.com>
 * @author Luan Quadros <luanquadrox@proton.me>
 * @version 1.0.0
 * @since 1.0.0 (20/09/2025)
 * 
 */
function carregarPerguntas()
{
    const perguntaAtual = perguntas[indiceAtual]

    textCab.textContent = `Quiz Interativo Geral - Pergunta ${indiceAtual + 1} de ${perguntas.length}`
    pergunta.textContent = perguntaAtual.pergunta

    imgPergunta.src = perguntaAtual.imagem

    perguntaAtual.opcoes.forEach((opcao, indice) => {
        respostas[indice].textContent = opcao
        respostas[indice].style.background = ''
        respostas[indice].style.color = ''

        if(respUsuario[indiceAtual] == opcao)
        {
            respostas[indice].style.background = '#2a2f4d'
            respostas[indice].style.color = '#fff'
        }

        respostas[indice].onclick = () =>
        {
            if(!perguntaAtual.opcoes.includes(opcao))
            {
                alert('Opção invalida!')
                return
            }

            respUsuario[indiceAtual] = opcao

            respostas.forEach(r =>{
                r.style.background = ''
                r.style.color = ''
            })
            respostas[indice].style.background = '#2a2f4d'
            respostas[indice].style.color = '#fff'
        }
    })
}

/**
 * Mostra a pontuação do usuario
 * Exibe a primeira pergunta que ele errou(se houver)
 * Exibe uma lista das perguntas que ele errrou(se houver) contendo:
 * Pergunta
 * Resposta do usuarop
 * Resposta correta
 * 
 * @author Alana Padilha <alanapadilhapng@gmail.com>
 * @author Julia Goes <juliafgoes@gmail.com>
 * @author Luan Quadros <luanquadrox@proton.me>
 * @version 1.0.0
 * @since 1.0.0 (20/09/2025)
 */
function mostrarResultado()
{
    textCab.textContent = 'Quiz Interativo Geral'

    const resumo = perguntas.map((p, indice) => ({
        pergunta: p.pergunta,
        correta: p.resposta,
        resposta: respUsuario[indice],
        acerto: respUsuario[indice] === p.resposta
    }))

    const pontuacao = resumo.filter(r => r.acerto).length

    pergunta.textContent = `Quiz finalizado! Você acertou: ${pontuacao} de ${perguntas.length}`
    
    respostas.forEach(resp => (resp.style.display = 'none'))
    btnProx.style.display = 'none'
    imgPergunta.style.display = 'none'

    const primeiraErrada = resumo.find(r => !r.acerto)
    if(primeiraErrada)
    {
        const p = document.createElement('p')
        p.textContent = `Primeira questão errada: ${primeiraErrada.pergunta}`
        respostas[0].parentElement.appendChild(p)
    }

    const erradas = resumo.filter(r => !r.acerto)
    if(erradas.length > 0)
    {
        const titulo = document.createElement('h3')
        titulo.textContent = 'Perguntas erradas: '
        respostas[0].parentElement.appendChild(titulo)

        erradas.forEach(e => {
            const stats = document.createElement('p')
            stats.textContent = `Pergunta: ${e.pergunta} - Sua resposta: ${e.resposta} | correta: ${e.correta}`
            respostas[0].parentElement.appendChild(stats)
        })
    }
    else
    {
        const acertou = document.createElement('p')
        acertou.textContent = `Voce acertou todas as perguntas`
        respostas[0].parentElement.appendChild(acertou)
    }

    btnRecomecar()
}

/**
 * Adiciona dinâmicamente um botão para reiniciar o quiz
 * 
 * Quando clicado recarrega a pagina
 * 
 * @author Alana Padilha <alanapadilhapng@gmail.com>
 * @author Julia Goes <juliafgoes@gmail.com>
 * @author Luan Quadros <luanquadrox@proton.me>
 * @version 1.0.0
 * @since 1.0.0 (20/09/2025)
 * 
 */
function btnRecomecar()
{
    const recomecar = document.createElement('button')
    recomecar.textContent = "Reiniciar"
    recomecar.addEventListener('click', () => location.reload())
    respostas[0].parentElement.appendChild(recomecar)
}


/**
 * Verifica se o usuario selecionou uma resposta antes de continuar o quiz
 * avança para a proxima pergunta ou exibe os resultados se o quiz terminou
 * 
 * @author Alana Padilha <alanapadilhapng@gmail.com>
 * @author Julia Goes <juliafgoes@gmail.com>
 * @author Luan Quadros <luanquadrox@proton.me>
 * @version 1.0.0
 * @since 1.0.0 (20/09/2025)
 * 
 */
btnProx.addEventListener('click', () => {
    if(respUsuario[indiceAtual] === null)
    {
        alert('Escolha uma resposta antes de continuar!')
        return
    }

    indiceAtual++
    if(indiceAtual < perguntas.length)
    {
        carregarPerguntas()
    }
    else
    {
        mostrarResultado()
    }
})

carregarPerguntas()

