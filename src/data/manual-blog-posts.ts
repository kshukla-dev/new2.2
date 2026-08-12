import type { BlogPost } from "@/types/blog";
import { employerCostEuropeBlogHtml } from "@/blog/manual/content/employer-cost-europe-blog.content";
import { europeHiringRoutesDecisionMatrixHtml } from "@/blog/manual/content/europe-hiring-routes-blog.content";
import { belgiumPublicHolidays2026BlogHtml } from "@/blog/manual/content/belgium-public-holidays-2026-blog.content";
import { italyBankHolidays2026BlogHtml } from "@/blog/manual/content/italy-bank-holidays-2026-blog.content";
import { workVisaEuropeGuide2026BlogHtml } from "@/blog/manual/content/work-visa-europe-guide-blog.content";
import { polandPublicHolidays2026BlogHtml } from "@/data/poland-public-holidays-2026-blog.content";
import { germanyFirstHireBlogHtml } from "@/data/germany-first-hire-blog.content";
import { eorVsEntityNetherlandsBlogHtml } from "@/data/eor-vs-entity-netherlands-blog.content";
import { payrollSpainBlogHtml } from "@/data/payroll-spain-blog.content";
import { hiringFirstEmployeeNetherlandsBlogHtml } from "@/data/hiring-first-employee-netherlands-blog.content";
import { hiringFirstEmployeeUkBlogHtml } from "@/data/hiring-first-employee-uk-blog.content";
import { francePublicHolidays2026BlogHtml } from "@/data/france-public-holidays-2026-blog.content";
export const EUROPE_HIRING_ROUTES_DECISION_MATRIX_SLUG =
  "europe-hiring-routes-entity-eor-payroll-decision-matrix";

export const EMPLOYER_COST_EUROPE_SLUG = "hiring-your-first-european-employee";

export const PE_TRAP_BLOG_SLUG = "permanent-establishment-work-from-anywhere-trap";
export const NL_PUBLIC_HOLIDAYS_2026_SLUG = "netherlands-public-holidays-2026";
export const SPAIN_PUBLIC_HOLIDAYS_2026_SLUG = "spain-public-holidays-2026";
export const GERMANY_PUBLIC_HOLIDAYS_2026_SLUG = "germany-public-holidays-2026";
export const UK_BANK_HOLIDAYS_2026_SLUG = "uk-bank-holidays-2026";
export const BELGIUM_PUBLIC_HOLIDAYS_2026_SLUG = "belgium-public-holidays-2026";
export const ITALY_BANK_HOLIDAYS_2026_SLUG = "italy-bank-holidays-2026";
export const FRANCE_PUBLIC_HOLIDAYS_2026_SLUG = "france-public-holidays-2026";
export const WORK_VISA_EUROPE_GUIDE_SLUG = "work-visa-europe-guide";
export const POLAND_PUBLIC_HOLIDAYS_2026_SLUG = "poland-public-holidays-2026";
export const GERMANY_FIRST_HIRE_SLUG = "hiring-your-first-employee-germany";
export const EOR_VS_ENTITY_NETHERLANDS_SLUG = "eor-vs-entity-netherlands";
export const PAYROLL_SPAIN_SLUG = "payroll-in-spain-international-employers";
export const HIRING_FIRST_EMPLOYEE_NETHERLANDS_SLUG = "hiring-first-employee-netherlands";
export const HIRING_FIRST_EMPLOYEE_UK_SLUG = "hiring-first-employee-uk";

const nlPublicHolidays2026Content = `
<div class="highlight">
<h2>Netherlands public holidays 2026: what employers need to know</h2>
<p><strong>Key takeaways</strong></p>
<ul>
<li>The Netherlands recognises <strong>11 official public holidays</strong> (<em>feestdagen</em>) in 2026; the list is national, with no regional extras.</li>
<li>There is <strong>no statutory right</strong> to a paid day off on those dates; entitlement comes from the employment contract or sector <em>CAO</em>.</li>
<li>Around <strong>80% of employees</strong> fall under a CAO; foreign employers must align payroll calendars, <em>vakantiegeld</em>, and holiday rules with the applicable CAO.</li>
</ul>
</div>

<h2>Introduction</h2>
<p>The Netherlands has <strong>11 official public holidays</strong> (<em>feestdagen</em>) in 2026, as published by the Dutch central government. There is no law that requires employers to give staff those days off, so no one has a blanket legal right to a day off on a public holiday. The applicable <em>Collectieve Arbeidsovereenkomst</em> (CAO) or employment contract determines whether employees actually receive the day off and on what terms.</p>
<p>For international employers and HR teams running Dutch payroll, the distinction between <strong>official recognition</strong> of holidays and <strong>statutory entitlement</strong> to paid leave on those days is the critical starting point.</p>

<h2>Key facts at a glance</h2>
<table>
  <thead>
    <tr>
      <th>Topic</th>
      <th>Detail</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Country</td>
      <td>Netherlands</td>
    </tr>
    <tr>
      <td>Official public holidays (2026)</td>
      <td>11</td>
    </tr>
    <tr>
      <td>Governed by</td>
      <td>Dutch Civil Code (<em>Burgerlijk Wetboek</em>, Book 7) and sector-level CAO</td>
    </tr>
    <tr>
      <td>Paid day off on public holidays?</td>
      <td>Not by statute; set by contract or CAO</td>
    </tr>
    <tr>
      <td>Official list</td>
      <td><a href="https://www.government.nl/topics/working-hours/question-and-answer/public-holidays-in-the-netherlands" target="_blank" rel="noopener noreferrer">government.nl: public holidays</a></td>
    </tr>
  </tbody>
</table>

<h2>Public holidays in the Netherlands 2026</h2>
<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Day</th>
      <th>Holiday (English)</th>
      <th>Local name</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1 Jan</td>
      <td>Thursday</td>
      <td>New Year's Day</td>
      <td><em>Nieuwjaarsdag</em></td>
      <td>National</td>
    </tr>
    <tr>
      <td>3 Apr</td>
      <td>Friday</td>
      <td>Good Friday</td>
      <td><em>Goede Vrijdag</em></td>
      <td>Often sector-dependent</td>
    </tr>
    <tr>
      <td>5 Apr</td>
      <td>Sunday</td>
      <td>Easter Sunday</td>
      <td><em>Eerste Paasdag</em></td>
      <td>National</td>
    </tr>
    <tr>
      <td>6 Apr</td>
      <td>Monday</td>
      <td>Easter Monday</td>
      <td><em>Tweede Paasdag</em></td>
      <td>National</td>
    </tr>
    <tr>
      <td>27 Apr</td>
      <td>Monday</td>
      <td>King's Day</td>
      <td><em>Koningsdag</em></td>
      <td>National</td>
    </tr>
    <tr>
      <td>5 May</td>
      <td>Tuesday</td>
      <td>Liberation Day</td>
      <td><em>Bevrijdingsdag</em></td>
      <td>Many CAOs: paid off only every 5 years</td>
    </tr>
    <tr>
      <td>14 May</td>
      <td>Thursday</td>
      <td>Ascension Day</td>
      <td><em>Hemelvaartsdag</em></td>
      <td>National</td>
    </tr>
    <tr>
      <td>24 May</td>
      <td>Sunday</td>
      <td>Whit Sunday (Pentecost)</td>
      <td><em>Eerste Pinksterdag</em></td>
      <td>National</td>
    </tr>
    <tr>
      <td>25 May</td>
      <td>Monday</td>
      <td>Whit Monday</td>
      <td><em>Tweede Pinksterdag</em></td>
      <td>National</td>
    </tr>
    <tr>
      <td>25 Dec</td>
      <td>Friday</td>
      <td>Christmas Day</td>
      <td><em>Eerste Kerstdag</em></td>
      <td>National</td>
    </tr>
    <tr>
      <td>26 Dec</td>
      <td>Saturday</td>
      <td>Boxing Day</td>
      <td><em>Tweede Kerstdag</em></td>
      <td>Falls on Saturday (check CAO for substitute day)</td>
    </tr>
  </tbody>
</table>

<div class="warning">
<p><strong>Liberation Day (5 May):</strong> Although 5 May is an official public holiday, many CAOs stipulate a paid day off only once every five years (for example around lustrum years such as 2030 or 2035). <strong>2026 is not a lustrum year</strong> under that pattern. Check your applicable CAO before treating it as a universal paid day off.</p>
</div>

<div class="warning">
<p><strong>Good Friday (3 April):</strong> Listed on the government's official schedule, but treatment varies by sector. Many private-sector employees work on Good Friday. Check the relevant CAO or employment contract.</p>
</div>

<h2>Employer and payroll obligations</h2>

<h3>Is paid time off on public holidays legally required?</h3>
<p>There is <strong>no statutory obligation</strong> to grant leave on public holidays. The sector CAO or the employment contract determines whether employees have the day off. The Netherlands <em>recognises</em> 11 public holidays officially but does not <em>mandate</em> paid leave for any of them.</p>
<p>In practice, most Dutch employees do receive these days off through their CAO or contract, not through a standalone public-holiday statute. A CAO may also allow substitution of a Christian public holiday for another religious observance, such as Eid al-Fitr or Chanukah, where agreed.</p>

<h3>What happens when a public holiday falls on a weekend?</h3>
<p>Dutch law extends legal and payroll deadlines that fall on a Saturday, Sunday, or public holiday to the next working day. <strong>Boxing Day (26 December 2026) falls on a Saturday</strong>. Review your CAO and contracts for whether a substitute day off is owed. Dutch law does not automatically grant a replacement day.</p>

<h3>Working on a public holiday</h3>
<p>There is no standard statutory uplift for work on a public holiday. Additional pay or time off in lieu is governed by the contract or CAO, from supplements to replacement days elsewhere in the year.</p>

<h3>Holiday allowance (<em>vakantiegeld</em>)</h3>
<p>Separate from public-holiday leave, under the <em>Wet minimumloon en minimumvakantiebijslag</em> employers must pay at least <strong>8% of gross annual salary</strong> as holiday allowance, usually in May. This is a distinct statutory obligation and should not be confused with pay for public holidays.</p>

<div class="info">
<p><strong>Spring payroll note:</strong> April and May 2026 cluster King's Day, Liberation Day, Ascension Day, and Whit Monday within a few weeks. Plan payroll dates, invoicing, and statutory notice deadlines early.</p>
</div>

<h2>What this means for international employers</h2>
<p>If you employ people based in the Netherlands (for example from the UK, US, or elsewhere in the EU), Dutch employment law applies in full, including CAO rules where they bind your sector.</p>
<p>Roughly <strong>80% of Dutch employees</strong> work under a sector-specific CAO. Without knowing which CAO applies, you cannot determine actual public-holiday entitlement, substitute-day rules, or overtime treatment. The Boxing Day Saturday case is a typical year-end edge case to plan for.</p>
<p>Companies without a Dutch legal entity often use an <strong>Employer of Record (EOR)</strong> or outsourced payroll to stay aligned with CAO requirements, <em>vakantiegeld</em>, and the holiday calendar. For context on hiring without your own entity, see our guide on <a href="/netherlands">hiring in the Netherlands with an EOR</a>.</p>

<div class="highlight">
<p><strong>Hiring in the Netherlands?</strong></p>
<p>Jackson &amp; Frank supports EOR, visa sponsorship, and outsourced HR and payroll in the Netherlands and the wider Benelux. <a href="/contact">Contact our team</a> to discuss your setup.</p>
</div>

<h2>Sources</h2>
<ul>
<li><strong>Dutch central government, public holidays:</strong> <a href="https://www.government.nl/topics/working-hours/question-and-answer/public-holidays-in-the-netherlands" target="_blank" rel="noopener noreferrer">government.nl</a></li>
<li><strong>Business.gov.nl, holiday entitlement &amp; CAO:</strong> <a href="https://business.gov.nl/regulations/holiday-entitlement/" target="_blank" rel="noopener noreferrer">business.gov.nl</a></li>
<li><strong>Business.gov.nl, holiday allowance (<em>vakantiegeld</em>):</strong> <a href="https://business.gov.nl/staff/terms-of-employment/paying-holiday-allowance-to-your-staff/" target="_blank" rel="noopener noreferrer">business.gov.nl</a></li>
<li><strong>Government.nl, shop opening hours &amp; public holidays:</strong> <a href="https://www.government.nl/topics/enterprise-and-innovation/question-and-answer/when-are-shops-open-in-the-netherlands" target="_blank" rel="noopener noreferrer">government.nl</a></li>
<li><strong>Government.nl, school closures on public holidays:</strong> <a href="https://www.government.nl/topics/school-holidays/question-and-answer/on-which-public-holidays-are-schools-closed-in-the-netherlands" target="_blank" rel="noopener noreferrer">government.nl</a></li>
</ul>
`;

