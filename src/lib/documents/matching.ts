import type { StudentDocumentRequirement } from "@/data/student-document-requirements";

/**
 * Normalizes filenames and aliases into a comparable token form used by the
 * auto-link matcher. Extensions are stripped and separators are flattened.
 */
function normalizeName(value: string) {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * Scores how strongly a normalized filename matches a single requirement alias.
 * Higher scores are more confident. Equal top scores are treated as ambiguous
 * and therefore do not auto-link.
 */
function scoreRequirementMatch(fileBaseName: string, alias: string) {
  const normalizedAlias = normalizeName(alias);

  if (!normalizedAlias) {
    return 0;
  }

  if (fileBaseName === normalizedAlias) {
    return 100;
  }

  if (fileBaseName.startsWith(`${normalizedAlias}_`) || fileBaseName.endsWith(`_${normalizedAlias}`)) {
    return 80;
  }

  if (fileBaseName.includes(normalizedAlias)) {
    return 60;
  }

  return 0;
}

/**
 * Finds the best required-document target for an uploaded filename.
 *
 * Returns `null` when there is no match or when the top score is ambiguous.
 */
export function findBestRequiredDocumentMatch(
  fileName: string,
  requirements: StudentDocumentRequirement[],
) {
  const fileBaseName = normalizeName(fileName);
  const scoredMatches: Array<{ requirementId: string; score: number }> = [];

  for (const requirement of requirements) {
    if (requirement.autoLinkEnabled === false) {
      continue;
    }

    let bestScoreForRequirement = 0;

    for (const alias of requirement.aliases) {
      const aliasScore = scoreRequirementMatch(fileBaseName, alias);
      if (aliasScore > bestScoreForRequirement) {
        bestScoreForRequirement = aliasScore;
      }
    }

    if (bestScoreForRequirement > 0) {
      scoredMatches.push({
        requirementId: requirement.id,
        score: bestScoreForRequirement,
      });
    }
  }

  if (!scoredMatches.length) {
    return null;
  }

  const sortedMatches = scoredMatches.sort((a, b) => b.score - a.score);

  if (sortedMatches.length > 1 && sortedMatches[0].score === sortedMatches[1].score) {
    return null;
  }

  return sortedMatches[0].requirementId;
}
