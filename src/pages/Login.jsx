import { useState } from 'react';

const Login = () => {
  // Prototype state switcher: 'default' | 'sso-email' | 'redirecting'
  const [viewState, setViewState] = useState('default');
  const [ssoEmail, setSsoEmail] = useState('');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top-left wordmark */}
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="text-[22px] text-gray-900">
          <span className="font-normal">comet</span>
          <span className="font-semibold">chat</span>
        </div>

        {/* State switcher — prototype only */}
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden text-xs">
          {[
            { k: 'default', label: 'Default' },
            { k: 'sso-email', label: 'SSO entry' },
            { k: 'redirecting', label: 'Redirecting' },
          ].map(s => (
            <button key={s.k} onClick={() => setViewState(s.k)} className={`px-3 py-1.5 transition-colors ${viewState === s.k ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex items-start justify-center px-4">
        <div className="w-full max-w-md mt-8">
          {/* === DEFAULT LOGIN === */}
          {viewState === 'default' && (
            <>
              <h1 className="text-center text-2xl font-semibold text-gray-900">Welcome back</h1>

              <div className="mt-8 space-y-3">
                {/* Google */}
                <button className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </button>

                {/* GitHub */}
                <button className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#181717">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  Sign in with GitHub
                </button>

                {/* SSO — NEW */}
                <button
                  onClick={() => setViewState('sso-email')}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  Sign in with SSO
                </button>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-gray-500">Or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-900">Email</label>
                <div className="mt-1.5 relative">
                  <input
                    type="email"
                    placeholder="Your work email"
                    className="w-full px-3 py-2.5 pr-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  />
                  <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
              </div>

              {/* Password */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-900">Password</label>
                  <button className="text-sm font-medium text-purple-600 hover:text-purple-700">Forgot password?</button>
                </div>
                <div className="mt-1.5 relative">
                  <input
                    type="password"
                    placeholder="Your password"
                    className="w-full px-3 py-2.5 pr-14 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  />
                  <svg className="w-4 h-4 text-gray-400 absolute right-9 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Log in button */}
              <button className="mt-6 w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Log in
              </button>

              {/* Sign up link */}
              <p className="mt-5 text-center text-sm text-gray-500">
                Don't have an account? <button className="font-medium text-purple-600 hover:text-purple-700">Sign up</button>
              </p>
            </>
          )}

          {/* === SSO EMAIL ENTRY === */}
          {viewState === 'sso-email' && (
            <>
              <button onClick={() => setViewState('default')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                Other sign-in options
              </button>

              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>

              <h1 className="text-2xl font-semibold text-gray-900">Sign in with SSO</h1>
              <p className="mt-1 text-sm text-gray-500">Enter your work email — we'll route you to your organization's identity provider.</p>

              <div className="mt-6">
                <label className="text-sm font-medium text-gray-900">Work email</label>
                <input
                  type="email"
                  value={ssoEmail}
                  onChange={(e) => setSsoEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="mt-1.5 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                />
              </div>

              <button
                onClick={() => setViewState('redirecting')}
                disabled={!ssoEmail}
                className="mt-5 w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>

              <p className="mt-5 text-center text-xs text-gray-500">
                If your organization has SSO configured, you'll be redirected to their identity provider to complete sign in.
              </p>
            </>
          )}

          {/* === REDIRECTING === */}
          {viewState === 'redirecting' && (
            <div className="text-center mt-16">
              <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <svg className="w-7 h-7 text-gray-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Redirecting to your identity provider…</h1>
              <p className="mt-2 text-sm text-gray-500">
                {ssoEmail && <>Sending you to <span className="font-medium text-gray-900">{ssoEmail.split('@')[1] || 'your IdP'}</span> to sign in.</>}
                {!ssoEmail && <>Sending you to your identity provider to sign in.</>}
              </p>
              <button onClick={() => setViewState('default')} className="mt-5 text-sm font-medium text-purple-600 hover:text-purple-700">
                Cancel and go back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
