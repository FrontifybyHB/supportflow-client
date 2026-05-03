import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, MessageCircle, X, Send, AlertTriangle } from 'lucide-react';

const WorkspaceSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('workspace');
  const [showToast, setShowToast] = useState('');

  // Workspace form state
  const [businessName, setBusinessName] = useState('Acme Corporation');
  const [industry, setIndustry] = useState('Technology');

  // Profile form state
  const [fullName, setFullName] = useState('Jane Doe');
  const [email] = useState('jane@acme.com');

  // Security form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCopyCode = () => {
    const code = `<script src="https://cdn.supportflow.ai/widget.js" data-business-id="{{BUSINESS_ID}}"></script>`;
    navigator.clipboard.writeText(code);
    setShowToast('Code copied to clipboard!');
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleSaveWorkspace = () => {
    setShowToast('Workspace settings saved');
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleDeactivate = () => {
    if (window.confirm('Are you sure you want to deactivate this workspace? This action cannot be undone.')) {
      setShowToast('Workspace deactivated');
      setTimeout(() => setShowToast(''), 3000);
    }
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    setShowToast('Password updated successfully');
    setTimeout(() => setShowToast(''), 3000);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const getPasswordStrength = () => {
    if (!newPassword) return { level: 0, text: '', color: '' };
    let strength = 0;
    if (newPassword.length >= 8) strength++;
    if (/[A-Z]/.test(newPassword)) strength++;
    if (/[0-9]/.test(newPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++;
    if (strength >= 3) return { level: 4, text: 'Strong password', color: 'text-[var(--success)]' };
    if (strength === 2) return { level: 2, text: 'Medium password', color: 'text-[var(--warning)]' };
    return { level: 1, text: 'Weak password', color: 'text-[var(--error)]' };
  };
  const strength = getPasswordStrength();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto w-full space-y-8 pb-12"
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-2">Workspace Settings</h1>
        <p className="text-[var(--text-secondary)] text-sm">Manage your workspace preferences, personal profile, and security credentials.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-[var(--border-subtle)] mb-8 overflow-x-auto custom-scrollbar">
        {['workspace', 'profile', 'widget', 'security'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 text-sm font-semibold transition-all border-b-2 whitespace-nowrap capitalize ${
              activeTab === tab 
                ? 'text-[var(--accent-primary)] border-[var(--accent-primary)]' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="space-y-8">
        {/* Workspace Tab */}
        {activeTab === 'workspace' && (
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-6"
          >
            <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[var(--border-subtle)]">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Workspace Details</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--text-secondary)]">Business Name</label>
                    <input
                      className="w-full bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--text-secondary)]">Industry</label>
                    <select
                      className="w-full bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all cursor-pointer"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    >
                      <option>Technology</option>
                      <option>Retail</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--text-secondary)]">Current Plan</label>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      PRO
                    </span>
                    <span className="text-[var(--text-muted)] text-xs font-medium">Managed by billing administrator</span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] flex justify-end">
                <button
                  onClick={handleSaveWorkspace}
                  className="bg-[var(--accent-primary)] text-[var(--bg-base)] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--accent-hover)] active:scale-95 transition-all shadow-sm shadow-[var(--accent-primary)]/20"
                >
                  Save changes
                </button>
              </div>
            </div>

            <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--error)]/30 overflow-hidden shadow-sm relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--error)]"></div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-[var(--error)] mb-2 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  Danger Zone
                </h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">Once you deactivate a workspace, there is no going back. Please be certain.</p>
                <button
                  onClick={handleDeactivate}
                  className="border border-[var(--error)] text-[var(--error)] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--error)]/10 transition-all active:scale-95 shadow-sm"
                >
                  Deactivate Workspace
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] p-6 space-y-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Profile Information</h3>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--text-secondary)]">Full Name</label>
                  <input
                    className="w-full bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--text-secondary)]">Email Address</label>
                  <input
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-muted)] cursor-not-allowed opacity-70"
                    readOnly
                    type="email"
                    value={email}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--text-secondary)]">Role</label>
                  <div>
                    <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      ADMIN
                    </span>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowToast('Profile updated');
                      setTimeout(() => setShowToast(''), 3000);
                    }}
                    className="bg-[var(--accent-primary)] text-[var(--bg-base)] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--accent-hover)] active:scale-95 transition-all shadow-sm shadow-[var(--accent-primary)]/20"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Widget Tab */}
        {activeTab === 'widget' && (
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] p-6 shadow-sm flex flex-col">
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2">Embed your chat widget</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">
                Copy and paste this snippet into the <code className="font-mono bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs">&lt;head&gt;</code> of your website.
              </p>
              <div className="relative group mt-auto">
                <pre className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-5 font-mono text-xs overflow-x-auto text-[var(--text-primary)] shadow-inner">
                  {`<script src="https://cdn.supportflow.ai/widget.js" \n  data-business-id="{{BUSINESS_ID}}">\n</script>`}
                </pre>
                <button
                  onClick={handleCopyCode}
                  className="absolute top-3 right-3 bg-[var(--bg-surface)] border border-[var(--border-default)] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[var(--bg-elevated)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-sm"
                >
                  <Copy size={14} />
                  Copy code
                </button>
              </div>
            </div>

            <div className="bg-[var(--bg-elevated)]/50 border border-dashed border-[var(--border-default)] rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(var(--border-subtle)_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
              <p className="text-[var(--text-muted)] text-[10px] font-bold mb-6 uppercase tracking-widest z-10">Live Preview</p>
              
              <div className="w-[320px] h-[400px] bg-[var(--bg-surface)] rounded-2xl shadow-2xl overflow-hidden relative border border-[var(--border-subtle)] z-10 flex flex-col">
                <div className="bg-[var(--accent-primary)] p-4 text-[var(--bg-base)] flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--bg-surface)]/20 flex items-center justify-center backdrop-blur-sm">
                      <MessageCircle size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-sm font-display">Acme Support</p>
                      <p className="text-[10px] opacity-90 font-medium">Online</p>
                    </div>
                  </div>
                  <X size={18} className="opacity-80 hover:opacity-100 cursor-pointer" />
                </div>
                <div className="p-4 space-y-4 flex-grow bg-[var(--bg-surface)]">
                  <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl rounded-tl-sm p-3 text-sm max-w-[85%] text-[var(--text-primary)]">
                    Hi! How can we help you today?
                  </div>
                  <div className="bg-[var(--accent-primary)] text-[var(--bg-base)] rounded-2xl rounded-tr-sm p-3 text-sm max-w-[85%] self-end ml-auto shadow-sm">
                    I need help with my integration.
                  </div>
                </div>
                <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                  <div className="flex gap-2 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl px-3 py-2 items-center">
                    <input className="bg-transparent border-none text-xs w-full focus:ring-0 outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)]" placeholder="Type a message..." type="text" />
                    <Send className="text-[var(--accent-primary)]" size={16} />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] p-6 space-y-8 shadow-sm max-w-xl"
          >
            <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Security Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-secondary)]">Current Password</label>
                <input
                  className="w-full bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-secondary)]">New Password</label>
                <input
                  className="w-full bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {newPassword && (
                  <div className="pt-1">
                    <div className="flex gap-1.5 mt-2 mb-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            i <= strength.level ? (strength.level >= 3 ? 'bg-[var(--success)] shadow-[0_0_8px_var(--success)]' : strength.level === 2 ? 'bg-[var(--warning)]' : 'bg-[var(--error)]') : 'bg-[var(--border-subtle)]'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${strength.color}`}>{strength.text}</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-secondary)]">Confirm New Password</label>
                <input
                  className="w-full bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="pt-4">
                <button
                  onClick={handleUpdatePassword}
                  className="bg-[var(--accent-primary)] text-[var(--bg-base)] px-6 py-2.5 rounded-xl text-sm font-bold w-full sm:w-auto hover:bg-[var(--accent-hover)] active:scale-95 transition-all shadow-sm shadow-[var(--accent-primary)]/20"
                >
                  Update Password
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </div>

      {/* Mock Toast Notification */}
      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 bg-[var(--text-primary)] text-[var(--bg-base)] px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 z-50 font-medium text-sm"
        >
          {showToast}
        </motion.div>
      )}
    </motion.div>
  );
};

export default WorkspaceSettingsPage;
