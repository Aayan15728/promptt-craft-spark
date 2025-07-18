# promptt

A smart AI prompt generator that helps you create optimized prompts for GPT models. Built with React, TypeScript, Supabase, and OpenAI.

## Features

- 🤖 **Smart Prompt Generation**: Generate tailored prompts based on your goals
- 📝 **Prompt History**: Save and manage all your generated prompts
- ❤️ **Favorites**: Mark your best prompts as favorites
- 🔐 **Secure Authentication**: User accounts with email/password
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🔑 **Secure API Key Storage**: Your OpenAI API key stays in your browser

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **UI Components**: shadcn/ui
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Ready for GitHub Pages, Vercel, or Netlify

## Setup Instructions

### Prerequisites

1. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd promptt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - The project is already configured with Supabase
   - Database tables and policies are automatically created
   - Edge functions are automatically deployed

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Sign up for an account
   - Enter your OpenAI API key when prompted
   - Start generating prompts!

### Production Deployment

#### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy automatically

#### Option 2: Netlify
1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

#### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run build && npm run deploy`

## Usage Guide

### Getting Started

1. **Sign Up**: Create an account with your email and password
2. **API Key**: Enter your OpenAI API key (stored securely in your browser)
3. **Generate**: Describe what you want to achieve and let promptt create the perfect prompt

### Example Use Cases

- **Content Writing**: "write a blog post about sustainable living"
- **Marketing**: "create an email subject line for a product launch"
- **Code Generation**: "write a Python function to analyze CSV data"
- **Creative Writing**: "generate a short story about time travel"
- **Business**: "create a SWOT analysis template"

### Features Walkthrough

#### Prompt Generator
- Enter your goal in plain English
- Optionally select a category (Writing, Marketing, Coding, etc.)
- Click "Generate Prompt" to get an optimized GPT prompt
- Copy the result to use in ChatGPT, Claude, or other AI tools

#### Prompt History
- View all your previously generated prompts
- Mark prompts as favorites for quick access
- Copy any prompt to clipboard
- Delete prompts you no longer need

## API Key Security

Your OpenAI API key is handled securely:

- ✅ **Never stored on our servers**
- ✅ **Stays in your browser's local memory**
- ✅ **Transmitted securely to OpenAI via encrypted edge functions**
- ✅ **You have full control over your API usage and costs**

## Project Structure

```
promptt/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AuthForm.tsx     # Login/signup form
│   │   ├── Navigation.tsx   # App navigation
│   │   ├── PromptGenerator.tsx  # Main prompt generation
│   │   └── PromptHistory.tsx    # Prompt management
│   ├── pages/
│   │   └── Index.tsx        # Main app page
│   └── integrations/
│       └── supabase/        # Database client
├── supabase/
│   └── functions/           # Edge functions
└── README.md
```

## Database Schema

### Tables

- **profiles**: User profile information
- **prompts**: Generated prompts with metadata

### Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Secure authentication with Supabase Auth

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.

## Support

- 📧 Create an issue on GitHub for bug reports
- 💡 Submit feature requests via GitHub issues
- 📖 Check the code for implementation details

## Roadmap

- [ ] Prompt templates and categories
- [ ] Prompt sharing and community features
- [ ] Advanced prompt optimization
- [ ] Integration with multiple AI providers
- [ ] Prompt performance analytics

---

**Built with ❤️ using Lovable, React, and Supabase**
