/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],

	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: '#CA168C',
					foreground: 'hsl(var(--primary-foreground))'
				},
				// Update accent color to complement primary
				accent: {
					DEFAULT: '#CA168C',
					foreground: 'white'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				// accent: {
				// 	DEFAULT: 'hsl(var(--accent))',
				// 	foreground: 'hsl(var(--accent-foreground))'
				// },
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}



//for the dark mode

// /** @type {import('tailwindcss').Config} */
// export default {
// 	darkMode: ["class"],
// 	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  
// 	theme: {
// 	  extend: {
// 		borderRadius: {
// 		  lg: 'var(--radius)',
// 		  md: 'calc(var(--radius) - 2px)',
// 		  sm: 'calc(var(--radius) - 4px)'
// 		},
// 		colors: {
// 		  // Set dark background and white text as default
// 		  background: '#000000',
// 		  foreground: '#FFFFFF',
		  
// 		  // Card styles for dark theme
// 		  card: {
// 			DEFAULT: '#111111',
// 			foreground: '#FFFFFF'
// 		  },
		  
// 		  // Popover styles for dark theme
// 		  popover: {
// 			DEFAULT: '#111111',
// 			foreground: '#FFFFFF'
// 		  },
		  
// 		  // Primary color and its foreground
// 		  primary: {
// 			DEFAULT: '#CA168C',
// 			foreground: '#FFFFFF'
// 		  },
		  
// 		  // Accent color matching primary
// 		  accent: {
// 			DEFAULT: '#CA168C',
// 			foreground: '#FFFFFF'
// 		  },
		  
// 		  // Secondary colors for dark theme
// 		  secondary: {
// 			DEFAULT: '#2A2A2A',
// 			foreground: '#FFFFFF'
// 		  },
		  
// 		  // Muted colors for dark theme
// 		  muted: {
// 			DEFAULT: '#1A1A1A',
// 			foreground: '#999999'
// 		  },
		  
// 		  // Destructive colors
// 		  destructive: {
// 			DEFAULT: '#FF4444',
// 			foreground: '#FFFFFF'
// 		  },
		  
// 		  // Other system colors
// 		  border: '#333333',
// 		  input: '#333333',
// 		  ring: '#CA168C',
		  
// 		  // Chart colors
// 		  chart: {
// 			'1': '#CA168C',
// 			'2': '#E91E63',
// 			'3': '#FF4081',
// 			'4': '#F50057',
// 			'5': '#C51162'
// 		  }
// 		}
// 	  }
// 	},
// 	plugins: [require("tailwindcss-animate")],
//   }