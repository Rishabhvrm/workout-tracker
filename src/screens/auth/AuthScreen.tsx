import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AuthScreen() {
  const { signIn, signUp, continueAsGuest } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (tab === 'login') {
      const err = await signIn(email, password);
      if (err) setError(err);
    } else {
      if (!name.trim()) { setError('Please enter your name.'); setLoading(false); return; }
      const err = await signUp(email, password, name.trim());
      if (err) setError(err);
      else setEmailSent(true);
    }
    setLoading(false);
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-5xl mb-4">📬</div>
        <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
        <p className="text-gray-400 text-sm mb-6">
          We sent a confirmation link to <span className="text-orange-400">{email}</span>.
          Click it to activate your account.
        </p>
        <button
          onClick={() => setEmailSent(false)}
          className="text-xs text-gray-600 underline"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col"
         style={{ background: 'linear-gradient(160deg, #1c1917 0%, #111827 60%, #0f172a 100%)' }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo / title */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-8 h-8">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Workout Tracker</h1>
          <p className="text-gray-500 text-sm mt-1">Track every rep. Own your progress.</p>
        </div>

        {/* Tab switcher */}
        <div className="w-full max-w-sm">
          <div className="flex bg-gray-900 rounded-xl p-1 mb-6 border border-gray-800">
            {(['login', 'signup'] as const).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  tab === t ? 'bg-orange-500 text-white shadow' : 'text-gray-500'
                }`}
              >
                {t === 'login' ? 'Log in' : 'Sign up'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === 'signup' && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3.5 text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
                autoComplete="name"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3.5 text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
              autoComplete="email"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3.5 text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              required
              minLength={6}
            />

            {error && (
              <p className="text-red-400 text-xs px-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-bold text-white transition-all active:scale-95 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 16px rgba(249,115,22,0.3)' }}
            >
              {loading ? '…' : tab === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>

          {/* Guest option */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600 mb-2">No account? Just browsing?</p>
            <button
              onClick={continueAsGuest}
              className="text-sm text-gray-400 underline underline-offset-2 hover:text-gray-300 transition-colors"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
