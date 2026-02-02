/**
 * Maps each district (districtList name) to seat names (from seatList)
 * so that every district suggests seats. Handles spelling variants between
 * districtList and seatList (e.g. নারায়ণগঞ্জ vs নারায়ণগঞ্জ).
 */
import districtList from "./districtList";
import seatList from "./seatList";

type SeatItem = { seatNo: string; seatName: string };

// Build prefix -> seats from seatList (prefix = part before last "-", or full name)
function buildPrefixToSeats(): Map<string, SeatItem[]> {
  const map = new Map<string, SeatItem[]>();
  const allSeats = seatList.flatMap((div) => div.seats ?? []);
  for (const seat of allSeats) {
    const name = seat.seatName?.trim();
    if (!name) continue;
    const prefix = name.includes("-") ? name.replace(/-[^-]+$/, "").trim() : name;
    const list = map.get(prefix) ?? [];
    list.push(seat);
    map.set(prefix, list);
  }
  return map;
}

// District name (districtList) -> seat prefix (seatList) for spelling variants
const DISTRICT_TO_SEAT_PREFIX: Record<string, string> = {
  নারায়ণগঞ্জ: "নারায়ণগঞ্জ",
  রাজবাড়ী: "রাজবাড়ী",
  শরীয়তপুর: "শরীয়তপুর",
  নোয়াখালী: "নোয়াখালী",
  কুষ্টিয়া: "কুষ্টিয়া",
  খাগড়াছড়ি: "খাগড়াছড়ি",
  পটুয়াখালী: "পটুয়াখালী",
  জয়পুরহাট: "জয়পুরহাট",
  বগুড়া: "বগুড়া",
  নড়াইল: "নড়াইল",
  পঞ্চগড়: "পঞ্চগড়",
};

const prefixToSeats = buildPrefixToSeats();

/** Returns seat names for the given district name (from districtList). */
export function getSeatNamesForDistrict(districtName: string): string[] {
  const trimmed = districtName.trim();
  const seatPrefix = DISTRICT_TO_SEAT_PREFIX[trimmed] ?? trimmed;
  const seats = prefixToSeats.get(seatPrefix) ?? [];
  return seats.map((s) => s.seatName).filter(Boolean) as string[];
}

/** All district names from districtList (for lookup). */
export const allDistrictNames: string[] = districtList.flatMap((div) =>
  (div.districts ?? []).map((d) => d.districtName)
);

/** Map: district name -> seat names (precomputed so every district has seats). */
export const districtToSeatNames: Record<string, string[]> = (() => {
  const out: Record<string, string[]> = {};
  for (const name of allDistrictNames) {
    const seats = getSeatNamesForDistrict(name);
    if (seats.length) out[name] = seats;
  }
  return out;
})();
