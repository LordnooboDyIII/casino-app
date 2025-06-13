document.addEventListener("DOMContentLoaded", function () {
    const dice = document.getElementById("dice");
    const resultDisplay = document.getElementById("dice-result");
    const rollButton = document.getElementById("roll-button");

    const rotations = {
        1: { x: 0, y: 0 },
        2: { x: 0, y: -90 },
        3: { x: 0, y: -180 },
        4: { x: 0, y: 90 },
        5: { x: 90, y: 0 },
        6: { x: -90, y: 0 }
    };

    let currentX = 0;
    let currentY = 0;

    rollButton.addEventListener("click", () => {
        rollButton.disabled = true;
        resultDisplay.innerText = "";

        const roll = Math.floor(Math.random() * 6) + 1;
        const { x, y } = rotations[roll];

        const spinsX = 360 * 4;
        const spinsY = 360 * 4;

        currentX += spinsX + x;
        currentY += spinsY + y;

        dice.style.transition = "transform 2s ease";
        dice.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

        setTimeout(() => {
            resultDisplay.innerText = `🎲 Résultat : ${roll}`;
            rollButton.disabled = false;
        }, 2000);
    });
});
