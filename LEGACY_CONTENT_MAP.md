# Legacy content map

**Source repo:** [lovepreetparmar.github.io](https://github.com/lovepreetparmar/lovepreetparmar.github.io)  
**New app:** `lpportfolio` (React/Vite static build → Hostinger `public_html/`)

| Legacy file / section | Legacy content | New location | Notes |
|----------------------|----------------|--------------|-------|
| `index.html` — hero | "Hey there! I'm Lovepreet Parmar" / Web Designer & Developer | `/` Hero | Refresh copy; illustrated character |
| `index.html` — hero video | `video/1.mp4`, `images/bg/1.jpg` | Optional mood ref only | Not reused as hero |
| `index.html` — coords | 30.7333, 76.7794 Chandigarh | About or footer | Verified location |
| `index.html` — sec2 About | Illustrator & developer; Chandigarh; hobbies Music, Travel, Android ROM Testing, Coding | `/` About + `#about` | Student-era tone — rewrite professionally |
| `index.html` — sec3 Resume | Education, internships, work | `/` Experience (compact) | See inventory for dates |
| `index.html` — sec4 Skills | Pie charts + skill bars (Photoshop, PHP, etc.) | `/` Stack (typographic) | Use verified tech only |
| `index.html` — sec5 Projects carousel | Resume sites, PHP e-commerce, logos | Archive / optional | Superseded by FitGuide etc. |
| `index.html` — footer | Email, Chandigarh, social, newsletter | Footer + Contact | |
| `portfolio.html` | Gallery: PHP e-commerce, resume sites, OK Mobel, I-Tech Club | `/work` (legacy items optional) | Primary work = new projects |
| `contacts.html` | Email, location, map, PHP contact form | `/contact` or `#contact` | Static site: `mailto:` only |
| `php/contact.php` | Posts to `lplovepreetparmar@gmail.com` | N/A on static host | Replace with mailto |
| `images/all/bg1_new.jpg` | Profile / about photo | Character reference photo | **You supply photo** → illustrated character |
| `images/folio/*` | Project thumbnails | `public/projects/legacy/` if migrated | |
| `images/logo.png`, `logo2.png` | Brand marks | Replaced by wordmark + character | |
| `audio/` | (if present in full repo) | Not mapped | Clone had no binaries |
| `fonts/` | Theme fonts via CSS | Google fonts in new app | |

## Routes (new SPA)

| Legacy | New route |
|--------|-----------|
| `index.html` | `/` (story: Hero, Work, About, Stack, Experiments, Contact) |
| `portfolio.html` | `/work` + `/work/:slug` |
| `contacts.html` | `/contact` or `/#contact` |
| — | `/about` (optional dedicated page; can be home section) |
| — | `/experiments`, `/experiments/:slug` |

## Projects: legacy → new

| Legacy item | New treatment |
|-------------|----------------|
| Resume Website (`github.io/1`, `/2`) | Optional link in archive; not featured |
| PHP E-commerce Website | Legacy school project; omit or archive |
| OK Mobel logo | Design work sample; omit unless you want it |
| I-Tech Club logo | Omit unless requested |
| FitGuide, LPSynch, AI Studio, HR Browser, Rego Kernel | **Primary** `/work` entries (verified separately) |
