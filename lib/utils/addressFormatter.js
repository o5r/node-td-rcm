/**
 * Normalize text by replacing problematic characters with ASCII equivalents
 * @param {string} text - The text to normalize
 * @returns {string} The normalized text
 */
function normalizeText(text) {
  if (!text) return '';

  return text
    // Replace smart quotes with ASCII apostrophe
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")  // ' ' ‚ ‛ → '
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')  // " " „ ‟ → "
    // Replace various dashes with ASCII hyphen
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015]/g, '-')  // ‐ ‑ ‒ – — ― → -
    // Replace ellipsis with three dots
    .replace(/\u2026/g, '...')  // … → ...
    // Replace non-breaking space with regular space
    .replace(/\u00A0/g, ' ')  // NBSP → space
    // Remove zero-width characters
    .replace(/[\u200B\u200C\u200D\u FEFF]/g, '');
}

// Complete street type mapping from Annexe 3, sorted by length (longest first for matching)
const STREET_TYPES = [
  { patterns: ['grande rue', 'grand rue', "grand'place"], code: 'GR' },
  { patterns: ['grande place', 'grand place'], code: 'GPL' },
  { patterns: ['route nationale'], code: 'N' },
  { patterns: ['route départementale', 'route departementale'], code: 'D' },
  { patterns: ['vieux chemin'], code: 'VCHE' },
  { patterns: ['vieille route'], code: 'VTE' },
  { patterns: ['petite route'], code: 'PRT' },
  { patterns: ['petite rue'], code: 'PTR' },
  { patterns: ['petite avenue'], code: 'PAE' },
  { patterns: ['petite allée', 'petite allee'], code: 'PTA' },
  { patterns: ['petit chemin'], code: 'PCH' },
  { patterns: ['grand boulevard'], code: 'GBD' },
  { patterns: ['chemin communal'], code: 'CC' },
  { patterns: ['chemin départemental', 'chemin departemental'], code: 'CD' },
  { patterns: ['chemin forestier'], code: 'CF' },
  { patterns: ['chemin vicinal'], code: 'CHV' },
  { patterns: ['chemin rural'], code: 'CR' },
  { patterns: ['voie communale'], code: 'VC' },
  { patterns: ["zone d'aménagement concerté", "zone d'amenagement concerte", 'zac'], code: 'ZAC' },
  { patterns: ["zone d'aménagement différé", "zone d'amenagement differe", 'zad'], code: 'ZAD' },
  { patterns: ['zone à urbaniser en priorité', 'zone a urbaniser en priorite', 'zup'], code: 'ZUP' },
  { patterns: ['zone artisanale'], code: 'ZA' },
  { patterns: ['zone industrielle'], code: 'ZI' },
  { patterns: ['rond-point', 'rond point'], code: 'RPT' },
  { patterns: ['terre-plein', 'terre plein', 'terreplein'], code: 'TPL' },
  { patterns: ['bretelle', "bretelle d'autoroute"], code: 'BRTL' },
  { patterns: ['aérodrome', 'aerodrome'], code: 'AER' },
  { patterns: ['agglomération', 'agglomeration'], code: 'AGL' },
  { patterns: ['ancien chemin'], code: 'ACH' },
  { patterns: ['ancienne route'], code: 'ART' },
  { patterns: ['autoroute'], code: 'AUT' },
  { patterns: ['avenue', 'av'], code: 'AV' },
  { patterns: ['barrière', 'barriere'], code: 'BRE' },
  { patterns: ['boulevard', 'bd'], code: 'BD' },
  { patterns: ['carrière', 'carriere'], code: 'CARE' },
  { patterns: ['carriera'], code: 'CAE' },
  { patterns: ['carrefour'], code: 'CAR' },
  { patterns: ['caserne'], code: 'CASR' },
  { patterns: ['centre'], code: 'CTRE' },
  { patterns: ['chalet', 'châlet'], code: 'CHL' },
  { patterns: ['chaussée', 'chaussee'], code: 'CHS' },
  { patterns: ['chemin', 'chem'], code: 'CHE' },
  { patterns: ['cheminement'], code: 'CHEM' },
  { patterns: ['château', 'chateau'], code: 'CHT' },
  { patterns: ['cité', 'cite'], code: 'CITE' },
  { patterns: ['corniche'], code: 'COR' },
  { patterns: ['coursive'], code: 'CIVE' },
  { patterns: ['descente'], code: 'DSC' },
  { patterns: ['déviation', 'deviation'], code: 'DEVI' },
  { patterns: ['domaine'], code: 'DOM' },
  { patterns: ['draille'], code: 'DRA' },
  { patterns: ['écart', 'ecart'], code: 'ECA' },
  { patterns: ['écluse', 'ecluse'], code: 'ECL' },
  { patterns: ['embranchement'], code: 'EMBR' },
  { patterns: ['enclave'], code: 'ENV' },
  { patterns: ['espace'], code: 'ESPA' },
  { patterns: ['esplanade'], code: 'ESP' },
  { patterns: ['escalier'], code: 'ESC' },
  { patterns: ['étang', 'etang'], code: 'ETNG' },
  { patterns: ['faubourg', 'fg'], code: 'FG' },
  { patterns: ['fontaine'], code: 'FON' },
  { patterns: ['galerie'], code: 'GAL' },
  { patterns: ['grève', 'greve'], code: 'GREV' },
  { patterns: ['habitation'], code: 'HAB' },
  { patterns: ['hameau'], code: 'HAM' },
  { patterns: ['impasse', 'imp'], code: 'IMP' },
  { patterns: ['jetée', 'jetee'], code: 'JTE' },
  { patterns: ['levée', 'levee'], code: 'LEVE' },
  { patterns: ['lotissement'], code: 'LOT' },
  { patterns: ['marché', 'marche'], code: 'MAR' },
  { patterns: ['montée', 'montee'], code: 'MTE' },
  { patterns: ['nouvelle route'], code: 'NTE' },
  { patterns: ['passage', 'pas'], code: 'PAS' },
  { patterns: ['passerelle'], code: 'PLE' },
  { patterns: ['placette'], code: 'PTTE' },
  { patterns: ['promenade', 'prom'], code: 'PROM' },
  { patterns: ['quartier'], code: 'QUA' },
  { patterns: ['raccourci'], code: 'RAC' },
  { patterns: ['résidence', 'residence'], code: 'RES' },
  { patterns: ['rocade'], code: 'ROC' },
  { patterns: ['rotonde'], code: 'RTD' },
  { patterns: ['ruelle'], code: 'RLE' },
  { patterns: ['ruellette'], code: 'RULT' },
  { patterns: ['ruisseau'], code: 'RUIS' },
  { patterns: ['sentier', 'sen'], code: 'SEN' },
  { patterns: ['terrasse'], code: 'TSSE' },
  { patterns: ['traverse'], code: 'TRA' },
  { patterns: ['venelle'], code: 'VEN' },
  { patterns: ['viaduc'], code: 'VIAD' },
  { patterns: ['village'], code: 'VGE' },
  { patterns: ['aire'], code: 'AIRE' },
  { patterns: ['allée', 'allee', 'all'], code: 'ALL' },
  { patterns: ['angle'], code: 'ANGL' },
  { patterns: ['arcade'], code: 'ARC' },
  { patterns: ['base'], code: 'BASE' },
  { patterns: ['bassin'], code: 'BSN' },
  { patterns: ['berge'], code: 'BER' },
  { patterns: ['bourg'], code: 'BRG' },
  { patterns: ['calle'], code: 'CALL' },
  { patterns: ['camin'], code: 'CAMI' },
  { patterns: ['camping'], code: 'CPG' },
  { patterns: ['canal'], code: 'CAN' },
  { patterns: ['champ'], code: 'CHP' },
  { patterns: ['chasse'], code: 'CHA' },
  { patterns: ['clos'], code: 'CLOS' },
  { patterns: ['coin'], code: 'COIN' },
  { patterns: ['contour'], code: 'CTR' },
  { patterns: ['coron'], code: 'CORO' },
  { patterns: ['côte', 'cote'], code: 'COTE' },
  { patterns: ['couloir'], code: 'CLR' },
  { patterns: ['cour'], code: 'COUR' },
  { patterns: ['cours'], code: 'CRS' },
  { patterns: ['croix'], code: 'CRX' },
  { patterns: ['darse'], code: 'DARS' },
  { patterns: ['digue'], code: 'DIG' },
  { patterns: ['enclos'], code: 'ENC' },
  { patterns: ['ferme'], code: 'FRM' },
  { patterns: ['fort'], code: 'FORT' },
  { patterns: ['fossé', 'fosse'], code: 'FOS' },
  { patterns: ['gare'], code: 'GARE' },
  { patterns: ['halage'], code: 'HLG' },
  { patterns: ['halle'], code: 'HLE' },
  { patterns: ['île', 'ile'], code: 'ILE' },
  { patterns: ['îlot', 'ilot'], code: 'ILOT' },
  { patterns: ['jardin'], code: 'JARD' },
  { patterns: ['lices'], code: 'LICE' },
  { patterns: ['ligne'], code: 'LIGN' },
  { patterns: ['mail'], code: 'MAIL' },
  { patterns: ['maison'], code: 'MAIS' },
  { patterns: ['marina'], code: 'MRN' },
  { patterns: ['parc'], code: 'PARC' },
  { patterns: ['parking'], code: 'PKG' },
  { patterns: ['parvis'], code: 'PRV' },
  { patterns: ['passe'], code: 'PASS' },
  { patterns: ['phare'], code: 'PHAR' },
  { patterns: ['piste'], code: 'PIST' },
  { patterns: ['placa'], code: 'PLA' },
  { patterns: ['place', 'pl'], code: 'PL' },
  { patterns: ['placis'], code: 'PLCI' },
  { patterns: ['plage'], code: 'PLAG' },
  { patterns: ['plaine'], code: 'PLN' },
  { patterns: ['plan'], code: 'PLAN' },
  { patterns: ['plateau'], code: 'PLT' },
  { patterns: ['pointe'], code: 'PNT' },
  { patterns: ['pont'], code: 'PONT' },
  { patterns: ['port'], code: 'PORT' },
  { patterns: ['porte'], code: 'PTE' },
  { patterns: ['portique'], code: 'PORQ' },
  { patterns: ['poste'], code: 'POST' },
  { patterns: ['poterne'], code: 'POT' },
  { patterns: ['quai'], code: 'QUAI' },
  { patterns: ['rampe'], code: 'RPE' },
  { patterns: ['ravine'], code: 'RVE' },
  { patterns: ['rempart'], code: 'REM' },
  { patterns: ['rive'], code: 'RIVE' },
  { patterns: ['route', 'rte'], code: 'RTE' },
  { patterns: ['rue'], code: 'RUE' },
  { patterns: ['ruet'], code: 'RUET' },
  { patterns: ['square', 'sq'], code: 'SQ' },
  { patterns: ['stade'], code: 'STDE' },
  { patterns: ['tertre'], code: 'TRT' },
  { patterns: ['tour'], code: 'TOUR' },
  { patterns: ['tunnel'], code: 'TUN' },
  { patterns: ['vallon'], code: 'VALL' },
  { patterns: ['villa'], code: 'VLA' },
  { patterns: ['ville'], code: 'VIL' },
  { patterns: ['voie'], code: 'VOIE' },
  { patterns: ['voirie'], code: 'VOIR' },
  { patterns: ['voute', 'voûte'], code: 'VOUT' },
  { patterns: ['voyeul'], code: 'VOY' },
  { patterns: ['zone'], code: 'ZONE' },
  { patterns: ['bord'], code: 'BORD' },
  { patterns: ['camp'], code: 'CAMP' },
  { patterns: ['col'], code: 'COL' },
  { patterns: ['mas'], code: 'MAS' },
  { patterns: ['lac'], code: 'LAC' },
  { patterns: ['sas'], code: 'SAS' },
  { patterns: ['val'], code: 'VAL' },
  { patterns: ['via'], code: 'VIA' },
  { patterns: ['hlm'], code: 'HLM' },
];

