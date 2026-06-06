# Design System

## Theme

Dark, high-contrast product interface for people checking and entering predictions during evening matches. Surfaces are blue-tinted charcoal with a restrained lime accent reserved for selection, focus, and success.

## Color

- Canvas: `oklch(0.15 0.018 255)`
- Raised surface: `oklch(0.19 0.02 255)`
- Quiet surface: `oklch(0.125 0.015 255)`
- Border: `oklch(0.29 0.02 255)`
- Primary text: `oklch(0.94 0.01 255)`
- Secondary text: `oklch(0.69 0.025 255)`
- Accent: `oklch(0.84 0.19 125)`
- Error: `oklch(0.67 0.2 25)`
- Info: `oklch(0.7 0.14 245)`

## Typography

Use the system sans-serif stack throughout. Headings use strong weight and compact tracking; controls and labels remain familiar and readable. Numeric scores use tabular figures.

## Components

Controls use 10px radii, visible focus rings, and 44px minimum touch height where space permits. Match rows use one bordered surface, with metadata in a quieter header band. Score state always includes a text label or accessible name.

## Layout

Use a sticky top bar and horizontally scrollable navigation on small screens. Match content becomes a vertical stack below tablet width. Standings use dense responsive tables. Avoid nested decorative cards.

## Motion

Use 150-200ms ease-out transitions for hover, focus, and save-state changes only. Disable nonessential transitions under reduced motion.
