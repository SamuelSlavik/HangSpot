export function toggleSidePanelOn() {
  let container = document.getElementById("sidePanel")

  if (container) {
    container.style.transform = "none"
  }
}

export function toggleSidePanelOff() {
  let container = document.getElementById("sidePanel")

  if (container) {
    container.style.transform = "translateX(100%)"
  }
}