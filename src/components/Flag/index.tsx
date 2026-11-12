type Props = {
  // ISO 3166-1 alpha-2 country code, any case
  code: string;
  // Width in px; height follows the 4:3 ratio. Omit to size by font-size.
  width?: number;
};

const FLAGS_DIR = '../../../node_modules/flag-icons/flags/4x3';

// URLs of the flag-icons SVGs. `no-inline` keeps each flag a separate file
// (Vite would otherwise inline small ones as base64), so the browser only
// downloads the flags that are actually shown.
const flagUrls = import.meta.glob<string>(
  '../../../node_modules/flag-icons/flags/4x3/*.svg',
  { eager: true, query: '?no-inline', import: 'default' },
);

// Unknown codes render an empty placeholder of the same size.
const Flag = ({ code, width }: Props) => {
  const src = flagUrls[`${FLAGS_DIR}/${code.toLowerCase()}.svg`];
  const size = width
    ? { width, height: (width * 3) / 4 }
    : { width: '1.333em', height: '1em' };

  if (!src) return <span style={{ display: 'inline-block', ...size }} />;

  return <img src={src} alt="" loading="lazy" style={size} />;
};

export default Flag;
