# ScentVault — IMS566 Individual Assignment

ScentVault is a front-end perfume collection management website. The project has a responsive black-marble, warm-ivory and gold visual style.

## Website pages

- `index.html` — sign-in screen (website entry point)
- `dashboard.html` — overview, collection statistics and scent finder
- `collection.html` — owned perfumes, wishlist and full catalogue
- `brands.html` — brand directory
- `analytics.html` — fragrance and financial insights
- `about.html` — introduction, perfume spray video and fragrance-care FAQ
- `contact.html` — client-side contact form

## Features and assets

- 24 perfume brands and 72 catalogue entries with user-supplied local product photos.
- Personal collection and wishlist with client-side add, edit and delete interactions.
- Search, filters, modal product details, brand comparison and charts.
- Responsive sidebar, navigation dropdowns and sign-out link.
- Bootstrap 5 CSS is bundled locally. The optional Chart.js CDN has a local chart fallback.
- The local `assets/images/scentvault-branded-bottle.jpg` visual appears on the login, Dashboard and About pages.
- Black-marble styling is implemented with `assets/images/black-marble.webp`.
- The About page includes a user-provided 10.6-second HD fragrance spray video at `assets/videos/perfume-spray-slow-motion.mp4` and a local poster image. Playback is manual (no autoplay) with native controls; the initial playback state is muted.
- `assets/images/perfumes/IMAGE_MAPPING.csv` helps match photo IDs to fragrances when replacing images.

## Open locally

Open the folder containing `index.html` in Visual Studio Code and use **Open with Live Server** on `index.html`. Alternatively, open `index.html` directly. Demo login values are prefilled in the page:

- Email: `demo@scentvault.com`
- Password: `demo123`

**Important:** Sign-in is a client-side demonstration, not real account authentication. The site has no backend or database, changes are held in memory and reset when a page reloads, and the contact form does not send email by itself. Do not use this demo login to protect private data.

## Publish with GitHub Desktop and GitHub Pages

1. Extract this archive into the folder you will publish, for example `ScentVault_IMS566_INDIVIDUAL_ASSIGNMENT`.
2. Check that **`index.html` is directly inside that folder**, alongside `css/`, `js/` and `assets/`.
3. In GitHub Desktop, add that folder as a local repository (or create the repository there), commit the files and publish it as a **public** repository named `ScentVault_IMS566_INDIVIDUAL_ASSIGNMENT`.
4. On GitHub, go to the repository **Settings → Pages → Build and deployment**. Set **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)** and save.
5. After deployment, open the URL shown in GitHub Pages settings and test all links and photos. The usual format is `https://YOUR-USERNAME.github.io/ScentVault_IMS566_INDIVIDUAL_ASSIGNMENT/`.

The ZIP must be extracted before uploading; do not add the ZIP itself as the website. Upload the contents as individual files.

## Attribution and limitations

See `THIRD_PARTY_NOTICES.md` for library licenses. Product images were supplied for the assignment; check you have permission to publish or redistribute third-party product photographs in a public repository. Fixed catalogue reference prices and some listed perfume specifications are curated project data, not live retail offers.

## About page video update

The perfume-spray film was provided by the site owner. Confirm the video is licensed for public publishing before distributing the repository. To update the published GitHub Pages site, replace `about.html`, `css/style.css`, `README.md`, and copy the `assets/videos/` directory into the root of the existing repository. Commit and push via GitHub Desktop; do not create a second repository.

## External fragrance resources (About page)

The About page includes three links to external fragrance references: Fragrantica, Parfumo and the International Fragrance Association (IFRA). Links open a new tab with `rel="noopener noreferrer"`; they are independent third-party sites and are not affiliated with ScentVault.

## About page media placement (2026-11-20)

The native MP4 slow-motion perfume video is positioned immediately below the About page introduction, before the branded SCENTVAULT bottle story. The FAQ and external resource links follow below.
