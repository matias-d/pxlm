# 🎨 PXL Marketplace

> A decentralized NFT marketplace for unique pixel art avatars with advanced rarity system, trading features, and complete ownership history tracking.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-FFF100?style=flat&logo=hardhat&logoColor=black)](https://hardhat.org/)

## 🌟 Overview

PXL Marketplace is a comprehensive decentralized platform that enables users to create, trade, and manage unique pixel art NFT avatars called "PXLs". Each PXL is algorithmically generated with distinct attributes, rarity levels, and special combinations that affect their value and desirability.

### Key Features

- 🎲 **Algorithmic Generation**: Unique PXL avatars with randomized traits
- 🏆 **Advanced Rarity System**: 4-tier rarity classification with score-based mechanics
- 🛒 **Full Marketplace**: List, buy, sell, and relist NFTs seamlessly
- 📊 **Complete History**: Track ownership and trading history for every NFT
- 🛡️ **Secure Smart Contracts**: Built with OpenZeppelin standards and reentrancy protection
- 🎨 **Rich Attributes**: Hats, glasses, accessories, and beards with multiple variants
- 💎 **Special Combos**: Bonus scoring for rare attribute combinations
- 🖼️ **IPFS Storage**: Decentralized metadata storage via Pinata
- 📱 **Responsive Design**: Modern UI with Tailwind CSS

## 🎮 PXL System

### Attribute Categories

| Category | Variants | Colors | Probability |
|----------|----------|--------|-------------|
| **Hats** | Cap, Beanie, Top Hat, Bucket Hat | Red, Green, Blue, Silver, Gold, Pink | 40% |
| **Glasses** | Small, Round, Light, Large | Black, Gold, Gray, Blue | 30% |
| **Accessories** | Large Piercing, Small Piercing | Silver, Gold | 45% |
| **Beards** | Goatee, Full Beard, Regular Beard | Natural | 35% |

### Rarity Tiers

| Tier | Probability | Score Range | Description |
|------|-------------|-------------|-------------|
| 🟡 **Legendary** | 1% | 401+ | Extremely rare with premium combinations |
| 🟣 **Epic** | 4% | 335+ | High-value NFTs with excellent traits |
| 🔵 **Rare** | 43% | 190+ | Good balance of attributes and rarity |
| ⚫ **Common** | 51% | 100+ | Standard PXLs with basic traits |

### Special Combinations

- 🥇 **Golden Set**: 2+ gold attributes (+0.9% bonus)
- 🥈 **Silver Set**: 2+ silver attributes (+0.8% bonus)
- 🎩 **Distinguished Gentleman**: Top Hat + Glasses + Beard (+0.5% bonus)
- 🎯 **Fully Loaded**: All attribute types present (+0.5% bonus)

## 🏗️ Architecture

### Frontend Stack
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern styling
- **Ethers.js** for blockchain interactions
- **React Router** for navigation
- **Pinata SDK** for IPFS integration

### Backend Stack
- **Solidity 0.8.19** for smart contracts
- **Hardhat** for development and testing
- **OpenZeppelin** for security standards
- **IPFS** for decentralized storage
- **Vercel Serverless Functions** for secure API endpoints

### Smart Contracts

#### `NFT.sol`
- ERC721-compliant token contract
- Minting functionality with metadata URI
- Token counter and ownership tracking

#### `Marketplace.sol`
- Listing and delisting functionality
- Purchase and sale execution
- Fee management (configurable percentage)
- Complete transaction history tracking
- Reentrancy protection

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask or compatible Web3 wallet
- Git
- BSC Testnet tokens (for testing) - Get free testnet BNB from [BSC Faucet](https://testnet.binance.org/faucet-smart)

**Note**: This project is configured for **Binance Smart Chain Testnet** by default, but can be easily adapted to other EVM-compatible networks.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pxlm.git
   cd pxlm
   ```

2. **Install dependencies**
   ```bash
   # Install smart contract dependencies
   cd contracts
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   
   **Smart Contracts Configuration:**
   
   Create a `.env` file in the contracts directory:
   ```env
   # For BSC Testnet or alternative network configurations (default configuration)
   PRIVATE_KEY=your_private_key_here
   ```

   **Frontend Configuration:**
   
   Create a `.env` file in the client directory:
   ```env
   # Pinata JWT (secured via Vercel serverless functions)
   VITE_JWT=your_pinata_jwt_token
   
   # Pinata Gateway URL for IPFS access
   VITE_GATEWAY=your_pinata_gateway_url
   ```

   **Note**: The project is configured for **BSC Testnet** by default. To use other networks, modify the deployment script and network validation accordingly.

   **Security**: The JWT token is secured through Vercel serverless functions located in the `/api` directory, ensuring sensitive credentials are not exposed in the client-side code.

4. **Deploy Smart Contracts**
   ```bash
   cd contracts
   npm run compile
   npm run deploy
   ```

5. **Start Development Server**
   ```bash
   cd ../client
   npm run dev
   ```

## 📖 Usage

### Creating a PXL

1. Connect your MetaMask wallet
2. Navigate to the "Create" page
3. Click "Generate PXL" to create a unique avatar
4. Review attributes and rarity score
5. Set your desired price
6. Mint the NFT to the blockchain

### Trading NFTs

1. Browse available PXLs in the marketplace
2. Use filters to find specific rarities or attributes
3. Add items to your cart for batch purchases
4. Complete transactions with your connected wallet

### Managing Your Collection

- View your owned NFTs in the "Collection" page
- Track your sales history
- Relist sold NFTs with new prices
- Monitor price trends and rarity statistics

## 🧪 Testing

### Smart Contract Tests
```bash
cd contracts
npm run test
```

### Frontend Development
```bash
cd client
npm run dev
npm run build
npm run preview
```

## 🔧 Configuration

### Network Configuration
The platform is **pre-configured for Binance Smart Chain (BSC) Testnet** but supports multiple EVM-compatible networks. Users can easily switch networks by modifying the configuration:

**Default Configuration:**
- **BSC Testnet** (main configuration)
- Network ID: `97`
- RPC URL: `https://data-seed-prebsc-1-s1.binance.org:8545/`
- Block Explorer: `https://testnet.bscscan.com/`

**Supported Networks:**
- Ethereum Sepolia
- Local Hardhat Network
- Polygon Mumbai
- Arbitrum Goerli
- Any EVM-compatible network

**How to Change Networks:**

1. **Smart Contracts Configuration**:
   ```typescript
   // contracts/hardhat.config.ts
   networks: {
     bscTestnet: {
       url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
       chainId: 97,
       accounts: [process.env.BSC_TESTNET_PRIVATE_KEY]
     },
     sepolia: {
       url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
       chainId: 11155111,
       accounts: [process.env.SEPOLIA_PRIVATE_KEY]
     }
   }
   ```

2. **Frontend Network Validation**:
   ```typescript
   // client/src/helpers/functions/validate-network.ts
   export const SUPPORTED_NETWORKS = {
     bscTestnet: { chainId: 97, name: "BSC Testnet" },
     sepolia: { chainId: 11155111, name: "Sepolia" }
   };
   ```

3. **Deploy to Different Networks**:
   ```bash
   # Deploy to BSC Testnet (default)
   npm run deploy
   
   # Deploy to Sepolia
   npx hardhat run scripts/deploy.ts --network sepolia
   
   # Deploy to local network
   npx hardhat run scripts/deploy.ts --network localhost
   ```

### Fee Structure
- Marketplace fee: 1% (configurable)
- Gas fees: Network-dependent
- IPFS storage: Via Pinata service

### Security Features

**JWT Token Security:**
- Pinata JWT tokens are secured through Vercel serverless functions
- Serverless functions located in `/api` directory handle sensitive operations
- Client-side code never exposes raw JWT tokens
- All IPFS operations are proxied through secure serverless endpoints

**Smart Contract Security:**
- OpenZeppelin standards for battle-tested security
- ReentrancyGuard protection against common attacks
- Proper access control and ownership management
- Comprehensive testing suite for contract validation

## 📁 Project Structure

```
pxlm/
├── contracts/                 # Smart contracts
│   ├── contracts/            # Solidity contracts
│   ├── scripts/              # Deployment scripts
│   ├── test/                 # Contract tests
│   └── artifacts/            # Compiled contracts
├── client/                   # Frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API and blockchain services
│   │   ├── hooks/            # Custom React hooks
│   │   ├── helpers/          # Utility functions
│   │   └── interfaces/       # TypeScript interfaces
│   ├── api/                  # Vercel serverless functions
│   │   ├── pinata/           # Pinata API endpoints
│   │   └── upload-image.ts   # Secure image upload
│   │   └── upload-metadata.ts # Secure metadata upload
│   └── public/
│       └── abi/              # Contract ABIs and addresses
└── README.md
```

## 🔮 Future Features

### High Priority
- 🎯 **NFT bidding system**: allows users to bid on NFTs
- 🏆 **Achievement System**: Badges and rewards for collectors
### Medium Priority
- 🎨 **Custom PXL Editor**: Allow users to modify existing PXLs
- 🎪 **Events & Drops**: Special collection releases and limited editions
### Advanced Features
- 🎲 **PXL Breeding**: Combine two PXLs to create offspring
- 🎭 **PXL Evolution**: Upgrade attributes through gameplay or trading

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Matias Ezequiel Cabrera**
- GitHub: [@matias-d](https://github.com/matias-d)

## 🙏 Acknowledgments
- [DiceBear](https://dicebear.com/) for avatar generation API
- [Pinata](https://pinata.cloud/) for IPFS storage services


