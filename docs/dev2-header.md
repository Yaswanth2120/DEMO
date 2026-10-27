# Page navigation — dev_2

This branch starts from the saved dev checkpoint 82e5c1d. Main and dev are unchanged by this navigation work.

The header and footer use five direct page links: Home (/), About (/about), Expertise (/expertise), Team (/team), and Contact (/contact). There is no Expertise dropdown. The active page is marked in the header.

About describes the company, its five disciplines, and working principles. Expertise brings together services, method, the bento industry grid, and Research Journal. Team shows the existing demonstration board profiles. Contact provides the enquiry form and contact information. The homepage and dedicated discipline pages are preserved. Selecting an active discipline again returns to the full homepage.

Old board-member URLs redirect to /team. Service, industry, and collaboration shortcuts target the relevant Expertise section. Page routes are protected by login, work on refresh, and are included in server-rendered metadata and the sitemap.

Run:

```sh
git switch dev_2
npm run dev
```

Open http://localhost:5173/.
