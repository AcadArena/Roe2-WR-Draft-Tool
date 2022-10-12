type Side = "teamA" | "teamB";
type Action = "ban" | "pick";
type ActionId = number;
type Timer = number;
export type Sequence = [Side, Action, ActionId, Timer];

export const draftSequence: Sequence[] = [
  // BAN PHASE 1
  // A-B-A-B-A-B
  ["teamA", "ban", 0, 25],
  ["teamB", "ban", 0, 25],
  ["teamA", "ban", 1, 25],
  ["teamB", "ban", 1, 25],
  ["teamA", "ban", 2, 25],
  ["teamB", "ban", 2, 25],

  // PICK PHASE 1
  // A-B-B-A-A-B
  ["teamA", "pick", 0, 25],
  ["teamB", "pick", 0, 25],
  ["teamB", "pick", 1, 25],
  ["teamA", "pick", 1, 25],
  ["teamA", "pick", 2, 25],
  ["teamB", "pick", 2, 25],

  // BAN PHASE 2
  // B-A-B-A
  ["teamB", "ban", 3, 25],
  ["teamA", "ban", 3, 25],
  ["teamB", "ban", 4, 25],
  ["teamA", "ban", 4, 25],

  // PICK PHASE 2
  // B-A-A-B
  ["teamB", "pick", 3, 25],
  ["teamA", "pick", 3, 25],
  ["teamA", "pick", 4, 25],
  ["teamB", "pick", 4, 25],
];
