import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MovieHub</h3>
            <p className="text-sm text-gray-400">
              Tu destino para descubrir y disfrutar de las mejores películas.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-gray-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/peliculas" className="text-sm hover:text-gray-300">
                  Películas
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-sm hover:text-gray-300">
                  Series
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className="text-sm hover:text-gray-300"
                >
                  Categorías
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a
                  href="mailto:info@moviehub.com"
                  className="text-sm hover:text-gray-300"
                >
                  info@moviehub.com
                </a>
              </li>
              <li>
                <p className="text-sm">
                  123 Calle del Cine, Ciudad Película, CP 12345
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} MovieHub. Todos los derechos
            reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              href="/privacidad"
              className="text-sm text-gray-400 hover:text-gray-300 mr-4"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-sm text-gray-400 hover:text-gray-300"
            >
              Términos de Uso
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          Powered by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            The Movie Database
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
