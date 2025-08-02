# 🏠 Real Estate Listing Web Application

A modern, full-stack real estate listing platform built with **Next.js 15**, **Payload CMS**, and **PostgreSQL**. This application provides a beautiful frontend for property listings with a powerful admin interface for content management.

![Real Estate Platform](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js)
![Payload CMS](https://img.shields.io/badge/Payload_CMS-3.49.1-blue?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue?style=for-the-badge&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🏠 Property Listings**: Beautiful property detail pages with rich content
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **🔐 Admin Panel**: Powerful Payload CMS admin interface
- **📊 Database**: PostgreSQL with Payload CMS integration
- **🖼️ Media Management**: Built-in image upload and management
- **🚀 Performance**: Optimized with Next.js 15 and Image optimization
- **🧪 Testing**: Comprehensive test suite with Playwright and Vitest
- **🐳 Docker Support**: Containerized development and production

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **CMS**: Payload CMS 3.49.1
- **Database**: PostgreSQL with @payloadcms/db-postgres
- **Styling**: Tailwind CSS
- **Testing**: Playwright (E2E), Vitest (Integration)
- **Package Manager**: pnpm
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: `^18.20.2` or `>=20.9.0`
- **pnpm**: `^9` or `^10`
- **Docker** (optional, for containerized setup)
- **PostgreSQL** (for local development)

## 🚀 Quick Start

### Option 1: Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd real-estate-listing-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database Configuration
   DATABASE_URI=postgresql://username:password@localhost:5432/real_estate_db
   
   # Payload CMS Configuration
   PAYLOAD_SECRET=your-super-secret-key-here
   
   # Next.js Configuration
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb real_estate_db
   
   # Or using psql
   psql -U postgres -c "CREATE DATABASE real_estate_db;"
   ```

5. **Generate Payload types**
   ```bash
   pnpm generate:types
   ```

6. **Run the development server**
   ```bash
   pnpm dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### Option 2: Docker Setup

1. **Clone and navigate to the project**
   ```bash
   git clone <your-repository-url>
   cd real-estate-listing-web
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 🗄️ Database Setup

### PostgreSQL Configuration

The application uses PostgreSQL as the primary database. Here are the setup options:

#### Local PostgreSQL Installation

1. **Install PostgreSQL**
   ```bash
   # macOS (using Homebrew)
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

2. **Create database and user**
   ```sql
   CREATE DATABASE real_estate_db;
   CREATE USER real_estate_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE real_estate_db TO real_estate_user;
   ```

3. **Update your .env file**
   ```env
   DATABASE_URI=postgresql://real_estate_user:your_password@localhost:5432/real_estate_db
   ```

#### Cloud Database Options

- **Supabase**: Free tier available, easy setup
- **Neon**: Serverless PostgreSQL with generous free tier
- **Railway**: Simple deployment with PostgreSQL
- **PlanetScale**: MySQL-compatible (requires adapter change)

## 🏗️ Project Structure

```
real-estate-listing-web/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Public-facing pages
│   │   │   ├── [slug]/          # Property detail pages
│   │   │   └── page.tsx         # Homepage
│   │   └── (payload)/           # Payload CMS routes
│   │       └── admin/           # Admin panel
│   ├── collections/             # Payload CMS collections
│   │   ├── Property.ts          # Property collection
│   │   ├── Media.ts             # Media collection
│   │   └── Users.ts             # Users collection
│   └── payload.config.ts        # Payload CMS configuration
├── docker-compose.yml           # Docker development setup
├── Dockerfile                   # Production Docker image
└── package.json                 # Dependencies and scripts
```

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm devsafe          # Clean build and start dev server

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Payload CMS
pnpm payload          # Run Payload CLI commands
pnpm generate:types   # Generate TypeScript types
pnpm generate:importmap # Generate import map

# Testing
pnpm test             # Run all tests
pnpm test:e2e         # Run end-to-end tests
pnpm test:int         # Run integration tests

# Linting
pnpm lint             # Run ESLint
```

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Docker Deployment

1. **Build the production image**
   ```bash
   docker build -t real-estate-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URI=your_database_uri \
     -e PAYLOAD_SECRET=your_secret \
     real-estate-app
   ```

### Environment Variables for Production

```env
# Required
DATABASE_URI=postgresql://username:password@host:port/database
PAYLOAD_SECRET=your-super-secret-key-here

# Optional
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
NODE_ENV=production
```

## 🧪 Testing

The project includes comprehensive testing:

- **E2E Tests**: Using Playwright for full application testing
- **Integration Tests**: Using Vitest for API and component testing

Run tests with:
```bash
pnpm test        # All tests
pnpm test:e2e    # End-to-end tests only
pnpm test:int    # Integration tests only
```

## 🔧 Configuration

### Payload CMS Configuration

The main configuration is in `src/payload.config.ts`. Key features:

- PostgreSQL adapter for database
- Lexical rich text editor
- Media upload support
- Admin user management

### Next.js Configuration

Custom Next.js configuration in `next.config.mjs`:

- Payload CMS integration
- Webpack optimizations
- TypeScript support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Reno Cerberus**  
📧 Email: [renocerberus@gmail.com](mailto:renocerberus@gmail.com)

---

⭐ **Star this repository if you find it helpful!**

---

## 🆘 Troubleshooting

### Common Issues

**Database Connection Issues**
- Ensure PostgreSQL is running
- Check DATABASE_URI format
- Verify database exists and user has permissions

**Build Issues**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

**Admin Panel Access**
- Create first admin user via Payload CLI
- Check PAYLOAD_SECRET environment variable

**Image Upload Issues**
- Ensure media collection is properly configured
- Check file permissions and storage settings

For more help, please open an issue in the repository.
