"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Aquí puedes implementar la lógica de búsqueda
    console.log("Búsqueda:", searchQuery);
    setSearchQuery("");
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold">MovieHub</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Inicio
                </Link>
                <Link
                  href="/movies"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Películas
                </Link>
                <Link
                  href="/series"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Series
                </Link>
                <Link
                  href="/categorias"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Categorías
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {/* <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Buscar películas..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="bg-gray-700 text-white"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="ml-2"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form> */}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Inicio
            </Link>
            <Link
              href="/"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Películas
            </Link>
            <Link
              href="/series"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Series
            </Link>
            <Link
              href="/categorias"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Categorías
            </Link>
          </div>
          <div className="px-2 pt-2 pb-3">
            {/* <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Buscar películas..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="bg-gray-700 text-white w-full"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="ml-2"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
