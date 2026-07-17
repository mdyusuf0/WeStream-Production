"use client";

import React, { useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { Search, Upload, Check, AlertCircle, RefreshCw } from "lucide-react";

interface MediaAssetData {
  id: string;
  slotKey: string;
  type: string;
  cloudinaryId: string;
  url: string;
  altText: string;
  label: string;
  pageContext: string;
  updatedBy: string;
  updatedAt: string;
}

interface MediaManagerProps {
  initialAssets: MediaAssetData[];
  cloudName: string;
  apiKey: string;
}

export default function MediaManager({ initialAssets, cloudName, apiKey }: MediaManagerProps) {
  const [assets, setAssets] = useState<MediaAssetData[]>(initialAssets);
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("ALL");
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Status indicators for saves
  const [savingAlt, setSavingAlt] = useState<Record<string, "saving" | "success" | "error">>({});
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const tabs = ["ALL", "HOME", "SERVICES", "WORK", "TEAM"];

  // Filter assets based on search query and category tab
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.label.toLowerCase().includes(search.toLowerCase()) || 
                          asset.slotKey.toLowerCase().includes(search.toLowerCase());
    const matchesTab = selectedTab === "ALL" || asset.pageContext.toUpperCase() === selectedTab;
    return matchesSearch && matchesTab;
  });

  // Handle Alt Text change
  const handleAltBlur = async (slotKey: string, currentAlt: string, originalAlt: string) => {
    if (currentAlt === originalAlt) return; // No change

    setSavingAlt((prev) => ({ ...prev, [slotKey]: "saving" }));

    try {
      const res = await fetch(`/api/admin/media/${slotKey}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: assets.find((a) => a.slotKey === slotKey)!.url, cloudinaryId: assets.find((a) => a.slotKey === slotKey)!.cloudinaryId, altText: currentAlt }),
      });

      if (!res.ok) {
        throw new Error();
      }

      setSavingAlt((prev) => ({ ...prev, [slotKey]: "success" }));
      setAssets((prev) => 
        prev.map((a) => (a.slotKey === slotKey ? { ...a, altText: currentAlt } : a))
      );
      
      setTimeout(() => {
        setSavingAlt((prev) => {
          const copy = { ...prev };
          delete copy[slotKey];
          return copy;
        });
      }, 2000);
    } catch (err) {
      setSavingAlt((prev) => ({ ...prev, [slotKey]: "error" }));
    }
  };

  // Launch Cloudinary signed widget
  const handleReplaceMedia = (asset: MediaAssetData) => {
    if (!scriptLoaded || !(window as any).cloudinary) {
      alert("Cloudinary upload service is still initializing. Please wait a moment.");
      return;
    }

    const folderMap: Record<string, string> = {
      Home: "westream/home",
      Services: "westream/services",
      Work: "westream/work",
      Team: "westream/team",
    };
    const folder = folderMap[asset.pageContext] || "westream";
    const cleanSlotName = asset.slotKey.replace(/\./g, "-");

    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName,
        apiKey,
        uploadSignature: async (callback: any, paramsToSign: any) => {
          const res = await fetch("/api/admin/cloudinary-signature", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paramsToSign }),
          });
          const data = await res.json();
          callback(data.signature);
        },
        uploadSignatureTimestamp: Math.floor(Date.now() / 1000),
        folder,
        publicId: cleanSlotName,
        resourceType: asset.type.toLowerCase(),
        clientAllowedFormats: asset.type === "VIDEO" ? ["mp4", "webm"] : ["jpg", "png", "webp"],
        maxFileSize: asset.type === "VIDEO" ? 40 * 1024 * 1024 : 8 * 1024 * 1024, // 40MB limit for video, 8MB images
      },
      async (error: any, result: any) => {
        if (error) {
          console.error("Cloudinary widget error:", error);
          setUploadingSlot(null);
          return;
        }

        if (result.event === "success") {
          const { secure_url, public_id } = result.info;
          setUploadingSlot(asset.slotKey);

          try {
            const res = await fetch(`/api/admin/media/${asset.slotKey}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: secure_url, cloudinaryId: public_id, altText: asset.altText }),
            });

            const data = await res.json();
            if (!res.ok) {
              setSaveError(data.error || "Failed to update media asset details in database.");
            } else {
              setAssets((prev) =>
                prev.map((a) =>
                  a.slotKey === asset.slotKey
                    ? {
                        ...a,
                        url: secure_url,
                        cloudinaryId: public_id,
                        updatedBy: data.asset.updatedBy,
                        updatedAt: new Date(data.asset.updatedAt).toISOString(),
                      }
                    : a
                )
              );
            }
          } catch (err) {
            setSaveError("Failed to update database record. Please check server logs.");
          } finally {
            setUploadingSlot(null);
          }
        }
      }
    );

    widget.open();
  };

  return (
    <div className="space-y-6">
      
      {/* Script to load Cloudinary Upload Widget */}
      <Script 
        src="https://upload-widget.cloudinary.com/global/all.js" 
        onLoad={() => setScriptLoaded(true)}
      />

      {saveError && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-400 text-xs rounded-sm flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertCircle size={16} />
            {saveError}
          </span>
          <button onClick={() => setSaveError(null)} className="underline font-bold">Dismiss</button>
        </div>
      )}

      {/* FILTER & SEARCH ROW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
        
        {/* Search */}
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Search slots by name or slot key..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-header-border rounded-sm text-foreground text-xs focus:border-accent focus:outline-none transition-colors"
          />
          <Search size={14} className="absolute left-3.5 top-3.5 text-muted-foreground" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-surface/50 border border-header-border p-1 rounded-sm">
          {tabs.map((tab) => {
            const isSelected = selectedTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`
                  px-4 py-1.5 rounded-sm font-heading text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer
                  ${isSelected ? "bg-accent text-background" : "text-muted-foreground hover:text-foreground"}
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>

      </div>

      {/* SLOTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {filteredAssets.map((asset) => {
          const altStatus = savingAlt[asset.slotKey];
          const isUploading = uploadingSlot === asset.slotKey;

          return (
            <div 
              key={asset.slotKey} 
              className="bg-surface border border-header-border rounded-sm overflow-hidden flex flex-col justify-between hover:border-accent/30 transition-all duration-300 relative group"
            >
              
              {/* Media Preview Box */}
              <div className="relative aspect-video w-full border-b border-header-border bg-background flex items-center justify-center overflow-hidden">
                {asset.type === "VIDEO" ? (
                  <video
                    src={asset.url}
                    controls
                    muted
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={asset.url}
                      alt={asset.label}
                      fill
                      sizes="33vw"
                      className="object-cover opacity-80"
                    />
                  </div>
                )}
                
                {/* Format Badge */}
                <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2 py-0.5 rounded-sm border border-header-border text-[9px] font-heading font-extrabold tracking-widest text-accent uppercase">
                  {asset.type}
                </div>
              </div>

              {/* Asset Info Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-heading font-extrabold text-accent uppercase tracking-widest leading-none">
                      {asset.pageContext}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span className="text-[9px] font-mono text-muted-foreground select-all truncate block">
                      {asset.slotKey}
                    </span>
                  </div>
                  <h3 className="text-sm font-heading font-bold text-foreground pt-1">
                    {asset.label}
                  </h3>
                </div>

                {/* Alt Text (Images Only) */}
                {asset.type === "IMAGE" && (
                  <div className="space-y-1 pt-1 relative">
                    <div className="flex items-center justify-between">
                      <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                        Alt Text (SEO/Accessibility)
                      </label>
                      <div className="h-4 flex items-center">
                        {altStatus === "saving" && <RefreshCw size={10} className="animate-spin text-accent" />}
                        {altStatus === "success" && <Check size={12} className="text-green-400" />}
                        {altStatus === "error" && <AlertCircle size={12} className="text-red-400" />}
                      </div>
                    </div>
                    <input
                      type="text"
                      defaultValue={asset.altText}
                      onBlur={(e) => handleAltBlur(asset.slotKey, e.target.value, asset.altText)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.currentTarget.blur();
                        }
                      }}
                      className="w-full px-2.5 py-1.5 bg-background border border-header-border rounded-sm text-foreground text-xs focus:border-accent focus:outline-none transition-colors"
                      placeholder="Describe this image for screenreaders..."
                    />
                  </div>
                )}

                {/* Actions & Metadata */}
                <div className="pt-2 space-y-3">
                  <button
                    onClick={() => handleReplaceMedia(asset)}
                    disabled={isUploading}
                    className="w-full min-h-[36px] bg-background border border-header-border text-foreground hover:border-accent/40 font-heading text-[10px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw size={12} className="animate-spin" />
                        Saving to DB...
                      </>
                    ) : (
                      <>
                        <Upload size={12} />
                        Replace Media
                      </>
                    )}
                  </button>

                  {/* Audit trail */}
                  <div className="border-t border-header-border pt-2 flex items-center justify-between text-[9px] text-muted-foreground">
                    <span>By: <span className="font-mono">{asset.updatedBy}</span></span>
                    <span>{new Date(asset.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
