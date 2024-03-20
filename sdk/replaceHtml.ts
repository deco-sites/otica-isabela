export function replaceHtml(value: string) {
  const newValue = value
    ?.replace(/<img/g, '<img loading="lazy" ')
    // ?.replace(/<p>/g, "")
    // ?.replace(/<\/p>/g, "")
    .replace(
      /style="width: 20px !important;"/g,
      'width="20" height="20" ',
    );

  return newValue;
}
