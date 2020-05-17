import createCtx from './CreateCtx';

const [useCtx, Provider] = createCtx<Context>();

interface Context {
  language: string | undefined;
  changeLanguageType: (lan: string) => void;
}

export { useCtx as useThemeContext, Provider };
