/**
 * Start first page/ playing sound
 */

export default function startWebsite(start) {
  const startModal = document.querySelector(".start-js")
  const startButton = document.querySelector(".start-button-js")

  startModal.addEventListener("animationend", () => {
    startModal.classList.add("hidden")
  })

  startButton.addEventListener("click", () => {
    start()
    startModal.classList.add("fadeOut")
  })
}
