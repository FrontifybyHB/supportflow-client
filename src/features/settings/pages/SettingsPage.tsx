import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UploadCloud, AlertTriangle, Wrench, Lock, Timer, Info, Bot, CheckCircle2 
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('platform');
  const [showToast, setShowToast] = useState(false);

  // Form field states
  const [platformName, setPlatformName] = useState('SupportFlow AI');
  const [technicalId] = useState('sf_prod_main_01'); // read-only
  const [primaryModel, setPrimaryModel] = useState('GPT-4o (Default)');
  const [autoCloseHours, setAutoCloseHours] = useState(72);
  const [smtpProvider, setSmtpProvider] = useState('AWS SES');
  const [minPasswordLength, setMinPasswordLength] = useState(12);
  const [requireSpecialChars, setRequireSpecialChars] = useState(true);
  const [enforceMfa, setEnforceMfa] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30 Minutes');

  const toggleSpecialChars = () => setRequireSpecialChars(!requireSpecialChars);
  const toggleMfa = () => setEnforceMfa(!enforceMfa);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDiscard = () => {
    setPlatformName('SupportFlow AI');
    setPrimaryModel('GPT-4o (Default)');
    setAutoCloseHours(72);
    setSmtpProvider('AWS SES');
    setMinPasswordLength(12);
    setRequireSpecialChars(true);
    setEnforceMfa(true);
    setSessionTimeout('30 Minutes');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto w-full space-y-8 pb-12"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] tracking-tight">Settings</h1>
          <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-purple-500/20">
            SUPER ADMIN
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDiscard}
            className="bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors shadow-sm"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="bg-[var(--accent-primary)] text-[var(--bg-base)] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--accent-hover)] transition-all active:scale-95 shadow-sm shadow-[var(--accent-primary)]/20"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[var(--border-subtle)] mb-8 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('platform')}
          className={`px-6 py-3.5 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'platform'
              ? 'text-[var(--accent-primary)] border-[var(--accent-primary)]'
              : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
          }`}
        >
          Platform
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-6 py-3.5 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'text-[var(--accent-primary)] border-[var(--accent-primary)]'
              : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab('global')}
          className={`px-6 py-3.5 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'global'
              ? 'text-[var(--accent-primary)] border-[var(--accent-primary)]'
              : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
          }`}
        >
          Global Config
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Platform Tab */}
        {activeTab === 'platform' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left column */}
            <div className="col-span-1 lg:col-span-8 space-y-6">
              {/* Global System Status */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm overflow-hidden relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Global System Status</h3>
                  <span className="flex items-center gap-2 px-3 py-1 bg-[var(--success)]/10 text-[var(--success)] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[var(--success)]/20 w-fit">
                    <span className="w-2 h-2 rounded-full bg-[var(--success)] shadow-[0_0_8px_var(--success)] animate-pulse"></span>
                    OPERATIONAL
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[var(--bg-base)] rounded-xl border border-[var(--border-subtle)]">
                    <p className="text-[var(--text-muted)] text-[10px] font-bold tracking-widest uppercase mb-1">API UPTIME</p>
                    <p className="font-display text-2xl font-bold text-[var(--text-primary)]">99.98%</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-base)] rounded-xl border border-[var(--border-subtle)]">
                    <p className="text-[var(--text-muted)] text-[10px] font-bold tracking-widest uppercase mb-1">LATENCY</p>
                    <p className="font-display text-2xl font-bold text-[var(--text-primary)]">42ms</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-base)] rounded-xl border border-[var(--border-subtle)]">
                    <p className="text-[var(--text-muted)] text-[10px] font-bold tracking-widest uppercase mb-1">ACTIVE NODES</p>
                    <p className="font-display text-2xl font-bold text-[var(--text-primary)]">12/12</p>
                  </div>
                </div>
              </div>

              {/* Branding Settings */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-6">Platform Branding</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[var(--text-secondary)]">
                        Platform Display Name
                      </label>
                      <input
                        className="w-full h-11 px-4 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all text-[var(--text-primary)] text-sm"
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[var(--text-secondary)]">
                        Internal Technical ID
                      </label>
                      <input
                        className="w-full h-11 px-4 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl text-sm font-mono text-[var(--text-muted)] cursor-not-allowed opacity-70"
                        readOnly
                        type="text"
                        value={technicalId}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[var(--text-secondary)]">
                      Platform Logo
                    </label>
                    <div className="border-2 border-dashed border-[var(--border-default)] rounded-xl p-8 text-center bg-[var(--bg-base)] hover:bg-[var(--bg-elevated)] transition-colors group cursor-pointer">
                      <UploadCloud className="w-8 h-8 mx-auto text-[var(--text-muted)] mb-3 group-hover:text-[var(--accent-primary)] transition-colors" />
                      <p className="text-sm font-medium text-[var(--text-primary)]">Click to upload or drag and drop</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">SVG, PNG, or JPG (max. 800x400px)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="col-span-1 lg:col-span-4 space-y-6">
              {/* Platform Health */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm">
                <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
                  Platform Health
                </h4>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">Memory Usage</span>
                      <span className="text-sm font-bold text-[var(--text-primary)]">64%</span>
                    </div>
                    <div className="w-full bg-[var(--bg-elevated)] h-1.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                      <div className="bg-[var(--accent-primary)] h-full w-[64%] shadow-[0_0_8px_var(--accent-primary)] opacity-80"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">Storage (S3)</span>
                      <span className="text-sm font-bold text-[var(--text-primary)]">1.2 TB <span className="text-[var(--text-muted)] font-normal">/ 5 TB</span></span>
                    </div>
                    <div className="w-full bg-[var(--bg-elevated)] h-1.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                      <div className="bg-[var(--accent-primary)] h-full w-[24%] shadow-[0_0_8px_var(--accent-primary)] opacity-80"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-[var(--bg-surface)] border border-[var(--error)]/30 rounded-xl p-6 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--error)]"></div>
                <div className="flex items-center gap-2 mb-3 text-[var(--error)]">
                  <AlertTriangle size={20} />
                  <h3 className="font-display text-lg font-bold">Danger Zone</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                  Actions taken here have platform-wide implications and cannot be easily reversed.
                </p>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 border border-[var(--error)] text-[var(--error)] py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--error)]/10 transition-colors shadow-sm">
                    <Wrench size={16} />
                    Enter Maintenance Mode
                  </button>
                  <button className="w-full py-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--error)] transition-colors hover:bg-[var(--bg-elevated)] rounded-lg">
                    Purge System Cache
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-500/20">
                  <Lock size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Password Policy</h3>
              </div>
              <div className="space-y-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Minimum Character Length</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Requires users to have a minimum length</p>
                  </div>
                  <input
                    className="w-20 h-10 px-3 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl text-sm text-center font-semibold text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none"
                    type="number"
                    value={minPasswordLength}
                    onChange={(e) => setMinPasswordLength(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Special Characters</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Require symbols like !, @, #, etc.</p>
                  </div>
                  <button
                    onClick={toggleSpecialChars}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-surface)] focus:ring-[var(--accent-primary)] ${
                      requireSpecialChars ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border-default)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                        requireSpecialChars ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    ></span>
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Enforce MFA</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Mandatory 2FA for all admin roles</p>
                  </div>
                  <button
                    onClick={toggleMfa}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-surface)] focus:ring-[var(--accent-primary)] ${
                      enforceMfa ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border-default)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                        enforceMfa ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl border border-orange-500/20">
                  <Timer size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Session Management</h3>
              </div>
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">
                    Idle Session Timeout
                  </label>
                  <select
                    className="w-full h-11 px-4 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all text-[var(--text-primary)] text-sm cursor-pointer"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  >
                    <option>15 Minutes</option>
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>4 Hours</option>
                  </select>
                </div>
              </div>
              <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20 flex gap-3 mt-6">
                <Info className="text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-orange-800 dark:text-orange-200 leading-relaxed font-medium">
                  Shorter session timeouts increase platform security but may impact user experience for active agents. Changes take effect on next login.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Global Config Tab */}
        {activeTab === 'global' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-1">Global AI Configuration</h3>
                <p className="text-sm text-[var(--text-secondary)]">Default settings for all sub-instances and businesses.</p>
              </div>
              <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl border border-purple-500/20">
                <Bot size={24} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)]">Primary AI Model</label>
                <select
                  className="w-full h-11 px-4 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all text-[var(--text-primary)] text-sm cursor-pointer"
                  value={primaryModel}
                  onChange={(e) => setPrimaryModel(e.target.value)}
                >
                  <option>GPT-4o (Default)</option>
                  <option>Claude 3.5 Sonnet</option>
                  <option>Gemini 1.5 Pro</option>
                  <option>Llama 3 (On-Prem)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)]">
                  Ticket Auto-Close
                </label>
                <div className="relative">
                  <input
                    className="w-full h-11 pl-4 pr-16 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all text-[var(--text-primary)] text-sm"
                    type="number"
                    value={autoCloseHours}
                    onChange={(e) => setAutoCloseHours(parseInt(e.target.value) || 0)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest">
                    HOURS
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)]">Email SMTP Provider</label>
                <select
                  className="w-full h-11 px-4 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl focus:bg-[var(--bg-surface)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all text-[var(--text-primary)] text-sm cursor-pointer"
                  value={smtpProvider}
                  onChange={(e) => setSmtpProvider(e.target.value)}
                >
                  <option>AWS SES</option>
                  <option>SendGrid</option>
                  <option>Postmark</option>
                  <option>Custom SMTP</option>
                </select>
              </div>
            </div>
          </motion.div>
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
          <CheckCircle2 className="text-[var(--success)]" size={18} />
          Settings saved successfully
        </motion.div>
      )}
    </motion.div>
  );
};

export default SettingsPage;