const spainPublicHolidays2026Content = `
<div class="highlight">
<h2>Spain public holidays 2026: what employers need to know</h2>
<p><strong>Key takeaways</strong></p>
<ul>
<li>Workers are entitled to up to <strong>14 paid, non-recoverable</strong> public holidays (<em>festivos laborales</em>) per year under the Workers' Statute. <strong>9 are nationwide</strong>, plus regional and local days.</li>
<li>Unlike the Netherlands, Spain requires holidays to be <strong>paid and non-recoverable</strong> by law when they form part of the recognised calendar for that workplace.</li>
<li>Calendars differ by <strong>autonomous community and municipality</strong>; payroll must follow each employee's <strong>place of work</strong>, and you must publish an annual work calendar (ET Art. 34.6).</li>
</ul>
</div>

<h2>Introduction</h2>
<p>Spain uses a <strong>three-tier public holiday system</strong>: up to <strong>14 paid public holidays</strong> per worker in 2026 under Article 37 of the Workers' Statute (<em>Estatuto de los Trabajadores</em>). That total comprises 9 nationwide dates common to all 17 autonomous communities, up to 3 additional regional holidays fixed by each community, and 2 local holidays per municipality. The 2026 calendar was published by the Directorate-General of Labor (Resolution of 17 October 2025, <a href="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-21667" target="_blank" rel="noopener noreferrer">BOE-A-2025-21667</a>).</p>
<p>For international employers, an employee in Barcelona and one in Madrid can lawfully have <strong>different holiday sets</strong>; payroll and HR systems must track the correct regional and local calendar for each worksite.</p>

<h2>Key facts at a glance</h2>
<table>
  <thead><tr><th>Topic</th><th>Detail</th></tr></thead>
  <tbody>
    <tr><td>Country</td><td>Spain</td></tr>
    <tr><td>Public holidays per worker (max.)</td><td>Up to 14 (paid and non-recoverable)</td></tr>
    <tr><td>Nationwide holidays (2026)</td><td>9</td></tr>
    <tr><td>Governed by</td><td>Workers' Statute (ET) Art. 37.2, Royal Decree 2001/1983, autonomous community decrees</td></tr>
    <tr><td>Paid time off on public holidays?</td><td>Yes for recognised <em>festivos</em> per ET Art. 37.2 (<em>retribuidos y no recuperables</em>)</td></tr>
    <tr><td>2026 calendar</td><td>BOE-A-2025-21667 · <a href="https://administracion.gob.es/pag_Home/en/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/trabajo-jubilacion/condiciones-trabajo/jornada-permisos.html" target="_blank" rel="noopener noreferrer">administracion.gob.es</a></td></tr>
  </tbody>
</table>

<h2>How the calendar is built</h2>
<h3>The four layers</h3>
<ul>
<li><strong>National non-substitutable (7):</strong> Fixed by the state; communities cannot replace them.</li>
<li><strong>National substitutable (2 in 2026):</strong> Epiphany and Holy Thursday. In 2026 all communities retained them.</li>
<li><strong>Autonomous community (up to 3):</strong> Additional days set by each of the 17 communities.</li>
<li><strong>Local (2):</strong> Set by each municipality; not listed in national tables; verify locally.</li>
</ul>

<h2>Nationwide public holidays 2026 (all communities)</h2>
<p>The following nine dates apply across Spain in 2026 per BOE-A-2025-21667.</p>
<table>
  <thead><tr><th>Date</th><th>Day</th><th>Holiday (English)</th><th>Local name</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>1 Jan</td><td>Thursday</td><td>New Year's Day</td><td><em>Año Nuevo</em></td><td>Non-substitutable</td></tr>
    <tr><td>6 Jan</td><td>Tuesday</td><td>Epiphany / Three Kings' Day</td><td><em>Epifanía del Señor / Día de Reyes</em></td><td>All communities retained</td></tr>
    <tr><td>3 Apr</td><td>Friday</td><td>Good Friday</td><td><em>Viernes Santo</em></td><td>Non-substitutable</td></tr>
    <tr><td>1 May</td><td>Friday</td><td>Labour Day</td><td><em>Fiesta del Trabajo</em></td><td>Non-substitutable</td></tr>
    <tr><td>15 Aug</td><td>Saturday</td><td>Feast of the Assumption</td><td><em>Asunción de la Virgen</em></td><td>Non-substitutable</td></tr>
    <tr><td>12 Oct</td><td>Monday</td><td>Spain's National Day</td><td><em>Fiesta Nacional de España / Día de la Hispanidad</em></td><td>Non-substitutable</td></tr>
    <tr><td>1 Nov</td><td>Sunday</td><td>All Saints' Day</td><td><em>Todos los Santos</em></td><td>Falls on Sunday (see regional transfer)</td></tr>
    <tr><td>8 Dec</td><td>Tuesday</td><td>Immaculate Conception</td><td><em>Día de la Inmaculada Concepción</em></td><td>Non-substitutable</td></tr>
    <tr><td>25 Dec</td><td>Friday</td><td>Christmas Day</td><td><em>Natividad del Señor</em></td><td>Non-substitutable</td></tr>
  </tbody>
</table>

<div class="warning">
<p><strong>Sunday holidays in 2026:</strong> All Saints' Day (1 November, Sunday) and Constitution Day (6 December, Sunday) fall on weekends. Most autonomous communities formally move observance to the following Monday (often 2 November and 7 December). Confirm the published decree for each region where you employ staff.</p>
</div>

<div class="info">
<p><strong>Holy Thursday (2 April):</strong> A public holiday in nearly every region except Catalonia and the Valencian Community. It usually counts toward the 14-day autonomous allocation. Check each community's official calendar.</p>
</div>

<h2>Selected regional holidays by autonomous community (2026)</h2>
<p>Examples from BOE-A-2025-21667 and community decrees. This list is not exhaustive; always verify local and municipal days.</p>
<table>
  <thead><tr><th>Date</th><th>Holiday (English)</th><th>Local name</th><th>Communities</th></tr></thead>
  <tbody>
    <tr><td>2 Apr</td><td>Holy Thursday</td><td><em>Jueves Santo</em></td><td>All except Catalonia and Valencian Community</td></tr>
    <tr><td>6 Apr</td><td>Easter Monday</td><td><em>Lunes de Pascua</em></td><td>Balearic Islands, Castile-La Mancha, Catalonia, Navarre, Basque Country, La Rioja, Valencian Community</td></tr>
    <tr><td>23 Apr</td><td>St. George's Day / Castile and León Day</td><td><em>San Jorge / Día de Castilla y León</em></td><td>Aragón, Castile and León</td></tr>
    <tr><td>2 May</td><td>Community of Madrid Day</td><td><em>Fiesta de la Comunidad de Madrid</em></td><td>Community of Madrid</td></tr>
    <tr><td>30 May</td><td>Canary Islands Day</td><td><em>Día de Canarias</em></td><td>Canary Islands</td></tr>
    <tr><td>9 Jun</td><td>La Rioja Day / Murcia Region Day</td><td><em>Día de La Rioja / Día de la Región de Murcia</em></td><td>La Rioja, Murcia</td></tr>
    <tr><td>24 Jun</td><td>St. John's Day</td><td><em>Día de San Juan</em></td><td>Catalonia, Galicia, Valencian Community</td></tr>
    <tr><td>25 Jul</td><td>St. James / Galicia National Day</td><td><em>Santiago Apóstol / Día Nacional de Galicia</em></td><td>Basque Country, Galicia</td></tr>
    <tr><td>8 Sep</td><td>Extremadura Day / Asturias Day</td><td><em>Día de Extremadura / Día de Asturias</em></td><td>Extremadura, Asturias</td></tr>
    <tr><td>11 Sep</td><td>National Day of Catalonia</td><td><em>Diada Nacional de Catalunya</em></td><td>Catalonia</td></tr>
    <tr><td>2 Nov</td><td>Monday substitute for All Saints</td><td><em>Traslado de Todos los Santos</em></td><td>Most autonomous communities</td></tr>
    <tr><td>7 Dec</td><td>Monday substitute for Constitution Day</td><td><em>Traslado del Día de la Constitución</em></td><td>Most autonomous communities</td></tr>
    <tr><td>26 Dec</td><td>St. Stephen's Day</td><td><em>Sant Esteve</em></td><td>Balearic Islands, Catalonia</td></tr>
  </tbody>
</table>

<h2>Employer and payroll obligations</h2>
<h3>Are paid public holidays legally required?</h3>
<p>Yes. ET Article 37.2 treats recognised public holidays as <strong>paid and non-recoverable</strong> (<em>retribuidos y no recuperables</em>) within the 14-day framework. Employers cannot routinely claw back hours for <em>festivos</em>, and must reflect them in the annual work calendar (<em>calendario laboral anual</em>) under Article 34.6.</p>
<p>This differs from purely contractual systems: once a date is part of the applicable calendar for that workplace, statutory pay protection applies alongside collective agreements (<em>convenios colectivos</em>), which may improve terms.</p>

<div class="info">
<p><strong>Legal reference:</strong> ET Art. 37.2 (14 paid non-recoverable <em>festivos</em>) · RD 2001/1983 Art. 47 (minimum 75% premium if work on a <em>festivo</em> is required, unless compensatory rest) · ET Art. 34.6 (annual calendar, consultation with representatives) · Labour Inspectorate (<em>Inspección de Trabajo y Seguridad Social</em>) enforces breaches.</p>
</div>

<h3>Weekend holidays and transfers</h3>
<p>Spanish law does not create a single automatic national substitute day when a holiday falls on Saturday or Sunday; many communities <strong>transfer</strong> observance by decree (as with All Saints and Constitution Day in 2026 in most regions). Always read the formal regional publication.</p>

<h3>Working on a public holiday</h3>
<p>If work on a <em>festivo</em> is exceptionally required, Article 47 of RD 2001/1983 requires at least a <strong>75% wage supplement</strong> on hours worked unless equivalent compensatory rest is agreed. Many <em>convenios</em> set higher rates or additional rest.</p>

<h3>Annual leave and <em>puentes</em></h3>
<p>Statutory annual leave is <strong>30 calendar days</strong> (often quoted as 22 working days), separate from public holidays. When a holiday falls on Tuesday or Thursday, employees often book the adjacent day to form a <em>puente</em> (long weekend). In 2026, plan around Epiphany (Tuesday 6 January), the Easter weekend, 12 October (Monday), and the December cluster.</p>

<h2>What this means for international employers</h2>
<p>Seventeen regional calendars plus municipal local days make Spain one of the more complex EU holiday regimes. Obligations attach to the <strong>employee's place of work</strong>, not the employer's registered office.</p>
<p>You must compile, display, and agree the <strong>annual work calendar</strong> per workplace. Since 2019, <strong><em>registro horario</em></strong> (daily time records) is mandatory. Misclassification of contractors (<em>falso autónomo</em>) can trigger back pay for holiday entitlements and social security. Many foreign companies use an <strong>EOR</strong> or outsourced payroll to manage <em>convenio</em> rules, calendars, and inspections risk.</p>

<div class="highlight">
<p><strong>Hiring in Spain?</strong></p>
<p>Jackson &amp; Frank provides EOR, visa support, and outsourced HR and payroll across Spain. <a href="/contact">Contact our team</a> to map calendars and compliance for your workforce.</p>
</div>

<h2>Sources</h2>
<ul>
<li><strong>BOE-A-2025-21667</strong>, public holidays 2026: <a href="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-21667" target="_blank" rel="noopener noreferrer">boe.es</a></li>
<li><strong>BOE-A-2025-23702</strong>, non-working days calendar 2026: <a href="https://www.boe.es/buscar/doc.php?id=BOE-A-2025-23702" target="_blank" rel="noopener noreferrer">boe.es</a></li>
<li><strong>administracion.gob.es</strong>, working hours and leave: <a href="https://administracion.gob.es/pag_Home/en/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/trabajo-jubilacion/condiciones-trabajo/jornada-permisos.html" target="_blank" rel="noopener noreferrer">administracion.gob.es</a></li>
<li><strong>Estatuto de los Trabajadores (RDL 2/2015)</strong> on <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430" target="_blank" rel="noopener noreferrer">boe.es</a></li>
<li><strong>Garrigues, Spain work calendar 2026</strong> (summary from BOE): <a href="https://www.garrigues.com/en_GB/new/spains-work-calendar-2026-published-official-state-gazette" target="_blank" rel="noopener noreferrer">garrigues.com</a></li>
</ul>
`;

const germanyPublicHolidays2026Content = `
<div class="highlight">
<h2>Germany public holidays 2026: what employers need to know</h2>
<p><strong>Key takeaways</strong></p>
<ul>
<li><strong>9 nationwide</strong> public holidays apply in all 16 <em>Bundesländer</em>; states add their own, so totals range from about <strong>10 to 13</strong> (e.g. Bavaria up to 13).</li>
<li><strong>ArbZG Section 9</strong> keeps employees off work on applicable holidays; <strong>EFZG Section 2</strong> requires full pay for lost working time.</li>
<li>Rules follow the employee's <strong>regular place of work</strong>, not the employer's HQ, which is critical for distributed and remote teams.</li>
</ul>
</div>

<h2>Introduction</h2>
<p>Germany has <strong>9 nationwide public holidays</strong> (<em>gesetzliche Feiertage</em>) in 2026, plus additional state-only days. Under the Working Hours Act (<em>Arbeitszeitgesetz</em>, ArbZG), employers must release staff from work on the holidays that apply where they work; under the Continued Remuneration Act (<em>Entgeltfortzahlungsgesetz</em>, EFZG), regular wages continue for working time lost because of those holidays.</p>
<p>For cross-border employers, the decisive rule is: <strong>the employee's place of work</strong> determines the calendar. A Hamburg HQ with a remote worker in Munich must apply Bavarian holidays for that person.</p>

<h2>Key facts at a glance</h2>
<table>
  <thead><tr><th>Topic</th><th>Detail</th></tr></thead>
  <tbody>
    <tr><td>Country</td><td>Germany</td></tr>
    <tr><td>Nationwide holidays (2026)</td><td>9 (all states)</td></tr>
    <tr><td>Maximum in any state</td><td>13 (e.g. Bavaria)</td></tr>
    <tr><td>Governed by</td><td>ArbZG, EFZG, state <em>Feiertagsgesetze</em></td></tr>
    <tr><td>Paid time off on public holidays?</td><td>Yes, under ArbZG Section 9 and EFZG Section 2</td></tr>
    <tr><td>Only federal statutory public holiday</td><td>German Unity Day (3 October)</td></tr>
  </tbody>
</table>

<h2>Nationwide public holidays 2026 (all 16 states)</h2>
<table>
  <thead><tr><th>Date</th><th>Day</th><th>Holiday (English)</th><th>Local name</th><th>Scope</th></tr></thead>
  <tbody>
    <tr><td>1 Jan</td><td>Thursday</td><td>New Year's Day</td><td><em>Neujahr</em></td><td>All states</td></tr>
    <tr><td>3 Apr</td><td>Friday</td><td>Good Friday</td><td><em>Karfreitag</em></td><td>All states</td></tr>
    <tr><td>6 Apr</td><td>Monday</td><td>Easter Monday</td><td><em>Ostermontag</em></td><td>All states</td></tr>
    <tr><td>1 May</td><td>Friday</td><td>Labour Day</td><td><em>Tag der Arbeit</em></td><td>All states</td></tr>
    <tr><td>14 May</td><td>Thursday</td><td>Ascension Day</td><td><em>Christi Himmelfahrt</em></td><td>All states</td></tr>
    <tr><td>25 May</td><td>Monday</td><td>Whit Monday</td><td><em>Pfingstmontag</em></td><td>All states</td></tr>
    <tr><td>3 Oct</td><td>Saturday</td><td>German Unity Day</td><td><em>Tag der Deutschen Einheit</em></td><td>All states</td></tr>
    <tr><td>25 Dec</td><td>Friday</td><td>Christmas Day</td><td><em>Erster Weihnachtstag</em></td><td>All states</td></tr>
    <tr><td>26 Dec</td><td>Saturday</td><td>Second Day of Christmas</td><td><em>Zweiter Weihnachtstag</em></td><td>All states</td></tr>
  </tbody>
</table>

<div class="warning">
<p><strong>Weekend holidays in 2026:</strong> German Unity Day (3 October, Saturday) and the Second Day of Christmas (26 December, Saturday) fall on weekends. There is no statutory substitute day. Check the applicable <em>Tarifvertrag</em> or employment contract.</p>
</div>

<div class="info">
<p><strong>Bridge days (<em>Brückentage</em>):</strong> Labour Day falls on a Friday. Ascension Day falls on a Thursday, so expect leave requests for adjacent days. Plan staffing and payroll cut-offs early.</p>
</div>

<h2>Regional public holidays by state (2026)</h2>
<p>Additional dates depend on where the employee normally works.</p>
<table>
  <thead><tr><th>Date</th><th>Day</th><th>Holiday (English)</th><th>Local name</th><th>States</th></tr></thead>
  <tbody>
    <tr><td>6 Jan</td><td>Tuesday</td><td>Epiphany</td><td><em>Heilige Drei Könige</em></td><td>Baden-Württemberg, Bavaria, Saxony-Anhalt</td></tr>
    <tr><td>8 Mar</td><td>Sunday</td><td>International Women's Day</td><td><em>Internationaler Frauentag</em></td><td>Berlin, Mecklenburg-Vorpommern</td></tr>
    <tr><td>5 Apr</td><td>Sunday</td><td>Easter Sunday</td><td><em>Ostersonntag</em></td><td>Brandenburg only</td></tr>
    <tr><td>4 Jun</td><td>Thursday</td><td>Corpus Christi</td><td><em>Fronleichnam</em></td><td>Baden-Württemberg, Bavaria, Hesse, North Rhine-Westphalia, Rhineland-Palatinate, Saarland; parts of Saxony and Thuringia</td></tr>
    <tr><td>8 Aug</td><td>Saturday</td><td>Augsburg Peace Festival</td><td><em>Augsburger Friedensfest</em></td><td>Bavaria (Augsburg city only)</td></tr>
    <tr><td>15 Aug</td><td>Saturday</td><td>Assumption of Mary</td><td><em>Mariä Himmelfahrt</em></td><td>Saarland; Catholic communities in Bavaria</td></tr>
    <tr><td>31 Oct</td><td>Saturday</td><td>Reformation Day</td><td><em>Reformationstag</em></td><td>Brandenburg, Bremen, Hamburg, Lower Saxony, Mecklenburg-Vorpommern, Saxony, Saxony-Anhalt, Schleswig-Holstein, Thuringia</td></tr>
    <tr><td>1 Nov</td><td>Sunday</td><td>All Saints' Day</td><td><em>Allerheiligen</em></td><td>Baden-Württemberg, Bavaria, North Rhine-Westphalia, Rhineland-Palatinate, Saarland</td></tr>
    <tr><td>18 Nov</td><td>Wednesday</td><td>Repentance and Prayer Day</td><td><em>Buß- und Bettag</em></td><td>Saxony only</td></tr>
  </tbody>
</table>

<h2>Holiday count by state (2026)</h2>
<table>
  <thead><tr><th>State</th><th>Total public holidays (approx.)</th></tr></thead>
  <tbody>
    <tr><td>Baden-Württemberg</td><td>12</td></tr>
    <tr><td>Bavaria</td><td>13</td></tr>
    <tr><td>Berlin</td><td>10</td></tr>
    <tr><td>Brandenburg</td><td>11</td></tr>
    <tr><td>Bremen</td><td>10</td></tr>
    <tr><td>Hamburg</td><td>10</td></tr>
    <tr><td>Hesse</td><td>10</td></tr>
    <tr><td>Lower Saxony</td><td>10</td></tr>
    <tr><td>Mecklenburg-Vorpommern</td><td>10</td></tr>
    <tr><td>North Rhine-Westphalia</td><td>11</td></tr>
    <tr><td>Rhineland-Palatinate</td><td>11</td></tr>
    <tr><td>Saarland</td><td>12</td></tr>
    <tr><td>Saxony</td><td>11</td></tr>
    <tr><td>Saxony-Anhalt</td><td>11</td></tr>
    <tr><td>Schleswig-Holstein</td><td>10</td></tr>
    <tr><td>Thuringia</td><td>11</td></tr>
  </tbody>
</table>

<h2>Employer and payroll obligations</h2>
<h3>Statutory paid time off</h3>
<p>ArbZG Section 9 keeps employees off work on applicable public holidays; EFZG Section 2 preserves <strong>full regular pay</strong> for working time lost. Public holidays do not reduce <em>Bundesurlaubsgesetz</em> annual leave (minimum 20 days on a five-day week; many contracts offer 25–30 days).</p>

<div class="info">
<p><strong>Legal reference:</strong> ArbZG Section 9 · EFZG Section 2 · BUrlG (annual leave separate from public holidays). ArbZG fines can reach up to €15,000 per violation in serious cases.</p>
</div>

<h3>Which state's calendar applies?</h3>
<p>The <strong>federal state where the employee actually works</strong> governs, including remote workers. The Federal Labour Court (<em>Bundesarbeitsgericht</em>, 1 August 2024, 6 AZR 38/24) ties entitlement to the regular place of employment even when someone works elsewhere temporarily.</p>

<h3>Weekend holidays</h3>
<p>No automatic substitute day under federal law. In 2026, German Unity Day (Saturday), Reformation Day (Saturday, where observed), All Saints' Day (Sunday, where observed), and the Second Day of Christmas (Saturday) can fall on non-working days without a statutory replacement. Collective agreements or contracts may provide otherwise.</p>

<h3>Working on a public holiday</h3>
<p>Work on public holidays is restricted; exceptions cover sectors such as healthcare, hospitality, transport, and emergencies. Compensatory time off is central; supplements follow agreement or <em>Tarifvertrag</em>. Certain holiday bonuses can qualify for tax relief within statutory caps.</p>

<h2>What this means for international employers</h2>
<p>Teams spread across Munich, Frankfurt, Hamburg, and Berlin run <strong>four different holiday calendars</strong> in parallel. April–May 2026 packs Good Friday, Easter Monday, Labour Day, Ascension Day, and Whit Monday within eight weeks.</p>
<p>Payroll engines should key off <strong>employee work location</strong>. Without a German entity, an <strong>EOR</strong> is a common way to apply the right state calendars, ArbZG/EFZG pay rules, and sector collective agreements across all <em>Bundesländer</em>.</p>

<div class="highlight">
<p><strong>Hiring in Germany?</strong></p>
<p>Jackson &amp; Frank supports EOR, visas, and outsourced HR and payroll across Germany and the DACH region. <a href="/contact">Contact our team</a> to align calendars and compliance.</p>
</div>

<h2>Sources</h2>
<ul>
<li><strong>Federal government, German Unity Day / national holidays:</strong> <a href="https://www.bundesregierung.de/breg-en/news/day-of-german-unity-2023-2227504" target="_blank" rel="noopener noreferrer">bundesregierung.de</a></li>
<li><strong>ArbZG (gesetze-im-internet.de):</strong> <a href="https://www.gesetze-im-internet.de/arbzg/" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de</a></li>
<li><strong>EFZG (gesetze-im-internet.de):</strong> <a href="https://www.gesetze-im-internet.de/efzg/" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de</a></li>
<li><strong>BUrlG (gesetze-im-internet.de):</strong> <a href="https://www.gesetze-im-internet.de/burlg/" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de</a></li>
<li><strong>Lower Saxony Ministry of the Interior, holiday law overview:</strong> <a href="https://www.mi.niedersachsen.de/themen/allgemeine_angelegenheiten_inneren/feiertagsrecht/feiertagsrecht-60368.html" target="_blank" rel="noopener noreferrer">mi.niedersachsen.de</a></li>
<li><strong>North Rhine-Westphalia legal database, holiday law:</strong> <a href="https://recht.nrw.de/lmi/owa/br_bes_detail?sg=0&amp;menu=1&amp;bes_id=3367&amp;anw_nr=2&amp;aufgehoben=N&amp;det_id=144445" target="_blank" rel="noopener noreferrer">recht.nrw.de</a></li>
</ul>
`;

