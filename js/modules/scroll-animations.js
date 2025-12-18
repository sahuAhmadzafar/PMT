export class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll(".animate-on-scroll")
    this.options = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }

    this.init()
  }

  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          // Optionally unobserve after animation
          // this.observer.unobserve(entry.target);
        }
      })
    }, this.options)

    // Observe all elements
    this.elements.forEach((element) => {
      this.observer.observe(element)
    })
  }
}
