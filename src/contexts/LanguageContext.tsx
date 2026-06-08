const t = (key: string): string => {
  return (translations[language] as Record<string, string>)[key] || key;
};
