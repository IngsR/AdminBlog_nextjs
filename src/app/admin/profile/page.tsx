'use client';

import { useState, useEffect } from 'react';
import { User, Mail, FileText, Camera, Save, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Card } from '@/components/atoms/Card';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setUser(data);
          // In a real app, you'd fetch the full profile from /api/profiles/[id]
          // For now we'll mock the profile data or fetch it if available
          return fetch(`/api/profiles/${data.id}`);
        }
      })
      .then(res => res?.json())
      .then(profileData => {
        if (profileData && !profileData.error) {
          setFullName(profileData.name || '');
          setBio(profileData.bio || '');
          setAvatarUrl(profileData.avatar_url || '');
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch(`/api/profiles/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, bio, avatar_url: avatarUrl }),
      });

      if (!res.ok) throw new Error('Failed to update profile');
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-1">
        <h1 className="text-4xl font-black text-white tracking-tight">Account Settings</h1>
        <p className="text-zinc-500 font-medium">Manage your public profile and account security.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Avatar & Info */}
        <div className="space-y-6">
          <Card variant="glass" className="text-center p-8">
            <div className="relative inline-block mx-auto mb-6">
              <div className="w-32 h-32 rounded-[2.5rem] bg-linear-to-tr from-indigo-600 to-violet-600 p-1 group cursor-pointer overflow-hidden shadow-2xl shadow-indigo-600/20">
                <div className="w-full h-full rounded-[2.2rem] bg-zinc-950 flex items-center justify-center overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-zinc-700" />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-white">{fullName || user?.username || 'Admin User'}</h2>
            <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mt-1">{user?.role || 'Administrator'}</p>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-zinc-400 text-sm bg-white/5 p-3 rounded-xl">
                <ShieldCheck size={16} className="text-emerald-500" />
                Verified Administrator
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Form */}
        <div className="lg:col-span-2">
          <Card variant="glass" className="p-8">
            <form onSubmit={handleSave} className="space-y-6">
              {message.text && (
                <div className={cn(
                  "p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2",
                  message.type === 'success' ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                )}>
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Username"
                  disabled
                  value={user?.username || ''}
                  leftIcon={<User size={18} />}
                  className="opacity-50"
                  title="Username cannot be changed"
                />
                <Input
                  label="Email Address"
                  disabled
                  value={user?.email || 'admin@blog.com'}
                  leftIcon={<Mail size={18} />}
                  className="opacity-50"
                />
              </div>

              <Input
                label="Full Name"
                placeholder="Ex: John Doe"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                leftIcon={<span className="font-bold text-xs">FN</span>}
              />

              <Input
                label="Avatar URL"
                placeholder="https://images.unsplash.com/..."
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                leftIcon={<Camera size={18} />}
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 ml-1 tracking-wider uppercase">Bio</label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-4 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:bg-white/10 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  variant="premium" 
                  size="lg" 
                  isLoading={isSaving}
                  leftIcon={<Save size={18} />}
                >
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
