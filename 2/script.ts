//@ts-nocheck

var fs = require("fs");
const r = fs.readFileSync("./2/input.txt", "utf8");
const input = r.split("\n");

// type move = {
//     blue: number;
//     green: number;
//     red: number;
// };

type Game = {
    // moves: move[];
    blue: number;
    green: number;
    red: number;
    id: number;
};

let games: Game[] = [];

// input type Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
input.forEach((line, index) => {
    // const moves: move[] = [];
    const linesplit = line.split(":");
    const cubesMax: {
        blue: number;
        green: number;
        red: number;
    } = {
        blue: 0,
        green: 0,
        red: 0,
    };
    const movesString = linesplit[1].split("; ");
    movesString.forEach((moveString) => {
        // const move: move = {
        //     blue: 0,
        //     green: 0,
        //     red: 0,
        // };
        const colors = moveString.split(", ");
        colors.forEach((color) => {
            const [amount, colorName] = color.trim().split(" ");
            // move[colorName] = parseInt(amount);
            if (cubesMax[colorName] < parseInt(amount)) {
                cubesMax[colorName] = parseInt(amount);
            }
        });
        // moves.push(move);
    });
    const game = {
        id: parseInt(linesplit[0].split(" ")[1]),
        ...cubesMax,
    };
    games.push(game);
});

enum colorLimit {
    blue = 14,
    green = 13,
    red = 12,
}

let sum = 0;

games.forEach((game) => {
    const possible =
        game.blue <= colorLimit.blue &&
        game.green <= colorLimit.green &&
        game.red <= colorLimit.red;
    console.log(
        `Game ${game.id}: \tblue: ${game.blue} \tgreen: ${game.green} \tred: ${game.red}  \tpossible: ${possible}`
    );
    sum += game.blue * game.green * game.red;
});

console.log(sum);
