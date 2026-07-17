"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Film, Mail, ShieldAlert, Key, LogOut, ExternalLink, Menu, X, User, ChevronLeft, ChevronRight } from "lucide-react";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  initialUnreadCount: number;
}

export default function AdminDashboardLayout({ children, initialUnreadCount }: AdminDashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    // Listen for custom event updates to unread count from sub-pages
    const handleUnreadUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (typeof customEvent.detail === "number") {
        setUnreadCount(customEvent.detail);
      }
    };

    window.addEventListener("unread-count-changed", handleUnreadUpdate);
    return () => window.removeEventListener("unread-count-changed", handleUnreadUpdate);
  }, []);

  const navItems = [
    { name: "Media Management", href: "/admin/media", icon: Film },
    { 
      name: "Enquiries", 
      href: "/admin/enquiries", 
      icon: Mail,
      badge: unreadCount > 0 ? unreadCount : undefined 
    },
    { name: "Admins", href: "/admin/admins", icon: ShieldAlert },
  ];

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch("/api/admin/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || "Failed to update password.");
      } else {
        setPasswordSuccess("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        // Close modal after a brief delay
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPasswordSuccess(null);
        }, 1500);
      }
    } catch (err) {
      setPasswordError("A network error occurred. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative">
      
      {/* MOBILE HEADER BAR */}
      <header className="md:hidden w-full bg-surface border-b border-header-border px-6 py-4 flex items-center justify-between z-40">
        <span className="font-heading text-xs font-extrabold tracking-[0.2em] text-accent uppercase">
          WeStream Admin
        </span>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-foreground hover:text-accent transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* PERSISTENT SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 bg-surface border-r border-header-border flex flex-col justify-between z-40
        transform transition-all duration-300 md:relative md:transform-none
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "md:w-20" : "md:w-56"}
      `}>
        
        {/* Top Section */}
        <div>
          {/* Header */}
          <div className={`p-6 border-b border-header-border flex items-center justify-between transition-all duration-300 ${isCollapsed ? "md:flex-col md:gap-4 md:px-2 md:py-6" : ""}`}>
            {!isCollapsed ? (
              <div className="space-y-1">
                <span className="text-[9px] font-heading font-extrabold tracking-[0.25em] text-accent uppercase block">
                  WESTREAM PRODUCTION
                </span>
                <h2 className="text-sm font-heading font-extrabold uppercase text-foreground">
                  Control Center
                </h2>
              </div>
            ) : (
              <span className="font-heading text-sm font-extrabold tracking-[0.1em] text-accent uppercase block md:text-center">
                WS
              </span>
            )}
            
            <div className="flex items-center">
              <button className="md:hidden text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsSidebarOpen(false)}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 font-sans">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  title={isCollapsed ? item.name : undefined}
                  className={`
                    w-full px-4 py-3 rounded-sm flex items-center justify-between text-xs font-bold uppercase tracking-wider transition-all duration-200 relative
                    ${isActive 
                      ? "bg-accent text-background" 
                      : "text-muted-foreground hover:bg-background/40 hover:text-foreground"
                    }
                    ${isCollapsed ? "md:justify-center md:px-0" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="shrink-0" />
                    <span className={isCollapsed ? "md:hidden" : "block"}>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`
                      text-[9px] px-2 py-0.5 rounded-full font-bold transition-all duration-300
                      ${isCollapsed ? "md:absolute md:top-1.5 md:right-1.5 md:text-[8px] md:h-4 md:min-w-4 md:flex md:items-center md:justify-center md:px-1" : ""}
                      ${isActive ? "bg-background text-accent" : "bg-accent text-background"}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Account Panel */}
        <div className="p-4 border-t border-header-border space-y-3 font-sans transition-all duration-300">
          
          {/* Admin User Info */}
          <div className={`px-4 py-2 bg-background/40 border border-header-border rounded-sm flex items-center gap-3 transition-all duration-300 ${isCollapsed ? "md:justify-center md:px-0 md:py-3" : ""}`}>
            <div className="h-7 w-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <User size={14} />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "md:hidden" : "block"}`}>
              <span className="text-[10px] font-bold text-muted-foreground block leading-none">SYSTEM ADMIN</span>
              <span className="text-xs text-foreground truncate block pt-1 font-mono">
                {session?.user?.email || "loading..."}
              </span>
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-1">
            {/* Wrap option */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Expand Sidebar (Wrap Off)" : "Collapse Sidebar (Wrap In)"}
              className={`w-full px-4 py-2.5 rounded-sm flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:bg-background/40 hover:text-foreground transition-colors text-left ${isCollapsed ? "md:justify-center md:px-0" : ""}`}
            >
              {isCollapsed ? (
                <>
                  <ChevronRight size={14} className="shrink-0 text-accent animate-pulse" />
                  <span className="md:hidden">Wrap Off</span>
                </>
              ) : (
                <>
                  <ChevronLeft size={14} className="shrink-0" />
                  <span>Wrap In</span>
                </>
              )}
            </button>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              title={isCollapsed ? "Change Password" : undefined}
              className={`w-full px-4 py-2.5 rounded-sm flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:bg-background/40 hover:text-foreground transition-colors text-left ${isCollapsed ? "md:justify-center md:px-0" : ""}`}
            >
              <Key size={14} className="shrink-0" />
              <span className={isCollapsed ? "md:hidden" : "block"}>Change Password</span>
            </button>
            <Link
              href="/"
              target="_blank"
              title={isCollapsed ? "View Live Site" : undefined}
              className={`px-4 py-2.5 rounded-sm flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:bg-background/40 hover:text-foreground transition-colors ${isCollapsed ? "md:justify-center md:px-0" : ""}`}
            >
              <ExternalLink size={14} className="shrink-0" />
              <span className={isCollapsed ? "md:hidden" : "block"}>View Live Site</span>
            </Link>
            <button
              onClick={handleLogout}
              title={isCollapsed ? "Sign Out" : undefined}
              className={`w-full px-4 py-2.5 rounded-sm flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-950/20 transition-colors text-left ${isCollapsed ? "md:justify-center md:px-0" : ""}`}
            >
              <LogOut size={14} className="shrink-0" />
              <span className={isCollapsed ? "md:hidden" : "block"}>Sign Out</span>
            </button>
          </div>
        </div>

      </aside>

      {/* DASHBOARD PAGE CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-full">
        {children}
      </main>

      {/* CHANGE PASSWORD MODAL */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface border border-header-border p-8 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-accent" />
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[9px] font-heading font-extrabold tracking-widest text-accent uppercase block">SECURITY</span>
                <h3 className="text-lg font-heading font-extrabold uppercase text-foreground">Update Password</h3>
              </div>
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4 font-sans">
              {passwordError && (
                <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 text-xs rounded-sm">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="p-3 bg-green-950/40 border border-green-500/30 text-green-400 text-xs rounded-sm">
                  {passwordSuccess}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-background border border-header-border rounded-sm text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-background border border-header-border rounded-sm text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
                  placeholder="•••••••• (Min. 8 chars)"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-background border border-header-border rounded-sm text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="w-1/2 min-h-[40px] border border-header-border text-foreground hover:bg-background/40 font-heading text-[10px] font-bold tracking-widest uppercase rounded-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-1/2 min-h-[40px] bg-accent text-background font-heading text-[10px] font-bold tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                  {passwordLoading ? "Saving..." : "Save Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
