"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import GalaxyCanvas from "@/components/galaxy-canvas"
import MouseSpotlight from "@/components/mouse-spotlight"
import ContactModal from "@/components/contact-modal"

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState("home")
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition < windowHeight * 0.5) {
        setActiveSection("home")
      } else if (scrollPosition < windowHeight * 1.5) {
        setActiveSection("about")
      } else if (scrollPosition < windowHeight * 2.5) {
        setActiveSection("projects")
      } else {
        setActiveSection("skills")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  const handleProjectHover = (projectType: string | null) => {
    setActiveProject(projectType)
  }

  const handleContactClick = () => {
    setIsContactModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <MouseSpotlight />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <nav className="fixed top-0 left-0 w-full bg-black/50 z-50 backdrop-blur-sm shadow-md flex justify-between items-center p-4 md:p-5">
        <div className="flex items-center">
          <Image
            src="/images/naj-logo-outline.png"
            alt="Sai Sarthak Logo"
            width={50}
            height={30}
            className="mr-4 rounded-3xl"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-10">
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("home")
            }}
            className={`px-5 py-2 rounded-lg transition-all uppercase tracking-wider text-sm md:text-base ${
              activeSection === "home" ? "bg-white/10 transform -translate-y-0.5" : "hover:bg-white/5"
            }`}
          >
            Home
          </Link>
          <Link
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("about")
            }}
            className={`px-5 py-2 rounded-lg transition-all uppercase tracking-wider text-sm md:text-base ${
              activeSection === "about" ? "bg-white/10 transform -translate-y-0.5" : "hover:bg-white/5"
            }`}
          >
            About Me
          </Link>
          <Link
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("projects")
            }}
            className={`px-5 py-2 rounded-lg transition-all uppercase tracking-wider text-sm md:text-base ${
              activeSection === "projects" ? "bg-white/10 transform -translate-y-0.5" : "hover:bg-white/5"
            }`}
          >
            Projects
          </Link>
          <Link
            href="#skills"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("skills")
            }}
            className={`px-5 py-2 rounded-lg transition-all uppercase tracking-wider text-sm md:text-base ${
              activeSection === "skills" ? "bg-white/10 transform -translate-y-0.5" : "hover:bg-white/5"
            }`}
          >
            Skills
          </Link>
          <button
            onClick={handleContactClick}
            className="px-5 py-2 rounded-lg transition-all duration-300 uppercase tracking-wider text-sm md:text-base bg-white text-black hover:bg-gray-200 hover:transform hover:-translate-y-0.5 hover:scale-105 active:scale-95"
          >
            Contact Me
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <GalaxyCanvas id="homeCanvas" withConstellations={true} />
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="mb-6">
            <Image
              src="/images/naj-logo-solid.png"
              alt="Sai Sarthak Logo"
              width={150}
              height={90}
              className="animate-pulse rounded-3xl"
              style={{ animationDuration: "3s" }}
            />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium font-poppins animate-title">SAI SARTHAK</h1>
        </div>
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 w-10 h-10 border-r-2 border-b-2 border-white rotate-45 animate-bounce opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        />
      </section>

      {/* About Me Section */}
      <section id="about" ref={aboutRef} className="relative h-screen flex items-center justify-center p-4">
        <GalaxyCanvas id="aboutCanvas" withConstellations={true} />
        <div className="relative z-10 max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white font-poppins animate-title">About Me</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-left">
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-glow">
                <h3 className="text-xl font-bold mb-3 text-gray-200 font-poppins">Who I Am</h3>
                <p className="text-gray-100 font-open-sans">
                  I'm an AI and Data Science learner passionate about exploring new technologies. Curious about how data
                  transforms into intelligent solutions. Always eager to learn, practice, and grow in this exciting
                  field.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-glow">
                <h3 className="text-xl font-bold mb-3 text-gray-200 font-poppins">What I Do</h3>
                <p className="text-gray-100 font-open-sans">
                  I am currently learning the AI and Data Science stack step by step. Studying Python, machine learning,
                  deep learning, and data handling. Building small projects to strengthen my understanding and skills.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-300/20 rounded-full blur-xl"></div>
                <Image
                  src="/images/naj-logo-solid.png"
                  alt="Sai Sarthak Logo"
                  width={200}
                  height={120}
                  className="relative z-10 animate-pulse rounded-3xl"
                  style={{ animationDuration: "4s" }}
                />
              </div>

              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-glow">
                <h3 className="text-xl font-bold mb-3 text-gray-200 font-poppins">Where I'm Going</h3>
                <p className="text-gray-100 font-open-sans text-center">
                  I aim to become a full-stack AI & Data Science professional. Excited to work on NLP, computer vision,
                  and generative AI in the future. Focused on growing my knowledge and creating impactful solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative h-screen">
        <GalaxyCanvas id="projectsCanvas" />

        <div className="relative z-10 h-full flex flex-col md:flex-row">
          <ProjectHalf
            title="Projet : Enso AI-Powered Chatbot"
            description="A conversational assistant designed to provide instant and smart replies.
            Built using NLP models to understand and respond to user queries.
            Enhances user interaction with automated, human-like conversations."
            imagePath="/images/enso-logo.png"
            imageAlt="Logo Enso - Illustration minimaliste d'un chat zen avec typographie"
            projectType="enso"
            activeProject={activeProject}
            onHover={handleProjectHover}
          />
          <ProjectHalf
            title="Projet : OpenCV Self-Hiding Tool"
            description="A computer vision project that hides or masks a person in real time.
            Utilizes OpenCV for image detection and object manipulation.
            Showcases practical use of AI in privacy and security applications."
            imagePath="/images/streeteux-logo.png"
            imageAlt="Logo STREETEUX - Design typographique moderne en rouge"
            projectType="creative"
            activeProject={activeProject}
            onHover={handleProjectHover}
          />
          <ProjectHalf
            title="Projet :BoostUp AI-Powered Resume Scanner"
            description="An intelligent tool that analyzes resumes and highlights key strengths.
            Uses NLP and machine learning to match resumes with job requirements.
            Helps users optimize their profiles for better hiring opportunities."
            imagePath="/images/boostup-logo.png"
            imageAlt="Logo BoostUp - Design moderne avec cube 3D et typographie sur fond bleu"
            projectType="boostup"
            activeProject={activeProject}
            onHover={handleProjectHover}
          />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative h-screen flex items-center justify-center p-4">
        <GalaxyCanvas id="servicesCanvas" />
        <div className="relative z-10 max-w-3xl bg-black/70 p-8 md:p-10 rounded-xl shadow-glow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-200 font-poppins">Education and Skills</h2>

          <div className="mb-8 py-6 border-y border-white/20">
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl md:text-3xl font-bold text-white mb-2">I am curious to learn new things</p>
              <div className="w-16 h-1 bg-white/50 my-2"></div>
              <p className="text-lg text-gray-300">Always exploring and growing</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-100 font-open-sans">
            <p>
              As an aspiring AI and Data Science professional, I'm dedicated to mastering the{" "}
              <strong>fundamentals of machine learning and data analysis</strong>. My journey focuses on building{" "}
              <strong>practical skills through hands-on projects</strong> and continuous learning.
            </p>
            <p>
              From Python programming to deep learning frameworks, I'm exploring every aspect of this fascinating field.
              Each project teaches me something new, and I'm excited to apply these skills to solve{" "}
              <strong>real-world problems with intelligent solutions</strong>.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h3 className="font-bold text-lg mb-2">Learning</h3>
                <ul className="text-sm text-left list-disc pl-5 space-y-1">
                  <li>Python Programming</li>
                  <li>Machine Learning</li>
                  <li>Data Analysis</li>
                  <li>Deep Learning</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h3 className="font-bold text-lg mb-2">Tools</h3>
                <ul className="text-sm text-left list-disc pl-5 space-y-1">
                  <li>Pandas & NumPy</li>
                  <li>Scikit-learn</li>
                  <li>TensorFlow</li>
                  <li>Jupyter Notebooks</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h3 className="font-bold text-lg mb-2">Goals</h3>
                <ul className="text-sm text-left list-disc pl-5 space-y-1">
                  <li>NLP Projects</li>
                  <li>Computer Vision</li>
                  <li>Generative AI</li>
                  <li>Real-world Solutions</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleContactClick}
              className="mt-8 px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105 transform"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/80 py-8 px-4 text-center">
        <div className="container mx-auto flex flex-col items-center">
          <Image
            src="/images/naj-logo-solid.png"
            alt="Sai Sarthak Logo"
            width={60}
            height={36}
            className="mb-4 rounded-3xl"
          />
          <p className="text-white/70 text-sm">© {new Date().getFullYear()} Sai Sarthak. All rights reserved.</p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              x
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

