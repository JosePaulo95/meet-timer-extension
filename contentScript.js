function addTimer() {
    const timerContainer = document.createElement('div');
    timerContainer.style.position = 'fixed';
    timerContainer.style.top = '1px';     
    timerContainer.style.left = '5px';  // Corrected to align with the top-right corner
    timerContainer.style.color = 'black';
    timerContainer.style.backgroundColor = 'rgba(256,256,256,0.7)';
    timerContainer.style.border = '1px solid black';
    timerContainer.style.borderRadius = '5%';
    timerContainer.style.padding = '10px';
    timerContainer.style.zIndex = '1000';
    timerContainer.style.fontSize = '21px';
    timerContainer.style.fontFamily = 'monospace';
    timerContainer.style.minHeight = '25px';
    timerContainer.style.minWidth = '50px';
    timerContainer.style.display = 'flex';
    timerContainer.style.alignItems = 'center';
    timerContainer.style.justifyContent = 'center';
    timerContainer.id = 'canva-timer';

    const timerText = document.createElement('span');
    timerText.id = 'timer-text';
    timerText.textContent = '00:00';

    timerContainer.appendChild(timerText);
    document.body.appendChild(timerContainer);

    timerContainer.addEventListener('mouseenter', () => {
        timerContainer.style.opacity = '0';
        timerContainer.style.pointerEvents = 'none'; 
    });
    
    timerContainer.addEventListener('mouseleave', () => {
        setTimeout(() => {
            timerContainer.style.opacity = '1';
            timerContainer.style.pointerEvents = 'auto'; 
        }, 1500); 
    });
            
}

// Calcula o horário de término com base na string de entrada
function calculateEndTime(endTimeStr) {
    const [endHour, endMinute] = endTimeStr.split(':').map(Number);
    
    // Cria um objeto Date para o horário de término hoje
    const now = new Date();
    let endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, 0, 0).getTime();
    
    // Ajusta para o próximo dia se o horário de término for anterior ao horário atual
    if (endTime < now.getTime()) {
        endTime += 24 * 60 * 60 * 1000; // Adiciona um dia em milissegundos
    }

    return endTime;
}

// Inicia o temporizador e atualiza o elemento de contagem regressiva
function startTimer(endTimeStr) {
    const endTime = calculateEndTime(endTimeStr);
    const timerElement = document.getElementById('timer-text');

    const interval = setInterval(function () {
        const currentTime = new Date().getTime();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            timerElement.textContent = "00:00";
            if (window.location.href.includes("meet.google")){
                endMeeting(); // Supondo que a função endMeeting() já exista
            }
            return;
        }

        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
        const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

        timerElement.textContent = `${displayMinutes}:${displaySeconds}`;
    }, 1000);
}

function endMeeting() {
    function clickEndCallButton() {
        var firstButton = document.querySelector('[jsname="CQylAd"]');
        if (firstButton) {
            firstButton.click();
            // Espere o popup de confirmação aparecer
            setTimeout(clickConfirmEndForEveryoneButton, 500); // Ajuste o tempo conforme necessário
        } else {
            console.log('Primeiro botão não encontrado');
        }
    }
    
    // Função para clicar no botão com jsname="V67aGc"
    function clickConfirmEndForEveryoneButton() {
        var secondButton = document.querySelector('.VfPpkd-T0kwCb button[jscontroller="soHxf"] span[jsname="V67aGc"]');
        if (secondButton) {
            secondButton.click();
        } else {
            console.log('Segundo botão não encontrado');
        }
    }
    
    // Execute a função para clicar no primeiro botão
    clickEndCallButton();
}

// Verificar se a URL atual corresponde a https://www.horariodebrasilia.org/
// if (!window.location.href.includes("meet.google")) {
    // Adiciona o temporizador à página do Canva
    addTimer();

    const endTimeStr = "11:00"; // Set the desired universal end time
    startTimer(endTimeStr); //TEMP
// }
