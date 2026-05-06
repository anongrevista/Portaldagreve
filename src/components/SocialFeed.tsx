"use client";

import { useState } from "react";
import { Instagram, Play, ExternalLink, Heart, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SOCIAL_POSTS: { id: string; link: string }[] = [];


export function SocialFeed() {
  return (
    <div id="social-feed" className="mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
            <Instagram size={26} className="text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tighter">
            Acompanhe os posts do <span className="text-primary">CEFISMA</span> e do <span className="text-secondary">DCE</span> sobre a greve
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <a 
            href="https://www.instagram.com/cefisma/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-primary/50 transition-all text-xs font-black uppercase tracking-widest shadow-xl group"
          >
            CEFISMA <ExternalLink size={14} className="text-primary group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="https://www.instagram.com/dceusp/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-secondary/50 transition-all text-xs font-black uppercase tracking-widest shadow-xl group"
          >
            DCE USP <ExternalLink size={14} className="text-secondary group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {SOCIAL_POSTS.map((post) => (
          <div 
            key={post.id}
            className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-gray-800 transition-all hover:border-primary/50 shadow-xl"
          >
            {/* Mini Player (Iframe Embed) */}
            <div className="w-full aspect-[1/1.2] sm:aspect-square overflow-hidden bg-white">
              <iframe
                src={`${post.link}embed`}
                className="w-full h-full border-none"
                scrolling="no"
                allowTransparency
              />
            </div>

            {/* Clickable Overlay to go to Post */}
            <a 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                Ver no Instagram <ExternalLink size={10} />
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
