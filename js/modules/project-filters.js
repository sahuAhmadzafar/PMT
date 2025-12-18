export class ProjectFilters {
  constructor() {
    this.filterButtons = document.querySelectorAll(".filter-btn")
    this.projectCards = document.querySelectorAll(".project-card")

    this.init()
  }

  init() {
    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => this.filterProjects(button))
    })
  }

  filterProjects(button) {
    const filter = button.dataset.filter

    // Update active button
    this.filterButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Filter projects
    this.projectCards.forEach((card) => {
      const category = card.dataset.category

      if (filter === "all" || category === filter) {
        card.classList.remove("hidden")
        // Trigger animation
        setTimeout(() => {
          card.style.animation = "fadeInUp 0.5s ease-out"
        }, 10)
      } else {
        card.classList.add("hidden")
      }
    })
  }
}
