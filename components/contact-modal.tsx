"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      setIsAnimating(true)
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "hidden"
    } else {
      setIsAnimating(false)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-end transition-all duration-500 ${
        isAnimating ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div
        ref={modalRef}
        className={`w-full md:w-1/2 h-full bg-black/90 shadow-2xl transform transition-all duration-700 ease-out overflow-y-auto ${
          isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{
          boxShadow: "0 0 50px rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="relative h-full p-8 md:p-12 flex flex-col">
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
            style={{ transitionDelay: "0.3s" }}
            aria-label="Close contact modal"
          >
            <X size={24} />
          </button>

          <div
            className={`flex items-center mb-8 transition-all duration-700 ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <Image
              src="/images/naj-logo-solid.png"
              alt="Sai Sarthak Logo"
              width={80}
              height={48}
              className="rounded-3xl mr-4 animate-pulse"
              style={{ animationDuration: "3s" }}
            />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins">Contact Me</h2>
          </div>

          <div className="space-y-8 flex-grow">
            <div
              className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-glow transition-all duration-700 hover:bg-white/10 hover:scale-105 ${
                isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <h3 className="text-xl font-bold mb-3 text-gray-200 font-poppins">Let's Connect</h3>
              <p className="text-gray-100 font-open-sans">
                I'm always excited to discuss AI projects, data science opportunities, or collaborate on innovative
                solutions that make a difference.
              </p>
            </div>

            <div
              className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-glow transition-all duration-700 hover:bg-white/10 hover:scale-105 ${
                isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.6s" }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-200 font-poppins">Contact Information</h3>
              <div className="space-y-4">
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <p className="text-gray-300 font-semibold">Email</p>
                  <a
                    href="mailto:saisarthaksadangi@gmail.com"
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    saisarthaksadangi@gmail.com
                  </a>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <p className="text-gray-300 font-semibold">Phone</p>
                  <a href="tel:+918260819654" className="text-white hover:text-gray-200 transition-colors">
                    +91-8260819654
                  </a>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <p className="text-gray-300 font-semibold">Based in</p>
                  <p className="text-white">India</p>
                </div>
              </div>
            </div>

            <div
              className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-glow transition-all duration-700 hover:bg-white/10 hover:scale-105 ${
                isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-200 font-poppins">Social Media</h3>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-white hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-white hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-white hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  x
                </a>
              </div>
            </div>
          </div>

          <div
            className={`mt-8 pt-6 border-t border-white/10 transition-all duration-700 ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1s" }}
          >
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Sai Sarthak. Looking forward to collaborating with you!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
