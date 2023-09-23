import videos from "./videos.js";

export default function drawVideos(toggleBtn, startIndex = -1, data = videos) {
  const videoSlider = document.createElement("div");
  videoSlider.className = "video-slider";

  const sliderContainer = document.createElement("div");
  sliderContainer.className = "slider-container";
  videoSlider.appendChild(sliderContainer);

  const arrowLeft = document.createElement("div");
  arrowLeft.className = "arrow left";
  arrowLeft.innerHTML = "&#10094;";
  arrowLeft.addEventListener("click", slideLeft);
  videoSlider.appendChild(arrowLeft);

  const arrowRight = document.createElement("div");
  arrowRight.className = "arrow right";
  arrowRight.innerHTML = "&#10095;";
  arrowRight.addEventListener("click", slideRight);
  videoSlider.appendChild(arrowRight);

  let currentData;
  if (startIndex === -1) {
    currentData = data[0];
  } else {
    currentData = data[startIndex + 1];
  }

  currentData.forEach((el) => {
    const video = document.createElement("video");
    video.src = el.videoUrl;
    video.controls = true;

    const videoTitle = document.createElement("p");
    videoTitle.innerText = el.title;

    const videoFooter = document.createElement("div");
    videoFooter.className = "video-footer";
    videoFooter.appendChild(videoTitle);

    const videoContainer = document.createElement("div");
    videoContainer.className = "video";
    videoContainer.appendChild(video);
    videoContainer.appendChild(videoFooter);

    sliderContainer.appendChild(videoContainer);
  });

  const main = document.querySelector("main");
  main.innerHTML = "";
  main.appendChild(videoSlider);

  function slideLeft() {
    sliderContainer.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  }

  function slideRight() {
    sliderContainer.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  }
}
