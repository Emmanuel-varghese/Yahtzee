This project implements a simple Yahtzee game with a client-server architecture. Players can roll dice, score points based on different combinations, and aim to achieve the highest total score.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- npm install

 Start the server:
- npm start

The server will be running on http://localhost:3000 by default.
API Endpoints

/roll-dice
Method: GET
Description: Roll the dice and get a random value.

/kind
Method: POST
Description: Calculate the score for a given kind (Three of a Kind, Four of a Kind).

/check-straight
Method: POST
Description: Check if a small or large straight is achieved.

Game Rules
Detailed game rules and instructions are provided in the game interface. Players can refer to the rules section for guidance.
