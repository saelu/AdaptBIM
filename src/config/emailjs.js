// EmailJS Configuration
// Uses environment variables for GitHub Actions deployment
// Fallback values for local development
export const emailjsConfig = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY 
}; 