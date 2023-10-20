type Map = {
  [key: string]: string;
};

export function replaceSpecialCharacters(term: string) {
  // Tabela de mapeamento de caracteres acentuados para não acentuados
  const map: Map = {
    "á": "a",
    "à": "a",
    "ã": "a",
    "â": "a",
    "é": "e",
    "è": "e",
    "ê": "e",
    "í": "i",
    "ì": "i",
    "î": "i",
    "ó": "o",
    "ò": "o",
    "õ": "o",
    "ô": "o",
    "ú": "u",
    "ù": "u",
    "û": "u",
    "ç": "c",
  };

  // Substituir caracteres acentuados e cedilhas usando a tabela de mapeamento
  const replacement = term.replace(
    /[áàãâéèêíìîóòõôúùûç]/g,
    (match) => map[match] || match,
  );

  return replacement;
}
