/**
 * Sample/fallback news data for development and demo purposes
 * Used when TheNewsAPI is unavailable
 */

export const sampleArticles = [
  {
    uuid: "sample-1",
    title: "The Future of Sustainable Architecture: Building for Tomorrow",
    description: "Architects and urban planners are reimagining how cities can adapt to climate change while creating healthier living spaces for residents. New materials and innovative designs are leading the way.",
    snippet: "A deep dive into how modern architecture is evolving to meet environmental challenges.",
    url: "https://example.com/sustainable-architecture",
    image_url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&auto=format&fit=crop",
    published_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    source: "ArchDaily",
    categories: ["technology", "science"],
    locale: "us",
    language: "en"
  },
  {
    uuid: "sample-2",
    title: "Global Markets React to New Economic Policies",
    description: "International markets showed mixed signals today as central banks announce coordinated approaches to inflation management. Analysts predict a period of adjustment.",
    snippet: "Economic indicators suggest cautious optimism despite ongoing challenges.",
    url: "https://example.com/markets-update",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
    published_at: new Date(Date.now() - 4 * 3600000).toISOString(),
    source: "Financial Times",
    categories: ["business"],
    locale: "us",
    language: "en"
  },
  {
    uuid: "sample-3",
    title: "Breakthrough in Renewable Energy Storage Technology",
    description: "Scientists have developed a new battery technology that could make renewable energy storage more efficient and affordable. The innovation addresses a key barrier to widespread adoption.",
    snippet: "New battery design promises to revolutionize how we store solar and wind energy.",
    url: "https://example.com/battery-breakthrough",
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
    published_at: new Date(Date.now() - 6 * 3600000).toISOString(),
    source: "Tech Review",
    categories: ["technology", "science"],
    locale: "us",
    language: "en"
  },
  {
    uuid: "sample-4",
    title: "The Renaissance of Local Bookstores in the Digital Age",
    description: "Despite the rise of e-books and online retailers, independent bookstores are experiencing an unexpected revival. Community events and personalized service are driving this resurgence.",
    snippet: "How small bookshops are finding their place in a digital world.",
    url: "https://example.com/bookstores-renaissance",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    published_at: new Date(Date.now() - 8 * 3600000).toISOString(),
    source: "Culture Weekly",
    categories: ["entertainment", "business"],
    locale: "us",
    language: "en"
  },
  {
    uuid: "sample-5",
    title: "Major Health Study Reveals Benefits of Mediterranean Diet",
    description: "A comprehensive 10-year study involving over 50,000 participants confirms significant cardiovascular benefits from following a Mediterranean diet rich in olive oil, nuts, and fish.",
    snippet: "New research provides compelling evidence for dietary changes.",
    url: "https://example.com/mediterranean-diet-study",
    image_url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop",
    published_at: new Date(Date.now() - 12 * 3600000).toISOString(),
    source: "Health Journal",
    categories: ["health", "science"],
    locale: "us",
    language: "en"
  },
  {
    uuid: "sample-6",
    title: "Underdog Team's Historic Run in Championship Tournament",
    description: "In a stunning turn of events, the lowest-ranked team in the tournament has advanced to the finals, defeating three top-seeded opponents along the way.",
    snippet: "An incredible journey that has captivated sports fans worldwide.",
    url: "https://example.com/underdog-story",
    image_url: "https://images.unsplash.com/photo-1461896836934- voices-0a2f2e5d5b5f?w=800&auto=format&fit=crop",
    published_at: new Date(Date.now() - 3 * 3600000).toISOString(),
    source: "Sports Today",
    categories: ["sports"],
    locale: "us",
    language: "en"
  },
  {
    uuid: "sample-7",
    title: "Space Agency Announces Ambitious Lunar Mission Timeline",
    description: "The space agency has revealed detailed plans for returning humans to the Moon within the next five years, including new rover designs and habitat modules.",
    snippet: "Next-generation technology will enable longer stays on the lunar surface.",
    url: "https://example.com/lunar-mission",
    image_url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop",
    published_at: new Date(Date.now() - 5 * 3600000).toISOString(),
    source: "Space News",
    categories: ["science", "technology"],
    locale: "us",
    language: "en"
  },
  {
    uuid: "sample-8",
    title: "Remote Work Trends Reshape Urban Real Estate Markets",
    description: "As remote work becomes permanent for many companies, downtown office spaces are being converted into residential units, fundamentally changing city landscapes.",
    snippet: "Cities adapt to new patterns of work and living.",
    url: "https://example.com/remote-work-real-estate",
    image_url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop",
    published_at: new Date(Date.now() - 7 * 3600000).toISOString(),
    source: "Urban Planning",
    categories: ["business"],
    locale: "us",
    language: "en"
  },
  {
    uuid: "sample-9",
    title: "AI Assistants Transform How We Manage Daily Tasks",
    description: "New research shows that AI-powered personal assistants are not just automating routine tasks but actually helping users develop better time management habits.",
    snippet: "Machine learning meets productivity science.",
    url: "https://example.com/ai-productivity",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    published_at: new Date(Date.now() - 9 * 3600000).toISOString(),
    source: "AI Weekly",
    categories: ["technology"],
    locale: "us",
    language: "en"
  }
];

export function getSampleArticles(page = 1, limit = 3) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = sampleArticles.slice(startIndex, endIndex);
  
  return {
    success: true,
    data: paginatedArticles,
    meta: {
      found: sampleArticles.length,
      returned: paginatedArticles.length,
      limit: limit,
      page: page
    },
    isSampleData: true
  };
}

export function searchSampleArticles(query, page = 1, limit = 3) {
  const lowerQuery = query.toLowerCase();
  const filtered = sampleArticles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.source.toLowerCase().includes(lowerQuery)
  );
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = filtered.slice(startIndex, endIndex);
  
  return {
    success: true,
    data: paginatedArticles,
    meta: {
      found: filtered.length,
      returned: paginatedArticles.length,
      limit: limit,
      page: page
    },
    isSampleData: true
  };
}

export function getSampleArticlesByCategory(category, page = 1, limit = 3) {
  const filtered = sampleArticles.filter(article => 
    article.categories.includes(category.toLowerCase())
  );
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = filtered.slice(startIndex, endIndex);
  
  return {
    success: true,
    data: paginatedArticles,
    meta: {
      found: filtered.length,
      returned: paginatedArticles.length,
      limit: limit,
      page: page
    },
    isSampleData: true
  };
}
