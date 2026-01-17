# 🎨 Pantry Frontend - Beautiful Apple-Inspired UI

A modern, beautiful household management interface inspired by Apple's design language.

## ✨ Features

- 🔐 **Secure Authentication** - Beautiful login page with error handling
- 🎨 **Apple-Inspired Design** - Clean, modern, and elegant UI
- 🌓 **Dark Mode** - Automatic dark mode support
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Fast** - Built with Next.js 15 and React 19
- 🎭 **Smooth Animations** - Subtle, delightful transitions

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd apps/frontend
npm install
```

### 2. Configure Environment
The `.env.local` file is already set up with defaults:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Start Development Server
```bash
npm run dev
```

The frontend will be available at: **http://localhost:3000**

## 🎯 What's Included

### Pages
- `/` - Redirects to login
- `/login` - Beautiful login page with brute-force protection handling
- `/dashboard` - Protected dashboard (placeholder for now)

### Components & Utils
- `src/lib/api.ts` - API client with authentication
- Token management in localStorage
- Type-safe API calls

### Design Features
- **Gradient backgrounds** with blur effects for depth
- **Glass-morphism** cards with backdrop blur
- **Smooth transitions** on all interactive elements
- **Focus states** that match Apple's design language
- **Loading states** with spinner animations
- **Error handling** with beautiful error messages

## 🎨 Design Philosophy

### Apple-Inspired Principles
1. **Clarity** - Clear typography and hierarchy
2. **Deference** - Content takes priority
3. **Depth** - Subtle shadows and blur create layering
4. **Clean** - Minimal but not minimal
5. **Sophisticated** - Professional but approachable

### Color Palette
- **Primary**: Blue to Purple gradient (modern, friendly)
- **Backgrounds**: Soft neutrals with subtle gradients
- **Text**: High contrast for readability
- **Accents**: Subtle colored blur effects

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Home (redirects to login)
│   ├── globals.css          # Global styles
│   ├── login/
│   │   └── page.tsx         # Login page
│   └── dashboard/
│       └── page.tsx         # Dashboard (protected)
└── lib/
    └── api.ts               # API client & auth utilities
```

## 🔐 Authentication Flow

1. User visits `/` → redirected to `/login`
2. User enters credentials
3. API client calls backend `/api/auth/login`
4. On success:
   - Token stored in localStorage
   - User data stored in localStorage
   - Redirect to `/dashboard`
5. On error:
   - Display error message
   - Handle lockout (shows retry time)

## 🛠️ API Integration

### Backend URL
Default: `http://localhost:3001`

Change in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://your-backend-url:3001
```

### API Functions

```typescript
import { login, logout, changePassword } from '@/lib/api';

// Login
const { token, user } = await login('username', 'password');

// Logout
await logout();

// Change password
await changePassword('old', 'new');
```

## 🎨 Customizing the Design

### Colors
Edit `tailwind.config.ts` or use Tailwind's color utilities in components.

### Fonts
Using Google Fonts: **Geist Sans** and **Geist Mono**
Change in `src/app/layout.tsx`

### Logo
Replace the SVG in `/login/page.tsx` with your custom icon:
```tsx
<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
  {/* Your logo here */}
</div>
```

## 📱 Responsive Design

The UI is fully responsive and tested on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🌙 Dark Mode

Dark mode is automatic based on system preferences. The design includes:
- Dark mode color variants for all elements
- Reduced contrast for comfort
- Adjusted shadows and blur effects
- Maintained readability

## 🚦 Error Handling

### Login Errors
- **Invalid credentials** - Clear, friendly message
- **Account locked** - Shows minutes remaining
- **Server error** - Generic fallback message

### Visual Feedback
- Red background with low opacity
- Border accent
- Clear error text

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🔜 Coming Soon

The dashboard is a placeholder. Future features:
- 📦 **Pantry Management** - Track items in storage
- 🏠 **Room Organization** - Organize by room/location
- 📅 **Family Calendar** - Shared scheduling
- 👥 **Family Members** - User management
- 🔔 **Notifications** - Low stock alerts
- 📊 **Analytics** - Usage insights

## 🎯 Design Goals Achieved

✅ **Beautiful** - Apple-inspired aesthetics
✅ **Fast** - Optimized performance
✅ **Accessible** - Keyboard navigation & focus states
✅ **Responsive** - Works on all screen sizes
✅ **Modern** - Latest Next.js & React
✅ **Type-safe** - Full TypeScript support
✅ **Self-hosted friendly** - Simple setup

## 💡 Tips

### Development
- Use **React DevTools** for debugging
- Hot reload is enabled by default
- Check browser console for errors

### Styling
- Use Tailwind classes for consistency
- Follow the established color palette
- Keep animations subtle and smooth

### Performance
- Images optimized with next/image
- Fonts optimized with next/font
- CSS is automatically optimized

## 🐛 Troubleshooting

### Can't connect to backend
Check that:
1. Backend is running on port 3001
2. `.env.local` has correct URL
3. CORS is enabled on backend

### Styling not working
1. Restart dev server
2. Clear `.next` folder: `rm -rf .next`
3. Reinstall: `npm install`

### TypeScript errors
Run type check: `npm run build`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React 19 Features](https://react.dev/blog/2024/04/25/react-19)

---

Built with ❤️ for self-hosted home management