/**
 * @typedef {Object} AddressComponents
 * @property {string} streetNumber - 4-character street number (R128)
 * @property {string} repetitionIndex - 1-character repetition index (R129)
 * @property {string} streetType - 4-character street type code (R131 positions 1-4)
 * @property {string} streetName - Street name (R131 positions 7-26, max 21 chars)
 * @property {string} complement - 32-character complement (R127)
 */

/**
 * @typedef {Object} AddressInput
 * @property {string} address - Main address line
 * @property {string|null} [address2] - Optional second address line
 * @property {string} city - City name
 * @property {string} postalCode - Postal code
 */

/**
 * @typedef {Object} DGFIPAddressFields
 * @property {string} R127 - Complément d'adresse (32 chars)
 * @property {string} R128 - Numéro dans la voie (4 chars)
 * @property {string} R129 - Indice de répétition (1 char)
 * @property {string} R130 - Séparateur (1 char, space)
 * @property {string} R131 - Nature et nom de la voie (26 chars: 4 + 1 + 21)
 * @property {string} R132 - Code INSEE (5 chars, always "00000")
 * @property {string} R133 - Séparateur (1 char, space)
 * @property {string} R134 - Libellé commune (26 chars)
 * @property {string} R135 - Code postal (5 chars)
 * @property {string} R136 - Séparateur (1 char, space)
 * @property {string} R137 - Bureau distributeur (26 chars)
 */

