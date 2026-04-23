import { useState } from 'react';

// Supported IdPs in V1 — each gets a dedicated setup guide
const idps = [
  { id: 'okta', name: 'Okta', color: 'bg-blue-600', initial: 'O' },
  { id: 'azure', name: 'Microsoft Entra ID', subtitle: 'Azure AD', color: 'bg-sky-500', initial: 'Az' },
  { id: 'google', name: 'Google Workspace', color: 'bg-red-500', initial: 'G' },
  { id: 'onelogin', name: 'OneLogin', color: 'bg-rose-600', initial: 'OL' },
  { id: 'ping', name: 'Ping Identity', color: 'bg-red-700', initial: 'P' },
  { id: 'adfs', name: 'ADFS', subtitle: 'Active Directory Federation Services', color: 'bg-indigo-600', initial: 'AD' },
  { id: 'generic', name: 'Generic SAML 2.0', subtitle: 'Any SAML 2.0-compliant provider', color: 'bg-gray-600', initial: 'S' },
];

// IdP-specific guides used in wizard Step 2
const idpGuides = {
  okta: [
    'In your Okta admin console, go to Applications → Create App Integration',
    'Choose "SAML 2.0" and click Next',
    'Enter "CometChat Dashboard" as the app name and upload the logo (optional)',
    'In the SAML Settings screen, paste the ACS URL into "Single sign-on URL"',
    'Paste the Entity ID into "Audience URI (SP Entity ID)"',
    'Leave Name ID format as "EmailAddress" and Application username as "Email"',
    'Complete the wizard, then copy the metadata URL from the Sign On tab',
  ],
  azure: [
    'In the Azure portal, go to Microsoft Entra ID → Enterprise applications → New application',
    'Create a new "Non-gallery application" named "CometChat Dashboard"',
    'Under Single sign-on, pick SAML',
    'In "Basic SAML Configuration," paste the Entity ID into Identifier',
    'Paste the ACS URL into Reply URL',
    'Save, then download the Federation Metadata XML from SAML Certificates',
  ],
  google: [
    'In the Google Admin console, go to Apps → Web and mobile apps → Add app → Add custom SAML app',
    'Enter "CometChat Dashboard" and optionally upload the logo',
    'On the Google IdP info screen, download the IdP metadata',
    'Paste the ACS URL into ACS URL and the Entity ID into Entity ID',
    'Set Name ID format to EMAIL, Name ID to Primary email',
    'Complete setup and assign the app to the appropriate organizational units',
  ],
  onelogin: [
    'In OneLogin, go to Applications → Applications → Add App',
    'Search for "SAML Custom Connector (Advanced)" and add it',
    'On Configuration, paste the ACS URL into "ACS (Consumer) URL"',
    'Paste the Entity ID into "Audience (EntityID)"',
    'Copy the Issuer URL from the SSO tab — that is your metadata URL',
  ],
  ping: [
    'In PingOne, go to Applications → Applications → + → New Application',
    'Choose "SAML Application" and name it "CometChat Dashboard"',
    'In Configuration, paste the ACS URL into ACS URLs',
    'Paste the Entity ID into Entity ID',
    'Download the metadata from the Configuration tab',
  ],
  adfs: [
    'Open the AD FS Management console → Relying Party Trusts → Add Relying Party Trust',
    'Choose "Enter data about the relying party manually"',
    'Name the trust "CometChat Dashboard"',
    'Enable SAML 2.0 WebSSO protocol and enter the ACS URL as the Assertion Consumer Service URL',
    'Enter the Entity ID as the Relying Party Trust identifier',
    'Finish the wizard, then export federation metadata',
  ],
  generic: [
    'In your IdP admin console, create a new SAML 2.0 application',
    'Configure the ACS URL as the Assertion Consumer Service / Single Sign-On URL',
    'Configure the Entity ID as the Audience / SP Entity ID',
    'Set the Name ID format to EmailAddress',
    'Ensure the IdP signs the SAML Response (signed assertions)',
    'Export or copy the IdP metadata URL or XML file',
  ],
};

