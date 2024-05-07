import { getPreviousLevelId } from "./getLevelId";

export function checkIsLevelAvailable({
  levelsScore,
  levelId,
}: {
  levelsScore: Record<string, number>;
  levelId: string;
}): boolean {
  const previousLevelId = getPreviousLevelId(levelId);

  if (levelId === "2*") return true;
  if (levelsScore[previousLevelId] === 0) {
    return true;
  }

  return false;
}
