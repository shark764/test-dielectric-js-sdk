import * as plugins from './capacitor';

export const CapacitorSdk = {
  plugins,
  multiply: (a, b) => a * b,
  capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
  humanize: (s) =>
    s.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
};

// export default CapacitorSdk;
