/**
 * Catalog of official AMC 10/12 contests.
 * Problem text is copyright MAA — we only link to AoPS Wiki / MAA, we do not host official wording.
 */
const OFFICIAL_YEARS = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,
  2014, 2013, 2012, 2011, 2010,
];

const OFFICIAL_CONTESTS = [
  { exam: 'AMC 10', version: 'A', label: 'AMC 10A' },
  { exam: 'AMC 10', version: 'B', label: 'AMC 10B' },
  { exam: 'AMC 12', version: 'A', label: 'AMC 12A' },
  { exam: 'AMC 12', version: 'B', label: 'AMC 12B' },
];

function difficultyFromNumber(num) {
  if (num <= 5) return 2;
  if (num <= 10) return 4;
  if (num <= 15) return 5;
  if (num <= 20) return 7;
  return 9;
}

function aopsContestUrl(year, exam, version) {
  const n = exam === 'AMC 10' ? '10' : '12';
  return `https://artofproblemsolving.com/wiki/index.php/${year}_AMC_${n}${version}_Problems`;
}

function aopsProblemUrl(year, exam, version, num) {
  return `${aopsContestUrl(year, exam, version)}/Problem_${num}`;
}

function buildOfficialProblems() {
  const list = [];
  for (const year of OFFICIAL_YEARS) {
    for (const c of OFFICIAL_CONTESTS) {
      for (let num = 1; num <= 25; num++) {
        list.push({
          id: `off-${year}-${c.label}-${num}`,
          exam: c.exam,
          version: c.version,
          label: c.label,
          year,
          num,
          difficulty: difficultyFromNumber(num),
          contestUrl: aopsContestUrl(year, c.exam, c.version),
          problemUrl: aopsProblemUrl(year, c.exam, c.version, num),
        });
      }
    }
  }
  return list;
}

const OFFICIAL_PROBLEMS = buildOfficialProblems();

const OFFICIAL_RESOURCES = [
  {
    title: 'MAA American Mathematics Competitions',
    url: 'https://maa.org/student-programs/amc/',
    blurb: 'Official AMC program page — dates, registration, and policies.',
  },
  {
    title: 'MAA info for students & parents',
    url: 'https://maa.org/student-programs/amc/information-for-students-and-parents/',
    blurb: 'How AMC works, who can take it, and where to find prep materials.',
  },
  {
    title: 'Sample: 2022 AMC 10A (MAA)',
    url: 'https://maa.org/resource/sample-competition-2022-amc-10-a/',
    blurb: 'Official MAA sample contest page with problems and solutions PDFs.',
  },
  {
    title: 'AoPS Wiki — AMC 10 Problems',
    url: 'https://artofproblemsolving.com/wiki/index.php/AMC_10_Problems_and_Solutions',
    blurb: 'Past AMC 10 contests with community solutions (problems © MAA).',
  },
  {
    title: 'AoPS Wiki — AMC 12 Problems',
    url: 'https://artofproblemsolving.com/wiki/index.php/AMC_12_Problems_and_Solutions',
    blurb: 'Past AMC 12 contests with community solutions (problems © MAA).',
  },
];
