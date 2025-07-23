/**
 * Mock database implementation to replace base44 client
 */

// Mock data for each entity type
const mockData = {
  projects: [
    { id: '1', title: 'Smart Contract Audit for DeFi Protocol', category: 'blockchain', experience_level: 'EXPERT', description: 'We need an experienced smart contract auditor to review our new DeFi lending protocol. The audit should cover potential vulnerabilities, gas optimization, and security best practices.', required_skills: ['Solidity', 'Smart Contracts', 'Security', 'DeFi'], budget_min: 5000, budget_max: 8000, timeline: '2-3 weeks', proposals_count: 7, status: 'open', created_date: new Date().toISOString() },
    { id: '2', title: 'UI/UX Design for ICP Wallet', category: 'design', experience_level: 'INTERMEDIATE', description: 'Design a sleek and intuitive user interface for a new Arbitrum-based crypto wallet, focusing on ease of use and security.', required_skills: ['UI/UX', 'Figma', 'Web3 Design'], budget_min: 3000, budget_max: 6000, timeline: '4-6 weeks', proposals_count: 5, status: 'open', created_date: new Date().toISOString() },
    { id: '3', title: 'ICP Dapp Frontend Development', category: 'icp_development', experience_level: 'BEGINNER', description: 'Develop a frontend for our new ICP dapp that connects to our existing canister.', required_skills: ['React', 'TypeScript', 'DFINITY', 'ICP'], budget_min: 2000, budget_max: 4000, timeline: '3-4 weeks', proposals_count: 3, status: 'open', created_date: new Date().toISOString() },
  ],
  proposals: [
    { id: '1', project_id: '1', user_id: '1', title: 'Expert Solidity Auditor', description: 'I have 5 years of experience auditing DeFi protocols and can help you identify vulnerabilities.', bid_amount: 6000, timeline: '2 weeks', status: 'pending', created_date: new Date().toISOString() },
    { id: '2', project_id: '1', user_id: '2', title: 'Security Researcher Proposal', description: 'I specialize in DeFi security and have audited over 20 protocols.', bid_amount: 7000, timeline: '3 weeks', status: 'pending', created_date: new Date().toISOString() },
  ],
  messages: [
    { id: '1', from_user_id: '1', to_user_id: '2', content: 'Hello, I saw your project and wanted to discuss the details.', read: false, created_date: new Date().toISOString() },
    { id: '2', from_user_id: '2', to_user_id: '1', content: 'Hi there! Sure, what would you like to know?', read: true, created_date: new Date().toISOString() },
  ],
  bounties: [
    { id: '1', title: 'Fix Authentication Bug', description: 'We need to fix a bug in our authentication flow.', reward: 500, deadline: '2023-12-31', status: 'open', created_date: new Date().toISOString() },
    { id: '2', title: 'Implement Dark Mode', description: 'Add dark mode support to our app.', reward: 300, deadline: '2023-11-30', status: 'open', created_date: new Date().toISOString() },
  ],
  bountySubmissions: [
    { id: '1', bounty_id: '1', user_id: '2', description: 'I fixed the authentication bug by updating the token validation.', repository_url: 'https://github.com/example/repo', status: 'pending', created_date: new Date().toISOString() },
  ],
  hackathons: [
    { id: '1', title: 'ICP Summer Hackathon', description: 'Build innovative dapps on the Internet Computer.', start_date: '2023-07-15', end_date: '2023-07-30', prize_pool: 10000, status: 'active', created_date: new Date().toISOString() },
  ],
  hackathonRegistrations: [
    { id: '1', hackathon_id: '1', user_id: '1', team_name: 'ByteBuilders', project_idea: 'A decentralized social media platform on ICP.', status: 'approved', created_date: new Date().toISOString() },
  ],
  users: [
    { id: '1', name: 'John Doe', email: 'john@example.com', bio: 'Experienced smart contract developer', skills: ['Solidity', 'JavaScript', 'React'], role: 'developer', created_date: new Date().toISOString() },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', bio: 'UI/UX designer with 5 years experience', skills: ['UI/UX', 'Figma', 'Adobe XD'], role: 'designer', created_date: new Date().toISOString() },
  ]
};

// Helper functions for CRUD operations
const generateId = () => Math.random().toString(36).substr(2, 9);

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Base entity class for common operations
class BaseEntity {
  constructor(entityType) {
    this.entityType = entityType;
  }

  async get(id) {
    await delay();
    const item = mockData[this.entityType].find(item => item.id === id);
    return clone(item || null);
  }

  async filter(filters = {}, sortField = '-created_date', limit = 50) {
    await delay();
    let results = clone(mockData[this.entityType]);
    
    // Apply filters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        results = results.filter(item => item[key] === value);
      });
    }
    
    // Apply sorting
    const isDesc = sortField.startsWith('-');
    const field = isDesc ? sortField.substring(1) : sortField;
    
    results.sort((a, b) => {
      if (a[field] < b[field]) return isDesc ? 1 : -1;
      if (a[field] > b[field]) return isDesc ? -1 : 1;
      return 0;
    });
    
    // Apply limit
    return results.slice(0, limit);
  }

  async create(data) {
    await delay();
    const newItem = {
      id: generateId(),
      ...data,
      created_date: new Date().toISOString()
    };
    
    mockData[this.entityType].push(newItem);
    return clone(newItem);
  }

  async update(id, data) {
    await delay();
    const index = mockData[this.entityType].findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }
    
    const updatedItem = {
      ...mockData[this.entityType][index],
      ...data,
      id // ensure id doesn't change
    };
    
    mockData[this.entityType][index] = updatedItem;
    return clone(updatedItem);
  }

  async delete(id) {
    await delay();
    const index = mockData[this.entityType].findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }
    
    mockData[this.entityType].splice(index, 1);
    return true;
  }
}

// Create entity instances
export const Project = new BaseEntity('projects');
export const Proposal = new BaseEntity('proposals');
export const Message = new BaseEntity('messages');
export const Bounty = new BaseEntity('bounties');
export const Hackathon = new BaseEntity('hackathons');
export const BountySubmission = new BaseEntity('bountySubmissions');
export const HackathonRegistration = new BaseEntity('hackathonRegistrations');
export const User = new BaseEntity('users');

// Mock integrations
const mockIntegrations = {
  Core: {
    InvokeLLM: async (prompt) => {
      await delay(500);
      return { response: `Mock LLM response for: ${prompt}` };
    },
    SendEmail: async (to, subject, body) => {
      await delay(300);
      return { success: true, messageId: generateId() };
    },
    UploadFile: async (file) => {
      await delay(800);
      return { success: true, fileId: generateId(), url: `https://mock-storage.example.com/${generateId()}` };
    },
    GenerateImage: async (prompt) => {
      await delay(1000);
      return { success: true, imageUrl: `https://mock-image-gen.example.com/${generateId()}.png` };
    },
    ExtractDataFromUploadedFile: async (fileId) => {
      await delay(600);
      return { success: true, data: { text: "Mock extracted content", metadata: { pages: 5 } } };
    }
  }
};

// Export integrations
export const Core = mockIntegrations.Core;
export const InvokeLLM = mockIntegrations.Core.InvokeLLM;
export const SendEmail = mockIntegrations.Core.SendEmail;
export const UploadFile = mockIntegrations.Core.UploadFile;
export const GenerateImage = mockIntegrations.Core.GenerateImage;
export const ExtractDataFromUploadedFile = mockIntegrations.Core.ExtractDataFromUploadedFile;
