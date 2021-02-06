//Attribution: I used Nat Tuck's lecture code from https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/05-static-deploy/notes.md
// as a base for this project, and I tried to rework code everywhere I could to make it my own.

export function makeSecret() {
    // Math.random returns a random integer from 0 to 9. Source: https://www.w3schools.com/js/js_random.asp
    // also use w3 as a reference for random num from 1 to 9.
    let secret = " ";
    secret = secret + Math.floor(Math.random() * (10 - 1) + 1);

    while (secret.length <= 4) {
        let n = Math.floor(Math.random() * 10);
        if (secret.indexOf(n) === -1) {
            secret = secret + n;

        }
    }
    return parseInt(secret);
}


/* Evaluates a guess, and returns "bulls" and "cows", where bulls are guesses at the 
right number and position, and cows are the right number in the wrong position.*/
export function bullsAndCows(guess, secret) {
    let bulls = 0;
    let cows = 0;
    // need as string to use length function and .includes
    // found include at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
    let secretAsString = String(secret);
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secretAsString[i]) {
            bulls++;
        }
        else if (secretAsString.includes(guess[i])) {
            cows++;
        }
    }
    return [bulls, cows]
}

export function isCorrectGuess(cGuess, secret) {
    return (cGuess == secret);
}


/* Will return true if the number of guesses goes above 8 (the max number allowed in a game) */
export function outOfGuesses(guesses) {
    return guesses.length >= 8;
}

