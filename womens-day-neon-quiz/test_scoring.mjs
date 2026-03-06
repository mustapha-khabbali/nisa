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

console.log("=== EASY QUESTION (Base: 1) ===");
console.log("Answered in 10s -> Output:", testScore('easy', 10), "(Expected: 2)");
console.log("Answered in 30s -> Output:", testScore('easy', 30), "(Expected: 2)");
console.log("Answered in 31s -> Output:", testScore('easy', 31), "(Expected: 1)");

console.log("\n=== HARD QUESTION (Base: 2) ===");
console.log("Answered in 10s -> Output:", testScore('hard', 10), "(Expected: 3)");
console.log("Answered in 60s -> Output:", testScore('hard', 60), "(Expected: 3)");
console.log("Answered in 61s -> Output:", testScore('hard', 61), "(Expected: 2)");

console.log("\n=== EXTRA HARD QUESTION (Base: 3) ===");
console.log("Answered in 10s -> Output:", testScore('xtra', 10), "(Expected: 4)");
console.log("Answered in 60s -> Output:", testScore('xtra', 60), "(Expected: 4)");
console.log("Answered in 61s -> Output:", testScore('xtra', 61), "(Expected: 3)");

console.log("\n=== HINT CALCULATION ===");
function getHints(score, used) {
    return 5 + Math.floor(score / 3) - used;
}
console.log("Score 0 -> Available Hints:", getHints(0, 0), "(Expected: 5)");
console.log("Score 3 -> Available Hints:", getHints(3, 0), "(Expected: 6)");
console.log("Score 6 -> Available Hints:", getHints(6, 0), "(Expected: 7)");
console.log("Score 6, Used 2 -> Available Hints:", getHints(6, 2), "(Expected: 5)");