/**
 * Detect street type in address and return 4-character code
 * Uses longest-match-first strategy, but prioritizes matches that appear earlier in the address
 *
 * @param {string} address - Address string to analyze
 * @returns {{code: string, matched: string}} Street type code and matched pattern
 * @private
 */
function detectStreetType(address) {
  const addressLower = address.toLowerCase();

  let bestMatch = null;

  for (const { patterns, code } of STREET_TYPES) {
    for (const pattern of patterns) {
      const regex = new RegExp(`(?:^|\\s)${pattern}(?:\\s|$)`, 'i');
      const match = addressLower.match(regex);

      if (match && match.index !== undefined) {
        const position = match.index;

        // Prefer matches that appear earlier, or longer matches at the same position
        if (!bestMatch ||
            position < bestMatch.position ||
            (position === bestMatch.position && pattern.length > bestMatch.matched.length)) {
          bestMatch = {
            code: code.padEnd(4, ' '),
            matched: pattern,
            position: position
          };
        }
      }
    }
  }

  if (bestMatch) {
    return { code: bestMatch.code, matched: bestMatch.matched };
  }

  return { code: '    ', matched: '' };
}

/**
 * Parse address string into DGFIP components
 *
 * @param {string} address - Main address line
 * @param {string|null} address2 - Optional second address line
 * @returns {AddressComponents} Parsed address components
 * @private
 */
