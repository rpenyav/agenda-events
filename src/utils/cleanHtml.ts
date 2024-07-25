export const cleanHtml = (html: string | undefined): string => {
  if (!html) return "";
  return html.replace(/<\/?p>/g, "");
};
