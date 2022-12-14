/*
* author: Jakub Kontrík (xslavi37)
* brief: Handling of displaying  sidepanel
 */

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