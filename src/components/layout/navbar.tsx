"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, Heart, User, BookOpen, LogOut, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: BookOpen },
    { href: "/about", label: "About", icon: Heart },
    { href: "/donate", label: "Donate", icon: Heart },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-playfair text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Selfless Advice
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {session.user.name}
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Profile</span>
                    </Link>
                    {["ADMIN", "AUTHOR", "EDITOR"].includes(session.user.role) && (
                      <Link
                        href="/admin"
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">Admin</span>
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/api/auth/signin"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/api/auth/signin"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                {session ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{session.user.name}</p>
                        <p className="text-sm text-gray-500">{session.user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Profile</span>
                    </Link>
                    {["ADMIN", "AUTHOR", "EDITOR"].includes(session.user.role) && (
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Admin</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut()
                        setIsOpen(false)
                      }}
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/api/auth/signin"
                      onClick={() => setIsOpen(false)}
                      className="block p-3 text-center text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/api/auth/signin"
                      onClick={() => setIsOpen(false)}
                      className="block p-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