const ukBankHolidays2026Content = `
<div class="warning">
<p><strong>Critical point for international employers:</strong> Unlike most EU countries, UK law does <strong>not</strong> give workers a statutory right to take bank holidays off. Whether they are off work on those dates depends on the <strong>employment contract</strong>. You must still provide at least <strong>5.6 weeks</strong> paid annual leave under the Working Time Regulations 1998; the contract states whether bank holidays sit inside or on top of that minimum.</p>
</div>

<div class="highlight">
<h2>UK bank holidays 2026: what employers need to know</h2>
<p><strong>Key takeaways</strong></p>
<ul>
<li><strong>England &amp; Wales: 8</strong> bank holidays in 2026; <strong>Scotland: 9</strong>; <strong>Northern Ireland: 10</strong> (per <a href="https://www.gov.uk/bank-holidays" target="_blank" rel="noopener noreferrer">GOV.UK</a>).</li>
<li>There is <strong>no automatic statutory right</strong> to paid leave on bank holidays; contracts decide. Statutory minimum paid leave is <strong>5.6 weeks</strong> (28 days for a five-day week).</li>
<li>Calendars differ by nation; configure payroll and policies by each employee's <strong>work location</strong> (London, Edinburgh, Belfast, etc.).</li>
</ul>
</div>

<h2>Introduction</h2>
<p>The United Kingdom has <strong>8 bank holidays in England and Wales, 9 in Scotland, and 10 in Northern Ireland</strong> in 2026, as listed on GOV.UK. "Bank holiday" is the usual UK label for public holidays, rooted in the Bank Holidays Act 1871 and the Banking and Financial Dealings Act 1971, with some dates fixed by royal proclamation.</p>
<p>The main point for employers: <strong>UK law does not require employers to give paid leave on bank holidays.</strong> Entitlement comes from the contract. The law does require at least <strong>5.6 weeks</strong> of paid annual leave; the contract says whether bank holidays count toward that total or are additional.</p>

<h2>Key facts at a glance</h2>
<table>
  <thead><tr><th>Topic</th><th>Detail</th></tr></thead>
  <tbody>
    <tr><td>Country</td><td>United Kingdom</td></tr>
    <tr><td>Bank holidays 2026</td><td>England &amp; Wales: 8 · Scotland: 9 · Northern Ireland: 10</td></tr>
    <tr><td>Governed by</td><td>Banking and Financial Dealings Act 1971 (Schedule 1), Working Time Regulations 1998, Employment Rights Act 1996</td></tr>
    <tr><td>Must employers give bank holidays off?</td><td>No automatic rule; depends on contract</td></tr>
    <tr><td>Statutory annual leave minimum</td><td>5.6 weeks (28 days for a five-day week); bank holidays may be included or extra</td></tr>
    <tr><td>Boxing Day 2026</td><td>Saturday 26 December; substitute bank holiday <strong>Monday 28 December</strong> (all nations)</td></tr>
    <tr><td>Official list</td><td><a href="https://www.gov.uk/bank-holidays" target="_blank" rel="noopener noreferrer">GOV.UK bank holidays</a></td></tr>
  </tbody>
</table>

<h2>Bank holidays in the United Kingdom 2026</h2>

<h3>England &amp; Wales (8)</h3>
<table>
  <thead><tr><th>Date</th><th>Day</th><th>Bank holiday</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>1 Jan</td><td>Thursday</td><td>New Year's Day</td><td>All four nations</td></tr>
    <tr><td>3 Apr</td><td>Friday</td><td>Good Friday</td><td>Common law / customary; all four nations</td></tr>
    <tr><td>6 Apr</td><td>Monday</td><td>Easter Monday</td><td>England, Wales &amp; Northern Ireland (not Scotland)</td></tr>
    <tr><td>4 May</td><td>Monday</td><td>Early May bank holiday</td><td>First Monday in May; all four nations</td></tr>
    <tr><td>25 May</td><td>Monday</td><td>Spring bank holiday</td><td>Last Monday in May; all four nations</td></tr>
    <tr><td>31 Aug</td><td>Monday</td><td>Summer bank holiday</td><td>Last Monday in August; England, Wales &amp; Northern Ireland</td></tr>
    <tr><td>25 Dec</td><td>Friday</td><td>Christmas Day</td><td>All four nations</td></tr>
    <tr><td>28 Dec</td><td>Monday</td><td>Boxing Day <em>(substitute)</em></td><td>26 Dec is Saturday; substitute Monday 28 Dec</td></tr>
  </tbody>
</table>

<h3>Scotland (9)</h3>
<p>Scotland uses a different calendar: it observes <strong>2 January</strong> and <strong>St Andrew's Day</strong>, does <strong>not</strong> observe Easter Monday, and its summer bank holiday is the <strong>first</strong> Monday in August (not the last).</p>
<table>
  <thead><tr><th>Date</th><th>Day</th><th>Bank holiday</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>1 Jan</td><td>Thursday</td><td>New Year's Day</td><td>All four nations</td></tr>
    <tr><td>2 Jan</td><td>Friday</td><td>2nd January</td><td>Scotland only</td></tr>
    <tr><td>3 Apr</td><td>Friday</td><td>Good Friday</td><td>All four nations</td></tr>
    <tr><td>4 May</td><td>Monday</td><td>Early May bank holiday</td><td>All four nations</td></tr>
    <tr><td>25 May</td><td>Monday</td><td>Spring bank holiday</td><td>All four nations</td></tr>
    <tr><td>3 Aug</td><td>Monday</td><td>Summer bank holiday</td><td>Scotland only (first Monday in August)</td></tr>
    <tr><td>30 Nov</td><td>Monday</td><td>St Andrew's Day</td><td>Scotland only</td></tr>
    <tr><td>25 Dec</td><td>Friday</td><td>Christmas Day</td><td>All four nations</td></tr>
    <tr><td>28 Dec</td><td>Monday</td><td>Boxing Day <em>(substitute)</em></td><td>Substitute for Saturday 26 Dec; all nations</td></tr>
  </tbody>
</table>

<h3>Northern Ireland (10)</h3>
<p>Northern Ireland adds <strong>St Patrick's Day</strong> and <strong>the Battle of the Boyne</strong> (or its substitute). Some employment rules are devolved and can differ from Great Britain.</p>
<table>
  <thead><tr><th>Date</th><th>Day</th><th>Bank holiday</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>1 Jan</td><td>Thursday</td><td>New Year's Day</td><td>All four nations</td></tr>
    <tr><td>17 Mar</td><td>Tuesday</td><td>St Patrick's Day</td><td>Northern Ireland only</td></tr>
    <tr><td>3 Apr</td><td>Friday</td><td>Good Friday</td><td>All four nations</td></tr>
    <tr><td>6 Apr</td><td>Monday</td><td>Easter Monday</td><td>England, Wales &amp; Northern Ireland</td></tr>
    <tr><td>4 May</td><td>Monday</td><td>Early May bank holiday</td><td>All four nations</td></tr>
    <tr><td>25 May</td><td>Monday</td><td>Spring bank holiday</td><td>All four nations</td></tr>
    <tr><td>13 Jul</td><td>Monday</td><td>Battle of the Boyne <em>(substitute)</em></td><td>Northern Ireland only; 12 Jul is Sunday</td></tr>
    <tr><td>31 Aug</td><td>Monday</td><td>Summer bank holiday</td><td>Last Monday in August; England, Wales &amp; Northern Ireland</td></tr>
    <tr><td>25 Dec</td><td>Friday</td><td>Christmas Day</td><td>All four nations</td></tr>
    <tr><td>28 Dec</td><td>Monday</td><td>Boxing Day <em>(substitute)</em></td><td>Substitute for Saturday 26 Dec; all nations</td></tr>
  </tbody>
</table>

<div class="warning">
<p><strong>Substitute bank holidays in 2026:</strong> Boxing Day (26 December, Saturday) becomes a bank holiday on <strong>Monday 28 December</strong> in all four nations. In Northern Ireland, the Battle of the Boyne (12 July, Sunday) moves to <strong>Monday 13 July</strong>. Workers observe the substitute weekday, not the weekend date.</p>
</div>

<h2>Employer and payroll obligations</h2>

<h3>Is there a legal right to take bank holidays off?</h3>
<p><strong>No.</strong> That surprises many international employers. There is no standalone statutory right to be off on bank holidays. The 5.6-week minimum under the Working Time Regulations 1998 does not have to be taken on those dates. Whether someone works or is off on a bank holiday is a <strong>contractual</strong> matter.</p>
<p>Most UK contracts do give bank holidays off, but the source of that right is the <strong>contract</strong>, not a general statute. Foreign employers should spell out bank holiday treatment clearly before people start.</p>

<h3>Two common contract structures</h3>
<p><strong>Statutory floor:</strong> 5.6 weeks (28 days) for a five-day week. You may offer more, not less. Bank holidays can sit inside or outside that figure.</p>
<p><strong>Structure A (common):</strong> 28 days <strong>including</strong> bank holidays (often 8 in England and Wales), leaving about 20 movable days. Compliant if the total is at least 28 days.</p>
<p><strong>Structure B (more generous):</strong> A set number of days <strong>plus</strong> bank holidays (for example 20 days plus bank holidays), so total time off is at least the statutory minimum and often higher.</p>

<div class="info">
<p><strong>Legal reference:</strong> Working Time Regulations 1998 (paid annual leave) · Employment Rights Act 1996 (written particulars, including holiday) · Banking and Financial Dealings Act 1971 (which dates are bank holidays). Acas publishes official guidance on bank holidays and Christmas.</p>
</div>

<h3>Holiday pay: what to include</h3>
<p>For the basic four-week (EU-derived) part of statutory leave, pay should reflect <strong>normal remuneration</strong>, not only basic salary where the worker regularly gets commission, overtime, or similar. Get professional advice on your pay mix and record-keeping.</p>
<p>From April 2024, the Employment Rights (Amendment, Revocation and Transitional Provision) Regulations 2023 changed how <strong>irregular hours and part-year</strong> workers accrue leave (including the 12.07% method) and allow rolled-up holiday pay in defined cases. Classify workers correctly.</p>

<h3>Part-time workers and bank holidays</h3>
<p>If a bank holiday falls on a day the employee does not usually work, you generally cannot force them to use that day from their holiday pot. Many bank holidays are Mondays, which can affect part-timers who do not work Mondays. Treat part-timers fairly on a pro-rata basis under the Part-time Workers (Prevention of Less Favourable Treatment) Regulations 2000.</p>

<h2>What this means for international employers</h2>
<p><strong>No automatic bank holiday entitlement:</strong> Unlike Germany, Spain, or the Netherlands, the UK does not give a blanket statutory right to those days off. The contract is decisive.</p>
<p><strong>Three calendars:</strong> England and Wales share one list; Scotland and Northern Ireland differ. A team in London, Edinburgh, and Belfast needs three correct calendars in payroll and policies.</p>
<p><strong>Scotland:</strong> No Easter Monday; 2 January and St Andrew's Day; summer bank holiday on the first Monday in August. These are material payroll differences.</p>
<p><strong>Holiday pay risk:</strong> Underpayment claims (for example ignoring regular overtime or commission) remain common. The 2023 rules for irregular hours add another layer for compliance.</p>
<p>Companies without a UK entity often use an <strong>Employer of Record (EOR)</strong> to align contracts, nation-specific calendars, and holiday pay with UK law. Jackson &amp; Frank provides EOR and outsourced HR and payroll across the UK.</p>

<div class="highlight">
<p><strong>Hiring in the UK?</strong></p>
<p>We help with EOR, visas, and UK payroll. <a href="/contact">Contact our team</a> to discuss contracts, bank holidays, and leave calculations.</p>
</div>

<h2>Sources</h2>
<ul>
<li><strong>GOV.UK, bank holidays (all nations):</strong> <a href="https://www.gov.uk/bank-holidays" target="_blank" rel="noopener noreferrer">gov.uk/bank-holidays</a></li>
<li><strong>GOV.UK, holiday entitlement rights:</strong> <a href="https://www.gov.uk/holiday-entitlement-rights" target="_blank" rel="noopener noreferrer">gov.uk/holiday-entitlement-rights</a></li>
<li><strong>Acas, bank holidays and Christmas:</strong> <a href="https://www.acas.org.uk/checking-holiday-entitlement/bank-holidays-and-christmas" target="_blank" rel="noopener noreferrer">acas.org.uk</a></li>
<li><strong>Acas, how much holiday someone gets:</strong> <a href="https://www.acas.org.uk/checking-holiday-entitlement" target="_blank" rel="noopener noreferrer">acas.org.uk</a></li>
<li><strong>Working Time Regulations 1998:</strong> <a href="https://www.legislation.gov.uk/uksi/1998/1833/contents" target="_blank" rel="noopener noreferrer">legislation.gov.uk</a></li>
<li><strong>Banking and Financial Dealings Act 1971, Schedule 1:</strong> <a href="https://www.legislation.gov.uk/ukpga/1971/80/schedule/1" target="_blank" rel="noopener noreferrer">legislation.gov.uk</a></li>
</ul>
`;

