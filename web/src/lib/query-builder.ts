export const queryBuilder = <T>(args: T): string => {
  let initialQuery = "?";

  if (typeof args === "string") {
    return `?param=${args}`;
  }

  if (typeof args === "object") {
    Object.keys(args as Object).forEach((key) => {
      const value: any = (args as any)[key];
      // First Iteration
      if (initialQuery === "?") {
        initialQuery += `${key}=${value}`;
      } else {
        initialQuery += `&${key}=${value}`;
      }
    });
  }

  return initialQuery;
};
