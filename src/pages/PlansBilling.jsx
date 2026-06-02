import { useState } from 'react'

/* ───────────────────────── Data ───────────────────────── */

const MAU_TICKS = ['1K', '10K', '25K', '50K', '100K', '500K', '1M', '5M', '10M+']

// Chat — MAU-based subscription tiers
const chatPlans = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'All the essentials for feature rich real-time chat experience.',
    monthly: 373.75,
    yearly: 299,
    cta: 'Subscribe',
    hasSlider: true,
    featuresTitle: 'Basic Plan Features:',
    features: [
      { label: 'Rich in-app chat' },
      { label: 'Push notifications' },
      { label: 'Basic moderation' },
      { label: 'Global EDGE network' },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    popular: true,
    highlight: true,
    description: 'An advanced communication suite with built-in notifications, AI moderation and insights.',
    monthly: 498.75,
    yearly: 399,
    cta: 'Subscribe',
    hasSlider: true,
    featuresTitle: 'Everything in Basic, Plus:',
    features: [
      { label: 'AI Rule-based moderation', note: 'limited-time offer!' },
      { label: 'Email & SMS notifications (with customizable templates)' },
      { label: 'Multi-tenancy' },
      { label: 'AI smart replies & summaries' },
      { label: 'In-depth insights' },
      { label: 'HIPAA / BAA' },
      { label: 'Advanced search' },
      { label: 'Message translation' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Access to state-of-the-art features plus higher concurrency, zero overages and top-tier support',
    startsFrom: 999,
    cta: 'Contact Us',
    hasSlider: false,
    featuresTitle: 'Everything in Advanced, Plus:',
    features: [
      { label: 'Zero overages', underline: true },
      { label: 'OpenAI-powered context & prompt based moderation' },
      { label: 'OpenAI-powered context & prompt based insights & enrichment' },
    ],
    extraFeatures: [
      { label: '10% concurrency included' },
      { label: 'Single Sign On (SSO) - SAML, LDAP and more included' },
      { label: 'Custom white-label domain (add-on)' },
    ],
  },
]

// AI Agents — credit-based plans
const aiPlans = [
  {
    id: 'web-only',
    name: 'Web-only',
    icon: 'globe',
    description: 'Basic chat features for simple AI agents on a website.',
    priceLabel: 'Pay-as-you-go',
    priceSub: 'Credit bundles starting at $25',
    creditsChip: '1,000 Starter Credits',
    cta: 'Get started',
    ctaStyle: 'outline',
    featuresTitle: "WHAT'S INCLUDED",
    features: [
      'Plug-and-play no-code web widget',
      'SOC 2, ISO 27001, GDPR compliant',
      'Limited to Knowledge Base',
      'Includes "Powered by CometChat" branding',
    ],
  },
  {
    id: 'core',
    name: 'Core',
    icon: 'bolt',
    popular: true,
    highlight: true,
    description: 'Full-featured chat, moderation, and analytics for production AI agents.',
    monthly: 124,
    yearly: 99,
    creditsChip: '2,500 Monthly Credits',
    cta: 'Upgrade to Core',
    ctaStyle: 'primary',
    featuresTitle: "WHAT'S INCLUDED",
    features: [
      'UI Kits for all popular web & mobile frameworks',
      'AI moderation & guardrails',
      'Push, email & SMS notifications',
      'Multi-tenancy',
      'No "Powered by CometChat"',
      'HIPAA (BAA) compliance (coming soon)',
      'Analytics',
      '100+ tools and front-end actions',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    icon: 'sparkles',
    description: 'Advanced personalization for complex, multi-step AI agents.',
    monthly: 1249,
    yearly: 999,
    creditsChip: '25,000 Monthly Credits',
    cta: 'Upgrade to Plus',
    ctaStyle: 'dark',
    featuresTitle: 'EVERYTHING IN CORE, PLUS:',
    features: [
      'Tasks, workflows & multi-model support',
      'User authentication & memory',
      'Role-based access control (including content)',
      'Human hand-off',
    ],
  },
  {
    id: 'done-for-you',
    name: 'Done-for-you',
    icon: 'rocket',
    dark: true,
    description: 'AI agents, built and deployed end-to-end by our team.',
    priceLabel: "Let's talk",
    priceSub: 'Custom pricing per engagement',
    chip: 'Dedicated team included',
    chipIcon: 'team',
    cta: 'Talk to sales',
    ctaStyle: 'primary',
    featuresTitle: 'INCLUDES',
    features: [
      'Design, build & deploy by CometChat',
      'Custom integrations & workflows',
      'Dedicated solutions engineer',
      'White-glove onboarding & training',
    ],
  },
]

// AI trial state presets (prototype-only demo states)
const AI_STATES = {
  'trial-active': {
    label: 'Trial active',
    banner: { tone: 'purple', title: 'Free Trial', status: 'ACTIVE', daysLeft: 11, used: 347, total: 1000 },
  },
  'trial-ending': {
    label: 'Trial ending',
    banner: { tone: 'amber', title: 'Free Trial', status: 'ENDING SOON', daysLeft: 2, used: 920, total: 1000 },
  },
  'trial-expired': {
    label: 'Trial expired',
    banner: { tone: 'red', title: 'Free Trial', status: 'EXPIRED', daysLeft: 0, used: 1000, total: 1000 },
  },
  'paid': {
    label: 'Paid plan',
    banner: null,
  },
}

const chatInvoices = [
  { date: '27 May 2026', sub: 'Advanced · annual', amount: '$399.00', status: 'Paid' },
  { date: '27 Apr 2026', sub: 'Advanced · annual', amount: '$399.00', status: 'Paid' },
  { date: '27 Mar 2026', sub: 'Advanced · annual', amount: '$399.00', status: 'Paid' },
]
const aiInvoices = [
  { date: '27 May 2026', sub: 'Core plan · monthly', amount: '$99.00', status: 'Paid' },
  { date: '27 Apr 2026', sub: 'Core plan · monthly', amount: '$99.00', status: 'Paid' },
  { date: '27 Mar 2026', sub: 'Core plan · monthly', amount: '$99.00', status: 'Paid' },
]

const PRODUCTS = [
  { value: 'chat', label: 'Chat & Messaging', icon: 'chat' },
  { value: 'ai-agents', label: 'AI Agents', icon: 'sparkles' },
]
const TABS = {
  chat: [{ value: 'plans', label: 'Plans' }, { value: 'billing', label: 'Billing' }],
  'ai-agents': [{ value: 'plans', label: 'Plans' }, { value: 'credits', label: 'Credits' }, { value: 'billing', label: 'Billing' }],
}

/* ───────────────────────── Helpers / atoms ───────────────────────── */

function formatPrice(value) {
  return Number.isInteger(value) ? value.toLocaleString() : value.toFixed(2)
}

const PlanIcon = ({ name, className = 'h-5 w-5' }) => {
  const icons = {
    globe: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />,
    bolt: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />,
    sparkles: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />,
    rocket: <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 11a4 4 0 015-5c3-3 7-3 7-3s0 4-3 7a4 4 0 01-5 5l-2 2-4-4 2-2z" />,
    team: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87" />,
    chat: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />,
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

function CheckCircle({ tone = 'purple' }) {
  const tones = { purple: 'bg-purple-100 text-purple-600', amber: 'bg-amber-100 text-amber-600' }
  return (
    <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${tones[tone]}`}>
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function FeatureItem({ feature, tone = 'purple' }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle tone={tone} />
      <div className="text-sm text-gray-700">
        <span className={feature.underline ? 'underline decoration-gray-300 underline-offset-2' : ''}>{feature.label}</span>
        {feature.note && <p className="mt-0.5 text-sm italic text-purple-600">{feature.note}</p>}
      </div>
    </li>
  )
}

function AICheck({ dark }) {
  if (dark) {
    return (
      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
        <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    )
  }
  return (
    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}

// High-level product selector (purple-filled active)
function ProductSwitcher({ value, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
      {PRODUCTS.map((opt) => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            value === opt.value ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
          }`}>
          <PlanIcon name={opt.icon} className="h-4 w-4" />
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// Sub-navigation underline tabs (full-width baseline rule)
function UnderlineTabs({ value, onChange, options }) {
  return (
    <div className="-mx-8 mt-5 border-b border-gray-200 px-8">
      <div className="flex gap-6">
        {options.map((opt) => (
          <button key={opt.value} onClick={() => onChange(opt.value)}
            className={`-mb-px border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              value === opt.value ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}>{opt.label}</button>
        ))}
      </div>
    </div>
  )
}

function BillingToggle({ billing, setBilling }) {
  return (
    <div className="flex items-center justify-end gap-3">
      <span className={`text-sm ${billing === 'monthly' ? 'font-medium text-gray-900' : 'text-gray-500'}`}>Monthly</span>
      <button onClick={() => setBilling((b) => (b === 'yearly' ? 'monthly' : 'yearly'))}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full px-0.5 transition-colors ${billing === 'yearly' ? 'bg-purple-500' : 'bg-gray-200'}`}>
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${billing === 'yearly' ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
      <span className={`text-sm ${billing === 'yearly' ? 'font-medium text-gray-900' : 'text-gray-500'}`}>Yearly</span>
      <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">- 20%</span>
    </div>
  )
}

function ProgressBar({ pct, tone = 'purple' }) {
  const tones = { purple: 'bg-purple-600', amber: 'bg-amber-500', red: 'bg-red-500' }
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div className={`h-full rounded-full ${tones[tone]}`} style={{ width: `${Math.min(100, pct)}%` }} />
    </div>
  )
}

/* ───────────────────────── Chat plan card ───────────────────────── */

function MauSlider() {
  const [value, setValue] = useState(1)
  return (
    <div className="mb-6">
      <p className="mb-3 text-sm font-medium text-gray-700">Monthly Active Users</p>
      <input type="range" min={0} max={MAU_TICKS.length - 1} step={1} value={value} onChange={(e) => setValue(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-purple-600" />
      <div className="mt-2 flex justify-between">
        {MAU_TICKS.map((tick, i) => (
          <button key={tick} onClick={() => setValue(i)} className={`text-[11px] transition-colors ${i <= value ? 'font-semibold text-purple-600' : 'text-gray-400'}`}>{tick}</button>
        ))}
      </div>
    </div>
  )
}

function ChatPlanCard({ plan, billing }) {
  const isYearly = billing === 'yearly'
  const price = plan.startsFrom ?? (isYearly ? plan.yearly : plan.monthly)
  return (
    <div className={`relative flex flex-col rounded-2xl bg-white ${plan.highlight ? 'border-2 border-purple-500 shadow-lg lg:-mt-7' : 'border border-gray-200 shadow-sm'}`}>
      {plan.popular && (
        <div className="flex items-center justify-center gap-1.5 rounded-t-2xl bg-purple-500 py-2 text-sm font-medium text-white">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 5.1L20 7.9l-4 4 .9 5.6L12 15l-4.9 2.5.9-5.6-4-4 5.6-.8z" /></svg>
          Most popular
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
        <p className="mt-2 min-h-[40px] text-sm text-gray-500">{plan.description}</p>
        <div className="mt-5">
          {plan.startsFrom ? <p className="text-sm text-gray-500">Starts from</p> : isYearly && <p className="text-base text-gray-400 line-through">${formatPrice(plan.monthly)}</p>}
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-gray-900">${formatPrice(price)}</span>
            <span className="text-sm text-gray-500">/ month</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{isYearly ? 'Billed annually' : 'Billed monthly'}</p>
        </div>
        <div className="mt-6">{plan.hasSlider ? <MauSlider /> : <div className="mb-6 h-[58px]" />}</div>
        <button className="w-full rounded-lg bg-purple-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-700">{plan.cta}</button>
        <div className="mt-7">
          <p className="mb-4 text-sm font-medium text-gray-900">{plan.featuresTitle}</p>
          <ul className="space-y-3">{plan.features.map((f) => <FeatureItem key={f.label} feature={f} tone="purple" />)}</ul>
          {plan.extraFeatures && (
            <>
              <div className="my-5 border-t border-gray-100" />
              <ul className="space-y-3">{plan.extraFeatures.map((f) => <FeatureItem key={f.label} feature={f} tone="amber" />)}</ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── AI plan card ───────────────────────── */

function AIPlanCard({ plan, billing }) {
  const isYearly = billing === 'yearly'
  const dark = plan.dark
  const price = plan.yearly != null ? (isYearly ? plan.yearly : plan.monthly) : null
  const ctaClass = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    dark: 'bg-gray-900 text-white hover:bg-gray-800',
    outline: 'border border-gray-200 text-gray-900 hover:bg-gray-50',
  }[plan.ctaStyle]

  return (
    <div className={`relative flex flex-col rounded-2xl ${dark ? 'bg-gray-900 text-white' : 'bg-white'} ${plan.highlight ? 'border-2 border-purple-500 shadow-lg lg:-mt-4' : dark ? 'border border-gray-900' : 'border border-gray-200 shadow-sm'}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">Most Popular</div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2.5">
          <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${dark ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'}`}><PlanIcon name={plan.icon} /></span>
          <h3 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
        </div>
        <p className={`mt-3 min-h-[44px] text-sm ${dark ? 'text-gray-300' : 'text-gray-500'}`}>{plan.description}</p>
        <div className="mt-5 min-h-[64px]">
          {price != null ? (
            <>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">${formatPrice(price)}</span>
                <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-500'}`}>/month</span>
              </div>
              <p className={`mt-1 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{isYearly ? 'Billed annually' : 'Billed monthly'}</p>
            </>
          ) : (
            <>
              <p className="text-3xl font-bold tracking-tight">{plan.priceLabel}</p>
              <p className={`mt-1 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{plan.priceSub}</p>
            </>
          )}
        </div>
        <div className="mt-4">
          {plan.creditsChip ? (
            <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700"><PlanIcon name="sparkles" className="h-4 w-4" />{plan.creditsChip}</div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white"><PlanIcon name={plan.chipIcon} className="h-4 w-4" />{plan.chip}</div>
          )}
        </div>
        <button className={`mt-4 w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${ctaClass}`}>{plan.cta}</button>
        <div className="mt-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">{plan.featuresTitle}</p>
          <ul className="space-y-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5"><AICheck dark={dark} /><span className={`text-sm ${dark ? 'text-gray-200' : 'text-gray-700'}`}>{f}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── AI trial banner ───────────────────────── */

function TrialBanner({ banner }) {
  if (!banner) return null
  const tone = {
    purple: { wrap: 'bg-purple-50 border-purple-100', icon: 'bg-purple-100 text-purple-600', status: 'bg-green-100 text-green-700', bar: 'purple' },
    amber: { wrap: 'bg-amber-50 border-amber-200', icon: 'bg-amber-100 text-amber-600', status: 'bg-amber-100 text-amber-700', bar: 'amber' },
    red: { wrap: 'bg-red-50 border-red-200', icon: 'bg-red-100 text-red-600', status: 'bg-red-100 text-red-700', bar: 'red' },
  }[banner.tone]
  const left = banner.total - banner.used
  const expired = banner.daysLeft === 0
  return (
    <div className={`mb-8 rounded-2xl border p-5 ${tone.wrap}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${tone.icon}`}><PlanIcon name="sparkles" /></span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{banner.title}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${tone.status}`}>{banner.status}</span>
              <span className="text-sm text-gray-500">· {expired ? 'ended' : `${banner.daysLeft} days left`}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{expired ? 'Your trial has ended. Upgrade to keep your AI agents in production.' : "You're on the free trial. Upgrade anytime to unlock production features."}</p>
          </div>
        </div>
        <button className="flex flex-shrink-0 items-center gap-1 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700">
          {expired ? 'Upgrade now' : 'Upgrade plan'}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-gray-600">{banner.used.toLocaleString()} / {banner.total.toLocaleString()} credits used</span>
          <span className="font-medium text-gray-700">{left.toLocaleString()} left</span>
        </div>
        <ProgressBar pct={(banner.used / banner.total) * 100} tone={tone.bar} />
      </div>
    </div>
  )
}

/* ───────────────────────── Plans content (per product) ───────────────────────── */

function ChatPlans({ billing, setBilling }) {
  return (
    <div className="px-8 py-6">
      <div className="mb-8 flex items-center justify-end"><BillingToggle billing={billing} setBilling={setBilling} /></div>
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {chatPlans.map((plan) => <ChatPlanCard key={plan.id} plan={plan} billing={billing} />)}
      </div>
      <div className="mx-auto mt-12 max-w-3xl space-y-1 text-center text-sm text-gray-500">
        <p>Overage fees may apply if you exceed your monthly active user (MAU) and concurrent users limits on Basic and Advanced plans.</p>
        <p>Voice and Video calls are not included in the base subscription cost and will be charged separately based on usage.</p>
        <p>For a detailed outline of these charges or to compare plans, please visit our <a href="#" className="text-purple-600 hover:underline">pricing page</a>.</p>
      </div>
    </div>
  )
}

function AIPlans({ billing, setBilling, aiState }) {
  const banner = AI_STATES[aiState].banner
  return (
    <div className="px-8 py-6">
      <TrialBanner banner={banner} />
      <div className="mb-1 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Choose your plan</h2>
          <p className="text-sm text-gray-500">Switch between monthly and annual billing.</p>
        </div>
        <BillingToggle billing={billing} setBilling={setBilling} />
      </div>
      <div className="mt-6 grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-4">
        {aiPlans.map((plan) => <AIPlanCard key={plan.id} plan={plan} billing={billing} />)}
      </div>
      <div className="mt-10 text-center">
        <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:underline">
          View full pricing details
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
        </a>
      </div>
    </div>
  )
}

/* ───────────────────────── Credits tab (AI) ───────────────────────── */

function CreditsTab() {
  const RATE = 0.04
  const planAllotment = 2500, planRemaining = 653
  const topUpBalance = 550, topUpMax = 1000
  const total = planRemaining + topUpBalance
  const purchasable = topUpMax - topUpBalance
  const usedThisCycle = 1847

  const [amount, setAmount] = useState(0)
  const [autoOn, setAutoOn] = useState(true)
  const [threshold, setThreshold] = useState(100)
  const [topUpAmount, setTopUpAmount] = useState(25)

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">AI Agent Credits</h2>
        <p className="text-sm text-gray-500">Track usage and top up credits when you need them.</p>
      </div>

      <div className="mb-5 rounded-2xl border border-purple-100 bg-purple-50/60 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total credits available</p>
            <div className="mt-1 flex items-baseline gap-2"><span className="text-4xl font-bold text-gray-900">{total.toLocaleString()}</span><span className="text-sm text-gray-500">credits</span></div>
            <p className="mt-1 text-sm text-gray-500">{planRemaining} from plan · {topUpBalance} from top-ups</p>
          </div>
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">HEALTHY</span>
        </div>
        <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full bg-purple-600" style={{ width: `${(planRemaining / total) * 100}%` }} />
          <div className="h-full bg-purple-300" style={{ width: `${(topUpBalance / total) * 100}%` }} />
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-purple-600" /> Plan credits</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-purple-300" /> Top-up credits</span>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600"><PlanIcon name="sparkles" className="h-4 w-4" /></span><span className="text-sm font-semibold text-gray-900">Plan credits</span></div>
            <span className="text-xs text-gray-400">Resets monthly</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1"><span className="text-3xl font-bold text-gray-900">{planRemaining}</span><span className="text-sm text-gray-500">/ {planAllotment.toLocaleString()}</span></div>
          <p className="mt-1 mb-3 text-xs text-gray-500">{usedThisCycle.toLocaleString()} used this cycle</p>
          <ProgressBar pct={(usedThisCycle / planAllotment) * 100} />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-600"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg></span><span className="text-sm font-semibold text-gray-900">Top-up credits</span></div>
            <span className="text-xs text-gray-400">Never expire</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1"><span className="text-3xl font-bold text-gray-900">{topUpBalance}</span><span className="text-sm text-gray-500">/ {topUpMax.toLocaleString()} max</span></div>
          <p className="mt-1 mb-3 text-xs text-gray-500">{purchasable} more you can purchase</p>
          <ProgressBar pct={(topUpBalance / topUpMax) * 100} />
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">Buy credits</h3>
        <p className="mt-0.5 text-sm text-gray-500">${RATE.toFixed(2)} per credit · Charged immediately</p>
        <p className="mt-5 mb-2 text-xs font-medium text-gray-700">Quick amounts</p>
        <div className="flex flex-wrap gap-2">
          {[100, 200, 500].map((q) => {
            const disabled = q > purchasable
            return (
              <button key={q} disabled={disabled} onClick={() => setAmount(q)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${disabled ? 'cursor-not-allowed border-gray-100 text-gray-300' : amount === q ? 'border-purple-300 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>{q}</button>
            )
          })}
          <button onClick={() => setAmount(purchasable)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${amount === purchasable ? 'border-purple-300 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>Max ({purchasable})</button>
        </div>
        <div className="mt-5 flex items-end gap-4">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-gray-700">Amount</label>
            <input type="number" min={0} max={purchasable} value={amount} onChange={(e) => setAmount(Math.min(purchasable, Math.max(0, Number(e.target.value))))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400" />
          </div>
          <div className="text-right"><p className="text-xs text-gray-500">Total</p><p className="text-2xl font-bold text-gray-900">${(amount * RATE).toFixed(2)}</p></div>
          <button disabled={amount <= 0} className={`rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors ${amount <= 0 ? 'cursor-not-allowed bg-purple-300' : 'bg-purple-600 hover:bg-purple-700'}`}>Buy Now</button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2"><h3 className="text-sm font-semibold text-gray-900">Auto top-up</h3><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${autoOn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{autoOn ? 'ON' : 'OFF'}</span></div>
            <p className="mt-1 text-sm text-gray-500">Automatically purchase credits when balance runs low. Requires an active plan.</p>
          </div>
          <button onClick={() => setAutoOn((v) => !v)} className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full px-0.5 transition-colors ${autoOn ? 'bg-purple-500' : 'bg-gray-200'}`}>
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${autoOn ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
        {autoOn && (
          <>
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Trigger threshold</label>
                <div className="relative"><input type="number" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-16 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">credits</span></div>
                <p className="mt-1 text-xs text-gray-500">When total credits fall below this</p>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Top-up amount</label>
                <div className="relative"><input type="number" value={topUpAmount} onChange={(e) => setTopUpAmount(Number(e.target.value))} className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-20 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">= ${(topUpAmount * RATE).toFixed(2)}</span></div>
                <p className="mt-1 text-xs text-gray-500">Credits added per auto top-up</p>
              </div>
            </div>
            <div className="mt-5 flex justify-end"><button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700">Save settings</button></div>
          </>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────── Billing (per product) ───────────────────────── */

function InvoiceRow({ inv }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0">
      <div><p className="text-sm font-semibold text-gray-900">{inv.date}</p><p className="text-xs text-gray-500">{inv.sub}</p></div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-900">{inv.amount}</span>
        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">{inv.status}</span>
        <button className="text-sm font-medium text-purple-600 hover:underline">Download</button>
      </div>
    </div>
  )
}

// Generic billing view used by both products
function BillingView({ planName, status, statusTone, priceLine, stats, payment, invoices, primaryLabel, cancelDate }) {
  const toneClass = { green: 'bg-green-100 text-green-700', amber: 'bg-amber-100 text-amber-700', red: 'bg-red-100 text-red-700' }[statusTone]
  return (
    <div className="max-w-3xl px-8 py-6">
      {/* Current plan */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Current plan</p>
            <div className="mt-2 flex items-center gap-2"><h3 className="text-lg font-semibold text-gray-900">{planName}</h3><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${toneClass}`}>{status}</span></div>
            <p className="mt-1 text-sm text-gray-600">{priceLine}</p>
          </div>
          <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">{primaryLabel}</button>
        </div>
        {stats && (
          <div className="mt-5 grid grid-cols-3 gap-4 border-t border-gray-100 pt-5">
            {stats.map((s) => (
              <div key={s.label}><p className="text-xs font-medium uppercase tracking-wider text-gray-500">{s.label}</p><p className="mt-1 text-sm font-semibold text-gray-900">{s.value}</p></div>
            ))}
          </div>
        )}
      </div>

      {/* Payment method */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Payment method</p>
            {payment ? (
              <div className="mt-3 flex items-center gap-3"><div className="flex h-8 w-12 items-center justify-center rounded bg-gray-900 text-[10px] font-bold text-white">VISA</div><div><p className="text-sm font-medium text-gray-900">Visa ending in 4242</p><p className="text-xs text-gray-500">Expires 08 / 2028</p></div></div>
            ) : (
              <p className="mt-3 text-sm text-gray-500">No payment method added</p>
            )}
          </div>
          <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">{payment ? 'Update' : 'Add'}</button>
        </div>
      </div>

      {/* Recent invoices */}
      {invoices && invoices.length > 0 && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Recent invoices</p>
          {invoices.map((inv, i) => <InvoiceRow key={i} inv={inv} />)}
        </div>
      )}

      {/* Cancel subscription */}
      {cancelDate && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Cancel subscription</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Cancel anytime. You'll keep access until {cancelDate}.</p>
            <button className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Cancel plan</button>
          </div>
        </div>
      )}
    </div>
  )
}

function ChatBilling() {
  return (
    <BillingView
      planName="Advanced"
      status="ACTIVE"
      statusTone="green"
      priceLine={<>$399 / month · Next billing date <span className="font-semibold text-gray-900">1 Jul 2026</span></>}
      stats={[
        { label: 'Billing cycle', value: 'Annual · Save 20%' },
        { label: 'MAU included', value: 'Up to 100K' },
        { label: 'Renews on', value: '1 Jul 2026' },
      ]}
      payment
      invoices={chatInvoices}
      primaryLabel="Change plan"
      cancelDate="1 Jul 2026"
    />
  )
}

function AIBilling({ aiState }) {
  if (aiState === 'paid') {
    return (
      <BillingView
        planName="Core"
        status="ACTIVE"
        statusTone="green"
        priceLine={<>$99 / month · Next billing date <span className="font-semibold text-gray-900">27 Jun 2026</span></>}
        stats={[
          { label: 'Billing cycle', value: 'Annual · Save 20%' },
          { label: 'Credits included', value: '2,500 / month' },
          { label: 'Renews on', value: '27 Jun 2026' },
        ]}
        payment
        invoices={aiInvoices}
        primaryLabel="Change plan"
        cancelDate="27 Jun 2026"
      />
    )
  }
  const trial = {
    'trial-active': { status: 'ACTIVE', tone: 'green', line: '11 days remaining · 1,000 trial credits', cta: 'Choose a plan' },
    'trial-ending': { status: 'ENDING SOON', tone: 'amber', line: '2 days remaining · 80 trial credits left', cta: 'Choose a plan' },
    'trial-expired': { status: 'EXPIRED', tone: 'red', line: 'Trial ended · upgrade to keep agents in production', cta: 'Upgrade now' },
  }[aiState]
  return (
    <BillingView
      planName="Free Trial"
      status={trial.status}
      statusTone={trial.tone}
      priceLine={trial.line}
      payment={false}
      invoices={[]}
      primaryLabel={trial.cta}
    />
  )
}

/* ───────────────────────── Page ───────────────────────── */

export default function PlansBilling() {
  const [product, setProduct] = useState('chat')
  const [activeTab, setActiveTab] = useState('plans')
  const [aiState, setAiState] = useState('trial-active')
  const [billing, setBilling] = useState('yearly')

  const tabs = TABS[product]

  const changeProduct = (next) => {
    setProduct(next)
    if (!TABS[next].some((t) => t.value === activeTab)) setActiveTab('plans')
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-8 pt-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Plans &amp; Billing</h1>
            <p className="mt-1 text-sm text-gray-500">Manage plans, credits, and billing per product.</p>
          </div>
          {product === 'ai-agents' && (
            <div className="text-right">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Demo state</p>
              <div className="inline-flex rounded-lg bg-gray-100 p-0.5">
                {Object.entries(AI_STATES).map(([key, val]) => (
                  <button key={key} onClick={() => setAiState(key)} className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${aiState === key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>{val.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* High-level product selector */}
        <div className="mt-5"><ProductSwitcher value={product} onChange={changeProduct} /></div>

        {/* Sub-tabs */}
        <UnderlineTabs value={activeTab} onChange={setActiveTab} options={tabs} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {product === 'chat' && activeTab === 'plans' && <ChatPlans billing={billing} setBilling={setBilling} />}
        {product === 'chat' && activeTab === 'billing' && <ChatBilling />}
        {product === 'ai-agents' && activeTab === 'plans' && <AIPlans billing={billing} setBilling={setBilling} aiState={aiState} />}
        {product === 'ai-agents' && activeTab === 'credits' && <CreditsTab />}
        {product === 'ai-agents' && activeTab === 'billing' && <AIBilling aiState={aiState} />}
      </div>
    </div>
  )
}