const peTrapBlogContent = `
<div class="highlight">
<h2>The 183 day myth: Why day counting alone fails</h2>
  <p><strong>Key takeaways</strong></p>
  <ul>
    <li>The 183 day threshold is not a universal safe harbour permanent establishment can arise in 30 120 days under many bilateral treaties.</li>
    <li>The OECD's November 2025 update introduced a 50% working time benchmark and commercial reason test for fixed place of business PE but left dependent agent PE unaddressed.</li>
    <li>CFOs need to assess who works abroad, what they do, and which treaty applies not just count days.</li>
  </ul>
</div>

<h2>The 183 day myth: Why day counting alone fails</h2>
<p>Here's a scenario that plays out more often than you'd think. Your VP of Sales spends two weeks working from a rented apartment in Lisbon. She takes a few client calls, signs off on a partnership agreement, and flies home. No big deal, right? She was there for 10 days well under the magic 183 day number. This type of cross border setup often appears alongside broader <a href="/blog/europe-hiring-routes-entity-eor-payroll-decision-matrix">global HR structuring decisions</a>.</p>
<p>Except there's no magic number. And your company may have just created a taxable presence in Portugal.</p>
<p><strong>Permanent establishment</strong> or PE is the concept in international tax law that determines whether a foreign country can tax your company's profits. If your business triggers a PE in another jurisdiction, you're looking at corporate income tax, profit attribution obligations under Article 7 of the applicable tax treaty, potential payroll withholding requirements, and penalties for non compliance. It's the single biggest tax risk hiding inside most work from anywhere policies.</p>
<p>The widespread belief that employees can work abroad for up to six months without creating PE exposure comes from a misunderstanding. The 183 day threshold that appears in many tax treaties relates to <strong>personal income tax residency</strong>, not corporate permanent establishment. These are fundamentally different concepts, and conflating them is where companies get into trouble.</p>
<p>Under the UN Model Tax Convention, a services PE can be triggered when employees furnish services in a foreign country for more than 183 days within any 12 month period. But many bilateral treaties set that bar even lower some at 90 to 120 days. And for certain types of PE, there's no day threshold at all. It's purely about what the employee is doing.</p>
<p>That last point is worth sitting with. A study by Grant Thornton across 21 countries found that 85% of digital nomad visas provide no corporate tax exemption whatsoever. The visa lets your employee in the door it doesn't protect your company from PE exposure. Mobility permission and employer compliance are separate tracks, as we also discuss in our <a href="/blog/work-visa-europe-guide">Europe work visa guide</a>.</p>
<div class="info">
  For a broader overview of cross border compliance risks beyond PE, read our article on <a href="/blog/europe-hiring-routes-entity-eor-payroll-decision-matrix">global HR solutions and international compliance planning</a>.
</div>

<h2>Fixed Place of Business PE vs. Dependent Agent PE: The distinction that matters most</h2>
<p>This is where the conversation gets nuanced and where most summaries of the 2025 OECD update fall short. There are two distinct ways your company can trigger PE, and they operate under completely different logic.</p>
<h3>Fixed Place of Business PE (Article 5(1))</h3>
<p>This is the traditional form of PE. It requires a physical location with sufficient permanence through which your business is carried on think offices, branches, factories, or, increasingly, an employee's home.</p>
<p>The <strong>OECD's November 2025 update</strong> to the Model Tax Convention introduced a much needed framework for assessing when a home office constitutes a fixed place of business. It works in two stages.</p>
<p><strong>First, a time based indicator.</strong> If an employee works less than 50% of their total working time from a foreign location over any 12 month period, that location generally won't be treated as a fixed place of business. This is effectively a safe harbour for short term or occasional remote stints abroad.</p>
<p><strong>Second, a commercial reason test.</strong> If the employee exceeds the 50% threshold, the OECD asks whether there's a genuine business reason for their presence in that country. Serving local clients, accessing regional markets, or providing on the ground services counts as a commercial reason. Working from the south of France because the employee prefers the weather does not and neither does enabling remote work purely to retain talent or reduce office costs.</p>
<p>There's an important caveat here. If the employee is effectively <em>the</em> business a founder, sole consultant, or primary operator their home office is likely to be treated as the enterprise's place of business regardless of these tests. The OECD commentary makes this quite clear: the more central the individual is to the enterprise, the higher the scrutiny.</p>
<h3>Dependent Agent PE (Article 5(5))</h3>
<p>This is the one that catches people off guard. A dependent agent PE arises when someone acting on behalf of your enterprise <strong>habitually concludes contracts</strong> or plays the principal role in getting contracts to the finish line in a foreign jurisdiction. It doesn't matter whether your company has an office there. It doesn't matter how many days the person has been in the country.</p>
<p>And here's the critical gap: <strong>the 2025 OECD update did not revise dependent agent PE guidance at all.</strong> The new 50% benchmark and commercial reason test apply only to fixed place of business PE. For anyone with contract signing authority sales directors, regional managers, business development leads the existing, stricter principles still govern. In many remote work scenarios involving revenue generating roles, dependent agent PE actually presents the greater risk. This is one reason many teams evaluate <a href="/employer-of-record">EOR operating models without local entities</a> before approving long term remote arrangements.</p>
<blockquote>
  <p>The 2025 OECD update clarified when a home office creates a fixed place of business. But it left the dependent agent question often the bigger risk for sales and leadership roles working abroad completely untouched.</p>
</blockquote>
<table>
  <thead>
    <tr>
      <th>Factor</th>
      <th>Fixed Place of Business PE</th>
      <th>Dependent Agent PE</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Trigger</td>
      <td>Location + permanence + business activity</td>
      <td>Person + contract authority + habitual pattern</td>
    </tr>
    <tr>
      <td>Day threshold</td>
      <td>~50% working time (2025 OECD)</td>
      <td>None entirely activity based</td>
    </tr>
    <tr>
      <td>2025 OECD update</td>
      <td>New two part framework introduced</td>
      <td>No changes existing rules apply</td>
    </tr>
    <tr>
      <td>Highest risk roles</td>
      <td>Key executives, founders, sole operators</td>
      <td>Sales directors, BD leads, anyone signing contracts</td>
    </tr>
    <tr>
      <td>Mitigation</td>
      <td>Limit time abroad, document personal reasons</td>
      <td>Restrict contract authority, centralise signing</td>
    </tr>
  </tbody>
</table>
<div class="info">
  Understanding the interplay between PE types is critical when structuring global hiring. Read our breakdown of <a href="/employer-of-record">hiring without a local entity using an EOR model</a>.
</div>

<h2>The PE risk decision tree: A practical framework for CFOs</h2>
<p>Theory is useful. But when an employee requests to work from Bali for three months, you need a practical way to assess the risk quickly. We built this decision tree around the questions that actually determine PE exposure.</p>
<ol>
  <li><strong>Is the employee a director, officer, or founder?</strong> If yes, elevated risk under both PE types. Their activities receive heightened scrutiny from tax authorities. Seek specialist advice before approving.</li>
  <li><strong>Does the employee have authority to conclude contracts on behalf of the company?</strong> If yes, dependent agent PE risk is high regardless of how many days they spend abroad. This is the most commonly overlooked trigger.</li>
  <li><strong>Will they spend >=50% of working time in the foreign location over 12 months?</strong> If no, low fixed place of business PE risk under the 2025 OECD safe harbour. If yes, continue to the next question.</li>
  <li><strong>Is there a commercial reason for their presence?</strong> Serving local clients, accessing local resources, providing on site services? If no, likely no fixed place of business PE. If yes, PE risk is materially elevated.</li>
  <li><strong>Do they have a local mailing address, co working space, or long term rental?</strong> Physical presence indicators strengthen "disposal" arguments by tax authorities. Document everything.</li>
  <li><strong>Which bilateral tax treaty applies?</strong> Check whether it follows the OECD Model (higher PE threshold) or the UN Model (lower threshold, services PE at 183 days or less). Some treaties have unique provisions at 90 120 days.</li>
  <li><strong>Is the employee creating intellectual property in the foreign jurisdiction?</strong> Some countries Germany, notably treat local IP creation as a PE trigger even when other criteria aren't met.</li>
</ol>
<div class="highlight">
  <p><strong>Download the PE risk decision tree</strong></p>
  <p>Get the full printable framework including country specific treaty variations and a risk scoring matrix for your HR and finance teams.</p>
  <p><a href="https://jafuploads.s3.eu-west-1.amazonaws.com/prod/document/PE_Risk_Decision_Tree_Framework_J%26F.pdf">Download PDF</a></p>
</div>

<h2>What CFOs should do now</h2>
<p>If your company has a work from anywhere policy or even an informal culture of approving remote work requests on a case by case basis here's what needs to happen.</p>
<p><strong>Audit your policy against the 2025 OECD framework.</strong> Most existing policies were drafted before the November 2025 update. If yours still relies on a blanket day count rule without distinguishing between fixed place of business and dependent agent risk, it needs updating.</p>
<p><strong>Implement day count tracking across all jurisdictions.</strong> You can't manage what you don't measure. This means monitoring not just the countries employees travel to, but the cumulative time spent there including business trips, "workations," and informal relocations.</p>
<p><strong>Restrict contract signing authority for employees working abroad.</strong> This is the simplest, highest impact mitigation for dependent agent PE. Centralise contract execution in your home jurisdiction and make it part of your travel approval process.</p>
<p><strong>Map your bilateral treaty network.</strong> Identify which treaties have lower PE thresholds. Countries that have negotiated treaties based on the UN Model often developing nations tend to have more aggressive PE provisions. Treaties with services PE clauses at 90 or 120 days require extra vigilance.</p>
<p><strong>Brief your board.</strong> If directors or senior executives regularly work from foreign jurisdictions, the PE exposure isn't theoretical. It's the kind of risk that deserves a line item in your compliance reporting.</p>
<p><strong>Consider Employer of Record structures</strong> for high risk jurisdictions where you have employees working on an ongoing basis. An EOR creates legal separation between your company and the local activities, reducing though not eliminating PE exposure.</p>
<div class="info">
  Jackson & Frank helps companies navigate cross border tax and compliance risk. Explore related insights in our <a href="/blog/work-visa-europe-guide">work visa and mobility guide for Europe</a>, or get in touch with our team.
</div>

`;

export const MANUAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 20260721,
    title: "Hiring Your First Employee in the UK: A Practical Guide for International Employers",
    slug: HIRING_FIRST_EMPLOYEE_UK_SLUG,
    excerpt:
      "A practical 2026 guide for international employers hiring their first UK employee: entity vs EOR, employment contracts, PAYE, employer National Insurance, pension auto-enrolment, right to work checks, and Skilled Worker visas.",
    page_content: hiringFirstEmployeeUkBlogHtml,
    toc_html: `<ol>
<li><a href="#do-you-need-a-uk-legal-entity-to-hire-your-first-employee">Do you need a UK legal entity to hire your first employee?</a></li>
<li><a href="#the-main-hiring-models-in-the-uk">The main hiring models in the UK</a></li>
<li><a href="#how-to-register-as-an-employer-with-hmrc">How to register as an employer with HMRC</a></li>
<li><a href="#employment-contracts-in-the-uk">Employment contracts in the UK</a></li>
<li><a href="#probation-periods-and-fixed-term-contracts-in-the-uk">Probation periods and fixed-term contracts in the UK</a></li>
<li><a href="#payroll-and-paye-key-rates-for-2026">Payroll and PAYE: key rates for 2026</a></li>
<li><a href="#employer-national-insurance-contributions-in-2026">Employer National Insurance contributions in 2026</a></li>
<li><a href="#statutory-employment-rights-you-must-provide">Statutory employment rights you must provide</a></li>
<li><a href="#auto-enrolment-workplace-pension-obligations">Auto-enrolment: workplace pension obligations</a></li>
<li><a href="#hiring-a-foreign-national-in-the-uk">Hiring a foreign national in the UK</a></li>
<li><a href="#how-long-does-it-take-to-hire-your-first-employee-in-the-uk">How long does it take to hire your first employee in the UK?</a></li>
<li><a href="#frequently-asked-questions">Frequently asked questions</a></li>
</ol>`,
    author_id: 0,
    image_url: "/blog-images/hiring-first-employee-uk.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 11,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "43,40,41,42",
    meta_title: "Hiring Your First Employee in the UK (2026 Guide)",
    meta_description:
      "A practical guide for international employers hiring their first UK employee: contracts, PAYE, employer NI, right to work, and EOR vs entity.",
    canonical_url: `https://jacksonandfrank.com/blog/${HIRING_FIRST_EMPLOYEE_UK_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-07-21",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-07-21",
    updated_at: "2026-07-21",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260715,
    title: "Hiring Your First Employee in the Netherlands",
    slug: HIRING_FIRST_EMPLOYEE_NETHERLANDS_SLUG,
    excerpt:
      "A practical 2026 guide for international employers hiring their first Dutch employee: entity vs EOR, contracts, payroll and social security, statutory rights, work permits, and the 30% expat scheme.",
    page_content: hiringFirstEmployeeNetherlandsBlogHtml,
    toc_html: `<ol>
