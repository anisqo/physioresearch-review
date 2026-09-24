# Kalendarz konferencji

## Gdzie znajdują się dane

Wszystkie wydarzenia są zapisane w jednym pliku:

`src/data/conferences.json`

Strona `/kalendarz` sama sortuje rekordy według `dateStart`, grupuje je według miesięcy i przenosi zakończone wydarzenia do archiwum. Kolejności nie ustawia się ręcznie.

## Jak dodać wydarzenie

Dodaj do tablicy w `src/data/conferences.json` jeden obiekt:

```json
{
  "id": "unikalny-identyfikator-2027",
  "name": "Nazwa wydarzenia",
  "dateStart": "2027-03-12",
  "dateEnd": "2027-03-13",
  "city": "Poznań",
  "venue": "",
  "description": "Krótki, rzeczowy opis wydarzenia.",
  "price": "Fizjoterapeuta: 500 zł",
  "url": "https://strona-organizatora.pl/",
  "recommended": false,
  "free": false,
  "tags": ["fizjoterapia", "ortopedia"],
  "organizer": "Nazwa organizatora",
  "lastVerified": "2026-09-24",
  "status": "Potwierdzone",
  "sourceCategory": "Fizjoterapia / ortopedia"
}
```

Wymagane są co najmniej: `id`, `name`, `dateStart`, `city`, `venue`, `description`, `url`, `recommended`, `free`, `tags`, `organizer` i `lastVerified`. Daty zapisuj jako `RRRR-MM-DD`. Pole `dateEnd` można pominąć przy wydarzeniu jednodniowym.

## Jak zmodyfikować wydarzenie

Znajdź rekord po niepowtarzalnym polu `id` i zmień wybrane wartości. Po każdej kontroli oficjalnej strony zaktualizuj `lastVerified`.

## Szczególnie polecane

Ustaw:

```json
"recommended": true
```

Wydarzenie otrzyma dyskretne oznaczenie i będzie widoczne po użyciu filtra „Szczególnie polecane”.

## Wydarzenie bezpłatne

Ustaw:

```json
"free": true,
"price": "Udział bezpłatny"
```

Jeżeli tylko jeden wariant udziału jest bezpłatny, opisz to precyzyjnie w `price`.

## Cena

W polu `price` wpisuj wyłącznie potwierdzoną informację z oficjalnego źródła. Gdy cena nie jest znana, usuń całe pole `price`. Strona nie pokaże wtedy pustej sekcji ani komunikatu „brak danych”.

## Wydarzenia minione

Rekordów nie usuwamy. Po zakończeniu wydarzenia strona automatycznie przenosi je pod przycisk „Zobacz minione wydarzenia”. Dla konferencji wielodniowej decyduje `dateEnd`, a dla jednodniowej `dateStart`.

## Dostępne główne tagi filtrów

- `fizjoterapia`
- `ortopedia`
- `rehabilitacja`
- `medycyna sportowa`
- `nauka o ruchu`

Można dopisywać dokładniejsze tagi. Wyszukiwarka również je przeszukuje.
