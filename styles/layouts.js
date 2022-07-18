export const breakpointMap = {
  mobile: 637,
  tablet: 1023,
  desktop: 2560,
};

const breakpoints = Object.values(breakpointMap).map((breakpoint) => `${breakpoint}px`);

const mediaQueries = {
  mobile: `@media screen and (min-width: ${breakpointMap.mobile}px)`,
  tablet: `@media screen and (min-width: ${breakpointMap.tablet}px)`,
  desktop: `@media screen and (min-width: ${breakpointMap.desktop}px)`,
};

const spacing = [0, 4, 8, 16, 24, 32, 48, 64];

const radii = {
    default: "8px",
    small: "4px",
    circle: "50%",
    };

const zIndices = {
  dropdown: 10,
  modal: 100,
};

const sizes = {
  card: {
    default: 'calc(100vw / 4)',
    small: 'calc(100vw / 6)',
    mobile:  '100%',
    tablet: 'calc(100vw / 4)'
  },
  button: {
    default: '160px',
    sm: '64',
  }
}

export const Layout = {
  siteWidth: 1200,
  breakpoints,
  mediaQueries,
  spacing,
  radii,
  zIndices,
  sizes,
};

export default Layout;