export class NavigationManager {
  constructor() {
    this.nav = document.querySelector(".nav")
    this.toggle = document.querySelector(".nav__toggle")
    this.menu = document.querySelector(".nav__menu")
    this.links = document.querySelectorAll(".nav__link")
    this.scrollProgress = document.querySelector(".scroll-progress")

    this.init()
  }

  init() {
    // Mobile menu toggle
    this.toggle?.addEventListener("click", () => this.toggleMenu())

    // Close menu when clicking links
    this.links.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu())
    })

    // Active link on scroll
    window.addEventListener("scroll", () => {
      this.updateActiveLink()
      this.updateScrollProgress()
      this.updateNavBackground()
    })

    // Initial calls
    this.updateActiveLink()
    this.updateScrollProgress()
  }

  toggleMenu() {
    const isExpanded = this.toggle.getAttribute("aria-expanded") === "true"
    this.toggle.setAttribute("aria-expanded", !isExpanded)
    this.menu.classList.toggle("active")
  }

  closeMenu() {
    this.toggle.setAttribute("aria-expanded", "false")
    this.menu.classList.remove("active")
  }

  updateActiveLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollY = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const link = document.querySelector(`.nav__link[href="#${sectionId}"]`)

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        this.links.forEach((l) => l.classList.remove("active"))
        link?.classList.add("active")
      }
    })
  }

  updateScrollProgress() {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100

    if (this.scrollProgress) {
      this.scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`
    }
  }

  updateNavBackground() {
    if (window.scrollY > 100) {
      this.nav?.classList.add("scrolled")
    } else {
      this.nav?.classList.remove("scrolled")
    }
  }
}
