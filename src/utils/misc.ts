export const parseOptionalInt = (
  i?: string,
  defaultValue: number = 0,
  from?: number,
  to?: number,
) => {
  const parsed = i ? parseInt(i) : null;
  return !(parsed && !isNaN(parsed))
    ? defaultValue
    : !(from && to)
    ? parsed
    : from <= parsed && parsed < to
    ? parsed
    : defaultValue;
};

export const convToUrlParams = (page: number, params: any) =>
  Object.entries({ ...params, page })
    .map(e => `${e[0]}=${e[1]}`)
    .join("&");

export const limitedString = (s: string, limit: number): string =>
  s.length < limit ? s : s.substring(0, limit) + "...";
