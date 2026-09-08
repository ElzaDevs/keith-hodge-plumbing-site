CONTEXT
Design a complete, high-end UX/UI concept in Figma for Keith Hodge Plumbing
LLC, a plumbing company in Ooltewah, TN with an exceptional reputation
(195 reviews, 4.9★ average) but a current website that undersells that
trust. The goal: a site that would beat any competitor's website in the
US plumbing/home-services market on first impression, credibility, and
usability — not a generic AI-generated template.

CRITICAL — WHAT TO AVOID (the "generic AI design" tells)
Do not produce any of the following, even as defaults:
- Identical rounded cards with the same soft drop-shadow under every
  element, regardless of what the content is
- Gradient color washes used purely as decoration
- ALL-CAPS tracked-out "eyebrow" labels above every heading
- Arrows (→) tacked onto every button or link label
- Middle-dot separated meta text ("Licensed · Insured · 24/7")
- Fade-and-slide-up animation applied uniformly to every section on scroll
- The two most common AI color defaults: warm cream (#F4F1EA) + terracotta
  accent, OR near-black background + single neon accent
- Centered hero text as the automatic default with no real reason for it
- Single word/phrase in a headline highlighted in a different color or
  italic just for visual interest
- Numbered markers (01 / 02 / 03) unless the content is a genuine sequence
These patterns are the fastest way a US customer subconsciously clags a
site as "made with AI, not by a real business."

DESIGN PROCESS TO FOLLOW
Step 1 — Design plan (produce this first, as a short brief before any
screens): define a 4-6 color token palette with named hex values, two
typefaces with clear distinct roles, a layout concept described in
one-sentence logic plus a rough wireframe sketch, and 3-4 guiding
principles unique to this business (not generic "clean and modern").

Step 2 — Self-critique the plan: for each choice, ask "would I produce
this same choice for any other local business?" If yes, revise it until
the palette, type, and layout feel specifically earned by Keith Hodge's
story — the plumbing trade, the 195-review trust base, named technicians
customers ask for by name (Mike, Matthew, Chris).

Step 3 — Only then design the actual screens (desktop + mobile) at high
fidelity in Figma, using real content and real photography direction
(not lorem ipsum, not stock-photo placeholders described generically).

BRAND DIRECTION
Position this not as a "friendly local plumber" cliché but as the
established, trusted expert — closer in feel to a premium home-services
brand (think how a high-end HVAC or electrical brand markets itself)
than a template plumber site. Confidence and precision over cuteness.

VISUAL SYSTEM (starting point — refine through the process above)
- Color: a deep steel-blue/navy family grounded in the trade (pipe,
  tools, uniforms) paired with one warm copper/rust accent used sparingly
  — never both used at equal weight
- Typography: a serif or slab-serif for headlines that signals
  craftsmanship and permanence, paired with a clean humanist sans for
  body copy — set a real type scale (H1/H2/H3/body) with intentional
  weight and spacing, not default browser sizes
- Layout: left-aligned content spine rather than everything centered;
  use whitespace and alignment to create hierarchy instead of boxing
  everything in cards
- Imagery: real-feeling photography direction — technicians at work,
  actual trucks, close-ups of quality craftsmanship — never generic
  "smiling contractor" stock photo energy

UX/UI REQUIREMENTS — INTERACTIVITY AND MICRO-DETAILS
- Navigation: sticky header that subtly changes background/shadow on
  scroll (not just appears/disappears), with a clearly prioritized
  phone-number CTA that's always one tap away
- Hero: one deliberate entrance moment (headline + image settle in
  together on load, ~400ms, no bounce) — not scroll-triggered fades
  copy-pasted onto every section below
- Service list: interactive expand/reveal on click for more detail
  per service (not a static icon grid) — shows intentional information
  architecture, not filler content
- Team/trust section: hover or tap reveals a real review tied to each
  named technician — this is the single most differentiating interactive
  moment on the page and should get the most design attention
- Forms: real-time inline validation, clear success/error states,
  urgency-based dynamic field (e.g., selecting "Emergency" changes the
  submit button text and highlights the phone number instead)
- Mobile: sticky bottom call bar that appears only on mobile, disappears
  on desktop/tablet where the header CTA is already visible
- Micro-interactions limited to: nav link hover, primary CTA hover/press
  states (subtle scale or color shift, not bouncy), form field focus
  states, and the one hero entrance moment — deliberately NOT scattering
  animation everywhere, which is itself a generic AI tell
- Empty/error states (e.g., form validation error, 404 page) written
  in the brand's plain-spoken, confident voice — not generic system copy

DELIVERABLES IN FIGMA
1. Design tokens page: color styles, text styles, spacing scale, effect
   styles (named clearly, not "Color 1, Color 2")
2. Desktop high-fidelity screens: homepage (all sections), services
   detail, contact/quote page
3. Mobile high-fidelity screens: same pages, fully responsive, showing
   how nav, hero, and forms adapt
4. Component set: buttons (primary/secondary/states), form fields
   (default/focus/error/success), nav (default/scrolled), service
   list item (collapsed/expanded) — built as real Figma components
   with variants, not one-off