interface ProjectHalfProps {
  title: string
  description: string
  imagePath: string
  imageAlt: string
  projectType: "enso" | "creative" | "boostup"
  activeProject: string | null
  onHover: (projectType: string | null) => void
}

function ProjectHalf({
  title,
  description,
  imagePath,
  imageAlt,
  projectType,
  activeProject,
  onHover,
}: ProjectHalfProps) {
  const isExpanded = activeProject === projectType
  const isAnyProjectActive = activeProject !== null
  const isThisProjectActive = isAnyProjectActive && isExpanded

  return (
    <div
      className={`w-full md:w-1/3 h-full bg-black/60 flex items-center justify-center transition-all duration-700 relative overflow-hidden ${
        isExpanded ? "fixed inset-0 z-50 md:w-full" : ""
      }`}
      onMouseEnter={() => onHover(projectType)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Special handling for Enso project with enlarging animation */}
      {projectType === "enso" && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${isExpanded ? "scale-150" : "scale-90 opacity-90"}`}
        >
          <div className="relative w-full h-full max-w-lg max-h-lg">
            <Image
              src={imagePath || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-contain rounded-3xl"
              priority
            />
          </div>
          {isExpanded && <div className="absolute inset-0 bg-black/40 rounded-2xl" />}
        </div>
      )}

      {/* Special handling for BoostUp project with enlarging animation */}
      {projectType === "boostup" && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${isExpanded ? "scale-150" : "scale-90 opacity-90"}`}
        >
          <div className="relative w-full h-full max-w-lg max-h-lg">
            <Image
              src={imagePath || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-contain rounded-3xl"
              priority
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
          {isExpanded && <div className="absolute inset-0 bg-black/30 rounded-2xl" />}
        </div>
      )}

      {/* Text content - only visible on hover */}
      <div
        className={`p-6 md:p-8 max-w-md text-center relative z-10 transition-all duration-700 ${
          isThisProjectActive ? "opacity-100 transform translate-y-8" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Enhanced text container for better legibility when expanded */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-poppins text-white text-shadow-lg">{title}</h3>
          <p className="mb-6 font-open-sans text-gray-100 text-shadow-md">{description}</p>
        </div>
      </div>

      {/* Special handling for STREETEUX project with larger default size */}
      {projectType === "creative" && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${
            isExpanded ? "scale-150" : "scale-100 opacity-90"
          }`}
        >
          <div className="relative w-full h-full max-w-lg max-h-lg">
            <Image
              src={imagePath || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-contain rounded-3xl"
              priority
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
          {isExpanded && <div className="absolute inset-0 bg-black/50 rounded-2xl" />}
        </div>
      )}
    </div>
  )
}
