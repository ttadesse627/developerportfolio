import { SocialIcon} from 'react-social-icons';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: 'email', href: "mailto:ttadesse627@gmail.com", label: "Email" },
    { icon: 'github', href: "https://github.com/ttadesse627", label: "GitHub" },
    { icon: 'linkedin', href: "https://linkedin.com/in/ttadesse627", label: "LinkedIn" },
    { icon: 'telegram', href: "https://t.me/ttadesse627", label: "Telegram" }
    
  ];

  return (
    <footer className="bg-secondary dark:bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">DevPortfolio</h3>
            <p className="text-gray-300 dark:text-gray-400">
              Building amazing digital experiences with modern technologies.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 transition-colors">About</Link></li>
              <li><Link href="/projects" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Let's Connect</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <div
                    key={social.label}
                    className="group relative p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                    aria-label={social.label}
                  >
                    <div className="flex items-center gap-2">
                      <SocialIcon
                        url={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        network={social.icon}
                        className="h-5 w-5 !text-gray-700 dark:!text-gray-300 group-hover:!text-primary dark:group-hover:!text-primary-dark transition-colors"
                        bgColor="transparent"
                        fgColor="currentColor"
                        aria-label={social.label}
                        title={social.label}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl">
                    <Phone className="h-6 w-6 text-primary dark:text-primary-dark" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Available for calls</p>
                    <a 
                      href="tel:+251946938942" 
                      className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-dark transition-colors inline-flex items-center gap-2"
                    >
                      (+251) 94 693 8942
                      <span className="inline-block h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                    </a>
                    <a 
                      href="tel:+251701002011" 
                      className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-dark transition-colors inline-flex items-center gap-2"
                    >
                      (+251) 70 100 2011
                      <span className="inline-block h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                    </a>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; {currentYear} Tesfaye T. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}