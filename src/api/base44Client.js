// This file is maintained for backward compatibility
// The actual implementation has been moved to mockDb.js
// This file can be safely removed if all imports are updated

import * as mockDb from '@/lib/mockDb';

export const base44 = {
  entities: {
    Project: mockDb.Project,
    Proposal: mockDb.Proposal,
    Message: mockDb.Message,
    Bounty: mockDb.Bounty,
    Hackathon: mockDb.Hackathon,
    BountySubmission: mockDb.BountySubmission,
    HackathonRegistration: mockDb.HackathonRegistration
  },
  integrations: {
    Core: mockDb.Core
  },
  auth: mockDb.User
};
