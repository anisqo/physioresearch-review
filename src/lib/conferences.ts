import conferenceData from "@/data/conferences.json";

export const conferenceTopics = [
  { value: "all", label: "Wszystkie" },
  { value: "fizjoterapia", label: "Fizjoterapia" },
  { value: "ortopedia", label: "Ortopedia" },
  { value: "rehabilitacja", label: "Rehabilitacja" },
  { value: "medycyna sportowa", label: "Medycyna sportowa" },
  { value: "nauka o ruchu", label: "Nauka o ruchu" },
] as const;

export type ConferenceTopic = (typeof conferenceTopics)[number]["value"];

export type Conference = {
  id: string;
  name: string;
  dateStart: string;
  dateEnd?: string;
  city: string;
  venue: string;
  description: string;
  price?: string;
  url: string;
  recommended: boolean;
  free: boolean;
  tags: string[];
  organizer: string;
  lastVerified: string;
  status?: string;
  sourceCategory?: string;
  note?: string;
  registrationDeadline?: string;
  studentPrice?: string;
};

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(
  record: Record<string, unknown>,
  key: string,
  index: number,
  allowEmpty = false
) {
  const value = record[key];
  if (typeof value !== "string" || (!allowEmpty && value.trim() === "")) {
    throw new Error(`Konferencja ${index + 1}: pole "${key}" jest wymagane.`);
  }
  return value;
}

function optionalString(record: Record<string, unknown>, key: string) {
  const value = record[key];
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    throw new Error(`Pole "${key}" musi być tekstem.`);
  }
  return value;
}

function validIsoDate(value: string, key: string, index: number) {
  if (!isoDatePattern.test(value) || Number.isNaN(Date.parse(`${value}T12:00:00Z`))) {
    throw new Error(
      `Konferencja ${index + 1}: pole "${key}" musi mieć format RRRR-MM-DD.`
    );
  }
  return value;
}

function parseConference(value: unknown, index: number): Conference {
  if (!isRecord(value)) {
    throw new Error(`Konferencja ${index + 1}: rekord musi być obiektem.`);
  }

  const dateStart = validIsoDate(
    requiredString(value, "dateStart", index),
    "dateStart",
    index
  );
  const rawDateEnd = optionalString(value, "dateEnd");
  const dateEnd = rawDateEnd
    ? validIsoDate(rawDateEnd, "dateEnd", index)
    : undefined;

  if (dateEnd && dateEnd < dateStart) {
    throw new Error(
      `Konferencja ${index + 1}: dateEnd nie może być wcześniejsze niż dateStart.`
    );
  }

  if (typeof value.recommended !== "boolean" || typeof value.free !== "boolean") {
    throw new Error(
      `Konferencja ${index + 1}: pola "recommended" i "free" muszą być logiczne.`
    );
  }

  if (
    !Array.isArray(value.tags) ||
    value.tags.length === 0 ||
    !value.tags.every((tag) => typeof tag === "string" && tag.trim() !== "")
  ) {
    throw new Error(
      `Konferencja ${index + 1}: pole "tags" musi zawierać co najmniej jeden tag.`
    );
  }

  const url = requiredString(value, "url", index);
  try {
    new URL(url);
  } catch {
    throw new Error(`Konferencja ${index + 1}: pole "url" nie jest poprawnym adresem.`);
  }

  return {
    id: requiredString(value, "id", index),
    name: requiredString(value, "name", index),
    dateStart,
    dateEnd,
    city: requiredString(value, "city", index),
    venue: requiredString(value, "venue", index, true),
    description: requiredString(value, "description", index),
    price: optionalString(value, "price"),
    url,
    recommended: value.recommended,
    free: value.free,
    tags: value.tags,
    organizer: requiredString(value, "organizer", index),
    lastVerified: validIsoDate(
      requiredString(value, "lastVerified", index),
      "lastVerified",
      index
    ),
    status: optionalString(value, "status"),
    sourceCategory: optionalString(value, "sourceCategory"),
    note: optionalString(value, "note"),
    registrationDeadline: optionalString(value, "registrationDeadline"),
    studentPrice: optionalString(value, "studentPrice"),
  };
}

function validateConferences(data: unknown): Conference[] {
  if (!Array.isArray(data)) {
    throw new Error("Dane konferencji muszą być tablicą rekordów.");
  }

  const parsed = data.map(parseConference);
  const ids = new Set<string>();

  for (const conference of parsed) {
    if (ids.has(conference.id)) {
      throw new Error(`Powtórzony identyfikator konferencji: ${conference.id}.`);
    }
    ids.add(conference.id);
  }

  return parsed.sort((a, b) => a.dateStart.localeCompare(b.dateStart));
}

export const conferences = validateConferences(conferenceData);
