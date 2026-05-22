import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const whatsappUrl = 'https://wa.me/923178328164?text=' + encodeURIComponent("Hi, I'd like to see VizEz for my agency")

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="navbar-logo">
              <Image
                src="/logo.svg"
                alt="VizEz"
                width={90}
                height={32}
                className="navbar-logo-img"
              />
            </Link>
            <p className="footer-tagline">AI-powered visa automation, built for the world&apos;s travel agencies.</p>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <Link href="/product">Features</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/about">About</Link>
            <Link href="/faq">FAQ</Link>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="mailto:vizez.cloud@gmail.com">Email</a>
            <a href="https://www.facebook.com/profile.php?id=61590168394681" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com/vizez.cloud" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 VizEz by <a href="https://projekts.pk" target="_blank" rel="noopener noreferrer" className="footer-projekts">Projekts</a>. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
