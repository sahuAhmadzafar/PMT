export class ContactForm {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.fields = {
      name: this.form?.querySelector("#name"),
      email: this.form?.querySelector("#email"),
      subject: this.form?.querySelector("#subject"),
      message: this.form?.querySelector("#message"),
    }
    this.submitButton = this.form?.querySelector('button[type="submit"]')

    this.init()
  }

  init() {
    if (!this.form) return

    // Real-time validation
    Object.values(this.fields).forEach((field) => {
      field?.addEventListener("blur", () => this.validateField(field))
      field?.addEventListener("input", () => this.clearFieldError(field))
    })

    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))
  }

  validateField(field) {
    const fieldName = field.name
    const value = field.value.trim()
    let isValid = true
    let errorMessage = ""

    // Validation rules
    if (!value) {
      isValid = false
      errorMessage = `${this.capitalize(fieldName)} is required`
    } else if (fieldName === "email" && !this.isValidEmail(value)) {
      isValid = false
      errorMessage = "Please enter a valid email address"
    } else if (fieldName === "name" && value.length < 2) {
      isValid = false
      errorMessage = "Name must be at least 2 characters"
    } else if (fieldName === "message" && value.length < 10) {
      isValid = false
      errorMessage = "Message must be at least 10 characters"
    }

    // Show/hide error
    if (!isValid) {
      this.showFieldError(field, errorMessage)
    } else {
      this.clearFieldError(field)
      field.classList.add("success")
    }

    return isValid
  }

  showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`)
    field.classList.add("error")
    field.classList.remove("success")

    if (errorElement) {
      errorElement.textContent = message
      errorElement.classList.add("visible")
    }
  }

  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`)
    field.classList.remove("error")

    if (errorElement) {
      errorElement.textContent = ""
      errorElement.classList.remove("visible")
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  async handleSubmit(e) {
    e.preventDefault()

    // Validate all fields
    let isValid = true
    Object.values(this.fields).forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false
      }
    })

    if (!isValid) {
      this.showFormMessage("Please fix the errors above", "error")
      return
    }

    // Show loading state
    this.submitButton.setAttribute("data-loading", "true")

    // Simulate API call
    await this.simulateSubmission()

    // Show success message
    this.showFormMessage("Message sent successfully! I'll get back to you soon.", "success")
    this.submitButton.removeAttribute("data-loading")
    this.form.reset()

    // Clear success classes
    Object.values(this.fields).forEach((field) => {
      field?.classList.remove("success")
    })
  }

  simulateSubmission() {
    return new Promise((resolve) => setTimeout(resolve, 2000))
  }

  showFormMessage(message, type) {
    const messageElement = this.form.querySelector(".form-message")

    if (messageElement) {
      messageElement.textContent = message
      messageElement.className = `form-message ${type} visible`

      // Hide after 5 seconds
      setTimeout(() => {
        messageElement.classList.remove("visible")
      }, 5000)
    }
  }
}
