import { Linkedin, Mail, Instagram, Sparkles } from 'lucide-react'

export default function Footer() {
  const footerText = 'Created by Shaikh, initial part of Bahria Buddy project that\'s actively evolving to Yuni Buddy'
  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, url: 'mailto:sheikhafaqahmad786@gmail.com', label: 'Email' },
    { icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/motibilis_/?__pwa=1#', label: 'Instagram' },
  ]

  return (
    <footer className="relative bg-[#0A080C] border-t border-[rgba(212,175,55,0.1)] z-10">
      <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Footer Text */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-cinzel text-sm font-bold text-[#D4AF37] tracking-widest">MOTIBILIS</span>
          </div>
          <p className="text-xs text-[#888] font-inter tracking-wide max-w-lg">
            {footerText}
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className="text-[#888] hover:text-[#D4AF37] transition-all duration-300 hover:scale-110"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Gold accent line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </footer>
  )
}