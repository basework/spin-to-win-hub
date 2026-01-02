import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-display text-gradient-gold mb-4">SPINWIN</h3>
            <p className="text-muted-foreground text-sm">
              The #1 destination for exclusive prizes and unbeatable deals.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary text-sm">Home</Link></li>
              <li><Link to="/admin" className="text-muted-foreground hover:text-primary text-sm">Admin</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm">Cookie Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm">Refund Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm">Help Center</a></li>
              <li><a href="mailto:support@spinwin.com" className="text-muted-foreground hover:text-primary text-sm">support@spinwin.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SpinWin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
