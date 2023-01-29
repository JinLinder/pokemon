const breakPoints = {
  sm: "425px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
};

export const theme = {
  colors: {
    darkRed: "#47263c",
    lightRed: "#985a4a",
    yellow: "#feac68",
    ligthYellow: "#ffc76d",
    blue: "#c1d4e8",
  },
  devices: {
    mobileS: `(max-width: ${breakPoints.sm})`,
    mobileM: `(min-width: ${breakPoints.sm}) and (max-width: ${breakPoints.md})`,
    tablet: `(min-width: ${breakPoints.md}) and (max-width: ${breakPoints.lg})`,
    laptop: `(min-width: ${breakPoints.lg}) and (max-width: ${breakPoints.xl})`,
    desktop: `(min-width: ${breakPoints.xl})`,
  },
};
