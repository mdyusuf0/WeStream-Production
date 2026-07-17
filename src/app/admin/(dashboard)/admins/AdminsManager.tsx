"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { UserPlus, Trash2, ShieldAlert, AlertCircle } from "lucide-react";

interface AdminData {
  id: string;
  email: string;
  createdBy: string;
  createdAt: string;
}

interface AdminsManagerProps {
  initialAdmins: AdminData[];
}

export default function AdminsManager({ initialAdmins }: AdminsManagerProps) {
  const { data: session } = useSession();
  const [admins, setAdmins] = useState<AdminData[]>(initialAdmins);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Feedback states
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 8) {
      setError("Temporary password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create administrator account.");
      } else {
        setSuccess(`Admin account ${email} created successfully.`);
        setEmail("");
        setPassword("");
        
        setAdmins((prev) => [
          {
            id: data.admin.id,
            email: data.admin.email,
            createdBy: data.admin.createdBy,
            createdAt: data.admin.createdAt,
          },
          ...prev,
        ]);
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (admin: AdminData) => {
    const confirmDelete = window.confirm(`Are you sure you want to revoke access and delete the admin account: ${admin.email}?`);
    if (!confirmDelete) return;

    setDeletingId(admin.id);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/admin/admins/${admin.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to remove administrator.");
      } else {
        setSuccess(`Admin account ${admin.email} has been deleted.`);
        setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
      }
    } catch (err) {
      setError("A network error occurred.");
    } finally {
      setDeletingId(null);
    }
  };

  const loggedInEmail = session?.user?.email?.toLowerCase().trim();
  const isLastAdmin = admins.length <= 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
      
      {/* LEFT: ADMINS LIST TABLE */}
      <div className="lg:col-span-7 bg-surface border border-header-border rounded-sm overflow-hidden flex flex-col justify-between h-max">
        
        <div className="p-5 border-b border-header-border bg-surface/50">
          <h2 className="text-xs font-heading font-extrabold tracking-widest text-accent uppercase flex items-center gap-2">
            <ShieldAlert size={14} /> Active Security Officers
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-header-border bg-background/30 text-muted-foreground uppercase text-[9px] tracking-widest font-heading font-bold">
                <th className="p-4">Admin Email</th>
                <th className="p-4">Created By</th>
                <th className="p-4">Added On</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-header-border">
              {admins.map((admin) => {
                const isSelf = admin.email.toLowerCase().trim() === loggedInEmail;
                const deleteDisabled = isSelf || isLastAdmin;
                const isDeleting = deletingId === admin.id;

                return (
                  <tr key={admin.id} className="hover:bg-background/20 transition-colors">
                    <td className="p-4 font-mono font-bold text-foreground">
                      <div className="flex items-center gap-2">
                        {admin.email}
                        {isSelf && (
                          <span className="text-[8px] font-heading font-extrabold tracking-widest bg-accent/15 text-accent border border-accent/20 px-2 py-0.5 rounded-full uppercase">
                            You
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground font-mono text-[11px] truncate max-w-[120px]">
                      {admin.createdBy}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteAdmin(admin)}
                        disabled={deleteDisabled || isDeleting}
                        title={
                          isSelf 
                            ? "You cannot delete your own account." 
                            : isLastAdmin 
                            ? "Lockout protection: You cannot delete the last remaining administrator." 
                            : "Delete administrator account"
                        }
                        className={`
                          p-2 rounded-sm border transition-colors cursor-pointer inline-flex items-center justify-center
                          ${deleteDisabled 
                            ? "border-header-border text-muted-foreground/30 cursor-not-allowed opacity-30" 
                            : "border-red-500/20 text-red-400 hover:bg-red-950/20 hover:border-red-500/40"
                          }
                        `}
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 bg-background/20 border-t border-header-border text-center text-[10px] text-muted-foreground">
          Total administrative accounts: {admins.length}
        </div>

      </div>

      {/* RIGHT: ADD ADMIN FORM */}
      <div className="lg:col-span-5 bg-surface border border-header-border p-8 rounded-sm h-max relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-accent" />
        
        <div className="mb-6 space-y-1">
          <span className="text-[9px] font-heading font-extrabold tracking-widest text-accent uppercase block">SECURITY ACTION</span>
          <h2 className="text-sm font-heading font-extrabold uppercase text-foreground flex items-center gap-2">
            <UserPlus size={16} /> Add New Admin
          </h2>
        </div>

        <form onSubmit={handleAddAdmin} className="space-y-4 font-sans">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 text-xs rounded-sm flex items-start gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-950/40 border border-green-500/30 text-green-400 text-xs rounded-sm">
              {success}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-background border border-header-border rounded-sm text-foreground text-xs focus:border-accent focus:outline-none transition-colors"
              placeholder="example@westream.in"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
              Temporary Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-background border border-header-border rounded-sm text-foreground text-xs focus:border-accent focus:outline-none transition-colors"
              placeholder="•••••••• (Min. 8 chars)"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[38px] bg-accent text-background font-heading text-[10px] font-bold tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-background/50 border border-header-border rounded-sm space-y-2">
          <h4 className="text-[10px] font-heading font-extrabold uppercase text-accent tracking-widest">
            Security Notice
          </h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Admin accounts have flat permission tiers. New admins can log in immediately at `/admin/login` using these credentials. They can manage media, read enquiries, and modify other administrative credentials. Please share credentials securely.
          </p>
        </div>

      </div>

    </div>
  );
}
