function ProfilePhoto({ src, name, className }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return (
    <span className={`settings-profile-photo ${className || ""}`}>
      {src ? <img src={src} alt={name} /> : <span aria-label={`${name}'s initials`}>{initials}</span>}
    </span>
  );
}

function LockIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 10h14v12H5zM8 10V6a4 4 0 0 1 8 0v4" /></svg>;
}

export default function ProfileSavedView({ profile, authUser, campaignCount, onEdit, onAddBio }) {
  const fullName = profile?.full_name?.trim() || authUser?.user_metadata?.full_name?.trim() || "Fundu member";
  const displayName = profile?.display_name?.trim();
  const organizerName = displayName || profile?.full_name?.trim() || "Campaign Organizer";
  const email = authUser?.email || profile?.email || "Not set";
  const country = profile?.country?.trim();
  const bio = profile?.bio?.trim();
  const joined = authUser?.created_at ? new Date(authUser.created_at) : null;
  const memberSince = joined && !Number.isNaN(joined.getTime())
    ? new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" }).format(joined)
    : null;
  const campaignLabel = `${campaignCount} ${campaignCount === 1 ? "campaign" : "campaigns"}`;

  return (
    <section className="settings-panel settings-profile-saved" aria-labelledby="settings-profile-heading">
      <div className="settings-panel-header">
        <div><h2 id="settings-profile-heading">Profile</h2><p>This is how you appear on Fundu and on the campaigns you create.</p></div>
        <button className="settings-outline-btn settings-profile-edit" type="button" onClick={onEdit} aria-label="Edit profile">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 4 5 5M3 21l5-1L21 7a3.5 3.5 0 0 0-5-5L3 15zM12 21h9" /></svg>
          <span className="settings-profile-edit-desktop">Edit profile</span><span className="settings-profile-edit-mobile">Edit</span>
        </button>
      </div>
      <div className="settings-profile-identity">
        <ProfilePhoto src={profile?.avatar_url} name={fullName} />
        <div><h3>{fullName}</h3><p>{memberSince && <span className="settings-profile-member-since">Member since {memberSince}. </span>}{campaignLabel}.</p></div>
      </div>
      <dl className="settings-profile-details">
        <div><dt>Full name</dt><dd>{fullName}</dd></div>
        <div><dt>Display name</dt><dd className={!displayName ? "settings-profile-unset" : undefined}>{displayName || "Not set"}</dd>{!displayName && <span className="settings-profile-detail-note">Fundu will use your first name</span>}</div>
        <div><dt>Email</dt><dd>{email}</dd><span className="settings-profile-detail-note"><LockIcon />Used to sign in</span></div>
        <div><dt>Country</dt><dd className={!country ? "settings-profile-unset" : undefined}>{country || "Not set"}</dd></div>
        <div><dt>Bio</dt><dd className={!bio ? "settings-profile-unset" : "settings-profile-bio"}>{bio || "Not added yet"}</dd>{!bio && <button type="button" className="settings-text-btn settings-profile-add-bio" onClick={onAddBio}>Add a bio</button>}</div>
      </dl>
      <div className="settings-profile-organizer">
        <h3>How you appear on your campaigns</h3>
        <div className="settings-profile-organizer-card"><ProfilePhoto src={profile?.avatar_url} name={organizerName} /><div><strong>{organizerName} is organizing this fundraiser</strong>{country && <p>{country}</p>}</div></div>
      </div>
    </section>
  );
}
