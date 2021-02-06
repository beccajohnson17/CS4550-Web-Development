//Attribution: I used Nat Tuck's lecture code from https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/05-static-deploy/notes.md
// as a base for this project, and I tried to rework code everywhere I could to make it my own.

import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { useState } from 'react';
import { makeSecret, bullsAndCows, outOfGuesses, isCorrectGuess, } from './game';
import './App.css';

/* If game meets the requirements of a loss, renders this view */
function GameOver({ reset, secret }) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Ooph! You lost :( </h1>
          <p>The secret code was {secret}. </p>
          <br />
          <p class="play-again">Try again?</p>
          <div class="btn-holder">
            <Button variant="primary" size="lg" onClick={reset}>
              Reset
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

/* If game meets requirements of a win, renders this view */
function GameWon({ reset, secret }) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Hurray, You Won!</h1>
          <p>The secret code was {secret}, but you already knew that ;) </p>
          <br />
          <p class="play-again">Play again?</p>
          <div class="btn-holder">
            <Button variant="primary" size="lg" onClick={reset}>
              Let's go!
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function App() {

  const [secret, setSecret] = useState(makeSecret()); //generates a secret
  const [guessHistory, setGuessHistory] = useState([]); //a list of all guesses made so far
  const [currentGuess, setCurrentGuess] = useState({}); // the guess the user is currently typing but hasn't entered
  const [bulls, showBulls] = useState(""); // the bulls in a given answer (right number, right spot)
  const [cows, showCows] = useState(""); // the cows in a given answer (right number, wrong spot)
  const [lives, setLives] = useState(8); // the number of lives, or guesses left
  const [currentInput, setCurrentInput] = useState("");

  function reset() {
    setGuessHistory([]);
    setSecret(makeSecret());
    showCows("");
    showBulls("");
    setLives("8");
    setCurrentInput("");
    setCurrentGuess({});
  }

  function checkUnique(guess) {
    let guessAsSet = new Set(guess);
    return guessAsSet.size > 3;
  }


  function makeGuess() {
    let userInput = currentInput;
    if (!checkUnique(userInput)) {
      return;
    }
    let bac = bullsAndCows(userInput, secret);
    var guess = new Object();
    guess.userInput = userInput;
    guess.bulls = bac[0];
    guess.cows = bac[1];
    setCurrentGuess(guess.useInput);
    setCurrentInput("");
    updateGuessHistory(guess);

  }

  function updateGuessHistory(guess) {
    let listOfGuesses = guessHistory;
    listOfGuesses.push(guess);
    setGuessHistory(listOfGuesses);
    setLives(parseInt(lives) - 1);
  }


  /*Function based off Nat Tuck lecture code, with some tweaks */
  function updateInput(ev) {
    let numericInput = ev.target.value;
    if (numericInput.length > 4) {
      numericInput = numericInput = numericInput[numericInput.length - 1];;
    }
    setCurrentInput(numericInput);
  }

  /*Function based off Nat Tuck lecture code, with some tweaks */
  function keypress(ev) {
    if (ev.key === "Enter") {
      makeGuess();
    }
  }

  /*Includes the logic for winning, losing, or playing an active game*/

  if (isCorrectGuess(currentGuess, secret)) {
    return (
      <GameWon reset={reset} secret={secret}> </GameWon>
    );
  }

  if (outOfGuesses(guessHistory)) {
    return (
      <GameOver reset={reset} secret={secret} ></GameOver>
    );
  }

  function generateGuessHistoryTable() {
    return (
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Guess</th>
                <th>Bulls</th>
                <th>Cows</th>
              </tr>
            </thead>
            <tbody>
              {guessHistory.map((element) => (
                <tr>
                  <td>{element.userInput}</td>
                  <td>{element.bulls} </td>
                  <td>{element.cows}</td>
                </tr>
              ))}
            </tbody>
          </Table></Col>
      </Row>
    );
  }



  return (
    <Container>
      <Row>
        <Col>
          <h1>Bulls and Cows!</h1>
          <p>(the <em>rootinest,</em> <b>tootinest</b> math game on this here corner of the internet~)</p>
          <h2> Lives Remaining: {lives}</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs="4">
          <Form.Label>Guess</Form.Label>
          <Form.Control
            type="number" min="1" max="9"
            value={currentInput}
            onChange={updateInput}
            onKeyPress={keypress}
          />
          <Form.Text>
            Your guess must be exactly 4 unique digits between 0-9, or the guess will not go through!
            </Form.Text>
          <div class="btn-holder">
            <Button variant="primary" size="lg" onClick={makeGuess}>
              Guess
            </Button>

            <div class="btn-holder"></div>
            <Button variant="secondary" size="lg" onClick={reset}>
              Reset
            </Button>
          </div>

        </Col>
      </Row>
      {generateGuessHistoryTable()}
    </Container>
  )

}


export default App;
