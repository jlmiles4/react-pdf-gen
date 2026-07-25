async function run(): Promise<void> {
  // buildPdf() syncs the registry itself before loading it.
  const { buildPdf } = await import('../src/build');
  await buildPdf();
}

run().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error('Dev build failed:', message);
  process.exit(1);
});
