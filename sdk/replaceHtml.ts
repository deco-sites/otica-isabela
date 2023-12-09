export function replaceHtml(value: string, size?: string) {
  const newValue = value
    ?.replace(/<img/g, '<img loading="lazy" ')
    ?.replace(
      /style="width: 20px !important;"/g,
      'width="20" height="20" ',
    )
    ?.replace(
      /alt="" width="700" height="700"/g,
      `alt="acessorios inclusos" width="${size}" height="${size}"`,
    )
    .replace(/<iframe/g, '<iframe loading="lazy" ');

  return newValue;
}
