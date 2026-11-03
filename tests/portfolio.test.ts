import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PERSONAL_INFO,
  FLAGSHIP_PROJECTS,
  SECONDARY_PROJECTS,
  EMPIRICAL_INVARIANTS,
  CERTIFICATIONS,
} from '../src/lib/constants.ts';
import {
  DOCUMENT_CORPUS,
  queryToVector,
  computeBlasGemv,
} from '../src/lib/mockVectors.ts';

test('1. Candidate Profile & Contact Invariants', () => {
  assert.equal(PERSONAL_INFO.name, 'Garv Vaidya');
  assert.equal(PERSONAL_INFO.handle, '@kleeeoss');
  assert.equal(PERSONAL_INFO.email, 'garvvaidya24@outlook.com');
  assert.equal(PERSONAL_INFO.location, 'Jabalpur, India');
  assert.equal(PERSONAL_INFO.githubUrl, 'https://github.com/kleeeoss');
  assert.equal(PERSONAL_INFO.linkedinUrl, 'https://www.linkedin.com/in/garvaidya/');
  assert.equal(PERSONAL_INFO.education.cgpa, '7.17 / 10');
  assert.equal(PERSONAL_INFO.education.period, '2023 — 2027');
});

test('2. Flagship Systems Specification', () => {
  assert.equal(FLAGSHIP_PROJECTS.length, 4, 'Must have exactly 4 flagship systems');
  const ids = FLAGSHIP_PROJECTS.map((p) => p.id);
  assert.deepEqual(ids, ['lucid-ci', 'ares', 'leviathan', 'syncnote']);

  // Lucid-CI Invariants
  const lucid = FLAGSHIP_PROJECTS.find((p) => p.id === 'lucid-ci')!;
  assert.ok(lucid.techStack.includes('Go'));
  assert.ok(lucid.techStack.includes('Google gVisor (runsc)'));
  assert.ok(lucid.metrics.some((m) => m.value === '0.0%'));
  assert.ok(lucid.metrics.some((m) => m.value === '0 Escapes'));

  // Ares Invariants
  const ares = FLAGSHIP_PROJECTS.find((p) => p.id === 'ares')!;
  assert.ok(ares.techStack.includes('BLAS Level-2 GEMV'));
  assert.ok(ares.techStack.includes('Kubernetes'));
  assert.ok(ares.metrics.some((m) => m.value === '596.81 ms'));

  // Leviathan Invariants
  const leviathan = FLAGSHIP_PROJECTS.find((p) => p.id === 'leviathan')!;
  assert.ok(leviathan.metrics.some((m) => m.value === 'O(V + E)'));
  assert.ok(leviathan.techStack.includes('AWS SQS'));

  // SyncNote Invariants
  const syncnote = FLAGSHIP_PROJECTS.find((p) => p.id === 'syncnote')!;
  assert.ok(syncnote.metrics.some((m) => m.value === '< 50 ms'));
  assert.ok(syncnote.metrics.some((m) => m.value === 'Protected'));
});

test('3. Secondary Bento Projects & Negative Invariant (Zero xqv9k)', () => {
  assert.equal(SECONDARY_PROJECTS.length, 7, 'Must have exactly 7 secondary projects');
  const expectedNames = [
    'mock-vulnerable-repo',
    'oblivion',
    'veritas',
    'beacon',
    'aura-productivity-suite',
    'algorithm-visualizer',
    'Hybrid-Finance-Tracker',
  ];
  const actualNames = SECONDARY_PROJECTS.map((p) => p.name);
  assert.deepEqual(actualNames, expectedNames);

  // Negative Invariant: CRITICAL check for xqv9k
  const fullJson = JSON.stringify({
    PERSONAL_INFO,
    FLAGSHIP_PROJECTS,
    SECONDARY_PROJECTS,
    EMPIRICAL_INVARIANTS,
    CERTIFICATIONS,
  });
  assert.ok(!fullJson.toLowerCase().includes('xqv9k'), 'CRITICAL: Must NEVER contain xqv9k');
});

test('4. Empirical Benchmarks Invariants', () => {
  assert.equal(EMPIRICAL_INVARIANTS.length, 8, 'Must have exactly 8 empirical benchmarks');
  for (const inv of EMPIRICAL_INVARIANTS) {
    assert.equal(inv.status, 'VERIFIED');
    assert.ok(inv.benchmarkMetric.length > 0);
    assert.ok(inv.verificationMechanism.length > 0);
  }
});

test('5. Verified Certifications & Credentials', () => {
  assert.equal(CERTIFICATIONS.length, 3, 'Must have exactly 3 certifications');
  const issuers = CERTIFICATIONS.map((c) => c.issuer);
  assert.deepEqual(issuers, ['Google DeepMind', 'Google Cloud', 'Amazon Web Services']);
});

test('6. Ares BLAS Level-2 GEMV Mathematical Engine & Unit L2 Invariants', () => {
  // Test that each document vector in the corpus has unit L2 norm: ||v|| = 1.0 +/- 0.02
  for (const doc of DOCUMENT_CORPUS) {
    assert.equal(doc.vector.length, 8, `Vector for ${doc.id} must be 8-dimensional`);
    const l2Norm = Math.sqrt(doc.vector.reduce((sum, val) => sum + val * val, 0));
    assert.ok(
      Math.abs(l2Norm - 1.0) < 0.02,
      `Document ${doc.id} vector L2 norm must be ~1.0, got ${l2Norm}`
    );
  }

  // Test query projection
  const qVec = queryToVector('container sandbox isolation');
  assert.equal(qVec.length, 8);
  const qNorm = Math.sqrt(qVec.reduce((sum, val) => sum + val * val, 0));
  assert.ok(
    Math.abs(qNorm - 1.0) < 0.02,
    `Query vector L2 norm must be ~1.0, got ${qNorm}`
  );

  // Test BLAS GEMV dot product calculation
  const ranked = computeBlasGemv(qVec);
  assert.equal(ranked.length, DOCUMENT_CORPUS.length);
  // Must be sorted in descending order
  for (let i = 0; i < ranked.length - 1; i++) {
    assert.ok(
      ranked[i].score >= ranked[i + 1].score,
      `Ranked scores must be monotonically non-increasing: ${ranked[i].score} >= ${ranked[i + 1].score}`
    );
  }

  // Top result for "container sandbox isolation" must be Lucid-CI gVisor doc
  assert.equal(ranked[0].doc.id, 'doc-lucid-gvisor');
  assert.ok(ranked[0].score > 0.8, 'Top match score must be > 0.8');

  // Test vector dot product query for DAG scheduling
  const dagQuery = queryToVector('kahn topological dag orchestrator');
  const dagRanked = computeBlasGemv(dagQuery);
  assert.equal(dagRanked[0].doc.id, 'doc-leviathan-kahn');
});
