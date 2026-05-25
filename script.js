// Dados de configuração
const CONFIG = {
    notaCorte: 71.25,
    totalQuestoesProva: 80,
    tempoProvaMinutos: 180
};

// Carregar simulado - AGORA FUNCIONA!
async function carregarSimulado(tipo) {
    let caminho;
    if (tipo === 'completo') caminho = 'questoes/simulados-completos.json';
    if (tipo === 'completo') caminho = './questoes/simulados-completos.json';

    try {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        
        // Renderizar prova na tela
        const areaProva = document.getElementById('area-prova');
        areaProva.classList.remove('oculto');
        areaProva.innerHTML = `
            <div class="prova-container" style="max-width:900px; margin:2rem auto; padding:2rem; background:white; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.1)">
                <h2 style="color:#0a3b71; margin-bottom:1.5rem">${dados.titulo}</h2>
                <p style="margin-bottom:2rem">Bancas: ${dados.bancas} | Tempo: ${dados.tempo}</p>
                ${dados.questoes.map((q, i) => `
                    <div class="questao" style="margin-bottom:2rem; padding-bottom:1.5rem; border-bottom:1px solid #eee">
                        <p style="font-weight:bold; margin-bottom:1rem">${i+1}. ${q.enunciado}</p>
                        ${q.alternativas.map((alt, j) => `
                            <label style="display:block; margin-bottom:0.5rem; cursor:pointer">
                                <input type="radio" name="q${i}" value="${j}"> ${String.fromCharCode(65+j)}) ${alt}
                            </label>
                        `).join('')}
                        <div class="explicacao" style="margin-top:1rem; padding:1rem; background:#f8f9fa; display:none">
                            <strong>Resposta correta:</strong> ${q.respostaLetra}<br>
                            <strong>Explicação:</strong> ${q.explicacao}
                        </div>
                    </div>
                `).join('')}
                <button onclick="corrigirProva()" style="background:#28a745; color:white; border:none; padding:1rem 2rem; border-radius:4px; font-weight:bold; cursor:pointer; margin-top:1rem">Corrigir Prova</button>
            </div>
        `;

        // Rolar para a prova
        areaProva.scrollIntoView({behavior: 'smooth'});

    } catch (erro) {
        alert('Erro ao carregar: ' + erro.message + ' — Verifique se o arquivo JSON está na pasta correta.');
    }
}

function corrigirProva() {
    // Mostra todas as explicações
    document.querySelectorAll('.explicacao').forEach(el => el.style.display = 'block');
    alert('Prova corrigida! Veja os comentários abaixo de cada questão.');
}

// Atualiza métricas iniciais
document.getElementById('nota-corte').textContent = CONFIG.notaCorte.toFixed(2);