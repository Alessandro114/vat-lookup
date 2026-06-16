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

- 250M+ companies across 50+ countries
- Covers all EU member states + UK, US, and more
- Sources: official government business registries

## Related

- [enrich-companies](https://www.npmjs.com/package/enrich-companies) — Enrich a CSV with company data
- [company-lookup](https://www.npmjs.com/package/company-lookup) — Look up by company name
- [scala-mcp-server](https://www.npmjs.com/package/scala-mcp-server) — MCP server for AI agents
- [Score Company Lookup](https://chromewebstore.google.com/detail/score-company-lookup/) — Chrome extension

## License

MIT