const SSO = () => {
  // Prototype state switcher — lets us preview all four views
  const [viewState, setViewState] = useState('empty');

  // Wizard state
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [pickedIdp, setPickedIdp] = useState(null);
  const [metadataSource, setMetadataSource] = useState('url'); // 'url' | 'xml'
  const [metadataUrl, setMetadataUrl] = useState('');
  const [metadataParsed, setMetadataParsed] = useState(false);
  const [testState, setTestState] = useState('idle'); // 'idle' | 'running' | 'success' | 'failure'
  const [copied, setCopied] = useState(null);

  // Enforce confirmation modal
  const [enforceModalOpen, setEnforceModalOpen] = useState(false);
  const [breakGlassOwner, setBreakGlassOwner] = useState('sarah@acmecorp.com');

  // Disable confirmation modal
  const [disableModalOpen, setDisableModalOpen] = useState(false);

  const owners = [
    { email: 'sarah@acmecorp.com', name: 'Sarah Chen' },
    { email: 'daniel@acmecorp.com', name: 'Daniel Park' },
  ];

  const resetWizard = () => {
    setWizardOpen(false);
    setWizardStep(1);
    setPickedIdp(null);
    setMetadataSource('url');
    setMetadataUrl('');
    setMetadataParsed(false);
    setTestState('idle');
  };

  const copyValue = (value, key) => {
    navigator.clipboard?.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const ACS_URL = 'https://dashboard.cometchat.com/sso/saml/acs/240998KMSF2025';
  const ENTITY_ID = 'urn:cometchat:dashboard:240998KMSF2025';

  const selectedIdp = idps.find(i => i.id === pickedIdp);

  // --- Status for Enabled / Enforced views ---
  const connectedIdp = idps[0]; // Okta in the mock
  const certExpiry = 'Oct 12, 2027';
  const connectedAt = 'Apr 21, 2026';

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">SSO</h1>
          <p className="mt-0.5 text-sm text-gray-500">Let your team sign in to the Dashboard through your identity provider</p>
        </div>
        <div className="flex items-center gap-3">
          {/* State switcher — prototype only */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden text-xs">
            {['gated', 'empty', 'enabled', 'enforced'].map(s => (
              <button key={s} onClick={() => setViewState(s)} className={`px-3 py-1.5 transition-colors capitalize ${viewState === s ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === PLAN-GATED STATE === */}
      {viewState === 'gated' && (
        <div className="flex-1 relative overflow-hidden">
          {/* Blurred sample content */}
          <div className="pointer-events-none select-none p-6" style={{ filter: 'blur(4px)' }}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-40" />
                  <div className="h-3 bg-gray-200 rounded w-64" />
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1.5">
                    <div className="h-4 bg-gray-200 rounded w-32" />
                    <div className="h-3 bg-gray-200 rounded w-56" />
                  </div>
                  <div className="h-6 w-11 rounded-full bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
          {/* Upgrade CTA overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <div className="text-center bg-white border border-gray-200 rounded-2xl shadow-lg px-10 py-8 max-w-md">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">SSO for the Dashboard</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">Connect your identity provider so your team signs in with your corporate credentials. Supports Okta, Microsoft Entra ID, Google Workspace, OneLogin, Ping, and any SAML 2.0 provider.</p>
              <button className="mt-5 px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">Upgrade to Enterprise</button>
              <p className="mt-3 text-xs text-gray-400">Available on the Enterprise plan</p>
            </div>
          </div>
        </div>
      )}

      {/* === EMPTY STATE (Enterprise, not configured) === */}
      {viewState === 'empty' && (
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Set up Single Sign-On</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                Connect your identity provider so your team signs in to the Dashboard through your corporate credentials. You can enforce SSO organization-wide or run it alongside existing login methods.
              </p>

              {/* Supported IdP row */}
              <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
                {idps.slice(0, 6).map(idp => (
                  <div key={idp.id} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
                    <div className={`w-5 h-5 rounded ${idp.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-[9px] font-bold text-white">{idp.initial}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-700">{idp.name}</span>
                  </div>
                ))}
                <div className="px-3 py-1.5 text-xs text-gray-500">+ any SAML 2.0 provider</div>
              </div>

              <button
                onClick={() => setWizardOpen(true)}
                className="mt-6 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Set up SSO
              </button>
              <p className="mt-3 text-xs text-gray-400">Takes about 10–15 minutes</p>
            </div>
          </div>
        </div>
      )}

      {/* === ENABLED / ENFORCED STATE === */}
      {(viewState === 'enabled' || viewState === 'enforced') && (
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Status / Connection Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${connectedIdp.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-sm font-bold text-white">{connectedIdp.initial}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-semibold text-gray-900">{connectedIdp.name}</h3>
                    {viewState === 'enabled' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
                        Enabled
                      </span>
                    )}
                    {viewState === 'enforced' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        Enforced
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Connected on {connectedAt} · Certificate expires {certExpiry}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Test Connection
                  </button>
                  <button onClick={() => { resetWizard(); setWizardOpen(true); }} className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Reconfigure
                  </button>
                </div>
              </div>
            </div>

            {/* Enforced banner + break-glass Owner */}
            {viewState === 'enforced' && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-900">SSO is enforced for this organization</p>
                  <p className="mt-0.5 text-xs text-purple-700">All members must sign in through {connectedIdp.name}. Email/password, Google, and GitHub sign-in are blocked.</p>
                  <div className="mt-3 flex items-center justify-between bg-white border border-purple-200 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">SC</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Break-glass Owner</p>
                        <p className="text-sm font-medium text-gray-900">Sarah Chen · sarah@acmecorp.com</p>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-purple-700 hover:text-purple-900">Change</button>
                  </div>
                </div>
              </div>
            )}

            {/* Toggles */}
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {/* SSO Enabled toggle */}
              <div className="px-6 py-5 flex items-center justify-between gap-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">SSO Enabled</p>
                  <p className="mt-0.5 text-xs text-gray-500">Allow members to sign in through your identity provider. Existing sign-in methods stay available unless you enforce SSO.</p>
                </div>
                <button className="h-6 w-11 rounded-full transition-colors relative flex-shrink-0 bg-purple-500">
                  <div className="h-5 w-5 rounded-full bg-white shadow transform transition-transform absolute top-0.5 translate-x-[22px]" />
                </button>
              </div>

              {/* SSO Enforced toggle */}
              <div className="px-6 py-5 flex items-center justify-between gap-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">SSO Enforced</p>
                  <p className="mt-0.5 text-xs text-gray-500">Require all members to sign in through your identity provider. Email/password, Google, and GitHub sign-in are blocked. One break-glass Owner stays exempt.</p>
                </div>
                <button
                  onClick={() => viewState === 'enabled' ? setEnforceModalOpen(true) : null}
                  className={`h-6 w-11 rounded-full transition-colors relative flex-shrink-0 ${viewState === 'enforced' ? 'bg-purple-500' : 'bg-gray-200'}`}
                >
                  <div className={`h-5 w-5 rounded-full bg-white shadow transform transition-transform absolute top-0.5 ${viewState === 'enforced' ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>

            {/* Danger zone */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Disable SSO</p>
                <p className="mt-0.5 text-xs text-gray-500">Remove the SAML connection. Members return to using email/password, Google, and GitHub.</p>
              </div>
              <button onClick={() => setDisableModalOpen(true)} className="px-3 py-1.5 text-xs font-medium text-red-700 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                Disable SSO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === WIZARD MODAL === */}
      {wizardOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={resetWizard} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl pointer-events-auto flex flex-col max-h-[90vh]">
              {/* Wizard header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Set up Single Sign-On</h2>
                  <p className="mt-0.5 text-xs text-gray-500">Step {wizardStep} of 5</p>
                </div>
                <button onClick={resetWizard} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-gray-100 flex-shrink-0">
                <div className="h-full bg-purple-500 transition-all" style={{ width: `${(wizardStep / 5) * 100}%` }} />
              </div>

              {/* Wizard body */}
              <div className="flex-1 overflow-auto px-6 py-5">
                {/* Step 1 — Pick IdP */}
                {wizardStep === 1 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Pick your identity provider</h3>
                    <p className="mt-1 text-xs text-gray-500">We'll walk you through the exact setup for your provider. Don't see yours? Use Generic SAML 2.0 — any compliant provider works.</p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {idps.map(idp => (
                        <button
                          key={idp.id}
                          onClick={() => setPickedIdp(idp.id)}
                          className={`flex items-center gap-3 px-4 py-3 border rounded-xl text-left transition-colors ${pickedIdp === idp.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'}`}
                        >
                          <div className={`w-10 h-10 rounded-lg ${idp.color} flex items-center justify-center flex-shrink-0`}>
                            <span className="text-xs font-bold text-white">{idp.initial}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{idp.name}</p>
                            {idp.subtitle && <p className="text-[11px] text-gray-500 truncate">{idp.subtitle}</p>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2 — Configure the IdP side */}
                {wizardStep === 2 && selectedIdp && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-9 h-9 rounded-lg ${selectedIdp.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xs font-bold text-white">{selectedIdp.initial}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Configure {selectedIdp.name}</h3>
                        <p className="text-xs text-gray-500">Follow these steps in your IdP admin console</p>
                      </div>
                    </div>

                    {/* ACS URL + Entity ID */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-5">
                      {[
                        { label: 'ACS URL', value: ACS_URL, key: 'acs' },
                        { label: 'Entity ID', value: ENTITY_ID, key: 'entity' },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{f.label}</label>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono text-gray-900 truncate">{f.value}</div>
                            <button onClick={() => copyValue(f.value, f.key)} className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                              {copied === f.key ? (
                                <>
                                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
                                  Copied
                                </>
                              ) : (
                                <>
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                  </svg>
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Step-by-step guide */}
                    <div className="space-y-2.5">
                      {idpGuides[pickedIdp].map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-[11px] font-semibold text-gray-600">{i + 1}</span>
                          </div>
                          <p className="text-sm text-gray-700 pt-0.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3 — Paste metadata */}
                {wizardStep === 3 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Paste your IdP metadata</h3>
                    <p className="mt-1 text-xs text-gray-500">Either paste the metadata URL or upload the metadata XML file from your IdP.</p>

                    {/* Source switcher */}
                    <div className="mt-4 flex items-center border border-gray-200 rounded-lg overflow-hidden w-fit text-xs">
                      {[
                        { k: 'url', label: 'Metadata URL' },
                        { k: 'xml', label: 'Upload XML' },
                      ].map(o => (
                        <button key={o.k} onClick={() => { setMetadataSource(o.k); setMetadataParsed(false); }} className={`px-4 py-1.5 transition-colors ${metadataSource === o.k ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                          {o.label}
                        </button>
                      ))}
                    </div>

                    {metadataSource === 'url' && (
                      <div className="mt-4">
                        <label className="text-xs font-medium text-gray-700">Metadata URL</label>
                        <div className="mt-1.5 flex items-center gap-2">
                          <input
                            type="text"
                            value={metadataUrl}
                            onChange={(e) => { setMetadataUrl(e.target.value); setMetadataParsed(false); }}
                            placeholder="https://your-idp.com/app/xyz/sso/saml/metadata"
                            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                          />
                          <button
                            onClick={() => metadataUrl && setMetadataParsed(true)}
                            disabled={!metadataUrl}
                            className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Parse
                          </button>
                        </div>
                      </div>
                    )}

                    {metadataSource === 'xml' && (
                      <div className="mt-4">
                        <button onClick={() => setMetadataParsed(true)} className="w-full px-4 py-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:bg-gray-50 transition-colors text-center">
                          <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                          </svg>
                          <p className="text-sm font-medium text-gray-700">Click to upload metadata.xml</p>
                          <p className="mt-0.5 text-xs text-gray-500">or drag and drop</p>
                        </button>
                      </div>
                    )}

                    {/* Parsed summary */}
                    {metadataParsed && (
                      <div className="mt-5 bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 13l4 4L19 7" /></svg>
                          <p className="text-xs font-medium text-gray-700">Metadata parsed successfully</p>
                        </div>
                        <div className="space-y-2.5 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Issuer</span>
                            <span className="text-sm text-gray-900 font-mono text-xs">https://idp.acmecorp.com/saml</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Signing certificate expires</span>
                            <span className="text-sm text-gray-900">Oct 12, 2027</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Supported bindings</span>
                            <span className="text-sm text-gray-900">HTTP-POST, HTTP-Redirect</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4 — Test Connection */}
                {wizardStep === 4 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Test the connection</h3>
                    <p className="mt-1 text-xs text-gray-500">We'll run a live SAML round-trip to make sure everything works. You'll authenticate through {selectedIdp?.name} in a popup — this won't enable SSO yet.</p>

                    <div className="mt-5 bg-gray-50 rounded-xl p-6 text-center">
                      {testState === 'idle' && (
                        <>
                          <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-700">Ready to test</p>
                          <button
                            onClick={() => {
                              setTestState('running');
                              setTimeout(() => setTestState('success'), 1500);
                            }}
                            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            Run Test Connection
                          </button>
                        </>
                      )}
                      {testState === 'running' && (
                        <>
                          <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-gray-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path d="M21 12a9 9 0 11-6.219-8.56" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-700">Opening {selectedIdp?.name}…</p>
                          <p className="mt-1 text-xs text-gray-500">Complete the login in the popup window</p>
                        </>
                      )}
                      {testState === 'success' && (
                        <>
                          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <p className="text-sm font-medium text-gray-900">SAML round-trip successful</p>
                          <p className="mt-1 text-xs text-gray-500">Assertion signed correctly · Email claim verified</p>
                          <button onClick={() => setTestState('idle')} className="mt-3 text-xs text-purple-600 hover:text-purple-700">Run again</button>
                        </>
                      )}
                      {testState === 'failure' && (
                        <>
                          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 9v2m0 4h.01M5 20h14a2 2 0 001.85-2.77l-7-12a2 2 0 00-3.4 0l-7 12A2 2 0 005 20z" /></svg>
                          </div>
                          <p className="text-sm font-medium text-gray-900">Connection failed</p>
                          <p className="mt-1 text-xs text-red-700">Signature verification failed — the IdP's signing certificate doesn't match the metadata.</p>
                          <button onClick={() => setTestState('idle')} className="mt-3 text-xs text-purple-600 hover:text-purple-700">Try again</button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 5 — Enable */}
                {wizardStep === 5 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Enable SSO</h3>
                    <p className="mt-1 text-xs text-gray-500">You're all set. Enabling SSO adds it as a sign-in option for your organization. Existing methods stay available until you enforce SSO separately.</p>

                    <div className="mt-5 bg-gray-50 rounded-xl p-5 space-y-3">
                      {[
                        { label: 'Identity Provider', value: selectedIdp?.name || '' },
                        { label: 'Status after setup', value: 'Enabled (additive)' },
                        { label: 'JIT provisioning', value: 'On — new users get the Developer role' },
                        { label: 'Account linking', value: 'Auto-link by verified email' },
                      ].map(r => (
                        <div key={r.label} className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{r.label}</span>
                          <span className="text-sm text-gray-900">{r.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 9v2m0 4h.01M5 20h14a2 2 0 001.85-2.77l-7-12a2 2 0 00-3.4 0l-7 12A2 2 0 005 20z" /></svg>
                      <p className="text-xs text-amber-800">To require all members to sign in through SSO, flip the <strong>SSO Enforced</strong> toggle on the main page after enabling.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Wizard footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
                <button
                  onClick={() => wizardStep > 1 ? setWizardStep(wizardStep - 1) : resetWizard()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {wizardStep === 1 ? 'Cancel' : 'Back'}
                </button>
                <div className="flex items-center gap-2">
                  {wizardStep < 5 && (
                    <button
                      onClick={() => setWizardStep(wizardStep + 1)}
                      disabled={
                        (wizardStep === 1 && !pickedIdp) ||
                        (wizardStep === 3 && !metadataParsed) ||
                        (wizardStep === 4 && testState !== 'success')
                      }
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  )}
                  {wizardStep === 5 && (
                    <button
                      onClick={() => { resetWizard(); setViewState('enabled'); }}
                      className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Enable SSO
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* === ENFORCE CONFIRMATION MODAL === */}
      {enforceModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setEnforceModalOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md pointer-events-auto">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 9v2m0 4h.01M5 20h14a2 2 0 001.85-2.77l-7-12a2 2 0 00-3.4 0l-7 12A2 2 0 005 20z" /></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">Enforce SSO for this organization?</h3>
                    <p className="mt-1 text-sm text-gray-500">This takes effect immediately and affects everyone on the team.</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {[
                    'All members must sign in through Okta',
                    'Email/password, Google, and GitHub sign-in will be blocked',
                    'Active sessions of all members will be signed out within 30 seconds',
                    'The designated break-glass Owner stays exempt and can still use other methods',
                  ].map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                      <span className="text-sm">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <label className="text-xs font-medium text-gray-700">Break-glass Owner</label>
                  <p className="mt-0.5 text-xs text-gray-500">This Owner stays exempt and can recover access if your IdP has an outage.</p>
                  <select
                    value={breakGlassOwner}
                    onChange={(e) => setBreakGlassOwner(e.target.value)}
                    className="mt-2 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 bg-white"
                  >
                    {owners.map(o => (
                      <option key={o.email} value={o.email}>{o.name} · {o.email}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-2">
                <button onClick={() => setEnforceModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => { setEnforceModalOpen(false); setViewState('enforced'); }}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Enforce SSO
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* === DISABLE CONFIRMATION MODAL === */}
      {disableModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setDisableModalOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md pointer-events-auto">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 9v2m0 4h.01M5 20h14a2 2 0 001.85-2.77l-7-12a2 2 0 00-3.4 0l-7 12A2 2 0 005 20z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Disable SSO?</h3>
                    <p className="mt-1 text-sm text-gray-500">The SAML connection will be removed. Your team returns to using email/password, Google, and GitHub. You can reconnect later.</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-2">
                <button onClick={() => setDisableModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => { setDisableModalOpen(false); setViewState('empty'); }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Disable SSO
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SSO;
