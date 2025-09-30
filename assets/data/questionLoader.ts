import { useSettings } from "@/components/contexts/SettingsContext";

// Importera alla JSON-filer
import consequenceEN from "./consequenceEN.json";
import consequenceSV from "./consequenceSV.json";

import eightSecondsEN from "./eightSecondsEN.json";
import eightSecondsSV from "./eightSecondsSV.json";

import mostLikelyToEN from "./mostLikelyToEN.json";
import mostLikelyToSV from "./mostLikelyToSV.json";

import neverHaveIEverEN from "./neverHaveIEverEN.json";
import neverHaveIEverSV from "./neverHaveIEverSV.json";

import truthsEN from "./truthsEN.json";
import truthsSV from "./truthsSV.json";

import wouldYouRatherEN from "./wouldYouRatherEN.json";
import wouldYouRatherSV from "./wouldYouRatherSV.json";

type QuestionSet = any[];

export function useQuestions() {
  const { language } = useSettings();

  const isSwedish = language === "sv-SE";

  return {
    consequence: isSwedish ? consequenceSV : consequenceEN,
    eightSeconds: isSwedish ? eightSecondsSV : eightSecondsEN,
    mostLikelyTo: isSwedish ? mostLikelyToSV : mostLikelyToEN,
    neverHaveIEver: isSwedish ? neverHaveIEverSV : neverHaveIEverEN,
    truths: isSwedish ? truthsSV : truthsEN,
    wouldYouRather: isSwedish ? wouldYouRatherSV : wouldYouRatherEN,
  } as Record<string, QuestionSet>;
}
