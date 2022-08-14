const cards = document.querySelectorAll(".card");

var matched = 0;
var cardOne;
var cardTwo;
var disableDeck = false;
var j = 3;
var countDown = document.getElementById('countDown').innerHTML = j;

var hint_flip = [];
// New Game Button
var clickedButton = document.getElementById('New-Game');
clickedButton.addEventListener("click", () => { window.location.reload(); });

// clickedButton.addEventListener("click", () => { shuffleCard() });



// Hint Button
var hintClicked = document.getElementById('Hint');

hintClicked.addEventListener("click", function() {


    j = j - 1;

    if (j >= 0) {
        for (var i = 0; i < 12; i++) {
            hint_flip[i] = document.getElementsByClassName("card")[i];
            hint_flip[i].classList.add("flip");
            countDown = document.getElementById('countDown').innerHTML = j;

            setTimeout(() => {
                for (var i = 0; i < 12; i++) {
                    hint_flip[i].classList.remove('flip');
                }
            }, 1000);
        }
    } else {
        return false;
    }
})


function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        var cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    var arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        var imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});