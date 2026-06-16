#!/usr/bin/env node

const https = require('https');
const querystring = require('querystring');

const API = 'score.get-scala.com';

const C = process.stdout.isTTY ? {
  r: '\x1b[0m', b: '\x1b[1m', d: '\x1b[2m', g: '\x1b[32m',
  bl: '\x1b[34m', c: '\x1b[36m', y: '\x1b[33m', re: '\x1b[31m', w: '\x1b[37m', gr: '\x1b[90m'
} : { r:'',b:'',d:'',g:'',bl:'',c:'',y:'',re:'',w:'',gr:'' };

function fetch(path) {
  return new Promise((resolve, reject) => {
    https.get({ hostname: API, path, headers: { 'User-Agent': 'vat-lookup/1.0.0' }, timeout: 10000 }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error('Invalid response')); } });
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('Timeout')); });
  });
}

function fmt(n) {
  if (n == null || n === '' || isNaN(n)) return C.d + 'n/a' + C.r;
  const num = Number(n);
  if (num >= 1e9) return `€${(num/1e9).toFixed(1)}B`;
  if (num >= 1e6) return `€${(num/1e6).toFixed(1)}M`;
  if (num >= 1e3) return `€${(num/1e3).toFixed(0)}K`;
  return `€${num.toFixed(0)}`;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
  ${C.b}vat-lookup${C.r} — look up any EU VAT number

  ${C.b}Usage:${C.r}
    vat-lookup <VAT-number>
    vat-lookup IT02727330014
    vat-lookup DE123456789
    vat-lookup FR12345678901

  ${C.d}Covers 250M+ companies across 50+ countries${C.r}
  ${C.d}Free: 50 lookups/month, no signup${C.r}
  ${C.d}More: https://github.com/Alessandro114/vat-lookup${C.r}
`);
    return;
  }

  const vat = args.filter(a => !a.startsWith('-')).join('').replace(/\s/g, '').toUpperCase();
  if (!vat) { console.error('  Provide a VAT number'); process.exit(1); }

  try {
    const data = await fetch(`/api/search?${querystring.stringify({ q: vat, limit: '1' })}`);
    const results = data.results || data.companies || data.data || [];
    if (results.length === 0) {
      console.log(`\n  ${C.d}No company found for VAT: ${vat}${C.r}\n`);
      return;
    }
    const co = results[0];
    const name = co.name || co.company_name || 'Unknown';
    const country = co.country || '';
    const city = co.city || '';
    const revenue = co.revenue || co.estimated_revenue;
    const employees = co.employees || co.employee_count;
    const score = co.health_score || co.score;
    const grade = co.grade || '';
    const status = co.status || '';
    const nace = co.nace_description || co.nace_code || '';

    console.log();
    console.log(`  ${C.b}${C.w}${name}${C.r}`);
    console.log(`  ${C.gr}${'─'.repeat(Math.min(name.length + 4, 60))}${C.r}`);
    if (city || country) console.log(`  ${C.c}📍${C.r} ${[city, country].filter(Boolean).join(', ')}`);
    if (nace) console.log(`  ${C.c}🏭${C.r} ${nace}`);
    if (status) console.log(`  ${C.c}📊${C.r} ${status.toLowerCase() === 'active' ? C.g : C.re}${status}${C.r}`);
    console.log();
    if (revenue != null) console.log(`  ${C.b}Revenue${C.r}     ${fmt(revenue)}`);
    if (employees != null) console.log(`  ${C.b}Employees${C.r}   ${Number(employees).toLocaleString()}`);
    if (score != null) console.log(`  ${C.b}Score${C.r}       ${score}/100 ${grade ? `(${grade})` : ''}`);
    console.log(`  ${C.b}VAT${C.r}         ${vat}`);
    console.log();
  } catch (err) {
    console.error(`  ${C.re}Error: ${err.message}${C.r}`);
    process.exit(1);
  }
}

main();
