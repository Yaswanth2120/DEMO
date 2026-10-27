# Header redesign — dev_2

`dev_2` starts from the saved `dev` checkpoint `82e5c1d`. The previous discipline-page work remains on `dev`; this branch isolates the next header iteration. Production is unchanged.

Main navigation is Home, About, Expertise, Team, Contact. Expertise groups Services, Industries, Our Method, and Research & Collaboration. Team uses the existing board page. About currently targets the five-discipline introduction at `/#about`.

The shared header component is used on the homepage, discipline pages, and board page. Homepage links stay in-page; other pages link back to the matching homepage anchor. Mobile uses the same five destinations and an expandable Expertise group. Native disclosure keyboard behavior, Escape, outside-click dismissal, theme selection, search/sign-out, and the existing project CTA are retained.

```sh
git switch dev_2
npm run dev
```

Open http://localhost:5173/. To view the previous checkpoint, stop the server and switch back to `dev`.
