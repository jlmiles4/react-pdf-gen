import { sync } from './sync-project';

async function run(): Promise<void> {
  sync();
  const { buildPdf } = await import('../src/build');
  await buildPdf();
}

run().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error('Dev build failed:', message);
  process.exit(1);
});
