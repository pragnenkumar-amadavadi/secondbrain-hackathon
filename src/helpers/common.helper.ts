export const parseEndpoint = (url: string, params: Record<string, string | number | boolean>) => {
  Object.keys(params).forEach((key) => {
    url = url.replace(`:${key}`, `${params[key]}`);
    url = url.replace(`{${key}}`, `${params[key]}`);
  });
  return url;
};
