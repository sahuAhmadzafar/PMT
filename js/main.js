// Import modules
import { ThemeManager } from "./modules/theme.js"
import { NavigationManager } from "./modules/navigation.js"
import { ScrollAnimations } from "./modules/scroll-animations.js"
import { ProjectFilters } from "./modules/project-filters.js"
import { ModalManager } from "./modules/modal.js"
import { ContactForm } from "./modules/contact-form.js"

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modules
  const theme = new ThemeManager()
  const navigation = new NavigationManager()
  const scrollAnimations = new ScrollAnimations()
  const projectFilters = new ProjectFilters()
  const modal = new ModalManager()
  const contactForm = new ContactForm()

  console.log("[v0] Portfolio website initialized successfully")
})
