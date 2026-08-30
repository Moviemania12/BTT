export interface Language {
  code: string;
  name: string;
  native: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "hi",    name: "Hindi",                 native: "हिन्दी" },
  { code: "bn",    name: "Bengali",               native: "বাংলা" },
  { code: "te",    name: "Telugu",                native: "తెలుగు" },
  { code: "mr",    name: "Marathi",               native: "मराठी" },
  { code: "ta",    name: "Tamil",                 native: "தமிழ்" },
  { code: "gu",    name: "Gujarati",              native: "ગુજરાતી" },
  { code: "kn",    name: "Kannada",               native: "ಕನ್ನಡ" },
  { code: "ml",    name: "Malayalam",             native: "മലയാളം" },
  { code: "pa",    name: "Punjabi",               native: "ਪੰਜਾਬੀ" },
  { code: "ur",    name: "Urdu",                  native: "اردو",        rtl: true },
  { code: "si",    name: "Sinhala",               native: "සිංහල" },
  { code: "ne",    name: "Nepali",                native: "नेपाली" },
  { code: "zh-CN", name: "Chinese (Simplified)",  native: "中文（简体）" },
  { code: "zh-TW", name: "Chinese (Traditional)", native: "中文（繁體）" },
  { code: "ja",    name: "Japanese",              native: "日本語" },
  { code: "ko",    name: "Korean",                native: "한국어" },
  { code: "id",    name: "Indonesian",            native: "Bahasa Indonesia" },
  { code: "ms",    name: "Malay",                 native: "Bahasa Melayu" },
  { code: "th",    name: "Thai",                  native: "ภาษาไทย" },
  { code: "vi",    name: "Vietnamese",            native: "Tiếng Việt" },
  { code: "tl",    name: "Filipino",              native: "Filipino" },
  { code: "my",    name: "Burmese",               native: "မြန်မာဘာသာ" },
  { code: "km",    name: "Khmer",                 native: "ភាសាខ្មែរ" },
  { code: "es",    name: "Spanish",               native: "Español" },
  { code: "fr",    name: "French",                native: "Français" },
  { code: "de",    name: "German",                native: "Deutsch" },
  { code: "pt",    name: "Portuguese",            native: "Português" },
  { code: "pt-BR", name: "Portuguese (Brazil)",   native: "Português (Brasil)" },
  { code: "it",    name: "Italian",               native: "Italiano" },
  { code: "nl",    name: "Dutch",                 native: "Nederlands" },
  { code: "pl",    name: "Polish",                native: "Polski" },
  { code: "ru",    name: "Russian",               native: "Русский" },
  { code: "uk",    name: "Ukrainian",             native: "Українська" },
  { code: "cs",    name: "Czech",                 native: "Čeština" },
  { code: "sk",    name: "Slovak",                native: "Slovenčina" },
  { code: "ro",    name: "Romanian",              native: "Română" },
  { code: "hu",    name: "Hungarian",             native: "Magyar" },
  { code: "sv",    name: "Swedish",               native: "Svenska" },
  { code: "no",    name: "Norwegian",             native: "Norsk" },
  { code: "da",    name: "Danish",                native: "Dansk" },
  { code: "fi",    name: "Finnish",               native: "Suomi" },
  { code: "el",    name: "Greek",                 native: "Ελληνικά" },
  { code: "tr",    name: "Turkish",               native: "Türkçe" },
  { code: "bg",    name: "Bulgarian",             native: "Български" },
  { code: "hr",    name: "Croatian",              native: "Hrvatski" },
  { code: "sr",    name: "Serbian",               native: "Српски" },
  { code: "lt",    name: "Lithuanian",            native: "Lietuvių" },
  { code: "lv",    name: "Latvian",               native: "Latviešu" },
  { code: "et",    name: "Estonian",              native: "Eesti" },
  { code: "ca",    name: "Catalan",               native: "Català" },
  { code: "ar",    name: "Arabic",                native: "العربية",      rtl: true },
  { code: "fa",    name: "Persian (Farsi)",       native: "فارسی",        rtl: true },
  { code: "he",    name: "Hebrew",                native: "עברית",        rtl: true },
  { code: "sw",    name: "Swahili",               native: "Kiswahili" },
  { code: "am",    name: "Amharic",               native: "አማርኛ" },
  { code: "ha",    name: "Hausa",                 native: "Hausa" },
  { code: "yo",    name: "Yoruba",                native: "Yorùbá" },
  { code: "ig",    name: "Igbo",                  native: "Igbo" },
  { code: "az",    name: "Azerbaijani",           native: "Azərbaycan" },
  { code: "kk",    name: "Kazakh",                native: "Қазақша" },
  { code: "uz",    name: "Uzbek",                 native: "O'zbek" },
  { code: "mn",    name: "Mongolian",             native: "Монгол" },
];

export const LANGUAGE_CODES = new Set(SUPPORTED_LANGUAGES.map(l => l.code));

export function getLanguage(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find(l => l.code === code);
}

export function isValidLanguage(code: string): boolean {
  return LANGUAGE_CODES.has(code);
}
