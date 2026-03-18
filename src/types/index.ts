export interface Player {
  id: string;
  name: string;
  number?: string;
}

export interface Vote {
  voterId: string;
  candidateId: string;
}

export interface GameSession {
  id: string;
  date: string;
  presentPlayerIds: string[];
  votes: Vote[];
  status: "setup" | "voting" | "completed";
}