<li><a href="#do-you-need-a-dutch-entity-to-hire-your-first-employee">Do you need a Dutch entity to hire your first employee?</a></li>
<li><a href="#the-main-hiring-models-in-the-netherlands">The main hiring models in the Netherlands</a></li>
<li><a href="#how-to-register-as-an-employer-in-the-netherlands">How to register as an employer in the Netherlands</a></li>
<li><a href="#employment-contracts-in-the-netherlands">Employment contracts in the Netherlands</a></li>
<li><a href="#probation-periods-and-fixed-term-contract-rules">Probation periods and fixed-term contract rules</a></li>
<li><a href="#payroll-setup-and-tax-obligations-in-the-netherlands">Payroll setup and tax obligations in the Netherlands</a></li>
<li><a href="#employer-social-security-contributions-in-the-netherlands-2026">Employer social security contributions in the Netherlands (2026)</a></li>
<li><a href="#statutory-employment-rights-you-must-provide">Statutory employment rights you must provide</a></li>
<li><a href="#hiring-a-foreign-national-in-the-netherlands">Hiring a foreign national in the Netherlands</a></li>
<li><a href="#the-30-percent-expat-scheme-what-employers-should-know">The 30% expat scheme: what employers should know</a></li>
<li><a href="#how-long-does-it-take-to-hire-your-first-employee-in-the-netherlands">How long does it take to hire your first employee in the Netherlands?</a></li>
<li><a href="#frequently-asked-questions">Frequently asked questions</a></li>
</ol>`,
    author_id: 0,
    image_url: "/blog-images/hiring-first-employee-netherlands.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 11,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "43,40,41,42",
    meta_title: "Hiring Your First Employee in the Netherlands (2026)",
    meta_description:
      "A practical guide for international employers hiring their first Dutch employee: contracts, payroll, social security, work permits, and EOR vs entity.",
    canonical_url: `https://jacksonandfrank.com/blog/${HIRING_FIRST_EMPLOYEE_NETHERLANDS_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-07-16",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-07-15",
    updated_at: "2026-07-16",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260708,
    title: "Payroll in Spain: A Guide for International Employers",
    slug: PAYROLL_SPAIN_SLUG,
    excerpt:
      "A practical 2026 guide to running payroll in Spain: employer social security rates, contribution bases, collective agreements (convenios), sick pay, severance, and what changed in 2026.",
    page_content: payrollSpainBlogHtml,
    toc_html: `<ol>
<li><a href="#how-much-does-it-cost-to-employ-someone-in-spain">How much does it cost to employ someone in Spain?</a></li>
<li><a href="#what-are-spains-employer-social-security-contributions">What are Spain's employer social security contributions?</a></li>
<li><a href="#what-is-the-contribution-base-and-how-is-it-calculated">What is the contribution base and how is it calculated?</a></li>
<li><a href="#what-is-a-convenio-colectivo-and-does-it-apply-to-your-employees">What is a convenio colectivo and does it apply to your employees?</a></li>
<li><a href="#what-are-spains-mandatory-leave-entitlements">What are Spain's mandatory leave entitlements?</a></li>
<li><a href="#how-does-sick-pay-work-in-spain">How does sick pay work in Spain?</a></li>
<li><a href="#what-are-the-severance-rules">What are the severance rules?</a></li>
<li><a href="#what-changed-in-spains-payroll-system-in-2026">What changed in Spain's payroll system in 2026?</a></li>
<li><a href="#how-do-you-register-as-an-employer-in-spain">How do you register as an employer in Spain?</a></li>
<li><a href="#frequently-asked-questions">Frequently asked questions</a></li>
</ol>`,
    author_id: 0,
    image_url: "/blog-images/payroll-in-spain.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 9,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "41,40,32,43",
    meta_title: "Payroll in Spain for International Employers (2026)",
    meta_description:
      "A practical guide to running payroll in Spain: employer social security rates, collective agreements, sick pay, severance, and what changes in 2026.",
    canonical_url: `https://jacksonandfrank.com/blog/${PAYROLL_SPAIN_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-07-08",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-07-08",
    updated_at: "2026-07-08",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260702,
    title: "EOR vs Local Entity in the Netherlands: Which Option Is Right?",
    slug: EOR_VS_ENTITY_NETHERLANDS_SLUG,
    excerpt:
      "Compare an Employer of Record and setting up a Dutch entity in the Netherlands: real cost, timeline, compliance, and the headcount at which an entity beats an EOR.",
    page_content: eorVsEntityNetherlandsBlogHtml,
    toc_html: `<ol>
<li><a href="#what-does-an-eor-do-in-the-netherlands">What does an EOR do in the Netherlands?</a></li>
<li><a href="#what-does-setting-up-a-dutch-entity-involve">What does setting up a Dutch entity involve?</a></li>
<li><a href="#how-much-does-each-option-cost">How much does each option cost?</a></li>
<li><a href="#how-long-does-each-option-take">How long does each option take?</a></li>
<li><a href="#what-dutch-employment-rules-apply-either-way">What Dutch employment rules apply either way?</a></li>
<li><a href="#what-headcount-makes-an-entity-worth-it">What headcount makes an entity worth it?</a></li>
<li><a href="#how-to-decide-between-eor-and-entity">How to decide between EOR and entity</a></li>
</ol>`,
    author_id: 0,
    image_url: "/blog-images/eor-vs-entity-netherlands.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 8,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "43,40,32",
    meta_title: "EOR vs Local Entity in the Netherlands (2026)",
    meta_description:
      "Compare Employer of Record and entity setup in the Netherlands: cost, timeline, compliance, and which model fits your headcount and stage.",
    canonical_url: `https://jacksonandfrank.com/blog/${EOR_VS_ENTITY_NETHERLANDS_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-07-02",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-07-02",
    updated_at: "2026-07-02",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260701,
    title: "How to Hire Your First Employee in Germany",
    slug: GERMANY_FIRST_HIRE_SLUG,
    excerpt:
      "A step-by-step 2026 guide to hiring your first employee in Germany: employer registration, compliant contracts, real employer costs, first-hire risks, and when an EOR beats setting up an entity.",
    page_content: germanyFirstHireBlogHtml,
    toc_html: `<ol>
<li><a href="#do-you-need-a-german-entity-to-hire-an-employee">Do you need a German entity to hire an employee?</a></li>
<li><a href="#how-do-you-register-as-an-employer-in-germany">How do you register as an employer in Germany?</a></li>
<li><a href="#what-must-a-german-employment-contract-include">What must a German employment contract include?</a></li>
<li><a href="#what-information-do-you-need-from-the-employee">What information do you need from the employee?</a></li>
<li><a href="#how-much-does-it-cost-to-employ-someone-in-germany">How much does it cost to employ someone in Germany?</a></li>
<li><a href="#what-are-the-main-compliance-risks-for-a-first-hire">What are the main compliance risks for a first hire?</a></li>
<li><a href="#eor-vs-entity-for-a-first-hire-in-germany">EOR vs entity for a first hire in Germany</a></li>
<li><a href="#frequently-asked-questions">Frequently asked questions</a></li>
</ol>`,
    author_id: 0,
    image_url: "/blog-images/germany-first-hire.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 7,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "43,40,32",
    meta_title: "How to Hire Your First Employee in Germany (2026 Guide)",
    meta_description:
      "Hiring your first employee in Germany in 2026: registration, compliant contracts, real employer costs, key risks, and when an EOR beats an entity.",
    canonical_url: `https://jacksonandfrank.com/blog/${GERMANY_FIRST_HIRE_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-07-01",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-07-01",
    updated_at: "2026-07-01",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260327,
    title: "France Public Holidays 2026: Pay Rules & Employer Guide",
    slug: FRANCE_PUBLIC_HOLIDAYS_2026_SLUG,
    excerpt:
      "All 11 official French public holidays for 2026, the mandatory 1 May double-pay rules, Alsace-Moselle extras, journée de solidarité obligations, and a compliance guide for foreign employers.",
    page_content: francePublicHolidays2026BlogHtml,
    author_id: 0,
    image_url: "/blog-images/france-public-holidays-2026.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 9,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "bank-holiday",
    meta_title: "France Public Holidays 2026: Pay & Employer Guide",
    meta_description:
      "France public holidays 2026: all 11 official dates, mandatory 1 May double-pay rules, Alsace-Moselle extras, journée de solidarité obligations, and a compliance guide for foreign employers.",
    canonical_url: `https://jacksonandfrank.com/blog/${FRANCE_PUBLIC_HOLIDAYS_2026_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-06-08",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-06-08",
    updated_at: "2026-06-08",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260608,
    title: "Poland Public Holidays 2026: Pay Rules & Employer Guide",
    slug: POLAND_PUBLIC_HOLIDAYS_2026_SLUG,
    excerpt:
      "All 14 statutory Polish public holidays for 2026, Saturday substitute day-off obligations, Labour Code pay rules, the new Christmas Eve holiday, and a compliance guide for international employers.",
    page_content: polandPublicHolidays2026BlogHtml,
    author_id: 0,
    image_url: "/blog-images/poland-public-holidays-2026.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 8,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "bank-holiday",
    meta_title: "Poland Public Holidays 2026: Pay & Employer Guide",
    meta_description:
      "Poland public holidays 2026: all 14 dates, Saturday substitute day-off obligations, Labour Code pay rules, the new Christmas Eve holiday (from 2025), and a compliance guide for international employers.",
    canonical_url: `https://jacksonandfrank.com/blog/${POLAND_PUBLIC_HOLIDAYS_2026_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-06-08",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-06-08",
    updated_at: "2026-06-08",
    author: { id: 0, name: "Vibhu Agarwal", email: "" },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260421,
    title:
      "Hiring your first European employee",
    slug: EMPLOYER_COST_EUROPE_SLUG,
    excerpt:
      "Real all-in employer costs in 13 European countries for 2026 updated salary anchors, 2025–26 regulatory changes, a comparison table, and hidden cost layers EOR and People teams should budget for.",
    page_content: employerCostEuropeBlogHtml,
    author_id: 0,
    image_url: "/blog-images/hiring-european-employee.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 24,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "global-hiring,payroll",
    meta_title:
      "Hiring your first European employee: the real cost reality check.",
    meta_description:
      "What an employee really costs in Europe: key facts, updated 2025 salary anchor table, €3,000 baseline comparison, UK 2025 NIC model, 13th/14th month markets, and 2026 planning notes.",
    canonical_url: `https://jacksonandfrank.com/blog/${EMPLOYER_COST_EUROPE_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-04-21",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-04-21",
    updated_at: "2026-04-21",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260413,
    title:
      "Entity vs EOR vs payroll registration in Europe: a decision matrix",
    slug: EUROPE_HIRING_ROUTES_DECISION_MATRIX_SLUG,
    excerpt:
      "Compare hiring options across 17+ European markets, with a decision matrix and checklist for the next 12 to 24 months.",
    page_content: europeHiringRoutesDecisionMatrixHtml,
    author_id: 0,
    image_url: "/blog-images/entity-vs-eor.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 14,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "global-hiring,eor,payroll",
    meta_title:
      "Entity vs EOR vs payroll in Europe | Decision matrix",
    meta_description:
      "Compare hiring options across 17+ European markets, with a decision matrix and checklist for the next 12 to 24 months.",
    canonical_url: `https://jacksonandfrank.com/blog/${EUROPE_HIRING_ROUTES_DECISION_MATRIX_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-04-13",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-04-13",
    updated_at: "2026-04-13",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260227,
    title: 'The "10 day work from anywhere" PE trap: Why the 183 day rule is a myth',
    slug: PE_TRAP_BLOG_SLUG,
    excerpt:
      "The 183 day rule is a myth. Learn how permanent establishment can be triggered in days and what the 2025 OECD update means for your remote work policy.",
    page_content: peTrapBlogContent,
    author_id: 0,
    image_url: "/blog-images/pe-trap.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 8,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "compliance,eor",
    meta_title:
      "Work from anywhere PE trap: why 183 day rule fails",
    meta_description:
      "Learn how permanent establishment risk can arise in days, how the 2025 OECD update changes fixed place tests, and what CFOs should do now.",
    canonical_url: `https://jacksonandfrank.com/blog/${PE_TRAP_BLOG_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026 02 27",
    created_by: 0,
    updated_by: 0,
    created_at: "2026 02 27",
    updated_at: "2026 02 27",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260326,
    title: "Netherlands public holidays 2026: dates, pay rules & employer guide",
    slug: NL_PUBLIC_HOLIDAYS_2026_SLUG,
    excerpt:
      "All 11 official Dutch public holidays for 2026, how CAOs and contracts set pay and time off, and what foreign employers hiring in the Netherlands need to plan for.",
    page_content: nlPublicHolidays2026Content,
    author_id: 0,
    image_url: "/blog-images/netherlands-holiday.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 4,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "bank-holiday",
    meta_title: "Netherlands public holidays 2026: dates, pay rules & employer guide",
    meta_description:
      "Netherlands public holidays 2026: all 11 official dates, employer pay obligations, CAO rules, and what foreign companies hiring Dutch staff need to know.",
    canonical_url: `https://jacksonandfrank.com/blog/${NL_PUBLIC_HOLIDAYS_2026_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026 03 26",
    created_by: 0,
    updated_by: 0,
    created_at: "2026 03 26",
    updated_at: "2026 03 26",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260331,
    title: "UK bank holidays 2026: dates, pay rules & employer guide",
    slug: UK_BANK_HOLIDAYS_2026_SLUG,
    excerpt:
      "Confirmed 2026 bank holidays for England & Wales, Scotland, and Northern Ireland, how contracts interact with the 5.6-week leave minimum, and what foreign employers must get right.",
    page_content: ukBankHolidays2026Content,
    author_id: 0,
    image_url: "/blog-images/uk-bank-holiday.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 5,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "bank-holiday",
    meta_title: "UK Bank Holidays 2026: Pay & Employer Guide",
    meta_description:
      "UK bank holidays 2026: confirmed dates for England, Wales, Scotland and Northern Ireland, employer pay obligations, statutory leave rules, and a guide for foreign companies hiring UK staff.",
    canonical_url: `https://jacksonandfrank.com/blog/${UK_BANK_HOLIDAYS_2026_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026 03 31",
    created_by: 0,
    updated_by: 0,
    created_at: "2026 03 31",
    updated_at: "2026 03 31",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260330,
    title: "Germany public holidays 2026: dates, pay rules & employer guide",
    slug: GERMANY_PUBLIC_HOLIDAYS_2026_SLUG,
    excerpt:
      "All 9 nationwide German public holidays for 2026, state-by-state extras, ArbZG and EFZG pay rules, and what foreign employers need to configure per employee location.",
    page_content: germanyPublicHolidays2026Content,
    author_id: 0,
    image_url: "/blog-images/germany-public-holiday.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 4,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "bank-holiday",
    meta_title: "Germany Public Holidays 2026: Pay & Employer Guide",
    meta_description:
      "Germany public holidays 2026: all 9 national dates, state-by-state regional holidays, employer pay obligations under the ArbZG and EFZG, and a guide for foreign companies hiring German staff.",
    canonical_url: `https://jacksonandfrank.com/blog/${GERMANY_PUBLIC_HOLIDAYS_2026_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026 03 30",
    created_by: 0,
    updated_by: 0,
    created_at: "2026 03 30",
    updated_at: "2026 03 30",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260429,
    title: "Belgium public holidays 2026",
    slug: BELGIUM_PUBLIC_HOLIDAYS_2026_SLUG,
    excerpt:
      "All 10 statutory Belgian public holidays for 2026, substitute day rules under the Public Holiday Act 1974, the 15 December workplace notice, and what foreign employers hiring in Belgium must comply with.",
    page_content: belgiumPublicHolidays2026BlogHtml,
    author_id: 0,
    image_url: "/blog-images/belgium-holiday.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 9,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "bank-holiday",
    meta_title: "Belgium public holidays 2026: Pay & Employer Guide",
    meta_description:
      "Belgium public holidays 2026: all 10 official dates, substitute day rules, employer obligations under the Public Holiday Act 1974, and a compliance guide for foreign companies hiring Belgian staff.",
    canonical_url: `https://jacksonandfrank.com/blog/${BELGIUM_PUBLIC_HOLIDAYS_2026_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-04-29",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-04-29",
    updated_at: "2026-04-29",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260329,
    title: "Spain public holidays 2026: dates, pay rules & employer guide",
    slug: SPAIN_PUBLIC_HOLIDAYS_2026_SLUG,
    excerpt:
      "Spain's 9 national festivos for 2026, the 14-day Workers' Statute framework, regional and local layers, and compliance steps for foreign employers.",
    page_content: spainPublicHolidays2026Content,
    author_id: 0,
    image_url: "/blog-images/spain-holiday.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 5,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "bank-holiday",
    meta_title: "Spain Public Holidays 2026: Pay & Employer Guide",
    meta_description:
      "Spain public holidays 2026: all 9 national festivos, regional variations by autonomous community, employer obligations under the Workers' Statute, and a compliance guide for foreign companies.",
    canonical_url: `https://jacksonandfrank.com/blog/${SPAIN_PUBLIC_HOLIDAYS_2026_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026 03 29",
    created_by: 0,
    updated_by: 0,
    created_at: "2026 03 29",
    updated_at: "2026 03 29",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20260430,
    title: "Italy Bank Holidays 2026",
    slug: ITALY_BANK_HOLIDAYS_2026_SLUG,
    excerpt:
      "Italy's 12 national public holidays for 2026, regional patron saint days, employment law obligations, and compliance requirements.",
    page_content: italyBankHolidays2026BlogHtml,
    author_id: 0,
    image_url: "/blog-images/Italy-Bank-Holidays-2026.avif",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 5,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "bank-holiday",
    meta_title: "Italy Bank Holidays 2026: Complete Guide to Public Holidays & Employment Law",
    meta_description:
      "Comprehensive guide to Italy's 12 national bank holidays in 2026, plus regional patron saint days, employment law obligations, and compliance requirements.",
    canonical_url: `https://jacksonandfrank.com/blog/${ITALY_BANK_HOLIDAYS_2026_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2026-04-30",
    created_by: 0,
    updated_by: 0,
    created_at: "2026-04-30",
    updated_at: "2026-04-30",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  },
  {
    id: 20250310,
    title: "Step-by-Step Guide to Getting a Work Visa in Europe (2026 Update)",
    slug: WORK_VISA_EUROPE_GUIDE_SLUG,
    excerpt:
      "Complete guide to work visas in Europe for 2026. Learn about EU Blue Card requirements, national work permits, visa-sponsored jobs, and EOR alternatives for non-EU professionals.",
    page_content: workVisaEuropeGuide2026BlogHtml,
    toc_html: `<ol>
<li><a href="#what-changed-for-european-work-visas-in-2026">What changed for European work visas in 2026?</a></li>
<li><a href="#work-visa-salary-thresholds-by-country-2026">What are the 2026 work visa salary thresholds by country?</a></li>
<li><a href="#which-european-work-visa-route-fits-my-situation">Which European work visa route fits my situation?</a></li>
<li class="toc-has-children">
<a href="#which-european-countries-have-the-best-work-visa-routes-in-2026">Which European countries have the best work visa routes in 2026?</a>
<ol>
<li><a href="#germany-work-visa-2026">Germany work visa routes in 2026</a></li>
<li><a href="#netherlands-highly-skilled-migrant-2026">Netherlands Highly Skilled Migrant visa 2026</a></li>
<li><a href="#france-talent-passport-eu-blue-card-2026">France Talent Passport &amp; EU Blue Card 2026</a></li>
<li><a href="#portugal-d7-vs-digital-nomad-visa">Portugal D7 vs Digital Nomad visa 2026</a></li>
<li><a href="#spain-work-visa-2026">Spain work visa routes in 2026</a></li>
<li><a href="#poland-work-permit-2026">Poland work permit routes in 2026</a></li>
<li><a href="#czech-republic-work-visa-2026">Czech Republic work visa routes in 2026</a></li>
<li><a href="#ireland-critical-skills-permit-2026">Ireland Critical Skills Employment Permit 2026</a></li>
<li><a href="#belgium-work-permit-2026">Belgium work permit routes in 2026</a></li>
<li><a href="#uk-skilled-worker-visa-2026">UK Skilled Worker visa requirements 2026</a></li>
<li><a href="#italy-decreto-flussi-2026">Italy Decreto Flussi work visa 2026</a></li>
</ol>
</li>
</ol>`,
    author_id: 0,
    image_url: "/blog-images/work-visa-in-europe.webp",
    page_type: "BLOG",
    featured_page: 0,
    estimated_reading_time: 25,
    related_article_ids: "",
    tag_ids: "",
    category_ids: "immigration",
    meta_title: "Work Visa in Europe: Complete Guide 2026",
    meta_description:
      "Complete guide to work visas in Europe for 2026. Learn about visa requirements, application processes, and legal hiring routes for non-EU professionals.",
    canonical_url: `https://jacksonandfrank.com/blog/${WORK_VISA_EUROPE_GUIDE_SLUG}`,
    status: "PUBLISHED",
    publish_date: "2025-03-10",
    created_by: 0,
    updated_by: 0,
    created_at: "2025-03-10",
    updated_at: "2026-05-13",
    author: {
      id: 0,
      name: "Vibhu Agarwal",
      email: "",
    },
    related_articles: [],
    featuredServiceData: [],
    otherServiceData: [],
    recommendedBlogsData: [],
  }

];

