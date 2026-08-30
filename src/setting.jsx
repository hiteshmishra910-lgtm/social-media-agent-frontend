import React, { useEffect, useState } from "react";

const STORAGE_KEY = "socialai_settings";

const DEFAULTS = {
  name: "Hitesh Mishra",
  email: "hitesh@example.com",
  workspace: "SocialAI Workspace",
  generationComplete: true,
  scheduledReminder: true,
  weeklyAnalytics: true,
  productUpdates: false,
  saveContent: true,
  personalizedSuggestions: true,
  twoFactor: false,
  theme: "Light",
  density: "Comfortable",
};

function readSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

function Toggle({ value, onChange }) {
  return (
    <button
      type="button"
      className={`settings-toggle ${value ? "on" : ""}`}
      aria-pressed={value}
      onClick={() => onChange(!value)}
    >
      <span />
    </button>
  );
}

function Row({ title, text, children }) {
  return (
    <div className="settings-row">
      <div className="settings-row-copy">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function Settings() {
  const [form, setForm] = useState(readSettings);
  const [section, setSection] = useState("Profile");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  const set = (key, value) => {
    setForm((old) => ({ ...old, [key]: value }));
    setSaved(false);
  };

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const reset = () => {
    setForm(DEFAULTS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
    } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const menu = [
    ["Profile", "👤"],
    ["Notifications", "🔔"],
    ["Activities", "◷"],
    ["Privacy", "◈"],
    ["Security", "◉"],
    ["Appearance", "◐"],
    ["About", "ⓘ"],
  ];

  return (
    <>
      <style>{`
        .settings-page{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:55px 0 90px;color:#172019}
        .settings-hero{display:flex;align-items:flex-end;justify-content:space-between;gap:30px;margin-bottom:30px}
        .settings-eyebrow{display:flex;align-items:center;gap:10px;margin-bottom:15px;color:#62806b;font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase}
        .settings-eyebrow-line{width:38px;height:1px;background:#7fa18a}
        .settings-title{margin:0;font-size:clamp(48px,6vw,76px);line-height:.9;letter-spacing:-4px;font-weight:800}
        .settings-title em{font-family:"Playfair Display",Georgia,serif;font-weight:500}
        .settings-subtitle{max-width:650px;margin:17px 0 0;color:#69756d;font-size:14px;line-height:1.65}
        .settings-save-top{min-width:145px;height:48px;border:0;border-radius:999px;background:#1b2a20;color:#fff;font-size:12px;font-weight:800;transition:.2s}
        .settings-save-top:hover{transform:translateY(-2px);background:#304a38}
        .settings-layout{display:grid;grid-template-columns:255px minmax(0,1fr);gap:20px;align-items:start}
        .settings-menu{position:sticky;top:100px;padding:12px;border:1px solid rgba(34,49,39,.1);border-radius:20px;background:rgba(248,245,236,.84);box-shadow:0 15px 45px rgba(45,57,48,.05);backdrop-filter:blur(14px)}
        .settings-menu-label{padding:9px 11px 11px;color:#7b857e;font-size:9px;font-weight:800;letter-spacing:1.7px;text-transform:uppercase}
        .settings-menu-item{width:100%;min-height:46px;display:flex;align-items:center;gap:10px;border:0;border-radius:11px;padding:0 10px;background:transparent;color:#667169;text-align:left;transition:.18s}
        .settings-menu-item:hover{background:#edf1eb;color:#1f3026}.settings-menu-item.active{background:#dce8da;color:#1d3a28;font-weight:800}
        .settings-menu-icon{width:25px;text-align:center}.settings-menu-number{margin-left:auto;color:#9aa39d;font-size:9px}
        .settings-card{margin-bottom:18px;padding:27px;border:1px solid rgba(34,49,39,.1);border-radius:20px;background:#f8f5ec;box-shadow:0 15px 45px rgba(45,57,48,.045)}
        .settings-card-header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:22px}.settings-card-header h2{margin:0;font-size:21px;letter-spacing:-.7px}.settings-card-header p{max-width:600px;margin:6px 0 0;color:#737d76;font-size:12px;line-height:1.55}
        .settings-badge{padding:7px 10px;border-radius:999px;background:#e1e9df;color:#557060;font-size:9px;font-weight:800;letter-spacing:1px;text-transform:uppercase;white-space:nowrap}
        .settings-profile{display:grid;grid-template-columns:78px 1fr;gap:20px;margin-bottom:22px;padding-bottom:22px;border-bottom:1px solid rgba(34,49,39,.08)}
        .settings-avatar{width:78px;height:78px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:radial-gradient(circle at 32% 25%,#dce9dc,#8eae94 58%,#4f8164);color:#fff;font-size:25px;font-weight:800;box-shadow:0 12px 30px rgba(70,105,78,.18)}
        .settings-profile-name{margin:3px 0 5px;font-size:19px;font-weight:800}.settings-profile-email{color:#778079;font-size:12px}
        .settings-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.settings-field.full{grid-column:1/-1}.settings-field label{display:block;margin-bottom:7px;color:#657269;font-size:9px;font-weight:800;letter-spacing:1.3px;text-transform:uppercase}
        .settings-field input,.settings-field select{width:100%;height:46px;border:1px solid rgba(38,57,45,.13);border-radius:11px;padding:0 13px;outline:none;background:#fdfbf5;color:#172019;font-size:13px}.settings-field input:focus,.settings-field select:focus{border-color:#6d9578;box-shadow:0 0 0 3px rgba(95,138,108,.1)}
        .settings-row{min-height:70px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:15px 0;border-bottom:1px solid rgba(34,49,39,.08)}.settings-row:first-child{padding-top:0}.settings-row:last-child{padding-bottom:0;border-bottom:0}
        .settings-row-copy{min-width:0}.settings-row-copy strong{display:block;color:#1d2921;font-size:13px}.settings-row-copy span{display:block;max-width:600px;margin-top:4px;color:#778079;font-size:11px;line-height:1.5}
        .settings-toggle{position:relative;width:48px;height:27px;padding:0;border:0;border-radius:999px;background:#cbd1cb;transition:.2s}.settings-toggle.on{background:#4f8164}.settings-toggle span{position:absolute;top:4px;left:4px;width:19px;height:19px;border-radius:50%;background:#fff;box-shadow:0 2px 7px rgba(0,0,0,.16);transition:.2s}.settings-toggle.on span{transform:translateX(21px)}
        .settings-status{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border-radius:999px;background:#dcebdc;color:#376245;font-size:9px;font-weight:800;letter-spacing:1px;text-transform:uppercase}.settings-dot{width:6px;height:6px;border-radius:50%;background:#4f9b64}
        .settings-select{height:40px;min-width:135px;border:1px solid rgba(38,57,45,.13);border-radius:10px;padding:0 10px;background:#fdfbf5;color:#314037;outline:none;font-size:11px}
        .settings-account-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.settings-account{display:flex;align-items:center;gap:11px;padding:13px;border:1px solid rgba(34,49,39,.08);border-radius:13px;background:#fdfbf5}.settings-account-icon{width:34px;height:34px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:10px;background:#e6ebe3;color:#355340;font-size:13px;font-weight:800}.settings-account-copy{min-width:0;flex:1}.settings-account-copy strong{display:block;font-size:11px}.settings-account-copy span{display:block;margin-top:3px;color:#818a83;font-size:9px}.settings-connect{border:0;border-radius:999px;padding:7px 10px;background:#1b2a20;color:#fff;font-size:9px;font-weight:800}
        .settings-danger{border-color:rgba(151,84,76,.14);background:#faf4ef}.settings-danger h2{color:#7d4039}.settings-reset{border:1px solid rgba(151,84,76,.2);border-radius:10px;padding:9px 12px;background:transparent;color:#98544c;font-size:10px;font-weight:700}
        .settings-savebar{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-top:18px;padding:15px 18px;border-radius:16px;background:#e5eadf;border:1px solid rgba(49,73,57,.1)}.settings-savebar span{color:#657269;font-size:11px}.settings-savebar strong{color:#294232}.settings-save{border:0;border-radius:10px;padding:10px 17px;background:#1b2a20;color:#fff;font-size:11px;font-weight:800}
        .settings-about{display:flex;flex-direction:column;gap:18px}

.settings-about-intro{
  padding:22px;
  border-radius:15px;
  background:#eeece2;
  border:1px solid rgba(34,49,39,.06)
}

.settings-about-intro h3{
  margin:0 0 9px;
  font-size:17px;
  color:#1d2921;
  letter-spacing:-.4px
}

.settings-about-intro p{
  margin:0;
  color:#69756d;
  font-size:12px;
  line-height:1.75
}

.settings-about-heading{
  margin:4px 0 0;
  color:#1d2921;
  font-size:13px;
  font-weight:800
}

.settings-about-features{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:10px
}

.settings-about-feature{
  position:relative;
  padding:20px;
  border-radius:16px;
  background:#fdfbf5;
  border:1px solid rgba(34,49,39,.08);
  box-shadow:0 8px 24px rgba(45,57,48,.035);
  transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease;
  overflow:hidden;
}

.settings-about-feature::after{
  content:"";
  position:absolute;
  width:90px;
  height:90px;
  right:-35px;
  top:-35px;
  border-radius:50%;
  background:#e7eee4;
  opacity:.45;
  transition:transform .3s ease;
}

.settings-about-feature:hover{
  transform:translateY(-4px);
  box-shadow:0 16px 35px rgba(45,57,48,.09);
  border-color:rgba(79,129,100,.18);
}

.settings-about-feature:hover::after{
  transform:scale(1.35);
}

.settings-about-feature-icon{
  position:relative;
  z-index:1;
  width:38px;
  height:38px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:13px;
  border-radius:11px;
  background:#e8eee5;
  font-size:18px;
}

.settings-about-feature strong{
  position:relative;
  z-index:1;
  display:block;
  color:#1d2921;
  font-size:12px;
  margin-bottom:6px;
}

.settings-about-feature span{
  position:relative;
  z-index:1;
  display:block;
  color:#778079;
  font-size:10px;
  line-height:1.65;
}

.settings-about-feature-icon{
  font-size:20px;
  margin-bottom:9px
}

.settings-about-feature strong{
  display:block;
  color:#1d2921;
  font-size:12px;
  margin-bottom:5px
}

.settings-about-feature span{
  display:block;
  color:#778079;
  font-size:10px;
  line-height:1.55
}

.settings-about-steps{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:10px
}

.settings-about-step{
  padding:15px;
  border-radius:13px;
  background:#eeece2
}

.settings-about-step-number{
  display:block;
  margin-bottom:10px;
  color:#62806b;
  font-size:9px;
  font-weight:800;
  letter-spacing:1.5px
}

.settings-about-step strong{
  display:block;
  color:#1d2921;
  font-size:11px;
  margin-bottom:5px
}

.settings-about-step span{
  display:block;
  color:#778079;
  font-size:9px;
  line-height:1.5
}

.settings-about-tech{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:10px
}

.settings-about-item{
  padding:15px;
  border-radius:13px;
  background:#eeece2
}

.settings-about-item span{
  display:block;
  color:#78827b;
  font-size:9px;
  text-transform:uppercase;
  letter-spacing:1px
}

.settings-about-item strong{
  display:block;
  margin-top:8px;
  font-size:12px;
  color:#1d2921
}

.settings-about-footer{
  padding:18px;
  border-radius:14px;
  background:#dce8da;
  color:#405a47;
  font-size:11px;
  line-height:1.6
}

@media(max-width:900px){
  .settings-about-steps{grid-template-columns:1fr 1fr}
  .settings-about-tech{grid-template-columns:1fr 1fr}
}

@media(max-width:650px){
  .settings-about-features,
  .settings-about-steps,
  .settings-about-tech{grid-template-columns:1fr}
}
        @media(max-width:900px){.settings-layout{grid-template-columns:1fr}.settings-menu{position:static;display:grid;grid-template-columns:repeat(4,1fr);gap:4px}.settings-menu-label,.settings-menu-number{display:none}.settings-menu-item{justify-content:center}.settings-account-grid,.settings-about{grid-template-columns:1fr 1fr}}
        @media(max-width:650px){.settings-page{width:calc(100% - 24px);padding-top:40px}.settings-hero{display:block}.settings-save-top{margin-top:20px}.settings-menu{grid-template-columns:repeat(2,1fr)}.settings-card{padding:20px;border-radius:16px}.settings-form-grid,.settings-account-grid,.settings-about{grid-template-columns:1fr}.settings-field.full{grid-column:auto}.settings-profile{grid-template-columns:58px 1fr}.settings-avatar{width:58px;height:58px}.settings-row{align-items:flex-start}.settings-title{font-size:50px}}
      `}</style>

      <section className="settings-page">
        <div className="settings-hero">
          <div>
            <div className="settings-eyebrow"><span className="settings-eyebrow-line" />SOCIALAI · WORKSPACE SETTINGS</div>
            <h1 className="settings-title">Your space.<br /><em>your rules.</em></h1>
            <p className="settings-subtitle">Manage your profile, notifications, privacy, security, connected accounts and SocialAI workspace preferences from one place.</p>
          </div>
          <button type="button" className="settings-save-top" onClick={save}>{saved ? "Saved ✓" : "Save changes"}</button>
        </div>

        <div className="settings-layout">
          <aside className="settings-menu">
            <div className="settings-menu-label">Settings</div>
            {menu.map(([name, icon], index) => (
              <button type="button" key={name} className={`settings-menu-item ${section === name ? "active" : ""}`} onClick={() => setSection(name)}>
                <span className="settings-menu-icon">{icon}</span><span>{name}</span><span className="settings-menu-number">0{index + 1}</span>
              </button>
            ))}
          </aside>

          <div>
            {section === "Profile" && <section className="settings-card">
              <div className="settings-card-header"><div><h2>Profile</h2><p>Update the information used across your SocialAI workspace.</p></div><span className="settings-badge">Account</span></div>
              <div className="settings-profile"><div className="settings-avatar">{(form.name || "S")[0].toUpperCase()}</div><div><div className="settings-profile-name">{form.name || "Your name"}</div><div className="settings-profile-email">{form.email || "No email added"}</div></div></div>
              <div className="settings-form-grid">
                <div className="settings-field"><label>Full name</label><input value={form.name} onChange={e => set("name", e.target.value)} /></div>
                <div className="settings-field"><label>Email</label><input type="email" value={form.email} onChange={e => set("email", e.target.value)} /></div>
                <div className="settings-field full"><label>Workspace name</label><input value={form.workspace} onChange={e => set("workspace", e.target.value)} /></div>
              </div>
            </section>}

            {section === "Notifications" && <section className="settings-card">
              <div className="settings-card-header"><div><h2>Notifications</h2><p>Choose what SocialAI should notify you about.</p></div><span className="settings-badge">Alerts</span></div>
              <Row title="Generation complete" text="Tell me when Gemini finishes generating content."><Toggle value={form.generationComplete} onChange={v => set("generationComplete", v)} /></Row>
              <Row title="Scheduled post reminder" text="Remind me when a scheduled post is approaching."><Toggle value={form.scheduledReminder} onChange={v => set("scheduledReminder", v)} /></Row>
              <Row title="Weekly analytics" text="Receive a summary of your SocialAI content activity."><Toggle value={form.weeklyAnalytics} onChange={v => set("weeklyAnalytics", v)} /></Row>
              <Row title="Product updates" text="Occasional updates about new SocialAI features."><Toggle value={form.productUpdates} onChange={v => set("productUpdates", v)} /></Row>
            </section>}

            {section === "Activities" && <section className="settings-card">
              <div className="settings-card-header"><div><h2>Workspace activity</h2><p>Your current SocialAI workflow status.</p></div><span className="settings-badge">Live</span></div>
              <Row title="AI content generation" text="Generated posts are available in your content library."><span className="settings-status"><span className="settings-dot" />Active</span></Row>
              <Row title="Content calendar" text="Scheduled content is stored in your browser planner."><span className="settings-status"><span className="settings-dot" />Active</span></Row>
              <Row title="Analytics" text="Connect social accounts to unlock real reach and engagement metrics."><span className="settings-status">Ready</span></Row>
            </section>}

            {section === "Privacy" && <>
              <section className="settings-card">
                <div className="settings-card-header"><div><h2>Privacy</h2><p>Control how your content and preferences are handled.</p></div><span className="settings-badge">Private</span></div>
                <Row title="Save generated content" text="Keep generated posts in your SocialAI content library."><Toggle value={form.saveContent} onChange={v => set("saveContent", v)} /></Row>
                <Row title="Personalized suggestions" text="Use your workspace preferences to improve future suggestions."><Toggle value={form.personalizedSuggestions} onChange={v => set("personalizedSuggestions", v)} /></Row>
              </section>
              <section className="settings-card">
                <div className="settings-card-header"><div><h2>Connected accounts</h2><p>Connect platforms later to unlock publishing and performance analytics.</p></div><span className="settings-badge">Optional</span></div>
                <div className="settings-account-grid">{["Instagram","Facebook","LinkedIn","Twitter"].map(name => <div className="settings-account" key={name}><div className="settings-account-icon">{name[0]}</div><div className="settings-account-copy"><strong>{name}</strong><span>Not connected</span></div><button type="button" className="settings-connect" onClick={() => window.alert(`${name} connection will be added in the next stage.`)}>Connect</button></div>)}</div>
              </section>
            </>}

            {section === "Security" && <>
              <section className="settings-card">
                <div className="settings-card-header"><div><h2>Security</h2><p>Keep your SocialAI workspace protected.</p></div><span className="settings-badge">Account</span></div>
                <Row title="Two-factor authentication" text="Add an extra verification step to protect your account."><Toggle value={form.twoFactor} onChange={v => set("twoFactor", v)} /></Row>
                <Row title="Session security" text="Current browser session is active."><span className="settings-status"><span className="settings-dot" />Secure</span></Row>
              </section>
              <section className="settings-card settings-danger"><div className="settings-card-header"><div><h2>Danger zone</h2><p>Reset local SocialAI preferences. This does not delete backend content.</p></div><button type="button" className="settings-reset" onClick={reset}>Reset settings</button></div></section>
            </>}

            {section === "Appearance" && <section className="settings-card">
              <div className="settings-card-header"><div><h2>Appearance</h2><p>Customize how your SocialAI workspace feels.</p></div><span className="settings-badge">UI</span></div>
              <Row title="Theme" text="Choose the visual theme for the workspace."><select className="settings-select" value={form.theme} onChange={e => set("theme", e.target.value)}><option>Light</option><option>Dark</option><option>System</option></select></Row>
              <Row title="Content density" text="Control spacing inside cards and workspace sections."><select className="settings-select" value={form.density} onChange={e => set("density", e.target.value)}><option>Comfortable</option><option>Compact</option></select></Row>
            </section>}

            {section === "About" && <section className="settings-card">

  <div className="settings-card-header">
    <div>
      <h2>About SocialAI</h2>
      <p>
        Your intelligent workspace for creating, planning and managing
        social media content.
      </p>
    </div>
    <span className="settings-badge">v1.0</span>
  </div>

  <div className="settings-about">

    <div className="settings-about-intro">
      <h3>What is SocialAI?</h3>
      <p>
        SocialAI is an AI-powered social media workspace designed to make
        content creation, planning and management simple and organized.
        It brings your social media workflow together in one place.
      </p>
    </div>

    <div className="settings-about-heading">
      What you can do with SocialAI
    </div>

    <div className="settings-about-features">

      <div className="settings-about-feature">
        <div className="settings-about-feature-icon">✨</div>
        <strong>AI Content Generator</strong>
        <span>
          Generate engaging social media content and creative ideas with AI.
        </span>
      </div>

      <div className="settings-about-feature">
        <div className="settings-about-feature-icon">📝</div>
        <strong>Content Management</strong>
        <span>
          Create, organize and manage your social media content from one place.
        </span>
      </div>

      <div className="settings-about-feature">
        <div className="settings-about-feature-icon">📅</div>
        <strong>Content Calendar</strong>
        <span>
          Plan and organize your upcoming posts using a visual content calendar.
        </span>
      </div>

      <div className="settings-about-feature">
        <div className="settings-about-feature-icon">📊</div>
        <strong>Analytics</strong>
        <span>
          Track your content activity and understand your social media workflow.
        </span>
      </div>

      <div className="settings-about-feature">
        <div className="settings-about-feature-icon">🔗</div>
        <strong>Connected Accounts</strong>
        <span>
          Connect social platforms for publishing and performance analytics.
        </span>
      </div>

      <div className="settings-about-feature">
        <div className="settings-about-feature-icon">⚙️</div>
        <strong>Personalized Workspace</strong>
        <span>
          Customize your profile, notifications, privacy, security and appearance.
        </span>
      </div>

    </div>

    <div className="settings-about-heading">
      How SocialAI works
    </div>

    <div className="settings-about-steps">

      <div className="settings-about-step">
        <span className="settings-about-step-number">01</span>
        <strong>Create</strong>
        <span>Generate ideas and content using AI.</span>
      </div>

      <div className="settings-about-step">
        <span className="settings-about-step-number">02</span>
        <strong>Plan</strong>
        <span>Organize posts inside your content calendar.</span>
      </div>

      <div className="settings-about-step">
        <span className="settings-about-step-number">03</span>
        <strong>Manage</strong>
        <span>Keep your content and workflow organized.</span>
      </div>

      <div className="settings-about-step">
        <span className="settings-about-step-number">04</span>
        <strong>Analyze</strong>
        <span>Review activity and improve your content strategy.</span>
      </div>

    </div>

    <div className="settings-about-heading">
      Technology behind SocialAI
    </div>

    <div className="settings-about-tech">

      <div className="settings-about-item">
        <span>Frontend</span>
        <strong>React + Vite</strong>
      </div>

      <div className="settings-about-item">
        <span>Backend</span>
        <strong>FastAPI</strong>
      </div>

      <div className="settings-about-item">
        <span>AI</span>
        <strong>Gemini</strong>
      </div>

    </div>

    <div className="settings-about-footer">
      <strong>
        SocialAI is built to make social media management simpler,
        smarter and more organized.
      </strong>
      <br />
      Your content workspace — create, plan, manage and grow.
    </div>

  </div>

</section>}
            <div className="settings-savebar"><span>{saved ? <strong>✓ Changes saved successfully.</strong> : <>Your settings are saved locally in this browser.</>}</span><button type="button" className="settings-save" onClick={save}>{saved ? "Saved ✓" : "Save changes"}</button></div>
          </div>
        </div>
      </section>
    </>
  );
}
