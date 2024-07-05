import { TailwindColor } from "./tailwindBaseColors";

type Theme = {
  colors: {
    primary: TailwindColor;
    blur: {
      top: TailwindColor;
      bottom: TailwindColor;
    };
  };
};

const theme: Theme = {
  colors: {
    primary: "purple",
    blur: {
      top: "indigo",
      bottom: "pink",
    },
  },
};

export default theme;