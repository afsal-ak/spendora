
const Navbar = () => {
  return (
    <nav className="w-full border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight text-black">
          Spendora
        </h1>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <a href="#" className="hover:text-black transition">
            Features
          </a>

          <a href="#" className="hover:text-black transition">
            Pricing
          </a>

          {/* <a href="#" className="hover:text-black transition">
            Demo
          </a>

          <a href="#" className="hover:text-black transition">
            Contact
          </a> */}
        </div>

        {/* Button */}
        <button className="px-5 py-2 rounded-xl bg-black text-white text-sm font-medium hover:opacity-90 transition">
          Start Free Audit
        </button>
      </div>
    </nav>
  );
};

export default Navbar;