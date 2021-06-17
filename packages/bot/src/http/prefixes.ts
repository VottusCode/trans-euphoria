export const stripSlashes = (p: string) => {
  if (p.startsWith("/")) p = p.substr(1, p.length);
  if (p.endsWith("/")) p = p.substr(0, p.length - 1);
  return p;
};

export const web = (path: string) => ["/", path].map(stripSlashes).join("/");

export const api = (path: string) => ["/api", path].map(stripSlashes).join("/");
