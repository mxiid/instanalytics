"use client"
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import MobileMenu from './mobile-menu';
import SvgLogo from "@/components/SvgLogo";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/'); // Redirect to the default page after sign-out
  };

  return (
      <header className="absolute w-full z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <div className="shrink-0 mr-4">
              <Link href="/" className="block" aria-label="Cruip">
                <SvgLogo/>
              </Link>
            </div>

            <nav className="hidden md:flex md:grow">
              <ul className="flex grow justify-end flex-wrap items-center">
                {!session ? (
                    <>
                      <li>
                        <Link
                            href="/signin"
                            className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                        >
                          Sign in
                        </Link>
                      </li>
                      <li>
                        <Link href="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                          Sign up
                        </Link>
                      </li>
                    </>
                ) : (
                    <>
                      <li>
                        <button
                            onClick={handleSignOut}
                            className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                        >
                          Sign out
                        </button>
                      </li>
                    </>
                )}
              </ul>
            </nav>

            <MobileMenu/>
          </div>
        </div>
      </header>
  );
}
