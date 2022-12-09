export function toggleSidePanelOn() {
  let container = document.getElementById("sidePanel")
  let overlay = document.getElementById("sidePanelOverlay")

  if (container && overlay) {
    container.style.transform = "none"
    overlay.style.visibility = "visible"
    overlay.style.zIndex = "998"
    overlay.style.opacity = "1"
  }
}

export function toggleSidePanelOff() {
  let container = document.getElementById("sidePanel")
  let overlay = document.getElementById("sidePanelOverlay")

  if (container && overlay) {
    container.style.transform = "translateX(100%)"
    overlay.style.visibility = "hidden"
    overlay.style.zIndex = "-10"
    overlay.style.opacity = "0"
  }
}