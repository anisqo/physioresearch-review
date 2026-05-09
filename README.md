# PhysioResearchReview — starter strony głównej

To jest bazowy projekt strony głównej koła naukowego PhysioResearchReview.
Projekt jest celowo prosty: Next.js, TypeScript, Tailwind CSS, App Router, dane tekstowe oddzielone od komponentów.

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz:

```bash
http://localhost:3000
```

## Najważniejsze pliki

```txt
src/app/page.tsx                  Strona główna
src/app/layout.tsx                Główny layout i metadata
src/app/globals.css               Kolory, typografia, podstawowe style
src/data/home.ts                  Wszystkie teksty strony głównej
src/components/site/SiteHeader.tsx
src/components/site/SiteFooter.tsx
src/components/home/HeroFigure.tsx
src/components/home/SectionHeading.tsx
```

## Edycja treści

Na tym etapie większość tekstów edytujesz tylko w:

```txt
src/data/home.ts
```

Nie musisz ruszać komponentów, jeżeli zmieniasz samą treść.

## Kolory

Kolory tymczasowe znajdują się w:

```txt
src/app/globals.css
```

Szukaj zmiennych:

```css
--prr-primary
--prr-secondary
--prr-wash
```

Po wgraniu prawdziwego logo warto pobrać z niego dokładne kolory i zastąpić te wartości.

## Logo

W tej wersji zamiast grafiki jest prosty typograficzny znak PRR.
W kolejnym kroku można dodać plik logo do katalogu `public/` i podmienić znak w `SiteHeader.tsx`.

## Jednorazowe przycięcie PNG (transparentne marginesy)

Jeżeli ilustracje PNG mają dużo pustego tła i rozjeżdżają się optycznie z tekstem,
uruchom jednorazowo:

```bash
magick mogrify -trim +repage public/work/*.png
```
