document.addEventListener("DOMContentLoaded", function () {
    const dice = document.getElementById("dice");
    const resultDisplay = document.getElementById("dice-result");
    const rollButton = document.getElementById("roll-button");
    const resetButton = document.getElementById("reset-button");

    // Define rotation for each face based on dice roll
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

    // Roll Button Click Event
    rollButton.addEventListener("click", () => {
        rollButton.style.display = "none";  // Hide the "Lancer" button
        resetButton.style.display = "inline-block";  // Show the "Réinitialiser" button

        resultDisplay.innerText = "";

        const roll = Math.floor(Math.random() * 6) + 1;
        const { x, y } = rotations[roll];

        const spinsX = 360 * 4; // This ensures multiple rotations for better animation
        const spinsY = 360 * 4;

        currentX += spinsX + x;
        currentY += spinsY + y;

        // Randomize the duration of the animation (between 1s and 3s)
        const randomDuration = Math.random() * (3 - 1) + 1;

        // Apply the rotation to the dice
        dice.style.transition = `transform ${randomDuration}s ease`;
        dice.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

        setTimeout(() => {
            resultDisplay.innerText = `🎲 Résultat : ${roll}`;
        }, randomDuration * 1000);
    });

    // Reset Button Click Event
    resetButton.addEventListener("click", () => {
        // Reset the dice to initial position
        currentX = 0;
        currentY = 0;
        dice.style.transition = "transform 1s ease";  // Smooth transition back to initial position
        dice.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

        // Clear the result display
        resultDisplay.innerText = "";

        // Hide reset button and show roll button again
        resetButton.style.display = "none";
        rollButton.style.display = "inline-block";
    });
});
