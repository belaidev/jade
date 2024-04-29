import aspectRatio from "@tailwindcss/aspect-ratio";
import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	plugins: [typography, forms, aspectRatio, containerQueries],
	theme: {
		extend: {
			colors: {
				/* || Primary */

				"primary-1": "#047857" /* Emerald 700 */,
				"on-primary-1": "#d1fae5" /* Emerald 100 */,
				"primary-2": "#d1fae5" /* Emerald 100 */,
				"on-primary-2": "#047857" /* Emerald 700 */
			},

			// Font classes reproduced without line height
			fontSize: {
				"9xl": "8rem",
				"8xl": "6rem",
				"7xl": "4.5rem",
				"6xl": "3.75rem",
				"5xl": "3rem",
				"4xl": "2.25rem",
				"3xl": "1.875rem",
				"2xl": "1.5rem",
				xl: "1.25rem",
				lg: "1.125rem",
				base: "1rem",
				sm: "0.875rem",
				xs: "0.75rem"
			}
		},

		fontFamily: {
			display: "'Noto Sans Display', 'Noto Color Emoji', 'Noto Emoji', sans-serif",
			head: "'Noto Serif', 'Noto Color Emoji', 'Noto Emoji', serif",
			body: "'Noto Sans', 'Noto Color Emoji', 'Noto Emoji', sans-serif",
			code: "'Noto Sans Mono', 'Noto Color Emoji', 'Noto Emoji', mono"
		}
	}
} satisfies Config;
