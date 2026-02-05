"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-around flex-col sm:flex-row w-full py-6 px-16 sticky top-0 left-0 right-0 bg-teal-500 z-10 h-(var(--header-height))">
        <Link href="/">
            <Image alt="Blicksolutions_logo" title="Blicksolutions GmbH"
            src="/blick_solutions.png" width={202} height={50}
            />
        </Link>
        <a className="text-white hover:text-orange-300" target="_blank" href="https://github.com/muratcanoncu">
            Github
        </a>
        <a className="text-white hover:text-orange-300" target="_blank" href="https://www.linkedin.com/in/muratcanoncu/">
            Linkedin
        </a>
        <a className="text-white hover:text-orange-300" target="_blank" href="https://www.stoffe.de">
            stoffe.de
        </a>
        <a className="text-white hover:text-orange-300" target="_blank" href="https://www.playmobil.com">
            playmobil.com
        </a>
    </header>
  );
}
