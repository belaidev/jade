import aspectRatio from "@tailwindcss/aspect-ratio";
import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{jsx,tsx}", "./shadcn/**/*.{jsx,tsx}"],
	plugins: [typography, forms, aspectRatio, containerQueries, require("tailwindcss-animate")],
	darkMode: ["class"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))"
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" }
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out"
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
