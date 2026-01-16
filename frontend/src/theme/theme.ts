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
    // 🔵 Bleu – couleur principale SpeakMate
    brandBlue: [
      "#E6F0FA",
      "#C3DAF5",
      "#99C1EF",
      "#70A8E9",
      "#4D90E3",
      "#2C78DE", // principal
      "#1F5BAF",
      "#154281",
      "#0C2A54",
      "#051427",
    ],

    // 🔴 Rouge – secondaire (erreurs, danger, actions critiques)
    brandRed: [
      "#FFEDED",
      "#FFD6D6",
      "#FFB3B3",
      "#FF8F8F",
      "#FF6B6B",
      "#F03E3E", // secondaire
      "#C92A2A",
      "#A51111",
      "#7A0000",
      "#4D0000",
    ],

    // ⚪ Neutres
    neutral: [
      "#FFFFFF",
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
  },

  /** 🔵 Bleu comme couleur principale */
  primaryColor: "brandBlue",

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
        color: "brandBlue",
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
        color: "brandBlue",
        radius: "xl",
      },
    },

    Badge: {
      defaultProps: {
        radius: "sm",
        variant: "light",
        color: "brandBlue",
      },
    },

    Alert: {
      defaultProps: {
        color: "brandRed",
      },
    },
  },

  defaultGradient: {
    from: "brandBlue.5",
    to: "brandRed.5",
    deg: 135,
  },

  defaultRadius: "md",
});
