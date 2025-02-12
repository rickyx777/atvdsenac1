const questions = [
    {
        question: "Qual é a forma mais comum de apresentação de produtos alimentícios em mercados?",
        options: ["Exposição em prateleiras", "Vitrine refrigerada", "Caixas de papelão", "Pendurado em ganchos"],
        correctAnswer: 1
    },
    {
        question: "Qual é a forma de apresentação mais eficaz de serviços em uma loja?",
        options: ["Exposição de folhetos", "Demonstração ao vivo", "Cartaz informativo", "Anúncio em rádio"],
        correctAnswer: 1
    },
    {
        question: "Que tipo de apresentação é comum para roupas em lojas de varejo?",
        options: ["Vitrine com manequins", "Prateleiras com etiquetas", "Porta a porta", "Promoções em outdoors"],
        correctAnswer: 0
    },
    {
        question: "Como você apresentaria um produto eletrônico de forma mais eficaz?",
        options: ["Em uma vitrine iluminada", "Em caixas fechadas", "Em expositores de vidro", "Em prateleiras padrão"],
        correctAnswer: 0
    },
    {
        question: "Qual a melhor forma de apresentar cosméticos em uma loja de beleza?",
        options: ["Vitrine com amostras", "Prateleiras organizadas", "Exposição em gôndolas", "Promoções no caixa"],
        correctAnswer: 1
    },
    {
        question: "Qual é a principal forma de apresentação para serviços bancários?",
        options: ["Folhetos informativos", "Vitrine digital", "Atendimento pessoal", "Cartazes na entrada"],
        correctAnswer: 2
    },
    {
        question: "Como os perfumes são comumente apresentados em lojas?",
        options: ["Vitrine elegante com iluminação suave", "Em prateleiras de metal", "Dentro de caixas padrão", "Em stands temporários de promoção"],
        correctAnswer: 0
    },
    {
        question: "Qual é uma forma popular de apresentação de livros em livrarias?",
        options: ["Prateleiras com categorias e destaque para lançamentos", "Exposição de capas nas vitrines", "Livros empilhados no chão", "Apenas em displays digitais"],
        correctAnswer: 1
    },
    {
        question: "Como os produtos de tecnologia, como smartphones, são apresentados em lojas de varejo?",
        options: ["Expositores interativos", "Prateleiras comuns", "Estantes de madeira", "Em embalagens de plástico",],
        correctAnswer: 0
    },
    {
        question: "Qual é a forma mais comum de apresentação de calçados em lojas?",
        options: ["Exposição em prateleiras com tênis organizados por modelo", "Vitrine com pares expostos no chão", "Em caixas de papelão", "Em gôndolas improvisadas"],
        correctAnswer: 0
    },
    {
        question: "Como as bebidas alcoólicas são comumente apresentadas em supermercados?",
        options: ["Gôndolas e prateleiras", "Em vitrines refrigeradas", "No fundo da loja", "Somente por pedido"],
        correctAnswer: 1
    },
    {
        question: "Como você apresentaria uma promoção de produtos em um supermercado?",
        options: ["Em displays temporários", "Dentro de cestas nas prateleiras", "Em banners de luzes", "Todos os itens em uma única prateleira"],
        correctAnswer: 0
    },
    {
        question: "Como é feita a apresentação de acessórios de moda em lojas de varejo?",
        options: ["Em prateleiras organizadas por tipo", "Em expositores de vidro", "Com acessórios pendurados em ganchos", "Apenas em vitrines digitais"],
        correctAnswer: 2
    },
    {
        question: "Como é comumente apresentado o mobiliário em lojas de móveis?",
        options: ["Em salas montadas como exemplo de ambientes", "Em prateleiras", "Dentro de caixas compactas", "Somente em anúncios online"],
        correctAnswer: 0
    },
    {
        question: "Como são geralmente apresentados os brinquedos em lojas?",
        options: ["Em expositores temáticos", "Em caixas fechadas", "Dispostos em cestas", "Na entrada da loja"],
        correctAnswer: 0
    },
    {
        question: "Como você apresentaria um serviço de assinatura em uma loja?",
        options: ["Em displays explicativos", "Em cartazes e banners", "Com folhetos no caixa", "Apenas com anúncios em redes sociais"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 25; // Aumentando o tempo para 25 segundos

const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;

    const buttons = document.querySelectorAll('.option');
    question.options.forEach((option, index) => {
        buttons[index].textContent = option;
    });

    timeLeft = 25; // Resetando o tempo para 25 segundos
    document.getElementById('timer').textContent = timeLeft;

    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        handleTimeout();
    } else {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
    }
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    
    if (selectedIndex === correctAnswer) {
        score++;
        document.getElementById('result').textContent = "Você acertou!";
        correctSound.play();
    } else {
        document.getElementById('result').textContent = "Você errou!";
        wrongSound.play();
    }

    document.getElementById('score').textContent = score;
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 1000);
    } else {
        setTimeout(endGame, 1000);
    }
}

function handleTimeout() {
    document.getElementById('result').textContent = "Tempo esgotado!";
    wrongSound.play();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 1000);
    } else {
        setTimeout(endGame, 1000);
    }
}

function endGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('final-score').textContent = `Sua pontuação final é: ${score}`;
    showConfetti();
}

function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('result').textContent = "";
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}
