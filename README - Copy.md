# 🌟 Selfless Advice

A beautiful, modern fullstack website for sharing life-changing wisdom and advice. Built with Next.js, featuring a comprehensive content management system, payment integration, and a vibrant, aesthetic design.

## ✨ Features

### 🎨 Design & User Experience
- **Modern & Aesthetic**: Beautiful gradient backgrounds, smooth animations with Framer Motion
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Dark/Light Themes**: (Coming soon)
- **Accessibility**: WCAG compliant design

### 📚 Content Management
- **Rich Article System**: Create, edit, and manage wisdom articles
- **Tag System**: Organize content with colorful tags and filtering
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Draft/Publish Workflow**: Schedule and manage article publishing

### 🔐 Authentication & Authorization
- **NextAuth.js**: Secure authentication with multiple providers
- **Role-Based Access**: Admin, Author, Editor, and User roles
- **Social Login**: Google, GitHub integration
- **Email/Password**: Traditional authentication option

### 💰 Payment Integration
- **Stripe Integration**: International payment processing
- **Donation System**: Support the mission with secure donations
- **Multiple Currencies**: Accept payments worldwide
- **Transparent Impact**: Show donors how their contribution helps

### 🛡️ Security & Performance
- **Middleware Protection**: Route-based security
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM with type safety
- **Rate Limiting**: API protection (Coming soon)

### 📊 Admin Dashboard
- **Content Management**: Create and edit articles
- **User Management**: Manage community members
- **Analytics**: Track views, engagement, and impact
- **Donation Tracking**: Monitor financial support

### 🧪 Testing
- **Unit Tests**: Jest with React Testing Library
- **E2E Tests**: Cypress for full user journey testing
- **Component Tests**: Isolated component testing
- **API Tests**: Backend endpoint testing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)

### 1. Clone and Install
```bash
git clone <repository-url>
cd selfless-advice
npm install
```

### 2. Environment Setup
Create a `.env` file based on `.env.example`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/selfless_advice"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"

# Stripe Payment Integration
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Site Configuration
SITE_URL="http://localhost:3000"
SITE_NAME="Selfless Advice"
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database with sample data
npm run db:seed
```

### 4. Development
```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
selfless-advice/
├── src/
│   ├── app/                  # Next.js 13+ app directory
│   │   ├── admin/           # Admin dashboard pages
│   │   ├── api/             # API routes
│   │   ├── auth/            # Authentication pages
│   │   ├── donate/          # Donation pages
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── admin/           # Admin-specific components
│   │   ├── articles/        # Article-related components
│   │   ├── auth/           # Authentication components
│   │   ├── donation/       # Donation components
│   │   ├── home/           # Homepage components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # Reusable UI components
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── generated/          # Generated Prisma client
├── prisma/                 # Database schema and migrations
├── cypress/                # E2E tests
├── public/                 # Static assets
└── __tests__/             # Unit tests
```

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### E2E Tests
```bash
# Open Cypress interface
npm run cypress:open

# Run E2E tests headlessly
npm run cypress:run

# Run full E2E test suite
npm run test:e2e
```

## 🛠️ Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run database migrations
npm run prisma:studio   # Open Prisma Studio
npm run db:seed         # Seed database with sample data

# Testing
npm test                # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate test coverage
npm run cypress:open   # Open Cypress UI
npm run cypress:run    # Run E2E tests
npm run test:e2e       # Full E2E test suite
```

## 🎯 Key Components

### Homepage (`src/app/page.tsx`)
- Hero section with animated elements
- Article grid with filtering and search
- Responsive design with smooth animations

### Admin Dashboard (`src/app/admin/`)
- Dashboard with statistics and quick actions
- Article editor with rich features
- User and content management

### Article System
- **ArticleCard**: Beautiful card component with hover effects
- **ArticleEditor**: Rich text editor with preview
- **FilterTabs**: Tag-based filtering with search

### Donation System
- **DonationForm**: Stripe-integrated payment form
- **DonationImpact**: Shows impact of contributions
- Success/cancel pages with proper UX

## 🔐 Authentication Flow

1. **Registration**: Users sign up with email/password or social login
2. **Email Verification**: (Optional) verify email addresses
3. **Role Assignment**: Automatic role assignment based on configuration
4. **Dashboard Access**: Role-based access to admin features

## 💳 Payment Flow

1. **Donation Selection**: User chooses amount and provides optional info
2. **Stripe Checkout**: Secure payment processing
3. **Webhook Processing**: Server receives payment confirmation
4. **Database Recording**: Transaction saved with donor information
5. **Confirmation**: User sees success page and receives email

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Secondary**: Purple gradient (#8B5CF6 to #EC4899)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Code**: JetBrains Mono (monospace)

### Components
- Rounded corners (8px, 12px, 16px)
- Subtle shadows and gradients
- Smooth hover transitions
- Consistent spacing scale

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Database
- Use managed PostgreSQL (Supabase, PlanetScale, etc.)
- Run migrations in production
- Set up proper backup strategy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - The React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Type-safe database toolkit
- **NextAuth.js** - Authentication for Next.js
- **Stripe** - Payment processing platform
- **Framer Motion** - Animation library

## 📞 Support

For questions or support, please reach out to:
- Email: hello@selflessadvice.com
- Documentation: [Link to documentation]
- Issues: [GitHub Issues](https://github.com/username/selfless-advice/issues)

---

**Made with ❤️ for humanity's growth and happiness**