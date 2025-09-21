"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  LayoutDashboard,
  Smartphone,
  History,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logout } from "@/store/slices/authSlice"

const navigation = [
  {
    name: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "API SMS",
    href: "/dashboard/sms",
    icon: Smartphone,
  },
  {
    name: "API WhatsApp",
    href: "/dashboard/whatsapp",
    icon: MessageSquare,
  },
  {
    name: "Historique",
    href: "/dashboard/history",
    icon: History,
  },
  {
    name: "Facturation",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    name: "Paramètres du compte",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const userInitials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "AB"

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 p-6 border-b border-sidebar-border">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">Connect API</span>
          </div>

          {/* User info */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sidebar-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-sidebar-accent-foreground">{userInitials}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">{user?.name || "Utilisateur"}</p>
                <p className="text-xs text-muted-foreground">{user?.email || "email@example.com"}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                Plan {user?.plan === "free" ? "Gratuit" : user?.plan === "pro" ? "Pro" : "Enterprise"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                150 crédits
              </Badge>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
