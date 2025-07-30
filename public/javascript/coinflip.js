const betHeadsBtn = document.getElementById('bet-heads');
const betTailsBtn = document.getElementById('bet-tails');
const flipBtn = document.getElementById('flip-btn');
const coinImg = document.getElementById('coin-img');
const resultDiv = document.getElementById('coinflip-result');
const betInput = document.getElementById('bet-amount');
const quickBtns = document.querySelectorAll('.bet-quick-btn');

let userBet = null;
let flipping = false;
let maxBet = 1000; // Example max, replace with user's actual max if available

betHeadsBtn.addEventListener('click', () => {
    userBet = 'heads';
    betHeadsBtn.classList.add('selected');
    betTailsBtn.classList.remove('selected');
    flipBtn.disabled = false;
    resultDiv.textContent = '';
});

betTailsBtn.addEventListener('click', () => {
    userBet = 'tails';
    betTailsBtn.classList.add('selected');
    betHeadsBtn.classList.remove('selected');
    flipBtn.disabled = false;
    resultDiv.textContent = '';
});

quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        quickBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        let val = btn.dataset.amount;
        if (val === 'max') {
            betInput.value = maxBet;
        } else {
            betInput.value = val;
        }
    });
});

betInput.addEventListener('input', () => {
    quickBtns.forEach(b => b.classList.remove('active'));
});

flipBtn.addEventListener('click', () => {
    if (!userBet || flipping) return;
    flipping = true;
    flipBtn.disabled = true;
    resultDiv.textContent = '';

    // Animation variables
    let spins = 24; // more spins for a smoother animation
    let current = 0;
    let duration = 1200; // total animation duration in ms
    let start = null;

    // Pre-determine result for animation to land on correct side
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    function animateFlip(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let percent = Math.min(progress / duration, 1);

        // Ease out for more realistic effect
        let eased = 1 - Math.pow(1 - percent, 3);

        // Calculate which frame of the spin we're on
        let frame = Math.floor(eased * spins);

        // Alternate image for spinning
        coinImg.style.transform = `rotateY(${frame * 180}deg) scale(1.1)`;
        if (frame % 2 === 0) {
            coinImg.src = '/images/coin-heads.png';
        } else {
            coinImg.src = '/images/coin-tails.png';
        }

        if (percent < 1) {
            requestAnimationFrame(animateFlip);
        } else {
            // End on the actual result
            coinImg.src = result === 'heads' ? '/images/coin-heads.png' : '/images/coin-tails.png';
            coinImg.style.transform = 'rotateY(0deg) scale(1)';
            if (userBet === result) {
                resultDiv.textContent = `You won! It was ${result.toUpperCase()}!`;
                resultDiv.style.color = '#22c55e';
            } else {
                resultDiv.textContent = `You lost! It was ${result.toUpperCase()}.`;
                resultDiv.style.color = '#ef4444';
            }
            flipping = false;
            flipBtn.disabled = false;
        }
    }

    requestAnimationFrame(animateFlip);
});