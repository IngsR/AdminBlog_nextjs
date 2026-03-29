'use client';

import { useState } from 'react';
import {
  Settings,
  Shield,
  KeyRound,
  Globe,
  Bell,
  Palette,
  Save,
  Sun,
  Moon,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/ThemeContext';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [isSavingPw, setIsSavingPw] = useState(false);
  const [pwMessage, setPwMessage] = useState({ type: '', text: '' });

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPwMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      setPwMessage({ type: 'error', text: 'Password must be at least 8 characters.' });
      return;
    }
    setIsSavingPw(true);
    setPwMessage({ type: '', text: '' });

    // Simulated – connect to your auth change-password endpoint
    await new Promise(r => setTimeout(r, 1000));
    setPwMessage({ type: 'success', text: 'Password changed successfully!' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsSavingPw(false);
  };

  const SettingSection = ({ icon: Icon, title, description, children }: any) => (
    <Card className="p-5 md:p-6 space-y-5 shadow-sm border-border bg-card transition-colors duration-300">
      <div className="flex items-start gap-4 border-b border-border pb-4 transition-colors duration-300">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
          <Icon size={20} />
        </div>
        <div className="min-w-0">
          <h2 className="font-bold text-foreground text-base">{title}</h2>
          <p className="text-muted-foreground text-xs mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </Card>
  );

  const Toggle = ({ checked, onChange, label, sub }: any) => (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          'w-11 h-6 rounded-full relative transition-colors duration-300 shrink-0',
          checked ? 'bg-indigo-600' : 'bg-secondary'
        )}
      >
        <div className={cn(
          'absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm border border-border/10',
          checked ? 'left-6' : 'left-1'
        )}></div>
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground font-medium text-sm">Configure your account security and preferences.</p>
      </header>

      {/* Appearance / Theme */}
      <SettingSection
        icon={Palette}
        title="Appearance"
        description="Choose your preferred theme for the admin dashboard."
      >
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => theme !== 'dark' && toggleTheme()}
            className={cn(
              'flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer',
              theme === 'dark'
                ? 'border-indigo-500 bg-indigo-500/5'
                : 'border-border bg-background hover:border-indigo-500/50'
            )}
          >
            <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center">
              <Moon size={20} className="text-indigo-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-foreground">Dark Mode</p>
              <p className="text-[10px] text-muted-foreground">Easy on eyes</p>
            </div>
            {theme === 'dark' && <CheckCircle2 size={16} className="text-indigo-500" />}
          </button>

          <button
            onClick={() => theme !== 'light' && toggleTheme()}
            className={cn(
              'flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer',
              theme === 'light'
                ? 'border-indigo-500 bg-indigo-500/5'
                : 'border-border bg-background hover:border-indigo-500/50'
            )}
          >
            <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center">
              <Sun size={20} className="text-indigo-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-foreground">Light Mode</p>
              <p className="text-[10px] text-muted-foreground">Clean & clear</p>
            </div>
            {theme === 'light' && <CheckCircle2 size={16} className="text-indigo-500" />}
          </button>
        </div>
      </SettingSection>

      {/* Security / Change Password */}
      <SettingSection
        icon={Shield}
        title="Security"
        description="Update your password to keep your account secure."
      >
        <form onSubmit={handleChangePassword} className="space-y-4">
          {pwMessage.text && (
            <div className={cn(
              'p-3 rounded-xl text-sm font-medium animate-in fade-in',
              pwMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            )}>
              {pwMessage.text}
            </div>
          )}

          <div className="relative">
            <Input
              label="Current Password"
              type={showCurrentPw ? 'text' : 'password'}
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              leftIcon={<KeyRound size={18} />}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPw(!showCurrentPw)}
              className="absolute right-4 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="relative">
            <Input
              label="New Password"
              type={showNewPw ? 'text' : 'password'}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              leftIcon={<KeyRound size={18} />}
              placeholder="Min 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowNewPw(!showNewPw)}
              className="absolute right-4 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            leftIcon={<KeyRound size={18} />}
            placeholder="Re-enter new password"
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="premium"
              size="md"
              isLoading={isSavingPw}
              leftIcon={<Save size={16} />}
            >
              Update Password
            </Button>
          </div>
        </form>
      </SettingSection>

      {/* Notifications */}
      <SettingSection
        icon={Bell}
        title="Notifications"
        description="Control how and when you receive notifications."
      >
        <div className="space-y-5">
          <Toggle
            checked={emailNotifs}
            onChange={setEmailNotifs}
            label="Email Notifications"
            sub="Receive updates about new comments and posts via email"
          />
          <Toggle
            checked={pushNotifs}
            onChange={setPushNotifs}
            label="Push Notifications"
            sub="Browser push notifications for real-time alerts"
          />
        </div>
      </SettingSection>
    </div>
  );
}
