// process.browser is defined by webpack ?
export const isBrowser = (process as any).browser;

export const isProduction = process.env.NODE_ENV === 'production';
