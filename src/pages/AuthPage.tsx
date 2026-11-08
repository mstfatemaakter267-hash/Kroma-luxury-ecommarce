import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, CheckCircle2, ArrowRight, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const AuthPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, login, register, logout, demoLogin } = useAuth();
  const { showToast } = useToast();

  const tabParam = searchParams.get('tab') || 'login';
  const [tab, setTab] = useState<'login' | 'register' | 'forgot' | 'profile'>(
    isAuthenticated ? 'profile' : (tabParam as 'login' | 'register' | 'forgot')
  );

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
    navigate('/shop');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Please fill in all registration fields', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password should be at least 6 characters', 'error');
      return;
    }
    setIsSubmitting(true);
    await register(name, email, password);
    setIsSubmitting(false);
    navigate('/shop');
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please provide your registered email', 'error');
      return;
    }
    setForgotSent(true);
    showToast('Reset passcode instructions dispatched to your inbox', 'success');
  };

  // If already authenticated and viewing profile
  if (isAuthenticated && user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: 'Collector Portal' }]} className="mb-8" />

        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-bold text-xl font-display">
                {user.name.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                  Verified Collector Account
                </span>
                <h1 className="text-2xl font-bold font-display text-stone-900">{user.name}</h1>
                <p className="text-xs text-stone-500">{user.email}</p>
              </div>
            </div>

            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-400 block mb-1 uppercase font-semibold">Tier Status</span>
              <span className="text-stone-900 font-bold text-sm">Atelier Patron</span>
              <p className="text-stone-500 mt-1">Complimentary courier on all global dispatches.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-400 block mb-1 uppercase font-semibold">Curations Acquired</span>
              <span className="text-stone-900 font-bold text-sm">3 Registered Pieces</span>
              <p className="text-stone-500 mt-1">Certificates of calibration archived.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-400 block mb-1 uppercase font-semibold">Dedicated Concierge</span>
              <span className="text-stone-900 font-bold text-sm">Active 24/7</span>
              <p className="text-stone-500 mt-1">Direct priority access via private line.</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-stone-100">
            <h2 className="text-base font-semibold text-stone-900 mb-4">Recent Atelier Acquisitions</h2>
            <div className="divide-y divide-stone-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-900">Atelier Chronograph 01 (Titanium)</span>
                  <div className="text-stone-500">Order #KR-8491 · Dispatched via DHL Express</div>
                </div>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md">
                  Delivered
                </span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-900">Sylvan Daypack & Weekender (Cognac)</span>
                  <div className="text-stone-500">Order #KR-7820 · Handcrafted in Florence</div>
                </div>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md">
                  Delivered
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-20">
      <div className="text-center mb-8">
        <Link to="/" className="text-3xl font-bold font-display text-stone-900 tracking-tight">
          KROMA
        </Link>
        <p className="text-xs text-stone-500 uppercase tracking-widest mt-2">
          Private Collector Portal
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
        {/* Tab switchers */}
        <div className="flex border-b border-stone-200 mb-6">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setForgotSent(false);
            }}
            className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-wider text-center border-b-2 cursor-pointer transition-colors ${
              tab === 'login'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setForgotSent(false);
            }}
            className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-wider text-center border-b-2 cursor-pointer transition-colors ${
              tab === 'register'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Register
          </button>
        </div>

        {/* Demo Fast Login Callout */}
        <div className="mb-6 bg-stone-50 border border-stone-200 p-3.5 rounded-xl flex items-center justify-between text-xs">
          <div>
            <div className="font-semibold text-stone-900">Instant Demo Collector</div>
            <div className="text-[11px] text-stone-500">One-click test profile</div>
          </div>
          <Button
            type="button"
            onClick={demoLogin}
            variant="secondary"
            size="sm"
          >
            Demo Sign In
          </Button>
        </div>

        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@atelier.com"
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setTab('forgot')}
                  className="text-xs text-stone-500 hover:text-stone-900 font-medium"
                >
                  Forgot passcode?
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm bg-white border border-stone-200 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={isSubmitting}
            >
              Sign In to Collector Portal
            </Button>
          </form>
        )}

        {tab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Eleanor Vance"
              leftIcon={<UserIcon className="w-4 h-4" />}
            />
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@atelier.com"
              leftIcon={<Mail className="w-4 h-4" />}
            />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Create Passcode
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full text-sm bg-white border border-stone-200 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={isSubmitting}
            >
              Create Account
            </Button>
          </form>
        )}

        {tab === 'forgot' && (
          <div>
            {forgotSent ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-stone-900">Dispatch Sent</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We have transmitted a secure authentication link to <strong>{email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className="text-xs font-semibold text-stone-900 underline block mx-auto pt-2"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-4">
                <p className="text-xs text-stone-500 leading-relaxed">
                  Enter your registered collector email and we will dispatch a single-use authentication link to reset your passcode.
                </p>
                <Input
                  label="Registered Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@atelier.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                />
                <Button type="submit" variant="primary" size="md" fullWidth>
                  Send Reset Link
                </Button>
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className="text-xs font-medium text-stone-500 hover:text-stone-900 block w-full text-center"
                >
                  Cancel and return
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