function parseAddress(address, address2) {
  let complement = '';
  let workingAddress = address.trim();

  // Remove commas used as separators in French addresses (e.g., "11, rue")
  workingAddress = workingAddress.replace(/^(\d+)\s*,\s*/, '$1 ');

  // Handle complex addresses with multiple comma-separated parts
  // Example: "2 rue François Cauzan, Appt 31, Bât. C, Carré de l'Eperon"
  // Street name: only the first part before comma ("2 rue François Cauzan")
  // Complement: everything after first comma ("Appt 31, Bât. C, Carré de l'Eperon")
  const parts = workingAddress.split(',').map(p => p.trim());

  if (parts.length > 1) {
    const mainAddress = parts[0]; // "2 rue François Cauzan"
    const additionalParts = parts.slice(1); // ["Appt 31", "Bât. C", "Carré de l'Eperon"]

    // Everything after the first comma goes to complement
    workingAddress = mainAddress;
    complement = additionalParts.join(', ');
  } else {
    // Single part address - use original extraction logic for inline apartment info
    const apartmentPatterns = [
      /\s+(appt\.?|appartement|batiment|bâtiment|escalier|etage|étage|residence|résidence)\s*[a-z0-9\-]+/gi,
    ];

    for (const pattern of apartmentPatterns) {
      const match = workingAddress.match(pattern);
      if (match) {
        complement = match[0].trim();
        workingAddress = workingAddress.replace(pattern, ' ').trim();
        break;
      }
    }
  }

  // If address2 exists, use it for complement (override)
  if (address2 && address2.trim()) {
    complement = address2.trim();
  }

  // Extract street number and repetition index
  const numberMatch = workingAddress.match(/^(\d{1,4})\s*(?:(BIS|TER|QUATER)\b|([BTQA])\b|(\d)(?!\d))?/i);

  let streetNumber = '0000';
  let repetitionIndex = ' ';

  if (numberMatch) {
    streetNumber = numberMatch[1].padStart(4, '0');

    const suffix = numberMatch[2] || numberMatch[3] || numberMatch[4];
    if (suffix) {
      const suffixUpper = suffix.toUpperCase();
      if (suffixUpper === 'BIS') {
        repetitionIndex = 'B';
      } else if (suffixUpper === 'TER') {
        repetitionIndex = 'T';
      } else if (suffixUpper === 'QUATER') {
        repetitionIndex = 'Q';
      } else {
        repetitionIndex = suffixUpper.charAt(0);
      }
    }

    workingAddress = workingAddress.substring(numberMatch[0].length).trim();
  }

  // Detect street type
  const { code: streetType, matched } = detectStreetType(workingAddress);

  // Extract street name (remove matched street type)
  let streetName = workingAddress;
  if (matched) {
    const regex = new RegExp(`(?:^|\\s)${matched}(?:\\s|$)`, 'i');
    streetName = workingAddress.replace(regex, ' ').trim();
  }

  // Clean up street name: remove extra spaces and normalize commas
  streetName = streetName.replace(/\s+/g, ' ').replace(/\s*,\s*/g, ', ').trim();

  // Truncate street name to 21 chars max
  // For comma-separated names, try to keep both parts if possible
  if (streetName.length > 21) {
    // If there's a comma, try to preserve structure from the beginning
    if (streetName.includes(',')) {
      // Try to fit as much as possible from the start
      let truncated = streetName.substring(0, 21);

      // If we're in the middle of a word, back up to a natural break point
      if (truncated.length === 21 && streetName[21] !== ' ' && streetName[21] !== ',') {
        // Find the last space or comma
        const lastSpace = truncated.lastIndexOf(' ');
        const lastComma = truncated.lastIndexOf(',');
        const breakPoint = Math.max(lastSpace, lastComma);

        if (breakPoint > 0) {
          truncated = truncated.substring(0, breakPoint);
        }
      }
      streetName = truncated;
    } else {
      // Original logic for non-comma names: preserve from the end
      const words = streetName.split(/\s+/);
      const lastWord = words[words.length - 1];

      let truncated = lastWord;
      for (let i = words.length - 2; i >= 0; i--) {
        const candidate = words[i] + ' ' + truncated;
        if (candidate.length <= 21) {
          truncated = candidate;
        } else {
          break;
        }
      }
      streetName = truncated;
    }
  }

  return {
    streetNumber,
    repetitionIndex,
    streetType,
    streetName,
    complement: complement.substring(0, 32).padEnd(32, ' '),
  };
}

