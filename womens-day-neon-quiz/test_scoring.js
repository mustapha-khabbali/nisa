const fs = require('fs');

function testScore(diff, timeSpent) {
    let points = 0;
    if (diff === 'xtra') {
        let timeBonus = timeSpent <= 60 ? 1 : 0;
        points = 3 + timeBonus;
    } else if (diff === 'hard') {
        let timeBonus = timeSpent <= 60 ? 1 : 0;
        points = 2 + timeBonus;
    } else {
        // easy
        let timeBonus = timeSpent <= 30 ? 1 : 0;
        points = 1 + timeBonus;
    }
    return points;
}

console.log("=== EASY TEST ===");
console.log("Easy @ 10s (Expected 2):", testScore('easy', 10));
console.log("Easy @ 30s (Expected 2):", testScore('easy', 30));
console.log("Easy @ 31s (Expected 1):", testScore('easy', 31));

console.log("\n=== HARD TEST ===");
console.log("Hard @ 10s (Expected 3):", testScore('hard', 10));
console.log("Hard @ 60s (Expected 3):", testScore('hard', 60));
console.log("Hard @ 61s (Expected 2):", testScore('hard', 61));

console.log("\n=== EXTRA HARD TEST ===");
console.log("Xtra @ 10s (Expected 4):", testScore('xtra', 10));
console.log("Xtra @ 60s (Expected 4):", testScore('xtra', 60));
console.log("Xtra @ 61s (Expected 3):", testScore('xtra', 61));