export interface ManualFAQItem {
  question: string;
  answer: string;
}

export interface ManualBlogFaq {
  title: string;
  subtitle: string;
  items: ManualFAQItem[];
}

const MANUAL_BLOG_FAQ: Record<string, ManualBlogFaq> = {
  [HIRING_FIRST_EMPLOYEE_UK_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Hiring your first employee in the UK",
    items: [
      {
        question: "Can I hire an employee in the UK without a UK company?",
        answer:
          "Yes. An Employer of Record (EOR) with a registered UK entity can employ someone on your behalf, handling the employment contract, PAYE, National Insurance, and pension auto-enrolment. You direct the work; they handle the legal employer relationship. This is a fully compliant route for international companies making their first UK hire without a local entity.",
      },
      {
        question: "What is the National Living Wage in the UK in 2026?",
        answer:
          "From 1 April 2026, the National Living Wage is £12.71 per hour for workers aged 21 and over. For workers aged 18 to 20, the National Minimum Wage is £10.85 per hour. These rates are reviewed annually by the Low Pay Commission. If a collective agreement applies to your sector, the effective minimum may be higher.",
      },
      {
        question: "How much does it cost to employ someone in the UK?",
        answer:
          "On top of gross salary, employer National Insurance contributions add 15% on earnings above £5,000 per year. Adding the mandatory employer pension contribution of 3% of qualifying earnings, total on-costs are approximately 18% to 20% above gross salary for most professional roles. From April 2026, statutory sick pay is payable from the first day of sickness absence: removing the three-day waiting period increases the practical cost of short-term illness.",
      },
      {
        question: "What is IR35 and does it affect my UK hiring?",
        answer:
          "IR35 (off-payroll working rules) targets disguised employment, where a worker provides services through a personal service company but the working relationship is functionally that of an employee. If you engage a contractor in the UK, you are responsible for assessing IR35 status. Getting this wrong exposes you to unpaid income tax and National Insurance liabilities. For most international companies making their first UK hire, EOR or direct employment is a simpler and lower-risk structure.",
      },
      {
        question: "Do I need a sponsor licence to hire someone from abroad?",
        answer:
          "Yes, if the person is a non-UK, non-Irish national without existing UK work authorisation. A Home Office Sponsor Licence is required before you can issue a Certificate of Sponsorship under the Skilled Worker route. Standard processing takes around 8 weeks. The licence must be in place before any visa application is submitted.",
      },
    ],
  },
  [HIRING_FIRST_EMPLOYEE_NETHERLANDS_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Hiring your first employee in the Netherlands",
    items: [
      {
        question: "Can I hire an employee in the Netherlands without a Dutch company?",
        answer:
          "Yes. You can use an Employer of Record (EOR) with a registered Dutch entity to employ someone on your behalf. The EOR acts as the legal employer, handling the employment contract, payroll, and social security. You maintain day-to-day management of the employee's work. This is a common and legally compliant route for international companies making their first Dutch hire without a local entity.",
      },
      {
        question: "What is the minimum salary for employees in the Netherlands in 2026?",
        answer:
          "The statutory minimum hourly wage from 1 January 2026 is €14.71 for employees aged 21 and over. The minimum wage is reviewed and updated twice per year. If a collective labour agreement (CAO) applies to your sector, the minimum salary under the CAO may be higher than the statutory floor.",
      },
      {
        question: "How much does it cost to employ someone in the Netherlands?",
        answer:
          "On top of gross salary, employers pay social security contributions that typically add 18% to 25% to the total employment cost. The main contributions are unemployment insurance (AWf), disability insurance (Aof), a return-to-work premium (Whk), and a childcare contribution. You must also pay the statutory holiday allowance of 8% of annual gross salary. For fixed-term contracts, the AWf contribution rate is 7.74% compared to 2.74% for permanent contracts, a meaningful cost difference.",
      },
      {
        question: "What happens if my employee is sick in the Netherlands?",
        answer:
          "Dutch law requires employers to continue paying sick employees for up to two years, not six weeks or three months as is common in other markets. During the first year, most employers pay 100% of salary; in the second year, at least 70% is required. The employer also has reintegration obligations during this period. This two-year sick pay exposure is one of the most important compliance considerations for companies new to Dutch employment.",
      },
      {
        question: "Do I need to offer a permanent contract straight away?",
        answer:
          "No. You can hire on a fixed-term contract, but Dutch chain rules mean the employee must receive a permanent contract after three consecutive fixed-term contracts or after three years of consecutive employment. There is also no probation period allowed for contracts of six months or less, so very short contracts offer limited flexibility at the end.",
      },
    ],
  },
  [PAYROLL_SPAIN_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Running payroll in Spain",
    items: [
      {
        question: "What is the total employer cost on top of salary in Spain?",
        answer:
          "For a standard indefinite contract, budget approximately 30% to 35% on top of gross salary in employer social security contributions. For a €3,000 gross monthly salary, this adds around €900 to €1,050 per month in employer costs.",
      },
      {
        question: "What is a convenio colectivo and do I need to follow it?",
        answer:
          "A convenio colectivo is an industry or sector collective bargaining agreement that sets minimum pay, leave, and working conditions above the national statutory floor. Around 87% of Spanish employees are covered by one. Identifying the applicable convenio and building it into the contract before hiring is essential, non-compliance is not treated as a technicality.",
      },
      {
        question: "What is the minimum wage in Spain in 2026?",
        answer:
          "The confirmed 2026 minimum wage is €1,221 per month (€17,094 per year gross), set by Royal Decree 126/2026 of 18 February 2026.",
      },
      {
        question: "What is the maximum social security contribution base?",
        answer:
          "For 2026, the maximum monthly contribution base is €5,101.20. Contributions are only calculated on salary up to this ceiling, which provides cost predictability for high-salary roles.",
      },
      {
        question: "How is severance calculated in Spain?",
        answer:
          "Objective dismissal is 20 days of salary per year of service, capped at 12 monthly payments. Unfair dismissal is 33 days per year, capped at 24 monthly payments. All departures also require a finiquito settlement covering outstanding leave, proportional bonuses, and expenses.",
      },
      {
        question: "Can I hire in Spain without setting up a Spanish entity?",
        answer:
          "Yes. An Employer of Record holds the legal employer relationship and handles registration, payroll, and compliance on your behalf. This is the standard route for a first hire or small initial team before an entity is justified by headcount.",
      },
      {
        question: "What are Spain's annual leave entitlements?",
        answer:
          "The statutory minimum is 30 calendar days per year (22 to 23 working days). Most convenios provide 25 working days or more. Public holidays, up to 14 per year, are separate from annual leave.",
      },
    ],
  },
  [EOR_VS_ENTITY_NETHERLANDS_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "EOR vs local entity in the Netherlands",
    items: [
      {
        question: "Can I hire someone in the Netherlands without setting up a Dutch entity?",
        answer:
          "Yes. An Employer of Record employs the person on your behalf using its own Dutch entity, which means you do not need to register your own. This is the standard route for companies hiring their first one or two employees in the Netherlands without committing to full entity setup.",
      },
      {
        question: "How long does it take to set up a Dutch B.V.?",
        answer:
          "Entity incorporation in the Netherlands typically takes 4 to 12 weeks, depending on the complexity of your structure and how quickly legal and notary steps can be completed. KVK registration itself is fast; the delay is usually in the surrounding legal and tax setup work that needs to happen before you can employ anyone.",
      },
      {
        question: "What are employer social security contributions in the Netherlands?",
        answer:
          "Dutch employer contributions typically add 25% to 36% on top of gross salary, covering unemployment insurance, disability insurance, and other statutory contributions. This applies regardless of whether you employ through an EOR or your own entity; it is a feature of Dutch law, not a vendor charge.",
      },
      {
        question: "What is a CAO and does it apply to my employees?",
        answer:
          "A CAO (Collectieve Arbeidsovereenkomst) is an industry-wide collective labour agreement that sets minimum pay scales, working hours, overtime rates, and leave entitlements for employees in a given sector. Many Dutch industries are governed by one. Whether your employees fall within scope of a CAO depends on their role and sector and needs to be confirmed before the employment contract is signed, not after.",
      },
      {
        question: "At what headcount does a Dutch entity make more sense than an EOR?",
        answer:
          "There is no fixed legal threshold, but entity setup tends to become economically rational in the range of 10 to 20 employees. Below that, the fixed overhead of running your own Dutch payroll and compliance function usually costs more than EOR service fees. Growth plans matter too: if you are planning to scale quickly, earlier entity setup may avoid the cost and friction of migrating contracts later.",
      },
      {
        question: "What happens to sick pay if an employee is off for a long period?",
        answer:
          "Dutch law requires employers to continue paying a sick employee for up to two years, at a minimum of 70% of salary. The first year is often 100% under applicable CAOs. This obligation sits with the legal employer; through an EOR it sits with the EOR, not with you directly, though costs are typically passed through.",
      },
      {
        question: "Can we switch from EOR to a Dutch entity later?",
        answer:
          "Yes, and many companies do. The process involves transferring employment contracts from the EOR's Dutch entity to your own, which requires careful handling of notice periods, employee communication, and contract continuity. Planning this transition from the start, ideally before the EOR relationship begins, makes it significantly smoother than retrofitting it later.",
      },
      {
        question: "Do works councils apply to EOR employees?",
        answer:
          "Works council obligations in the Netherlands are triggered at 50 or more employees working under a single employer. When employees are employed through an EOR, the legal employer is the EOR, which affects how the threshold is counted. This is worth clarifying with your EOR provider early if you are approaching that headcount range.",
      },
    ],
  },
  [GERMANY_FIRST_HIRE_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Hiring your first employee in Germany",
    items: [
      {
        question: "Do I need a German entity to hire one employee?",
        answer:
          "No. An Employer of Record can employ that person on your behalf without you registering a German entity, which is the standard route for a first hire or small initial team.",
      },
      {
        question: "How long does it take to hire someone directly in Germany?",
        answer:
          "Once an entity is registered with the tax office, Federal Employment Agency, and Berufsgenossenschaft, ongoing hires are faster because the Betriebsnummer is reused. The first registration round, plus entity setup if starting from scratch, typically takes several weeks.",
      },
      {
        question: "What is the employer cost on top of salary in Germany?",
        answer:
          "Budget approximately 19% to 22% of gross salary in employer social security contributions, on top of the salary itself. A €60,000 gross salary typically costs €72,000 to €74,000 in total before bonuses or benefits.",
      },
      {
        question: "When does dismissal protection apply to a new hire?",
        answer:
          "Standard statutory dismissal protection under the Kündigungsschutzgesetz applies after six months of continuous employment, once probation has ended.",
      },
    ],
  },
  [EMPLOYER_COST_EUROPE_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Employer cost and total employment cost in Europe",
    items: [
      {
        question: "Which country has the lowest statutory employer-side payroll cost in this sample?",
        answer:
          "Romania is the lowest employer-side payroll cost system in this sample. The salary anchor model shows CAM at 2.25%, rounded to 2.3% for that table, which keeps Romania well below the employer-side cost burden seen in most of Western Europe.",
      },
      {
        question: "Why does Spain often look more expensive than its base employer contribution rate suggests?",
        answer:
          "Spain is often budgeted as a 14-payment system. Employers fund 12 regular monthly payments plus two extra payments, so the annual salary base is already higher before employer social contributions are applied. High earners can also trigger the solidarity contribution above the maximum contribution base.",
      },
      {
        question: "What changed in the United Kingdom after April 2025?",
        answer:
          "The United Kingdom increased the employer NIC rate from 13.8% to 15% and cut the secondary threshold from £9,100 to £5,000. When combined with the minimum employer auto-enrolment pension, a typical modelled total on-cost is about 22% rather than the older 18% figure.",
      },
      {
        question: "Why can Sweden's real employer cost exceed the 31.42% statutory rate?",
        answer:
          "Sweden’s statutory employer contribution is 31.42%, but many employers also operate within collective agreements. Those agreements often add occupational pension and insurance contributions, which can push the real budgeted cost several points above the statutory base.",
      },
      {
        question: "What is the main hidden cost to watch in the Netherlands and Italy?",
        answer:
          "In the Netherlands, the major structural cost is the mandatory 8% holiday allowance, along with long sickness continuation exposure. In Italy, the biggest hidden budget item is TFR, the mandatory severance accrual, combined with a common 13th-month (or 14th-month) pay structure.",
      },
      {
        question: "Should this article be used as a payroll engine?",
        answer:
          "No. This page is a strategic primer for planning and comparison. Actual payroll cost depends on sector agreements, company size, insurer class, salary structure, exchange rates, and local compliance details, so country-specific payroll validation is still necessary before hiring.",
      },
    ],
  },
  [EUROPE_HIRING_ROUTES_DECISION_MATRIX_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Entity, EOR, and foreign employer registration in Europe",
    items: [
      {
        question: "Is payroll registration the same as having a local entity?",
        answer:
          "No. A local entity is a separate legal presence that can enter contracts, invoice locally, and support a full commercial operation. Foreign employer registration covers employment and payroll-related obligations only, keeping the foreign company as legal employer without creating a local trading presence.",
      },
      {
        question: "Is EOR just outsourced payroll?",
        answer:
          "No. A payroll provider processes pay but the employer relationship stays with your company. An EOR becomes the legal employer, holds the employment contract, manages compliance, and takes on employment-related liability. The distinction matters because it changes who is legally responsible for the employment relationship.",
      },
      {
        question: "Can one hiring model work across all European countries?",
        answer:
          "Rarely. EOR availability and quality vary by market. Foreign employer registration is not equally accessible everywhere. Entity setup timelines and costs differ significantly. A multi-country expansion typically requires a country-by-country assessment rather than a single model applied uniformly.",
      },
      {
        question: "When should a company move from EOR to entity?",
        answer:
          "Common signals include reaching five or more employees in a country, cumulative EOR fees approaching entity running costs, a need for local contracting or commercial presence, or a defined long-term commitment to the market. The transition is manageable with the right planning but does involve rehiring employees under new contracts and setting up local infrastructure, so starting the conversation early makes it considerably smoother.",
      },
      {
        question: "Does direct registration remove local complexity?",
        answer:
          "No. Registering as a foreign employer means your company takes on local compliance directly. Payroll rules, tax withholding, and social security filing obligations still apply and still need to be managed correctly. The registration removes the need to incorporate fully. It does not reduce what you owe locally or eliminate the need for local expertise.",
      },
    ],
  },
  [PE_TRAP_BLOG_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Common questions about permanent establishment risk for remote teams",
    items: [
      {
        question: "Can a remote worker trigger permanent establishment in less than 183 days?",
        answer:
          "Yes. Under many bilateral tax treaties, particularly those based on the UN Model Convention, a services PE can arise after as few as 90 to 120 days. Dependent agent PE has no day threshold at all and can be triggered by activities such as habitually concluding contracts abroad.",
      },
      {
        question: "What is the difference between fixed place of business PE and dependent agent PE?",
        answer:
          "Fixed place of business PE requires a physical location with sufficient permanence through which business is carried on. Dependent agent PE arises when a person habitually concludes contracts or plays the principal role in contract conclusion on behalf of an enterprise, even without a fixed office.",
      },
      {
        question: "What did the 2025 OECD update change about PE for remote workers?",
        answer:
          "The November 2025 update introduced a two part framework for fixed place of business PE: a 50% working time benchmark and a commercial reason test. It did not update dependent agent PE guidance.",
      },
      {
        question: "Does a company director working abroad create a permanent establishment?",
        answer:
          "Potentially, yes. Directors and key executives receive greater scrutiny under both PE types. If they are central to business operations or have authority to conclude contracts, PE risk is materially higher.",
      },
    ],
  },
  [NL_PUBLIC_HOLIDAYS_2026_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Netherlands public holidays 2026 for employers and HR teams",
    items: [
      {
        question: "How many public holidays are there in the Netherlands in 2026?",
        answer:
          "There are 11 official public holidays (feestdagen) in the Netherlands in 2026, as confirmed by the Dutch central government. They run from New Year's Day on 1 January through Boxing Day on 26 December, including Christian observances and national days such as King's Day and Liberation Day.",
      },
      {
        question: "Are employees in the Netherlands entitled to paid time off on public holidays?",
        answer:
          "No. Dutch law does not grant a statutory right to paid time off on public holidays. Whether someone gets a paid day off depends on their employment contract or the sector-level CAO. In practice many employees do get those days off, but that is contractual, not statutory.",
      },
      {
        question: "What happens when a public holiday falls on a weekend in the Netherlands?",
        answer:
          "Dutch law does not automatically give a substitute day off when a public holiday falls on Saturday or Sunday. In 2026, Boxing Day (26 December) is a Saturday; replacement rules come from the CAO or contract. Legal and payroll deadlines that fall on a weekend or public holiday move to the next working day.",
      },
      {
        question: "Are public holidays the same across all regions of the Netherlands?",
        answer:
          "Yes. The Netherlands has one national list; there are no province-specific public holidays like in some neighbouring countries. CAOs still create practical differences (for example, Liberation Day (5 May) is often a paid day off only once every five years under many CAOs).",
      },
      {
        question: "As a foreign employer, do I need to observe the Netherlands' public holidays?",
        answer:
          "If you employ workers based in the Netherlands, Dutch employment law applies regardless of where your company is incorporated. You must follow the applicable CAO for paid leave on holidays, payroll, and related rules. Many foreign employers without a Dutch entity use an Employer of Record (EOR) to meet these obligations.",
      },
    ],
  },
  [SPAIN_PUBLIC_HOLIDAYS_2026_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Spain public holidays 2026 for employers and HR teams",
    items: [
      {
        question: "How many public holidays are there in Spain in 2026?",
        answer:
          "Each worker can receive up to 14 paid, non-recoverable public holidays (festivos laborales) in 2026 under Workers' Statute Article 37.2. Nine are nationwide; the rest are regional and local days set by the autonomous community and municipality. The exact mix depends on the employee's place of work.",
      },
      {
        question: "Are employees in Spain legally entitled to paid time off on public holidays?",
        answer:
          "Yes. Article 37.2 of the Workers' Statute treats recognised public holidays as paid and non-recoverable (retribuidos y no recuperables) within the 14-day framework. Employers cannot require staff to make up ordinary hours simply because a festivo was observed.",
      },
      {
        question: "What happens when a public holiday falls on a weekend in Spain?",
        answer:
          "There is no single national automatic substitute day. Many autonomous communities formally transfer observance to the following Monday (for example for All Saints' Day and Constitution Day in 2026 in most regions). Always confirm the decree for each community where you employ people.",
      },
      {
        question: "Are public holidays the same across all regions of Spain?",
        answer:
          "No. There are 9 nationwide holidays, up to 3 extra regional days per autonomous community, and 2 local municipal holidays. A worker in Catalonia and one in the Basque Country will typically differ beyond the shared national dates.",
      },
      {
        question: "As a foreign employer, do I need to observe Spain's regional public holidays?",
        answer:
          "Yes. The calendar for each employee's place of work applies in full, including regional and local holidays. You must also prepare and consult on the annual work calendar (calendario laboral anual) under Article 34.6. Many companies without a Spanish entity use an EOR to manage convenio rules, registro horario, and multi-region calendars.",
      },
    ],
  },
  [GERMANY_PUBLIC_HOLIDAYS_2026_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Germany public holidays 2026 for employers and HR teams",
    items: [
      {
        question: "How many public holidays are there in Germany in 2026?",
        answer:
          "There are 9 nationwide public holidays in all 16 federal states. States add their own dates, so totals range from about 10 to 13 depending on location (Bavaria reaches up to about 13). Only German Unity Day (3 October) is set by federal statute as a national public holiday.",
      },
      {
        question: "Are employees in Germany legally entitled to paid time off on public holidays?",
        answer:
          "Yes. The Working Hours Act (ArbZG, Section 9) requires employers to release employees from work on applicable holidays. The Continued Remuneration Act (EFZG, Section 2) requires full regular pay for working time lost because of a public holiday. Public holidays do not reduce statutory annual leave under the Bundesurlaubsgesetz.",
      },
      {
        question: "What happens when a public holiday falls on a weekend in Germany?",
        answer:
          "There is no statutory right to a substitute day when a holiday falls on Saturday or Sunday. In 2026, examples include German Unity Day (3 October, Saturday) and the Second Day of Christmas (26 December, Saturday). Collective agreements or employment contracts may provide replacements.",
      },
      {
        question: "Are public holidays the same across all regions of Germany?",
        answer:
          "No. Each Bundesland sets its own additional holidays. Only the 9 national dates are common to every state; Bavaria, for example, observes several extra religious or regional days that northern states may not share. The employee's regular place of work determines which list applies.",
      },
      {
        question: "As a foreign employer, do I need to observe Germany's state-specific public holidays?",
        answer:
          "Yes. If employees are based in Germany, the law of the state where each person works applies, regardless of where your company is registered. A remote worker in Bavaria gets Bavaria's calendar even if the employer is abroad. EOR providers often manage state-level calendars, ArbZG compliance, and applicable Tarifverträge.",
      },
    ],
  },
  [UK_BANK_HOLIDAYS_2026_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "UK bank holidays 2026 for employers and HR teams",
    items: [
      {
        question: "How many bank holidays are there in the UK in 2026?",
        answer:
          "It varies by nation. England and Wales have 8 bank holidays, Scotland has 9 (including 2 January and St Andrew's Day, but not Easter Monday), and Northern Ireland has 10 (including St Patrick's Day on 17 March and the Battle of the Boyne substitute on 13 July in 2026). Boxing Day is Saturday 26 December, so the substitute bank holiday is Monday 28 December across all nations. Confirm dates on GOV.UK.",
      },
      {
        question: "Are employees in the UK legally entitled to paid time off on bank holidays?",
        answer:
          "Not automatically. There is no general statutory right to take bank holidays off; it depends on the employment contract. The law requires at least 5.6 weeks (28 days for a five-day week) of paid annual leave under the Working Time Regulations 1998. The contract states whether bank holidays count toward that minimum or are in addition to it. Most contracts do give those days off in practice.",
      },
      {
        question: "What happens when a UK bank holiday falls on a weekend?",
        answer:
          "A substitute weekday normally becomes the bank holiday, often the following Monday. In 2026, Boxing Day (26 December, Saturday) is observed as a bank holiday on Monday 28 December everywhere in the UK. In Northern Ireland, the Battle of the Boyne falls on Sunday 12 July; the substitute is Monday 13 July. Workers take the substitute day, not the weekend date.",
      },
      {
        question: "Are bank holidays the same across all parts of the UK?",
        answer:
          "No. England and Wales share 8 dates. Scotland has 9 and does not observe Easter Monday but does observe 2 January and St Andrew's Day; its summer bank holiday is the first Monday in August. Northern Ireland has 10, including St Patrick's Day and the Battle of the Boyne. Use the correct calendar for each employee's place of work.",
      },
      {
        question: "As a foreign employer, do I need to observe UK bank holidays for my UK employees?",
        answer:
          "You must meet UK employment law, including the 5.6-week paid leave minimum and correct holiday pay rules. There is no automatic statutory duty to give every bank holiday off; that follows from the contract. You should still align practice with the contract and the applicable national calendar. Many foreign employers without a UK entity use an EOR to handle contracts, holiday pay, and multi-nation UK calendars.",
      },
    ],
  },
  [BELGIUM_PUBLIC_HOLIDAYS_2026_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Belgium public holidays 2026 for employers and HR teams",
    items: [
      {
        question: "How many public holidays are there in Belgium in 2026?",
        answer:
          "Belgium has 10 statutory public holidays (jours fériés légaux / wettelijke feestdagen) in 2026, governed by the Public Holiday Act of 4 January 1974. Belgium's three Communities and three Regions each observe their own official celebration day, but those are not statutory paid public holidays under Belgian labour law. Entitlement to paid leave on those days depends on the applicable collective labour agreement.",
      },
      {
        question: "Are employees in Belgium legally entitled to paid time off on public holidays?",
        answer:
          "Yes. Under the Belgian Public Holiday Act of 4 January 1974, employees cannot be required to work on any of the 10 statutory public holidays. The employer must pay full salary for each public holiday, including any bonuses and benefits the employee would have received had they worked that day. The same pay obligation applies to substitute days and compensatory rest days.",
      },
      {
        question: "What happens when a public holiday falls on a weekend in Belgium?",
        answer:
          "If a public holiday falls on a Sunday or on any day that is normally non-working in the company (usually Saturday), it must be replaced by a paid substitute day on a regular working day. In 2026, Assumption of Mary (Saturday, 15 August) and All Saints' Day (Sunday, 1 November) both require substitute days. These must be granted within the 2026 calendar year and cannot be carried over to 2027. Employers must post a signed and dated workplace notice indicating substitute days before 15 December of the preceding year.",
      },
      {
        question: "Are public holidays the same across all regions of Belgium?",
        answer:
          "The 10 statutory public holidays are the same nationwide. However, each Community and Region has its own official celebration day (for example Flemish Community Day on 11 July and French Community Day on 27 September). These are not statutory paid public holidays under Belgian labour law, but many sector-level collective agreements grant paid leave on these days. Entitlement depends on the applicable joint committee (comité paritaire) agreement for the relevant sector.",
      },
      {
        question: "As a foreign employer, do I need to observe Belgium's public holidays?",
        answer:
          "Yes. If you employ or post workers in Belgium, Belgian public holiday law applies in full, including substitute days, the workplace notice by 15 December each year, and full remuneration for public holidays and substitute days. The LIMOSA declaration is mandatory for posted workers before posting begins. Foreign employers without a Belgian legal entity commonly use an Employer of Record (EOR) to manage these obligations.",
      },
    ],
  },
  [ITALY_BANK_HOLIDAYS_2026_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "Italy bank holidays 2026 for employers and HR teams",
    items: [
      {
        question: "How many bank holidays does Italy have in 2026?",
        answer:
          "Italy has 12 national public holidays (festività) in 2026. In addition to these national holidays, each Italian municipality celebrates its own patron saint day as an additional paid public holiday, bringing the total to 13 paid days off for most employees.",
      },
      {
        question: "Are employees in Italy paid for public holidays?",
        answer:
          "Yes, employees in Italy are entitled to full pay for all national public holidays under Italian labor law (Article 2109 of the Civil Code). This applies to both permanent and fixed-term employees. Employees who are required to work on a public holiday are entitled to their normal pay plus an additional premium payment, typically 30-60% extra depending on the collective bargaining agreement.",
      },
      {
        question: "What is Ferragosto and why is it important?",
        answer:
          "Ferragosto is Italy's most important summer holiday, celebrated on August 15 (Assumption of Mary). It marks the peak of the Italian summer vacation period when many businesses, shops, and restaurants close for 1-3 weeks. The tradition dates back to ancient Rome and is now a protected public holiday under Italian law. Employers must plan carefully around this period as workforce availability is typically very limited.",
      },
      {
        question: "Do regional holidays count as bank holidays in Italy?",
        answer:
          "Yes, each Italian municipality designates its patron saint day as an official paid public holiday, in addition to the 12 national holidays. For example, Milan celebrates Sant'Ambrogio on December 7, Rome celebrates Saints Peter and Paul on June 29, and Florence celebrates San Giovanni on June 24. Employers must observe the patron saint day relevant to the workplace location.",
      },
      {
        question: "What happens if a bank holiday falls on a weekend in Italy?",
        answer:
          "Italian labor law does not provide for substitute holidays when a public holiday falls on a weekend. In 2026, two national holidays fall on Saturdays (January 1 and June 2) and two fall on Sundays (January 6 and April 5). Employees do not receive an alternative day off, though this may be addressed in some collective bargaining agreements.",
      },
      {
        question: "Can employers require staff to work on Italian public holidays?",
        answer:
          "Employers can require employees to work on public holidays only if permitted by the applicable collective bargaining agreement (CCNL) and typically only in essential services sectors such as healthcare, hospitality, transport, and retail. Employees who work on public holidays must receive their normal wage plus a premium supplement (typically 30-60% extra) and may be entitled to a compensatory rest day, depending on the CCNL terms.",
      },
    ],
  },
  [FRANCE_PUBLIC_HOLIDAYS_2026_SLUG]: {
    title: "Frequently asked questions",
    subtitle: "France public holidays 2026 for employers and HR teams",
    items: [
      {
        question: "How many public holidays are there in France in 2026?",
        answer:
          "France has 11 national public holidays (jours fériés légaux) in 2026 under Code du travail Article L3133-1. Employees in the departments of Bas-Rhin, Haut-Rhin, and Moselle (Alsace-Moselle) benefit from 13, with Good Friday and St Stephen's Day as additional holidays under local law. Employees in certain overseas territories (DROM) also observe an additional holiday commemorating the abolition of slavery, on varying dates by territory.",
      },
      {
        question: "Are employees in France legally entitled to paid time off on public holidays?",
        answer:
          "Only 1 May is legally mandated as a non-working day for all employees. For the other 10 national holidays, whether employees have the day off depends on the applicable convention collective, branch agreement, or company agreement — or, in the absence of any agreement, on the employer's decision. When a non-working holiday applies, employees with at least 3 months' seniority must receive full pay with no reduction (Code du travail L3133-3).",
      },
      {
        question: "What are the pay rules for working on a public holiday in France?",
        answer:
          "The rules differ sharply between 1 May and the other 10 holidays. Working on 1 May is subject to mandatory double pay (doublement de salaire) under Code du travail L3133-6 — this cannot be replaced by compensatory rest, and no collective agreement can override it. For all other public holidays, there is no statutory obligation to pay a supplement for working on those days. Any pay uplift depends on what the applicable convention collective provides.",
      },
      {
        question: "What happens when a public holiday falls on a weekend in France?",
        answer:
          "Nothing automatically. France does not transfer public holidays falling on a Saturday or Sunday to the following Monday. In 2026, the Assumption (15 August) falls on a Saturday and All Saints' Day (1 November) falls on a Sunday — in both cases, employees have no automatic entitlement to a substitute rest day. A convention collective or company agreement can provide more favourable rules, but there is no statutory default transfer.",
      },
      {
        question: "As a foreign employer, do I need to observe France's public holidays for my French employees?",
        answer:
          "Yes. French employment law applies in full to employees based in France. The 1 May mandatory non-working status and double-pay obligation apply regardless of the employer's country of registration. For the other 10 holidays, your obligations depend on the convention collective applicable to your sector. You must also correctly implement the journée de solidarité (one unpaid working day per year) and, for employees in Alsace-Moselle, apply the local law giving 13 holidays. An Employer of Record (EOR) can manage all these obligations on your behalf.",
      },
    ],
  },
  [WORK_VISA_EUROPE_GUIDE_SLUG]: {
    title: "Work visa in Europe FAQs",
    subtitle: "Common questions about European work visas, salary thresholds, and hiring routes in 2026",
    items: [
      {
        question: "Is there one work visa for Europe?",
        answer:
          "No. There is no single work visa that covers all of Europe. Most work visas are issued by individual countries, each with its own salary thresholds, sponsor rules, application process, and residence conditions. The EU Blue Card offers a shared framework for highly qualified workers, but each participating country still applies national rules.",
      },
      {
        question: "Which European countries offer work visas without a job offer?",
        answer:
          "Some European routes do not require a local job offer before applying, but they are usually not standard employment visas. Examples include Germany's Opportunity Card for jobseekers, Portugal's D7 passive income route, Portugal's Digital Nomad visa, Spain's Digital Nomad visa, and some startup or entrepreneur routes. These routes still have income, qualification, insurance, or business-plan requirements.",
      },
      {
        question: "What is the EU Blue Card salary threshold in 2026?",
        answer:
          "There is no single EU-wide Blue Card salary threshold. Each participating country sets its own amount within the EU framework. For example, Germany's 2026 EU Blue Card threshold is €50,700 gross per year, with a lower €45,934.20 threshold for shortage occupations and new entrants. Always check the official threshold for the country where the employee will work.",
      },
      {
        question: "Is the EU Blue Card valid in every EU country?",
        answer:
          "No. The EU Blue Card applies in 25 of the 27 EU Member States. It does not apply in Denmark or Ireland. A Blue Card is also not one single permit for the whole EU. It is issued by a specific country, and mobility to another EU country depends on the applicable Blue Card rules.",
      },
      {
        question: "Can I work in Europe with ETIAS?",
        answer:
          "No. ETIAS is not a work visa and does not give you the right to work in Europe. It is a travel authorisation for short stays in European countries that require ETIAS. If you plan to work in Europe, you usually need a work visa, residence permit, or another country-specific authorisation.",
      },
      {
        question: "What is the difference between Portugal D7 and the Digital Nomad visa?",
        answer:
          "Portugal's D7 route is generally used by people with stable passive income, such as pension, rental, investment, or similar non-employment income. Portugal's Digital Nomad visa is for people who want to live in Portugal while working remotely for an employer or clients outside Portugal. The right route depends on whether your income is passive or comes from active remote work.",
      },
      {
        question: "Can an EOR sponsor or support a work visa in Europe?",
        answer:
          "It depends on the country and visa route. In some countries, an Employer of Record or local employment partner can support compliant employment, payroll, immigration coordination, and document preparation. In other countries, the sponsor must meet specific local requirements, such as recognised sponsor status or a licensed sponsor system. Always check the rules for the destination country before relying on an EOR-supported route.",
      },
      {
        question: "Which country has the easiest work visa in Europe in 2026?",
        answer:
          "There is no single easiest country for a European work visa. The best option depends on the applicant's job offer, salary, qualifications, industry, language skills, and whether the employer can sponsor or support the application. Germany may be attractive for shortage roles and jobseekers, the Netherlands for recognised-sponsor employment, Portugal and Spain for remote workers, and Ireland for critical skills roles.",
      },
      {
        question: "Do I need a local employer to get a European work visa?",
        answer:
          "For most employment-based work visas, yes. Routes such as the EU Blue Card, national skilled worker visas, the Netherlands Highly Skilled Migrant permit, Ireland employment permits, and the UK Skilled Worker visa usually require a job offer or employer involvement. However, some jobseeker, digital nomad, passive income, startup, and self-employed routes may not require a local employer.",
      },
      {
        question: "How can Jackson & Frank help me choose the right European work visa route?",
        answer:
          "Jackson & Frank can help assess the hiring country, role, salary level, employment setup, and immigration route before you move forward. This can include comparing employment-based visas, EOR-supported hiring, payroll setup, immigration coordination, and local compliance requirements.",
      },
      {
        question: "Can Jackson & Frank help if my company does not have a local entity in Europe?",
        answer:
          "Yes, depending on the country and route. Jackson & Frank supports companies with Employer of Record, payroll, immigration, and compliance services, which can help businesses hire talent in countries where they do not yet have a local entity. The exact setup depends on local labour law, tax rules, and immigration requirements.",
      },
      {
        question: "Does Jackson & Frank guarantee work visa approval?",
        answer:
          "No. Visa and work permit decisions are made by government authorities. Jackson & Frank can help with route assessment, documentation, payroll, employment setup, compliance, and immigration coordination, but approval always depends on the applicant, employer, country, visa route, and official requirements.",
      },
    ],
  },
  [POLAND_PUBLIC_HOLIDAYS_2026_SLUG]: {
    title: "Poland public holidays 2026 FAQs",
    subtitle: "Common questions about Polish statutory holidays, Saturday substitute rules, and employer obligations in 2026",
    items: [
      {
        question: "How many public holidays does Poland have in 2026?",
        answer:
          "Poland has 14 statutory public holidays in 2026 under the Act of 18 January 1951 on Public Holidays (as amended by the Act of 6 December 2024). However, employees receive only 10 effective working-time reductions, because 4 of the 14 holidays fall on Sundays: Easter Sunday, Constitution Day (3 May), Pentecost (24 May), and All Saints' Day (1 November). Under Article 130 §2 of the Labour Code, holidays falling on Sundays do not generate any substitute day-off entitlement, so those four are absorbed without compensatory benefit.",
      },
      {
        question: "What happens when a Polish public holiday falls on a Saturday?",
        answer:
          "When a statutory holiday falls on a Saturday, which is typically a non-working day under Poland's five-day working week, Article 130 §2 of the Labour Code requires the employer to reduce the nominal working time for that settlement period by 8 hours. In practice, this means granting a full substitute working day off within the same settlement period (usually the same calendar month). In 2026, two holidays fall on Saturdays: 15 August (Armed Forces Day and Assumption Day) and 26 December (Second Day of Christmas). The substitute day must be a full day; it cannot be split into shorter periods. Failure to grant it exposes the employer to a fine of 1,000 to 30,000 PLN from the State Labour Inspectorate.",
      },
      {
        question: "Is there enhanced pay (double pay) for working on a Polish public holiday?",
        answer:
          "There is no automatic double-pay rule in Poland. The primary entitlement when an employee works on a statutory holiday is a substitute day off granted before the end of the settlement period, per Article 151(11) of the Labour Code. A 100% pay supplement applies only if the employer genuinely cannot grant the substitute day off within the settlement period. A separate 100% supplement also applies if holiday work causes the employee to exceed the average weekly working-time norm (Article 151 §2). Both supplements are in addition to normal remuneration and can apply simultaneously. Employers who plan substitute days correctly within the settlement period face no supplementary pay liability at all.",
      },
      {
        question: "Is Christmas Eve a public holiday in Poland in 2026?",
        answer:
          "Yes. The Act of 6 December 2024 (Dz.U. 2024, poz. 1965) amended the Act of 18 January 1951 on Public Holidays to add 24 December as a statutory non-working day, effective 1 January 2025. In 2026, Christmas Eve falls on a Thursday, so it is a straightforward non-working day with no weekend complications. All standard employer obligations apply: employees may not be required to work without the appropriate sectoral exemption, and normal pay is due for the non-working day. International employers who built Polish payroll or HR-system configurations before 2025 should verify their holiday calendar includes this date.",
      },
      {
        question: "Are Poland's public holidays the same in every region?",
        answer:
          "Yes. Poland applies a single, nationally uniform list of 14 statutory public holidays under the Act of 18 January 1951. There are no regional, provincial, or municipal public holidays. All 16 voivodeships observe exactly the same dates. This contrasts with several other countries in the Jackson & Frank network.",
      },
    ],
  },
};

