"use client";

import React, { useState } from "react";
import { Search, Mail, Phone, ExternalLink, Archive, Check, ArrowLeft, Trash2, MailOpen } from "lucide-react";

interface EnquiryData {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  referenceLinks: string;
  driveLink: string;
  status: "NEW" | "READ" | "ARCHIVED";
  createdAt: string;
}

interface EnquiriesManagerProps {
  initialEnquiries: EnquiryData[];
  initialUnreadCount: number;
}

export default function EnquiriesManager({ initialEnquiries, initialUnreadCount }: EnquiriesManagerProps) {
  const [enquiries, setEnquiries] = useState<EnquiryData[]>(initialEnquiries);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Search & Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  
  // Find selected enquiry object
  const selectedEnquiry = enquiries.find((e) => e.id === selectedId);

  // Dispatch custom event to update unread badge count in sidebar
  const triggerBadgeUpdate = (count: number) => {
    window.dispatchEvent(new CustomEvent("unread-count-changed", { detail: count }));
  };

  // Handle click on enquiry card (auto marks NEW as READ)
  const handleSelectEnquiry = async (enquiry: EnquiryData) => {
    setSelectedId(enquiry.id);

    if (enquiry.status === "NEW") {
      // Optimistically update status to READ in UI
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiry.id ? { ...e, status: "READ" } : e))
      );

      try {
        const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "READ" }),
        });

        if (res.ok) {
          const data = await res.json();
          // Sync with exact server count
          triggerBadgeUpdate(data.unreadCount);
        }
      } catch (err) {
        console.error("Failed to mark enquiry as read:", err);
      }
    }
  };

  // Mark status manually (e.g. ARCHIVED or back to NEW)
  const handleUpdateStatus = async (id: string, newStatus: "NEW" | "READ" | "ARCHIVED") => {
    setLoadingAction(id);

    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        triggerBadgeUpdate(data.unreadCount);
      }
    } catch (err) {
      alert("Failed to update status.");
    } finally {
      setLoadingAction(null);
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this enquiry? This action cannot be undone.");
    if (!confirmDelete) return;

    setLoadingAction(id);

    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const data = await res.json();
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        setSelectedId(null);
        triggerBadgeUpdate(data.unreadCount);
      } else {
        alert("Failed to delete enquiry.");
      }
    } catch (err) {
      alert("A network error occurred.");
    } finally {
      setLoadingAction(null);
    }
  };

  // Filter the list
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch = e.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          e.email.toLowerCase().includes(search.toLowerCase()) ||
                          e.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || e.status === statusFilter;
    const matchesType = typeFilter === "ALL" || e.projectType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const projectTypes = ["Corporate Film", "Live Streaming", "Event Coverage", "Post-Production", "Other"];

  // WhatsApp reply link formatter
  const getWhatsAppLink = (phone: string, name: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const formatted = cleaned.length === 10 ? `91${cleaned}` : cleaned;
    const text = encodeURIComponent(`Hello ${name}, thanks for reaching out to WeStream Production. We reviewed your enquiry...`);
    return `https://wa.me/${formatted}?text=${text}`;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] min-h-[500px]">
      
      {/* LEFT SECTION: LIST VIEW */}
      <div className={`
        flex-1 lg:max-w-md w-full bg-surface border border-header-border rounded-sm flex flex-col justify-between overflow-hidden font-sans
        ${selectedId ? "hidden lg:flex" : "flex"}
      `}>
        
        {/* Filters Panel */}
        <div className="p-4 border-b border-header-border space-y-3 bg-surface/50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-header-border rounded-sm text-foreground text-xs focus:border-accent focus:outline-none transition-colors"
            />
            <Search size={14} className="absolute left-3 top-2.5 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-muted-foreground block mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-background border border-header-border rounded-sm text-foreground text-[10px] uppercase font-bold focus:border-accent focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New</option>
                <option value="READ">Read</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            
            <div>
              <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-muted-foreground block mb-1">Project Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-background border border-header-border rounded-sm text-foreground text-[10px] uppercase font-bold focus:border-accent focus:outline-none"
              >
                <option value="ALL">All Streams</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Enquiry Row List */}
        <div className="flex-1 overflow-y-auto divide-y divide-header-border">
          {filteredEnquiries.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No matching enquiries found.
            </div>
          ) : (
            filteredEnquiries.map((enquiry) => {
              const isSelected = enquiry.id === selectedId;
              const isNew = enquiry.status === "NEW";
              const isArchived = enquiry.status === "ARCHIVED";

              return (
                <div
                  key={enquiry.id}
                  onClick={() => handleSelectEnquiry(enquiry)}
                  className={`
                    p-4 text-left cursor-pointer transition-colors relative
                    ${isSelected ? "bg-accent/10 border-l-[3px] border-accent pl-[13px]" : "hover:bg-background/30"}
                    ${isArchived ? "opacity-60" : ""}
                  `}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground leading-none">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </span>
                    
                    {/* Status Badge */}
                    <span className={`
                      text-[8px] font-heading font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-sm border
                      ${isNew 
                        ? "bg-accent/10 text-accent border-accent/30 animate-pulse" 
                        : isArchived 
                        ? "bg-background text-muted-foreground/60 border-header-border" 
                        : "bg-surface text-muted-foreground border-header-border"}
                    `}>
                      {enquiry.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-heading font-bold text-foreground">
                    {enquiry.fullName}
                  </h3>
                  
                  {enquiry.company && (
                    <span className="text-[10px] text-muted-foreground font-mono block">
                      {enquiry.company}
                    </span>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] font-heading font-extrabold uppercase text-accent/80 tracking-wider">
                      {enquiry.projectType}
                    </span>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Counter footer */}
        <div className="p-3 bg-surface/50 border-t border-header-border text-center text-[10px] text-muted-foreground">
          Showing {filteredEnquiries.length} of {enquiries.length} enquiries
        </div>

      </div>

      {/* RIGHT SECTION: DETAIL VIEW */}
      <div className={`
        flex-1 bg-surface border border-header-border rounded-sm flex flex-col justify-between overflow-hidden font-sans
        ${!selectedId ? "hidden lg:flex items-center justify-center text-muted-foreground" : "flex"}
      `}>
        {selectedEnquiry ? (
          <div className="h-full flex flex-col justify-between overflow-hidden">
            
            {/* Detail Header */}
            <div className="p-6 border-b border-header-border flex items-center justify-between bg-surface/50 shrink-0">
              <div className="space-y-1.5 max-w-[70%]">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="lg:hidden text-accent text-xs font-heading font-bold flex items-center gap-1.5 mb-2 uppercase tracking-wider"
                >
                  <ArrowLeft size={14} /> Back to list
                </button>
                <span className="text-[10px] font-mono text-muted-foreground block">
                  Received on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </span>
                <h2 className="text-lg font-heading font-extrabold text-foreground uppercase truncate">
                  {selectedEnquiry.fullName}
                </h2>
                {selectedEnquiry.company && (
                  <span className="text-xs text-accent font-bold uppercase tracking-wider block">
                    {selectedEnquiry.company}
                  </span>
                )}
              </div>

              {/* Status Action Buttons */}
              <div className="flex gap-2">
                {selectedEnquiry.status !== "ARCHIVED" ? (
                  <button
                    disabled={loadingAction === selectedEnquiry.id}
                    onClick={() => handleUpdateStatus(selectedEnquiry.id, "ARCHIVED")}
                    className="px-3 py-2 bg-background border border-header-border rounded-sm text-xs font-bold text-muted-foreground hover:text-foreground hover:border-accent/40 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Archive size={14} />
                    Archive
                  </button>
                ) : (
                  <button
                    disabled={loadingAction === selectedEnquiry.id}
                    onClick={() => handleUpdateStatus(selectedEnquiry.id, "READ")}
                    className="px-3 py-2 bg-background border border-header-border rounded-sm text-xs font-bold text-muted-foreground hover:text-foreground hover:border-accent/40 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <MailOpen size={14} />
                    Unarchive
                  </button>
                )}
                
                <button
                  disabled={loadingAction === selectedEnquiry.id}
                  onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                  className="px-3 py-2 bg-red-950/20 border border-red-500/30 rounded-sm text-xs font-bold text-red-400 hover:bg-red-950/40 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>

            {/* Detail Body (Scrollable) */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              
              {/* Contact Info Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Panel */}
                <div className="bg-background border border-header-border p-4 rounded-sm space-y-2">
                  <span className="text-[9px] font-heading font-bold text-muted-foreground uppercase tracking-widest block">EMAIL ADDRESS</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-xs text-accent hover:underline block font-mono">
                    {selectedEnquiry.email}
                  </a>
                  <div className="pt-1 flex gap-2">
                    <a 
                      href={`mailto:${selectedEnquiry.email}`}
                      className="px-2.5 py-1 bg-surface border border-header-border text-[9px] font-bold text-foreground hover:border-accent/40 rounded-sm inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Mail size={10} /> Send Mail
                    </a>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(selectedEnquiry.email);
                        alert("Email copied to clipboard!");
                      }}
                      className="px-2.5 py-1 bg-surface border border-header-border text-[9px] font-bold text-foreground hover:border-accent/40 rounded-sm transition-colors cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Phone Panel */}
                <div className="bg-background border border-header-border p-4 rounded-sm space-y-2">
                  <span className="text-[9px] font-heading font-bold text-muted-foreground uppercase tracking-widest block">PHONE NUMBER</span>
                  <span className="text-xs text-foreground block font-mono">
                    {selectedEnquiry.phone || "Not provided"}
                  </span>
                  {selectedEnquiry.phone && (
                    <div className="pt-1 flex gap-2">
                      <a 
                        href={`tel:${selectedEnquiry.phone}`}
                        className="px-2.5 py-1 bg-surface border border-header-border text-[9px] font-bold text-foreground hover:border-accent/40 rounded-sm inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Phone size={10} /> Call Client
                      </a>
                      <a 
                        href={getWhatsAppLink(selectedEnquiry.phone, selectedEnquiry.fullName)}
                        target="_blank"
                        className="px-2.5 py-1 bg-green-950/20 border border-green-500/20 text-[9px] font-bold text-green-400 hover:bg-green-950/40 rounded-sm inline-flex items-center gap-1.5 transition-colors"
                      >
                        WhatsApp Reply
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-header-border py-4">
                <div>
                  <span className="text-[9px] font-heading font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Stream category</span>
                  <span className="text-xs font-bold text-foreground uppercase">{selectedEnquiry.projectType}</span>
                </div>
                
                <div>
                  <span className="text-[9px] font-heading font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Timeline</span>
                  <span className="text-xs font-bold text-foreground">{selectedEnquiry.timeline || "N/A"}</span>
                </div>

                <div>
                  <span className="text-[9px] font-heading font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Budget (Private)</span>
                  <span className="text-xs font-bold text-accent font-mono">{selectedEnquiry.budget || "N/A"}</span>
                </div>
              </div>

              {/* Google Drive / Reference Links */}
              {(selectedEnquiry.driveLink || selectedEnquiry.referenceLinks) && (
                <div className="space-y-3">
                  {selectedEnquiry.driveLink && (
                    <div className="p-3.5 bg-background border border-header-border rounded-sm flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-heading font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Google Drive Shared Folder</span>
                        <a 
                          href={selectedEnquiry.driveLink} 
                          target="_blank" 
                          className="text-xs text-accent hover:underline break-all inline-flex items-center gap-1.5 font-mono"
                        >
                          {selectedEnquiry.driveLink}
                        </a>
                      </div>
                      <a 
                        href={selectedEnquiry.driveLink} 
                        target="_blank" 
                        className="p-1.5 bg-surface border border-header-border rounded-sm text-foreground hover:text-accent transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}

                  {selectedEnquiry.referenceLinks && (
                    <div className="p-3 bg-background border border-header-border rounded-sm space-y-1">
                      <span className="text-[9px] font-heading font-bold text-muted-foreground uppercase tracking-widest block">Reference Links</span>
                      <p className="text-xs text-foreground break-all whitespace-pre-wrap font-sans">
                        {selectedEnquiry.referenceLinks}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Enquiry Description */}
              <div className="space-y-2">
                <span className="text-[9px] font-heading font-bold text-muted-foreground uppercase tracking-widest block">Project Description</span>
                <div className="bg-background border border-header-border p-5 rounded-sm">
                  <p className="text-xs md:text-sm text-foreground leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedEnquiry.description}
                  </p>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center space-y-3 font-sans">
            <MailOpen size={48} className="mx-auto text-muted-foreground opacity-30" />
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Select an enquiry from the list to view its complete specifications.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
