import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, CodeBlock, TipBox } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
    <SectionHeading>Automated AI Review</SectionHeading>
    <Text style={styles.body}>
      The manual loop – export PNGs, look at them with AI – automates cleanly. A small script sends each page image to Claude with your quality rubric and prints a score, so every build gets a consistent design pass instead of a hand review you might skip.
    </Text>
    <CodeBlock language="tsx">{`import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, readdirSync } from 'fs';

const claude = new Anthropic();
const RUBRIC = 'Score 1-10 on hierarchy, spacing, and consistency. List any issues.';

const pages = readdirSync('output/pages').filter((f) => f.endsWith('.png'));
for (const file of pages) {
  const data = readFileSync(\`output/pages/\${file}\`).toString('base64');
  const res = await claude.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 1024,
    messages: [{ role: 'user', content: [
      { type: 'image', source: { type: 'base64', media_type: 'image/png', data } },
      { type: 'text', text: RUBRIC },
    ] }],
  });
  console.log(file, res.content[0].type === 'text' && res.content[0].text);
}`}</CodeBlock>
    <TipBox label="Wire it into CI">
      Run pnpm pipeline in a GitHub Actions job, upload output/ as an artifact, then run this script so every PR gets a design score. Review only changed pages to keep cost and token use low.
    </TipBox>
  </ContentPage>
);

export default Page;
