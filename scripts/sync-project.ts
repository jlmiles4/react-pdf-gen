import fs from 'fs';
import path from 'path';
import { MANIFEST } from '../src/manifest';

const PAGES_DIR = path.join(__dirname, '../src/pages');
const REGISTRY_FILE = path.join(__dirname, '../src/registry.ts');

// Chrome folders aren't manifest chapters; they render at fixed book positions.
const CHROME_START = ['01-cover', '02-toc'];
const CHROME_END = ['15-conclusion'];

function toIdentifier(relPath: string): string {
  // Convert "03-introduction/01-introduction" -> "Page_03Introduction_01Introduction".
  const pascal = relPath
    .split('/')
    .map((segment) =>
      segment
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(''),
    )
    .join('_')
    .replace(/[^a-zA-Z0-9_]/g, '');
  return `Page_${pascal}`;
}

/**
 * Walk PAGES_DIR finding all .tsx files (relative paths without extension),
 * sorted. Used so every page file is included, even ones not in the manifest.
 */
function findAllPageFiles(): string[] {
  const files: string[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const res = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(res);
      } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
        const relative = path.relative(PAGES_DIR, res).split(path.sep).join('/');
        files.push(relative.replace(/\.tsx$/, ''));
      }
    }
  }

  walk(PAGES_DIR);
  return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function findDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function validateInputs(allFiles: string[]): void {
  const chapters = MANIFEST.flatMap((group) => group.chapters);
  const errors: string[] = [];

  const duplicateNumbers = findDuplicates(chapters.map((chapter) => chapter.num));
  if (duplicateNumbers.length > 0) {
    errors.push(`duplicate manifest chapter number(s): ${duplicateNumbers.join(', ')}`);
  }

  const duplicateEntries = findDuplicates(chapters.map((chapter) => chapter.entryPage));
  if (duplicateEntries.length > 0) {
    errors.push(`duplicate manifest entryPage(s): ${duplicateEntries.join(', ')}`);
  }

  const missingEntries = chapters
    .filter((chapter) => !allFiles.includes(chapter.entryPage))
    .map((chapter) => `${chapter.num} ("${chapter.title}"): ${chapter.entryPage}`);
  if (missingEntries.length > 0) {
    errors.push(`manifest entryPage(s) without a matching file: ${missingEntries.join(', ')}`);
  }

  const pathsByIdentifier = new Map<string, string[]>();
  for (const relPath of allFiles) {
    const identifier = toIdentifier(relPath);
    pathsByIdentifier.set(identifier, [...(pathsByIdentifier.get(identifier) ?? []), relPath]);
  }
  const identifierCollisions = [...pathsByIdentifier.entries()]
    .filter(([, relPaths]) => relPaths.length > 1)
    .map(([identifier, relPaths]) => `${identifier}: ${relPaths.join(', ')}`);
  if (identifierCollisions.length > 0) {
    errors.push(`generated component identifier collision(s): ${identifierCollisions.join('; ')}`);
  }

  if (errors.length > 0) {
    for (const error of errors) console.error(`sync: ${error}`);
    process.exit(1);
  }
}

export function sync(): void {
  const allFiles = findAllPageFiles();
  validateInputs(allFiles);
  const claimed = new Set<string>();

  const filesInDirs = (dirs: string[]): string[] => {
    const out: string[] = [];
    for (const dir of dirs) {
      for (const f of allFiles) {
        if (f.startsWith(dir + '/') && !claimed.has(f)) {
          out.push(f);
          claimed.add(f);
        }
      }
    }
    return out;
  };

  // 1. Fixed chrome at the start (all files in cover/TOC folders, sorted).
  const startPaths = filesInDirs(CHROME_START);

  // 2. Manifest chapters and their directory siblings, in manifest order.
  const middlePaths: string[] = [];
  MANIFEST.forEach((group) => {
    group.chapters.forEach((ch) => {
      const entryPath = ch.entryPage;
      if (claimed.has(entryPath)) return;
      middlePaths.push(entryPath);
      claimed.add(entryPath);

      // All files sharing the entry page's directory that no other entry claimed.
      const chDir = path.dirname(entryPath);
      allFiles
        .filter((f) => f.startsWith(chDir + '/') && !claimed.has(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .forEach((f) => {
          middlePaths.push(f);
          claimed.add(f);
        });
    });
  });

  // 3. Conclusion / back-cover chrome, appended at the end.
  const endPaths = filesInDirs(CHROME_END);

  // 4. Anything not claimed by chrome or the manifest (defensive — keeps the page
  //    in the book rather than dropping it silently, just before the conclusion).
  const leftovers = allFiles
    .filter((f) => !claimed.has(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  if (leftovers.length > 0) {
    console.warn(`sync: ${leftovers.length} page(s) not in manifest or chrome, placed before conclusion: ${leftovers.join(', ')}`);
  }

  const orderedRelPaths = [...startPaths, ...middlePaths, ...leftovers, ...endPaths];

  const pages = orderedRelPaths.map((relPath) => ({
    relPath,
    component: toIdentifier(relPath),
  }));

  const imports = pages
    .map((p) => `import ${p.component} from './pages/${p.relPath}';`)
    .join('\n');

  const pagesList = pages.map((p) => p.component).join(',\n  ');

  const registryContent = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated by scripts/sync-project.ts
 */
${imports}

export const allPages = [
  ${pagesList}
];
`;

  const previousContent = fs.existsSync(REGISTRY_FILE)
    ? fs.readFileSync(REGISTRY_FILE, 'utf8')
    : undefined;
  if (previousContent !== registryContent) {
    fs.writeFileSync(REGISTRY_FILE, registryContent);
    console.log(`Registry generated at src/registry.ts (${pages.length} pages)`);
  } else {
    console.log(`Registry already current at src/registry.ts (${pages.length} pages)`);
  }
}

if (path.resolve(process.argv[1] ?? '') === __filename) {
  sync();
}
