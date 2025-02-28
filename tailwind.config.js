/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sub: {
          1: "#6BBC64",
          2: "#00573D",
        },
        white: "#F4F4F4",
        red: {
          50: "#FDE6E7",
          100: "#F7B0B6",
          200: "#F4A8A2",
          300: "#EE5460",
          400: "#EB3341",
          500: "#E60012",
          600: "#D10010",
          700: "#A3000D",
          800: "#7F000A",
          900: "#610008",
        },
        green: {
          50: "#E6F5EE",
          100: "#B0DFCB",
          200: "#8AD0B2",
          300: "#54BA8E",
          400: "#33AD79",
          500: "#009857",
          600: "#008A4F",
          700: "#006C3E",
          800: "#005430",
          900: "#004025",
        },
        gray: {
          0: "#F4F4F4",
          50: "#EEEFEF",
          100: "#CBCCCD",
          200: "#B2B3B4",
          300: "#8E9092",
          400: "#797B7D",
          500: "#575A5D",
          600: "#4F5255",
          700: "#3E4042",
          800: "#303233",
          900: "#252627",
          1000: "#000000",
        },
      },
	  fontSize: {
        lg: ["25px", "150%"], // Large
        "md-b": ["21px", "150%"], // Medium-B (Bold)
        md: ["21px", "150%"], // Medium (Semi Bold)
        sm: ["19px", "150%"], // Small

        "body-lg": ["19px", "150%"], // Body Large
        "body-md-sb": ["17px", "150%"], // Body Medium-SB (Semi Bold)
        "body-md-m": ["17px", "150%"], // Body Medium-M (Medium)
        "body-md": ["17px", "150%"], // Body Medium (Regular)
        "body-sm": ["15px", "150%"], // Body Small

        label: ["13px", "150%"], // Label XSmall
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
