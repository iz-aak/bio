const CONFIG = {
  // --- title ---
  name: "Izaak",
  pageTitle: "Izaak",

  // --- pfp and favicon ---
  profilePicUrl: "https://i.postimg.cc/1ttJqD1L/blue.jpg",

  // --- uid for lanyard presence ---
  discordUserId: "1329547310887207025",

  // --- Last.fm ---
  lastfmUsername: "izaak77",
  lastfmApiKey: "bad27576d6c62d96fc266e38ff5e0546", // done

  // --- github ---
  githubUsername: "iz-aak",

  // --- reddit ---
  redditUsername: "ssprix",

  // --- Socials ---
  socials: [
    { platform: "GitHub",    icon: "github",    handle: "iz-aak",      url: "https://github.com/iz-aak",         showCommit: true },
    { platform: "Twitter/X", icon: "twitter",   handle: "@uhizaak",    url: "https://twitter.com/uhizaak",       showCommit: false },
    { platform: "Instagram", icon: "instagram", handle: "@uh.izaak",   url: "https://instagram.com/uh.izaak",    showCommit: false },
    { platform: "Discord",   icon: "discord",   handle: "@uh.izaak",   url: "https://discord.com/users/1329547310887207025",                                showCommit: false, showPresence: true },
    { platform: "Reddit",    icon: "reddit",    handle: "ssprix",      url: "https://reddit.com/user/ssprix",    showCommit: false, showKarma: true },
    { platform: "Email",     icon: "mail",      handle: "izaak@cc.cc", url: "mailto:izaak@cc.cc",               showCommit: false },
    { platform: "Copyright / DMCA", icon: "shield", handle: "admin@fluxtv.qzz.io", url: "mailto:admin@fluxtv.qzz.io", showCommit: false },
  ],

  // --- Projects ---
  projects: [
    {
      name: "FluxTV",
      description: "3,000,000+ free movies and shows",
      status: "live",
      links: [
        { label: "Site",   url: "https://fluxtv.qzz.io" },
        { label: "Status", url: "https://rentry.co/fluxtv" },
      ],
    },
    {
      name: "FluxusTV",
      description: "Legacy FluxTV",
      status: "live",
      links: [
        { label: "Site",   url: "https://fluxustv.vercel.app" },
        { label: "Status", url: "https://rentry.co/fluxtv" },
      ],
    },
    {
      name: "VyrxAI",
      description: "Web developer for VyrxAI",
      status: "live",
      links: [
        { label: "Site",    url: "https://vyrxai.k.vu" },
        { label: "License", url: "https://vyrxai.k.vu/license" },
      ],
    },
    {
      name: "This Site",
      description: "uhhhhh bio site ig",
      status: "live",
      links: [],
      isCurrent: true,
    },
    {
      name: "Temp Email",
      description: "Disposable email address",
      status: "live",
      links: [
        { label: "Site", url: "https://tempmails.qzz.io" },
      ],
    },
    {
      name: "Magnet Downloader",
      description: "Download from .torrent file or magnet link",
      status: "dev",
      links: [],
    },
    {
      name: "Torrent Index",
      description: "Scrapes The Pirate Bay and 1337x for magnet links/torrents",
      status: "dev",
      links: [],
    },
    {
      name: "ProxyK",
      description: "Free web proxy running from the Reflect4 API",
      status: "dev",
      links: [],
    },
  ],

  // --- Cat Pics ---
  cats: [
    { url: "https://placehold.co/400x400", name: "Cat 1" },
    { url: "https://placehold.co/400x500", name: "Cat 2" },
    { url: "https://placehold.co/500x400", name: "Cat 3" },
    { url: "https://placehold.co/400x400", name: "Cat 4" },
    { url: "https://placehold.co/450x450", name: "Cat 5" },
    { url: "https://placehold.co/400x600", name: "Cat 6" },
  ],
};
