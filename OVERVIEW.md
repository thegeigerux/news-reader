# App Overview

## Concept
News Reader is a calm, curated news experience designed for busy professionals who want to stay informed without information overload. Unlike chaotic news aggregators, this app presents just 3 carefully selected stories at a time, creating an editorial-style reading experience.

## Design Philosophy

### Calm & Focused
- Warm, neutral color palette (#F7F5F1 background)
- Generous whitespace and breathing room
- Typography-first hierarchy (Inter + Newsreader font pairing)
- No auto-playing videos or popups
- Minimal visual noise

### Editorial Quality
- Each article feels intentionally placed
- Featured story gets prominence without overwhelming
- Secondary stories complement, not compete
- Clean card-based layout

### Accessibility
- Semantic HTML structure
- Keyboard navigable throughout
- Visible focus states
- Strong color contrast (WCAG compliant)
- Screen reader friendly

## User Experience

### Primary Flow
1. User lands on homepage with 3 current stories
2. Can filter by category or search by keyword
3. Click any article for detailed modal view
4. Save articles for later reading
5. Navigate pages to see more stories

### Key Interactions
- **Category Tabs**: Pill-shaped, scrollable on mobile
- **Search**: Real-time with clear button
- **Bookmarks**: Heart icon, appears on hover (desktop) or always (mobile)
- **Dark Mode**: Persistent preference, smooth transition
- **Article Modal**: Clean overlay with full details and external link

### Empty States
- Search with no results shows helpful message
- Empty bookmarks section encourages exploration
- Loading skeletons match final layout

## Technical Architecture

### Frontend (React + Vite)
- Functional components with hooks
- Custom hooks for dark mode and bookmarks
- CSS custom properties for theming
- Component-scoped CSS files
- LocalStorage for persistence

### Backend (Express)
- Single proxy purpose: protect API key
- Clean route separation
- Input validation
- Error normalization
- CORS configured for development

### API Integration
- TheNewsAPI provides news data
- Backend handles all external requests
- Frontend only talks to local Express server
- Rate limiting respected (limit=3)

## Design Decisions

### Why 3 Articles?
The API limit actually enhances the UX:
- Forces curation mindset
- Reduces decision fatigue
- Creates "briefing" feel
- Each story feels important

### Why Modal Instead of Page?
- Faster navigation
- Maintains scroll position
- Less jarring than full page loads
- Easy to close and return to browsing

### Why No Infinite Scroll?
- Pagination gives better control
- Easier to bookmark/share specific pages
- More predictable performance
- Aligns with "calm" philosophy

## Future Enhancements
Potential additions if needed:
- Reading time estimation
- Personalized topic preferences
- Offline reading support
- Push notifications
- Article summaries via AI
