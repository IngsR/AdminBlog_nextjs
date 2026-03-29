'use client';

import { useState, useEffect, useRef } from 'react';
import { User, Mail, FileText, Camera, Save, Loader2, ShieldCheck, Upload } from 'lucide-react';
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
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setUser(data);
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

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setAvatarUrl(data.url);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

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
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">My Profile</h1>
        <p className="text-muted-foreground font-medium text-sm">Manage your public profile and avatar.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Avatar & Info */}
        <div className="space-y-6">
          <Card className="text-center p-6 bg-card border-border shadow-sm transition-colors duration-300">
            {/* Avatar Upload */}
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="sr-only"
            />
            <div className="relative inline-block mx-auto mb-5">
              <div
                className="w-28 h-28 rounded-4xl bg-linear-to-tr from-indigo-600 to-violet-600 p-1 group cursor-pointer overflow-hidden shadow-2xl shadow-indigo-600/20"
                onClick={() => avatarInputRef.current?.click()}
              >
                <div className="w-full h-full rounded-[1.7rem] bg-secondary flex items-center justify-center overflow-hidden">
                  {isUploadingAvatar ? (
                    <Loader2 size={36} className="animate-spin text-indigo-500" />
                  ) : avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={44} className="text-muted-foreground" />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-4xl">
                  <Camera className="text-white" size={22} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <Upload size={14} className="text-white" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-foreground mt-4">{fullName || user?.username || 'Admin User'}</h2>
            <p className="text-indigo-500 text-xs font-black uppercase tracking-widest mt-1">{user?.role || 'Administrator'}</p>

            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="mt-4 w-full text-xs font-bold text-muted-foreground hover:text-indigo-500 transition-colors bg-secondary/50 hover:bg-secondary py-2.5 rounded-xl border border-border flex items-center justify-center gap-2"
            >
              <Upload size={14} />
              Upload Avatar
            </button>
            <p className="text-[10px] text-muted-foreground mt-2">JPG, PNG, GIF • Max 5MB</p>

            <div className="mt-6 pt-5 border-t border-border">
              <div className="flex items-center gap-3 text-muted-foreground text-sm bg-secondary/50 p-3 rounded-xl border border-border/50">
                <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                Verified Administrator
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-card border-border shadow-sm transition-colors duration-300">
            <form onSubmit={handleSave} className="space-y-5">
              {message.text && (
                <div className={cn(
                  'p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2',
                  message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                )}>
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground ml-1 tracking-wider uppercase">Bio</label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-4 text-muted-foreground transition-colors" size={18} />
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows={4}
                    className="w-full bg-input border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder-muted-foreground focus:bg-background focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  variant="premium"
                  size="lg"
                  isLoading={isSaving}
                  leftIcon={<Save size={18} />}
                >
                  Save Profile
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
