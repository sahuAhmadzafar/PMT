export class ThemeManager {
  constructor() {
    this.toggle = document.querySelector("[data-theme-toggle]")
    this.currentTheme = localStorage.getItem("theme") || "light"

    this.init()
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme)

    // Add event listener
    this.toggle?.addEventListener("click", () => this.toggleTheme())
  }

  setTheme(theme) {
    this.currentTheme = theme
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }
}
