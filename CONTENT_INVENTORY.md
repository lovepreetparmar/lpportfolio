# Content inventory — Lovepreet Parmar

**Direction:** [CHARACTER_PORTFOLIO_ARCHITECTURE.md](./CHARACTER_PORTFOLIO_ARCHITECTURE.md) — illustrated character-led portfolio (Scowlby *interaction* inspiration, original art).  
**Legacy map:** [LEGACY_CONTENT_MAP.md](./LEGACY_CONTENT_MAP.md)  
**Repos:** Legacy [lovepreetparmar.github.io](https://github.com/lovepreetparmar/lovepreetparmar.github.io) · New `lpportfolio`

---

## 1. Personal information (verified legacy)

| Field | Value | Source |
|--------|--------|--------|
| Name | Lovepreet Parmar | All pages |
| Location | Chandigarh, India | index, contacts, footer |
| Origin (about copy) | Originally from New Delhi | index `#sec2` |
| Email | lplovepreetparmar@gmail.com | index footer, contacts, `php/contact.php` |
| Hero title (legacy) | Web Designer & Developer | index hero |
| About (legacy) | Illustrator and developer; familiar with programming & design tools | index `#sec2` |
| Hobbies (legacy) | Music, Travel, Android ROM Testing, Coding | index feature boxes |
| Coordinates (decorative) | 30.7333, 76.7794 | index hero |

**Not in legacy (do not invent):** phone number on public pages, years-of-experience headline, post-2019 full-time employers, awards, certifications.

---

## 2. Social links

| Platform | URL | Notes |
|----------|-----|--------|
| LinkedIn | https://www.linkedin.com/in/lovepreetparmar/ | Consistent |
| Facebook | https://www.facebook.com/lplovepreet | |
| Instagram | https://www.instagram.com/lovepreetparmarr | index uses `lovepreetparmarr`; portfolio/contacts sometimes `lovepreet.php` — **confirm handle** |
| Twitter/X | https://twitter.com/ParmarLovepreet | |
| GitHub | https://github.com/lovepreetparmar | Profile; not in legacy footer |

**New site default (minimal):** GitHub, LinkedIn, Email — confirm with Lovepreet.

---

## 3. Education & experience (legacy resume section)

| Period | Title | Organization | Details |
|--------|--------|--------------|---------|
| Jun 2015 – Jun 2019 | B.Tech Information Technology | Chandigarh Engineering College | All 8 semesters listed complete |
| Oct – Dec 2016 | Graphic designer (~2 months) | Social Bang Bang | Posters, logos |
| Aug – Dec 2015 | Soft skills course | Infosys Campus Connect | Communication, teamwork, leadership |
| Jul 2018 | ML & AI program (8 days / 70 hrs) | Experts Hub | Python, NumPy, TensorFlow, Keras |
| Jan – Jun 2019 | Core PHP internship | Impinge Solutions | PHP, MySQL, HTML, CSS, Bootstrap, JS, jQuery, Ajax, WordPress, CodeIgniter |

**Gap:** No documented roles after June 2019 in legacy HTML. Modern projects (FitGuide, etc.) imply ongoing development work — add timeline only when you provide dates/titles.

---

## 4. Skills (legacy `index.html` skill bars / charts)

**Design (legacy %):** Adobe Photoshop 60%, Inkscape 50%, After Effects 30%  
**Development (legacy %):** C 50%, HTML 90%, CSS 85%, Core PHP 80%, CodeIgniter 65%, Bootstrap 65%, JavaScript 60%, jQuery 60%, Ajax 45%, MySQL 75%, Python 35%, Brackets/Sublime/VS Code/Ubuntu/MS Office  
**Languages:** English 85%, Hindi 90%, Punjabi 50%

**For new Stack section:** Prefer technologies tied to **verified projects** + legacy list above. Do not claim Laravel/AWS/Docker unless you confirm usage.

---

## 5. Legacy portfolio projects (`portfolio.html` + index carousel)

| Item | Type | Link / note |
|------|------|-------------|
| PHP Project | E-commerce website | No live URL in HTML |
| Portfolio / Resume Website | Web | https://lovepreetparmar.github.io/2/ |
| Portfolio Website | Web | https://lovepreetparmar.github.io/1/ |
| Company Logo | OK Mobel | https://okmobel.com/ |
| Club Logo | I-Tech Club | No URL |
| Featured carousel images | `images/folio/web/slider/*` | Paths in HTML; binaries not in shallow clone |

---

## 6. Primary work (modern — verify before publish)

| Project | Status | Source |
|---------|--------|--------|
| FitGuide | Verified README | `~/Projects/fitguide` |
| LPSynch | Verified | `~/Projects/lpsynch` |
| AI Studio / CRM | Code verified; naming ambiguous | `~/Projects/aistudio` |
| HR Browser | **Missing** repo/copy | User to supply |
| Rego Kernel | **Missing** repo/copy | User to supply |

See `src/data/projects.ts` for current draft copy — update with GitHub/live URLs when available.

---

## 7. Assets

| Asset | Legacy path | New use |
|--------|-------------|---------|
| About photo | `images/all/bg1_new.jpg` | **Reference for illustrated character** (not raw photo on site) |
| Profile video | `video/1.mp4` | Optional reference only |
| Backgrounds | `images/bg/*` | Not required |
| Favicon | `images/favicon.ico` | Replace |
| Logos | `images/logo.png`, `logo2.png` | Replaced |
| Character illustrations | — | **MISSING** — `public/character/` pipeline (see `public/character/README.md`) |
| Project screenshots | — | **MISSING** per project for Work visuals |

---

## 8. Contact & forms

- Legacy: `contacts.html` + `php/contact.php` → email `lplovepreetparmar@gmail.com`
- **Static Hostinger:** `mailto:` + visible email; no PHP form unless backend added later

---

## 9. SEO (legacy)

- Empty `meta description` / `keywords` on legacy pages
- **New defaults:** Title `Lovepreet Parmar — Software Developer`; description from real role + web/mobile/AI (no fake metrics)

---

## 10. Missing information (blockers)

1. **Reference photograph** for illustrated character  
2. **Illustrated character frames** (or commission style guide)  
3. Post-2019 **employment** list (optional for Experience)  
4. Confirm **Instagram** URL  
5. **GitHub / live URLs** per featured project  
6. HR Browser & Rego Kernel **descriptions and assets**  
7. Production **domain** for canonical/OG  
8. Whether to show **legacy** student projects on `/work`

---

## 11. Content architecture (new site)

```text
data/
  projects.ts      → /work, #work
  experience.ts    → #experience
  skills.ts        → #stack
  social.ts        → footer, contact
  experiments.ts   → /experiments

sections/          → Home story sections
pages/             → Project detail, Experiments, optional About/Contact pages
```

Hero copy (draft, to refine):

```text
LOVEPREET PARMAR
I BUILD / DIGITAL / THINGS.
Software developer — web, mobile, AI-powered products.
```

Use legacy facts; avoid generic AI portfolio tone.
