import { Globe } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-inner">
        <a className="footer-credit" href="https://oneyoung.com">© OneYoung</a>
        <div className="footer-links">
          <a className="icon-link" href="https://oneyoung.com" aria-label="OneYoung’s website" title="OneYoung’s website"><Globe size={19} aria-hidden="true" /></a>
          <a className="icon-link" href="https://github.com/oneyoung19" aria-label="OneYoung on GitHub" title="GitHub"><SiGithub size={20} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  )
}
