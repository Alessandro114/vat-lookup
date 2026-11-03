# vat-lookup

Look up any EU VAT number from the terminal. Get company name, address, revenue, employees, and credit score.

```bash
npx vat-lookup IT02727330014
```

```
  FERRERO COMMERCIALE ITALIA S.R.L.
  ──────────────────────────────────
  📍 ALBA (CN), IT
  🏭 Food Manufacturing
  📊 active

  Revenue     €19.3B
  Employees   48,697
  Score       75/100 (B+)
  VAT         IT02727330014
```

## Install

```bash
npm install -g vat-lookup
```

Or use directly:

```bash
npx vat-lookup DE123456789
npx vat-lookup FR12345678901
npx vat-lookup NL123456789B01
```

No API key needed. Free tier: 50 lookups/month.

## Data

- 249M+ companies in 264 countries
- Covers all EU member states + UK, US, and more
- Sources: official government business registries

## Related

- [enrich-companies](https://www.npmjs.com/package/enrich-companies) — Enrich a CSV with company data
- [company-lookup](https://www.npmjs.com/package/company-lookup) — Look up by company name
- [scala-mcp-server](https://www.npmjs.com/package/scala-mcp-server) — MCP server for AI agents
- [Score Company Lookup](https://chromewebstore.google.com/detail/score-company-lookup/) — Chrome extension

## License

MIT

## Data coverage

S.C.A.L.A. Score holds about 249 million company records from public registries and open data in 264 countries (home page of [score.get-scala.com](https://score.get-scala.com): "Data from official registries in 264 countries · 249,353,619 companies", checked 03/11/2026). Not all records have financial data, and coverage varies by country: revenue, employees and score are shown only where the source publishes them. Always check each field before relying on it.
