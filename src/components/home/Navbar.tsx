import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Spendora
          </h1>
        </Link>

        {/* Links */}
        <div className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex">
          <a
            href="#"
            className="transition hover:text-black"
          >
            Features
          </a>

          <a
            href="#"
            className="transition hover:text-black"
          >
            Pricing
          </a>
        </div>

        {/* Button */}
        <button className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90">
          Start Free Audit
        </button>
      </div>
    </nav>
  );
};

export default Navbar;