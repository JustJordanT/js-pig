// 'use strict';
// import JSConfetti from 'js-confetti'


// Selecting elements
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const diceEl = document.querySelector('.dice')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
// const player1El = document.querySelector('.player--1')


const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// Starting conditions

score0El.textContent = 0
score1El.textContent = 0
diceEl.classList.add('hidden')

let scores = [0, 0]
let currentScore = 0;
let activePlayer = 0;
const player0El = document.querySelector(`.player--0`)
const player1El = document.querySelector(`.player--1`)

function playerSwitch() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1: 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}


// Rolling dice Functionality
btnRoll.addEventListener('click', function() {
    //Generate a random number between 1-6
    const diceRoll = Math.trunc(Math.random() * 6) + 1
    console.log(diceRoll)

    // Display the dice
    diceEl.classList.remove('hidden')
    diceEl.src = `../static/dice-${diceRoll}.png`
        // /Users/jordantaylor/Desktop/Development/teach-your-self-cs/projects/js-pig/assests

    if (diceRoll !== 1){
        // add to current score
        currentScore += diceRoll
        document.getElementById(`current--${activePlayer}`).textContent = currentScore

    } else {
        playerSwitch()
    }
})

const jsConfetti = new JSConfetti();

PlaySound = function (sound) {
    let audio = new Audio(sound);
    audio.loop = false;
    audio.play();
}

btnHold.addEventListener('click', function () {
    scores[activePlayer] += currentScore
    if (!currentScore) {
        console.log(currentScore)
        alert(`🎲You must roll before holding`)
    }
    else if (currentScore) {
        console.log(currentScore)
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // Winner
        if (scores[activePlayer] >= 100) {
            document.querySelector(`
            .player--${activePlayer}`).classList.add('player--winner')
            PlaySound('yay.mp3')

            // jsConfetti.addConfetti()
            jsConfetti.addConfetti({
                // emojis: ["🎉", "🥳", "👏", "⚡", "🎈"],
                // emojiSize: 100,
                confettiNumber: 300,
                confettiColors: [
                    "#ff0a54",
                    "#ffe94c",
                    "#ff7096",
                    "#1fffff",
                    "#e37b12",
                    "#ffffff",
                ],
            });

            // document.querySelector(`.player--${activePlayer}`)
            //     .classList.remove('player--active');
            btnRoll.classList.toggle('hidden')
            btnHold.classList.toggle('hidden')
            diceEl.classList.add('hidden');
        } else if (scores[activePlayer] <= 100) {
            playerSwitch()
        } else {
        }

    }
})

    btnNew.addEventListener('click', function () {
    if (player0El.classList.contains('player--winner') || player1El.classList.contains('player--winner')) {
        btnRoll.classList.remove('hidden')
        btnHold.classList.remove('hidden')
        diceEl.classList.remove('hidden')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')

        score0El.textContent = 0
        score1El.textContent = 0
        scores = [0, 0]
        currentScore = 0;
        activePlayer = 0;
        }
    })

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.btn--how');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    // console.log(e.key);

    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

module.exports = btnCloseModal;
module.exports = btnsOpenModal;
module.exports = btnNew;
module.exports = btnRoll;
module.exports = btnHold;