export function getManualBlogFaqBySlug(slug: string): ManualBlogFaq | undefined {
  return MANUAL_BLOG_FAQ[slug];
}

function injectFaq(blog: BlogPost): BlogPost {
  if (blog?.slug && MANUAL_BLOG_FAQ[blog.slug]) {
    const faq = MANUAL_BLOG_FAQ[blog.slug];
    return {
      ...blog,
      faq_title: faq.title,
      faq_subtitle: faq.subtitle,
      faq_items: faq.items,
    };
  }
  return blog;
}

/**
 * Merge manual (hardcoded) blog posts with API blogs. API blogs win on slug
 * collisions; result is sorted newest-first.
 */
export function mergeManualBlogPosts(apiBlogs: BlogPost[]): BlogPost[] {
  const merged = new Map<string, BlogPost>();
  apiBlogs.forEach((blog) => {
    if (blog?.slug) merged.set(blog.slug, blog);
  });
  MANUAL_BLOG_POSTS.forEach((blog) => {
    if (!merged.has(blog.slug)) {
      merged.set(blog.slug, injectFaq(blog));
    }
  });
  return Array.from(merged.values()).sort(
    (a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
  );
}

/** Look up a single manual post by slug (used as a fallback when the API has no match). */
export function getManualBlogBySlug(slug: string): BlogPost | undefined {
  const blog = MANUAL_BLOG_POSTS.find((b) => b.slug === slug);
  return blog ? injectFaq(blog) : undefined;
}

