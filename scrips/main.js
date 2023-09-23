import drawCards from "./drawCards.js";
import drawVideos from "./drawVideos.js";
import cards from "./cards.js";
import video from "./videos.js";

let toggleBtn = false;
let categoryIndex = -1;
const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const title = document.querySelector("h1");
const main = document.querySelector("main");
const back = document.getElementById("burger-menu-background");

// Add category cards
drawCards(toggleBtn);
chooseCategory(main.childNodes);

// Refresh page listener
title.addEventListener("click", refreshPage);
// Burger menu activation
burger.addEventListener("click", activateMenu);
back.addEventListener("click", activateMenu);

const menuItems = document.querySelectorAll(".menu-item");
chooseCategory(menuItems);

// Refresh page function
function refreshPage() {
  main.innerHTML = "";
  drawCards(toggleBtn);
  chooseCategory(main.childNodes);
  categoryIndex = -1;
}

// Activate burger menu, open/close
function activateMenu() {
  burgerMenu.classList.toggle("active");
  burger.classList.toggle("active");
  back.classList.toggle("active");
}

// Category chooser function
function chooseCategory(nodesCollection) {
  nodesCollection.forEach((element, index) => {
    element.addEventListener("click", () => {
      if (index === nodesCollection.length - 1) {
        handleVideoCategory(index - 1);
      } else {
        drawCards(toggleBtn, index - 1);
        categoryIndex = index - 1;
      }
    });
  });
}

function handleVideoCategory(index) {
  drawVideos(index);
}

(function burgerMenuDrawer() {
  const headersArr = ["Home"];
  cards[0].forEach((el) => {
    headersArr.push(el.word);
  });

  headersArr.push("Video");

  const menuList = document.querySelector(".menu-list");

  headersArr.forEach((header, i) => {
    const li = document.createElement("li");
    li.className = "menu-item";
    li.innerText = header;

    menuList.appendChild(li);

    li.addEventListener("click", () => {
      if (i === 0) {
        refreshPage();
        activateMenu();
      } else if (i === headersArr.length - 1) {
        handleVideoCategory(i - 1);
        activateMenu();
      } else {
        drawCards(toggleBtn, i - 1);
        activateMenu();
      }
    });
  });
})();