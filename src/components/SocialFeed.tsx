"use client";

import { useState } from "react";
import { Instagram, Play, ExternalLink, Heart, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SOCIAL_POSTS = [
  {
    id: "1",
    thumbnail: "/assets/instagram_post_1.png",
    caption: "@cefisma: Calendário de Greve - Semana 2. Confira a programação completa das atividades.",
    likes: "1.2k",
    comments: "45",
    link: "https://www.instagram.com/p/DXnP-jJlP8o/"
  },
  {
    id: "2",
    thumbnail: "/assets/instagram_post_2.png",
    caption: "@cefisma: Mobilização Permanente: Unidade na luta pelas pautas estudantis.",
    likes: "2.1k",
    comments: "89",
    link: "https://www.instagram.com/p/DXQR5O6DCUT/"
  }
];


export function SocialFeed() {
  return (
    <div id="social-feed" className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center">
            <Instagram size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">Acompanhe os posts do CEFISMA sobre a greve</h2>
          </div>
        </div>
        <a 
          href="https://www.instagram.com/cefisma/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-white transition-colors"
        >
          <ExternalLink size={20} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
