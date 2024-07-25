export const formatDate = (
  dateString: string,
  includeYear: boolean = true
): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };

  if (includeYear) {
    options.year = "numeric";
  }

  return date.toLocaleDateString("es-ES", options);
};
