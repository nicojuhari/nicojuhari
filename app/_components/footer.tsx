export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 border-t bg-white">
      <div className="container-page flex flex-col items-center gap-4">
        <div className="flex gap-6 items-center">
          <a
            href="https://github.com/nicojuhari"
            target="_blank"
            rel="nofollow"
            title="GitHub Profile"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
            </svg>
          </a>
          <a
            href="https://twitter.com/nicojuhari"
            target="_blank"
            rel="nofollow"
            title="X (Twitter) Profile"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 48 48">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M21.604 25.622L7.693 41.498M37.924 6.502L25.554 21.07M6.61 6.5l27.44 35h7.56l-27.439-35z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/nicojuhari/"
            target="_blank"
            rel="nofollow"
            title="LinkedIn Profile"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 256 256">
              <path fill="currentColor" d="M212 28H44a16 16 0 0 0-16 16v168a16 16 0 0 0 16 16h168a16 16 0 0 0 16-16V44a16 16 0 0 0-16-16ZM96 176a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm-8-84a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm96 84a8 8 0 0 1-16 0v-36a20 20 0 0 0-40 0v36a8 8 0 0 1-16 0v-64a8 8 0 0 1 15.8-1.8A36 36 0 0 1 184 140Z" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          © {year} Nicolae Cojuhari — Software Engineer
        </p>
      </div>
    </footer>
  )
}
