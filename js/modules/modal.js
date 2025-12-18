export class ModalManager {
  constructor() {
    this.modal = document.getElementById("project-modal")
    this.openButtons = document.querySelectorAll(".project-card__btn")
    this.closeButtons = document.querySelectorAll("[data-modal-close]")

    // Project data
    this.projectData = {
      1: {
        title: "E-Commerce Platform",
        description:
          "A comprehensive e-commerce solution built with React and Node.js, featuring real-time inventory management, secure payment processing via Stripe, and an advanced analytics dashboard for tracking sales and customer behavior.",
        tags: ["React", "Node.js", "MongoDB"],
        image: "/modern-ecommerce-dashboard.png",
        role: "Full Stack Developer",
        year: "2024",
        client: "RetailCo",
        features: [
          "Real-time inventory tracking and management",
          "Secure payment processing with Stripe integration",
          "Advanced analytics and reporting dashboard",
          "Responsive design for all devices",
          "Admin panel with order management",
        ],
        liveUrl: "#",
        codeUrl: "#",
      },
      2: {
        title: "Fitness Tracking App",
        description:
          "Mobile application designed to help users track their workouts, monitor nutrition, and achieve fitness goals. Built with React Native for cross-platform compatibility.",
        tags: ["React Native", "Firebase"],
        image: "/fitness-tracking-app.png",
        role: "Mobile Developer",
        year: "2024",
        client: "FitLife Inc",
        features: [
          "Workout tracking with exercise library",
          "Nutrition logging and calorie counter",
          "Progress tracking with charts and graphs",
          "Social features to connect with friends",
          "Personalized workout recommendations",
        ],
        liveUrl: "#",
        codeUrl: "#",
      },
      3: {
        title: "Project Management Tool",
        description:
          "Collaborative project management platform with real-time updates, task automation, and integrated team communication. Built using Vue.js and GraphQL.",
        tags: ["Vue.js", "GraphQL", "PostgreSQL"],
        image: "/project-management-dashboard.png",
        role: "Frontend Lead",
        year: "2023",
        client: "TeamWork Solutions",
        features: [
          "Real-time project updates and notifications",
          "Task automation and workflow management",
          "Team collaboration and chat features",
          "Time tracking and reporting",
          "Kanban and Gantt chart views",
        ],
        liveUrl: "#",
        codeUrl: "#",
      },
      4: {
        title: "Design System",
        description:
          "Comprehensive design system with reusable components, design tokens, and detailed documentation for enterprise applications. Created in Figma with React implementation.",
        tags: ["Figma", "Design Tokens"],
        image: "/modern-design-system-components.jpg",
        role: "Design System Lead",
        year: "2023",
        client: "Enterprise Corp",
        features: [
          "Reusable component library",
          "Design tokens for consistent theming",
          "Comprehensive documentation",
          "Accessibility-first approach",
          "Dark and light mode support",
        ],
        liveUrl: "#",
        codeUrl: "#",
      },
      5: {
        title: "AI Chat Assistant",
        description:
          "Intelligent chat assistant powered by GPT-4 with context awareness, multi-language support, and conversation history. Built with Next.js and Supabase.",
        tags: ["Next.js", "OpenAI", "Supabase"],
        image: "/ai-chatbot-interface.png",
        role: "Full Stack Developer",
        year: "2024",
        client: "AI Solutions Ltd",
        features: [
          "GPT-4 powered conversations",
          "Context-aware responses",
          "Multi-language support",
          "Conversation history and search",
          "Custom training on company data",
        ],
        liveUrl: "#",
        codeUrl: "#",
      },
      6: {
        title: "Recipe Discovery App",
        description:
          "Beautiful recipe application with step-by-step cooking instructions, ingredient shopping lists, and meal planning features. Built with Flutter for iOS and Android.",
        tags: ["Flutter", "Dart"],
        image: "/recipe-cooking-mobile-app.jpg",
        role: "Mobile Developer",
        year: "2023",
        client: "Culinary Tech",
        features: [
          "Extensive recipe database",
          "Step-by-step cooking instructions",
          "Shopping list generator",
          "Meal planning calendar",
          "Save favorite recipes",
        ],
        liveUrl: "#",
        codeUrl: "#",
      },
    }

    this.init()
  }

  init() {
    // Open modal
    this.openButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const card = button.closest(".project-card")
        const projectId = card.dataset.projectId
        this.openModal(projectId)
      })
    })

    // Close modal
    this.closeButtons.forEach((button) => {
      button.addEventListener("click", () => this.closeModal())
    })

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.modal.hidden) {
        this.closeModal()
      }
    })
  }

  openModal(projectId) {
    const project = this.projectData[projectId]

    if (!project) return

    // Populate modal content
    document.getElementById("modal-image").src = project.image
    document.getElementById("modal-image").alt = project.title
    document.getElementById("modal-title").textContent = project.title
    document.getElementById("modal-description").textContent = project.description
    document.getElementById("modal-role").textContent = project.role
    document.getElementById("modal-year").textContent = project.year
    document.getElementById("modal-client").textContent = project.client
    document.getElementById("modal-live-link").href = project.liveUrl
    document.getElementById("modal-code-link").href = project.codeUrl

    // Populate tags
    const tagsContainer = document.getElementById("modal-tags")
    tagsContainer.innerHTML = project.tags.map((tag) => `<span class="project-card__tag">${tag}</span>`).join("")

    // Populate features
    const featuresContainer = document.getElementById("modal-features")
    featuresContainer.innerHTML = project.features.map((feature) => `<li>${feature}</li>`).join("")

    // Show modal
    this.modal.hidden = false
    document.body.style.overflow = "hidden"

    // Focus trap
    this.modal.querySelector("[data-modal-close]")?.focus()
  }

  closeModal() {
    this.modal.hidden = true
    document.body.style.overflow = ""
  }
}