/**
 * Format an address to DGFIP format (R127-R137 fields)
 *
 * This function transforms a standard French address into the DGFIP (Direction Générale
 * des Finances Publiques) format required for TD-RCM tax declarations. It parses the
 * address components and formats them according to the official specifications.
 *
 * Features:
 * - Handles street numbers with repetition indices (BIS, TER, QUATER, or letters)
 * - Recognizes 120+ French street types from DGFIP Annexe 3
 * - Extracts apartment/building information to complement field
 * - Handles comma-separated address parts
 * - Cleans city names (removes postal codes if present)
 * - Properly truncates fields to required lengths
 *
 * @param {AddressInput} input - Address components to format
 * @param {string} input.address - Main address line (e.g., "25 rue de la République")
 * @param {string|null} [input.address2] - Optional complement (apartment, building, etc.)
 * @param {string} input.city - City name
 * @param {string} input.postalCode - Postal code
 * @returns {DGFIPAddressFields} Formatted DGFIP address fields (R127-R137)
 *
 * @example
 * const result = formatAddressToDGFIP({
 *   address: '3TER RUE JEAN MERMOZ',
 *   address2: null,
 *   city: 'VERSAILLES',
 *   postalCode: '78000'
 * });
 * // Returns:
 * // {
 * //   R127: '                                ', // 32 spaces
 * //   R128: '0003',
 * //   R129: 'T',
 * //   R130: ' ',
 * //   R131: 'RUE  JEAN MERMOZ          ',
 * //   R132: '00000',
 * //   R133: ' ',
 * //   R134: 'VERSAILLES                ',
 * //   R135: '78000',
 * //   R136: ' ',
 * //   R137: 'VERSAILLES                '
 * // }
 */
export function formatAddressToDGFIP(input) {
  const { address, address2, city, postalCode } = input;

  // Normalize input strings to replace problematic characters
  const normalizedAddress = normalizeText(address);
  const normalizedAddress2 = address2 ? normalizeText(address2) : null;
  const normalizedCity = normalizeText(city);

  // Parse address components
  const components = parseAddress(normalizedAddress, normalizedAddress2);

  // R131: 26 chars = 4-char type + 1 space + 21-char name
  const r131 =
    components.streetType + ' ' + components.streetName.substring(0, 21).padEnd(21, ' ');

  // Clean city name: remove postal codes and extra formatting
  let cleanedCity = normalizedCity.trim();
  // Remove postal code patterns like "93100 - MONTREUIL" or "93100 MONTREUIL"
  cleanedCity = cleanedCity.replace(/^\d{5}\s*-?\s*/, '');
  // Remove trailing postal code patterns like "MONTREUIL - 93100"
  cleanedCity = cleanedCity.replace(/\s*-?\s*\d{5}$/, '');

  // Normalize city to UPPERCASE and truncate to 26 chars
  const normalizedCityUpper = cleanedCity.toUpperCase().substring(0, 26).padEnd(26, ' ');

  // Ensure postal code is exactly 5 digits
  const normalizedPostalCode = postalCode.padStart(5, '0').substring(0, 5);

  return {
    R127: components.complement,
    R128: components.streetNumber,
    R129: components.repetitionIndex,
    R130: ' ',
    R131: r131,
    R132: '00000',
    R133: ' ',
    R134: normalizedCityUpper,
    R135: normalizedPostalCode,
    R136: ' ',
    R137: normalizedCityUpper,
  };
}
