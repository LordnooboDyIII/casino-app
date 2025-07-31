document.addEventListener("DOMContentLoaded", function() {
    const dice = document.getElementById("dice");
    const resultDisplay = document.getElementById("dice-result");
    const actionButton = document.getElementById("action-button");
    const rollCountDisplay = document.getElementById("roll-count");
    const lastResultDisplay = document.getElementById("last-result");

    // Dice face rotations (unchanged from original)
    const rotations = {
        1: { x: 0, y: 0 },
        2: { x: 0, y: -90 },
        3: { x: 0, y: -180 },
        4: { x: 0, y: 90 },
        5: { x: -90, y: 0 },
        6: { x: 90, y: 0 }
    };

    let currentX = 0;
    let currentY = 0;
    let rollCount = 0;
    let lastResult = null;
    let isRolling = false;

    function setButtonToRoll() {
        actionButton.className = "btn roll-btn";
        actionButton.innerHTML = '<span class="btn-text">Roll Dice</span><span class="btn-icon">🎲</span>';
    }

    function setButtonToReset() {
        actionButton.className = "btn reset-btn";
        actionButton.innerHTML = '<span class="btn-text">Reset</span><span class="btn-icon">🔄</span>';
    }

    function rollDice() {
        isRolling = true;
        actionButton.disabled = true;
        resultDisplay.textContent = "";
        lastResultDisplay.textContent = "Rolling...";

        const roll = Math.floor(Math.random() * 6) + 1;
        const { x, y } = rotations[roll];

        const spinsX = 360 * 4;
        const spinsY = 360 * 4;

        currentX += spinsX + x;
        currentY += spinsY + y;

        const randomDuration = Math.random() * (3 - 1) + 1;

        dice.style.transition = `transform ${randomDuration}s ease-out`;
        dice.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

        // Update roll count immediately
        rollCount++;
        rollCountDisplay.textContent = rollCount;

        setTimeout(() => {
            // Update after animation completes
            lastResult = roll;
            resultDisplay.textContent = `You rolled: ${roll}`;
            lastResultDisplay.textContent = roll;
            
            isRolling = false;
            setButtonToReset();
            actionButton.disabled = false;
            
            // Celebration for rolling a 6
            if (roll === 6) {
                resultDisplay.classList.add("celebrate");
                setTimeout(() => {
                    resultDisplay.classList.remove("celebrate");
                }, 1000);
            }
        }, randomDuration * 1000);
    }

    function resetDice() {
        currentX = 0;
        currentY = 0;
        dice.style.transition = "transform 1s ease-out";
        dice.style.transform = "rotateX(0deg) rotateY(0deg)";
        resultDisplay.textContent = "";
        lastResultDisplay.textContent = "-";
        setButtonToRoll();
    }

    // Single button handles both actions
    actionButton.addEventListener("click", function() {
        if (actionButton.classList.contains("roll-btn")) {
            rollDice();
        } else {
            resetDice();
        }
    });

    // Initialize
    rollCountDisplay.textContent = rollCount;
    lastResultDisplay.textContent = "-";
    setButtonToRoll();
});