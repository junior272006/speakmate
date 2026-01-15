import { createTheme, rem } from "@mantine/core";
import "@mantine/core";

export const theme = createTheme({
  fontFamily: "Work Sans, sans-serif",

  headings: {
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: rem(36), lineHeight: "1.25" },
      h2: { fontSize: rem(32), lineHeight: "1.3" },
      h3: { fontSize: rem(28), lineHeight: "1.35" },
      h4: { fontSize: rem(24), lineHeight: "1.4" },
      h5: { fontSize: rem(20), lineHeight: "1.45" },
      h6: { fontSize: rem(16), lineHeight: "1.5" },
    },
  },

  fontSizes: {
    xs: rem(12),
    sm: rem(13),
    md: rem(15),
    lg: rem(16),
    xl: rem(18),
  },

  colors: {
    // 🟧 Orange – branding & CTA principal
    brandOrange: [
      "#FFF3E6",
      "#FFE0BF",
      "#FFC999",
      "#FFB273",
      "#FF993F",
      "#FF7F00", // couleur principale
      "#E66A00",
      "#B35400",
      "#804000",
      "#4D2800",
    ],

    // ⚪ Blanc – textes / fonds neutres
    neutral: [
      "#FFFFFF", // couleur principale pour fond clair
      "#F9FAFB",
      "#F1F3F5",
      "#E9ECEF",
      "#DEE2E6",
      "#CED4DA",
      "#ADB5BD",
      "#868E96",
      "#495057",
      "#212529",
    ],

    // 🔵 Bleu – accents / hover
    brandBlue: [
      "#E6F0FA",
      "#C3DAF5",
      "#99C1EF",
      "#70A8E9",
      "#4D90E3",
      "#2C78DE",
      "#1F5BAF",
      "#154281",
      "#0C2A54",
      "#051427",
    ],

    // 🔴 Rouge – erreurs / danger
    brandRed: [
      "#FFEDED",
      "#FFD6D6",
      "#FFB3B3",
      "#FF8F8F",
      "#FF6B6B",
      "#F03E3E",
      "#C92A2A",
      "#A51111",
      "#7A0000",
      "#4D0000",
    ],
  },

  /** 🟧 Orange comme couleur principale */
  primaryColor: "brandOrange",

  components: {
    Paper: {
      defaultProps: {
        withBorder: true,
        shadow: "sm",
        radius: "md",
      },
    },

    Button: {
      defaultProps: {
        variant: "filled",
        radius: "lg",
        color: "brandOrange",
      },
      styles: {
        root: {
          fontWeight: 600,
        },
      },
    },

    ActionIcon: {
      defaultProps: {
        variant: "light",
        color: "brandBlue",
        radius: "xl",
      },
    },

    ThemeIcon: {
      defaultProps: {
        variant: "light",
        color: "brandOrange",
        radius: "xl",
      },
    },

    Badge: {
      defaultProps: {
        radius: "sm",
        variant: "light",
      },
    },
  },

  defaultGradient: {
    from: "brandOrange.5",
    to: "brandBlue.5",
    deg: 135,
  },

  defaultRadius: "md",
});
