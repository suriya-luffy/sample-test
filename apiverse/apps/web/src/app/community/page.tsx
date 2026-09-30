'use client';

import React, { useState, useEffect } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { Users, ThumbsUp, MessageSquare } from 'lucide-react';

export default function CommunityPage() {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/community/feed')
      .then((r) => r.json())
      .then((d) => setFeed(d))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-cyan-400" />
          <span>ASTRONAUT COMMUNITY HUB</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Live discussions, shared starter kits, reputation badges, and collaborative API collections.
        </p>
      </div>

      <div className="space-y-4">
        {feed.map((post) => (
          <GlassPanel key={post.id} className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full border border-cyan-500/40" />
              <div>
                <h3 className="font-display font-bold text-xs text-white">{post.author}</h3>
                <span className="text-[10px] font-mono text-slate-500">{post.createdAt}</span>
              </div>
            </div>

            <h4 className="font-display font-bold text-sm text-cyan-200 mb-1">{post.title}</h4>
            <p className="text-xs text-slate-300 mb-3">{post.content}</p>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <button className="flex items-center gap-1.5 hover:text-cyan-300">
                <ThumbsUp className="w-3.5 h-3.5" /> {post.upvotes}
              </button>
              <button className="flex items-center gap-1.5 hover:text-cyan-300">
                <MessageSquare className="w-3.5 h-3.5" /> {post.commentsCount} comments
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
