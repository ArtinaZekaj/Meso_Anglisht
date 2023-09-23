import cards from "./cards.js";

const main = document.querySelector("main");
const playModeColor = "orange";
const trainModeColor = "dodgerblue";

export default function drawCards(toggleBtn, startIndex = -1, data = cards) {
  main.innerHTML = ""; // clear cards
  window.location.href = "#"; // go to top of page

  // check if function taiking index parameter
  let currentData;
  // eslint-disable-next-line no-unused-expressions
  startIndex === -1
    // eslint-disable-next-line prefer-destructuring
    ? (currentData = data[0])
    : (currentData = data[startIndex + 1]);

  // create card elements
  // eslint-disable-next-line array-callback-return
  currentData.map((el, i) => {
    const img = document.createElement("img");
    img.src = el.image;
    img.alt = el.word;

    const cardName = document.createElement("p");
    cardName.innerText = el.word.charAt(0).toUpperCase() + el.word.slice(1);

    const categoryLength = document.createElement("p");
    categoryLength.className = "number-of-cards";

    const modeIndicator = document.createElement("div");
    modeIndicator.className = "circle-icons mode-indicator";

    const rotateImg = document.createElement("img");
    rotateImg.src = "img/rotate.svg";
    rotateImg.className = "rotate-icon";

    const flipCard = document.createElement("div");
    // flipCard.className = "circle-icons flip-card";
    flipCard.appendChild(rotateImg);

    const sound = document.createElement("audio");

    const wrapper1 = document.createElement("div");
    wrapper1.className = "card-info";
    wrapper1.appendChild(cardName);

    const wrapper2 = document.createElement("div");
    wrapper2.className = "card-info-mode";
    wrapper2.appendChild(categoryLength);
    wrapper2.appendChild(modeIndicator);

    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";
    cardFooter.appendChild(wrapper1);
    cardFooter.appendChild(wrapper2);

    const translatedP = document.createElement("p");
    const translatedDiv = document.createElement("div");
    translatedDiv.className = "card-footer";
    translatedDiv.appendChild(translatedP);
    translatedP.innerText = el.translation;

    const frontSide = document.createElement("div");
    frontSide.className = "front-side";
    frontSide.appendChild(img);
    frontSide.appendChild(cardFooter);
    frontSide.appendChild(sound);

    const backSide = document.createElement("div");
    backSide.className = "back-side";
    backSide.appendChild(img.cloneNode(true));
    backSide.appendChild(translatedDiv);

    const innerContainer = document.createElement("div");
    innerContainer.className = "card-inner";
    innerContainer.appendChild(frontSide);
    innerContainer.appendChild(backSide);
   

    const cardContainer = document.createElement("div");
    cardContainer.className = "card";
    cardContainer.appendChild(innerContainer);

    // eslint-disable-next-line no-unused-expressions
    toggleBtn
      ? (modeIndicator.style.backgroundColor = trainModeColor)
      : (modeIndicator.style.backgroundColor = playModeColor);

    // if chosed category, change cards structure
    if (startIndex === -1) {
      categoryLength.innerText = `${data[i + 1].length} cards`;
    } else {
      categoryLength.innerText = "";
      wrapper1.appendChild(flipCard);
      sound.src = el.audioSrc;

      // Play sounds
      frontSide.addEventListener("click", (e) => {
        // Flip card when click rotate icon
        let flipped = false;
        if (e.target === rotateImg) {
          // eslint-disable-next-line quotes
          innerContainer.style.transform = `rotateY(${180}deg)`;
          flipped = true;

          cardContainer.addEventListener("mouseleave", () => {
            if (flipped) {
              innerContainer.style.transform = `rotateY(${0}deg)`;
            }
          });
        } else if (document.getElementById("display")) {
          sound.currentTime = 0;
          sound.play();
        }
      });
    }

    main.appendChild(cardContainer);
  });
}
