import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Plus, Search, Filter, Eye, Copy, Share2, Heart, MessageSquare, Star, User, Users, AtSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isUserSearch, setIsUserSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mockSnippets = [
    {
      id: 1,
      title: "React Custom Hook for API Calls",
      description: "A reusable custom hook for handling API requests with loading states",
      language: "JavaScript",
      author: "Sarah Chen",
      avatar: "/placeholder.svg",
      tags: ["React", "Hooks", "API"],
      likes: 42,
      views: 156,
      forks: 12,
      comments: 8,
      timeAgo: "2 hours ago",
      code: `const useApiCall = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // ... rest of the hook
};`
    },
    {
      id: 2,
      title: "Python Data Visualization Script",
      description: "Beautiful charts using matplotlib and seaborn",
      language: "Python",
      author: "Alex Kumar",
      avatar: "/placeholder.svg",
      tags: ["Python", "Data", "Visualization"],
      likes: 38,
      views: 203,
      forks: 15,
      comments: 5,
      timeAgo: "4 hours ago",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

# Create beautiful visualizations
plt.figure(figsize=(10, 6))
sns.lineplot(data=df, x='date', y='value')`
    },
    {
      id: 3,
      title: "CSS Animation Collection",
      description: "Smooth CSS animations for modern web apps",
      language: "CSS",
      author: "Maria Garcia",
      avatar: "/placeholder.svg",
      tags: ["CSS", "Animation", "UI"],
      likes: 67,
      views: 298,
      forks: 23,
      comments: 12,
      timeAgo: "6 hours ago",
      code: `@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`
    },
    {
      id: 4,
      title: "Node.js Express Middleware",
      description: "Custom authentication middleware for Express.js",
      language: "JavaScript",
      author: "David Lee",
      avatar: "/placeholder.svg",
      tags: ["Node.js", "Express", "Auth"],
      likes: 29,
      views: 124,
      forks: 8,
      comments: 3,
      timeAgo: "8 hours ago",
      code: `const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  // ... validation logic
};`
    }
  ];

  const mockUsers = [
    { id: 1, username: "sarah_chen", name: "Sarah Chen", avatar: "/placeholder.svg", followers: 245, following: 123 },
    { id: 2, username: "alex_kumar", name: "Alex Kumar", avatar: "/placeholder.svg", followers: 189, following: 98 },
    { id: 3, username: "maria_garcia", name: "Maria Garcia", avatar: "/placeholder.svg", followers: 312, following: 156 },
    { id: 4, username: "david_lee", name: "David Lee", avatar: "/placeholder.svg", followers: 167, following: 89 },
  ];

  const popularTags = ["React", "Python", "JavaScript", "CSS", "Node.js", "API", "Animation", "Hooks", "Data"];

  // Search functionality
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        
        if (searchTerm.startsWith('@')) {
          // User search
          setIsUserSearch(true);
          const username = searchTerm.slice(1).toLowerCase();
          const userResults = mockUsers.filter(user => 
            user.username.toLowerCase().includes(username) ||
            user.name.toLowerCase().includes(username)
          );
          setSearchResults(userResults);
        } else {
          // Snippet search
          setIsUserSearch(false);
          const snippetResults = mockSnippets.filter(snippet => {
            const matchesTitle = snippet.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDescription = snippet.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTags = snippet.tags.some(tag => 
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return matchesTitle || matchesDescription || matchesTags;
          });
          setSearchResults(snippetResults);
        }
        
        setTimeout(() => setIsSearching(false), 300);
      } else {
        setSearchResults([]);
        setIsUserSearch(false);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  // 3D scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            card.style.transitionDelay = `${index * 100}ms`;
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(10deg) rotateY(-5deg)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [searchResults, searchTerm]);

  const filteredSnippets = searchTerm && searchResults.length > 0 && !isUserSearch 
    ? searchResults 
    : mockSnippets.filter(snippet => {
        const matchesTag = !selectedTag || snippet.tags.includes(selectedTag);
        return matchesTag;
      });

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-500",
      Python: "bg-blue-500",
      CSS: "bg-pink-500",
      TypeScript: "bg-blue-600",
      Java: "bg-orange-500",
      "C++": "bg-green-500",
    };
    return colors[language] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-r from-pink-500/15 to-orange-500/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">CodeShare Hub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                onClick={() => navigate('/editor')}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Snippet
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer transform transition-all duration-200 hover:scale-110 hover:shadow-lg" onClick={() => navigate('/profile')}>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-purple-500 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Search Section */}
        <div className="mb-8 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
                <AtSign className={`absolute left-12 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-200 ${
                  searchTerm.startsWith('@') ? 'text-blue-400 scale-110' : 'text-gray-600 scale-75'
                }`} />
                <Input
                  placeholder="Search snippets by title/tags, or find users with @username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-16 pr-4 py-4 text-lg backdrop-blur-sm focus:bg-white/15 transition-all duration-300 focus:border-purple-400"
                />
                {isSearching && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Search Results Indicator */}
            {searchTerm && (
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-400">
                {isUserSearch ? (
                  <>
                    <Users className="h-4 w-4" />
                    <span>Searching for users matching "{searchTerm.slice(1)}"</span>
                  </>
                ) : (
                  <>
                    <Code className="h-4 w-4" />
                    <span>Searching for snippets matching "{searchTerm}"</span>
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Tag Filter (only show for snippet search) */}
          {!isUserSearch && (
            <div className="flex flex-col gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Filter by tag:</span>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge
                  variant={selectedTag === "" ? "default" : "secondary"}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedTag === "" 
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg" 
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                  onClick={() => setSelectedTag("")}
                >
                  All
                </Badge>
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedTag === tag 
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg" 
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {isUserSearch && searchResults.length > 0 ? (
          /* User Search Results */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchResults.map((user, index) => (
              <Card 
                key={user.id} 
                ref={(el) => cardRefs.current[index] = el}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 group"
                style={{ perspective: '1000px' }}
              >
                <CardContent className="p-6 text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-purple-500 text-white text-lg">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-white font-semibold text-lg mb-1">{user.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">@{user.username}</p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-400">
                    <span>{user.followers} followers</span>
                    <span>{user.following} following</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Code Snippets Grid */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSnippets.map((snippet, index) => (
              <Card 
                key={snippet.id} 
                ref={(el) => cardRefs.current[index] = el}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'rotateY(5deg) rotateX(5deg) translateZ(20px)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                        {snippet.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-sm line-clamp-2">
                        {snippet.description}
                      </CardDescription>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(snippet.language)} ml-2 flex-shrink-0 transform transition-all duration-300 group-hover:scale-125`} />
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={snippet.avatar} />
                      <AvatarFallback className="bg-purple-500 text-white text-xs">
                        {snippet.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300">{snippet.author}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{snippet.timeAgo}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="bg-black/30 rounded-lg p-3 mb-4 transform transition-all duration-300 group-hover:bg-black/40">
                    <pre className="text-sm text-gray-300 overflow-hidden">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {snippet.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/10 text-gray-300 text-xs transform transition-all duration-200 hover:scale-105">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1 transform transition-all duration-200 hover:scale-105 hover:text-red-400">
                        <Heart className="h-4 w-4" />
                        <span>{snippet.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 transform transition-all duration-200 hover:scale-105 hover:text-blue-400">
                        <Eye className="h-4 w-4" />
                        <span>{snippet.views}</span>
                      </div>
                      <div className="flex items-center space-x-1 transform transition-all duration-200 hover:scale-105 hover:text-yellow-400">
                        <Star className="h-4 w-4" />
                        <span>{snippet.forks}</span>
                      </div>
                      <div className="flex items-center space-x-1 transform transition-all duration-200 hover:scale-105 hover:text-green-400">
                        <MessageSquare className="h-4 w-4" />
                        <span>{snippet.comments}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-1 transform transition-all duration-200 hover:scale-110 active:scale-95">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-1 transform transition-all duration-200 hover:scale-110 active:scale-95">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results State */}
        {((isUserSearch && searchResults.length === 0 && searchTerm) || 
          (!isUserSearch && filteredSnippets.length === 0)) && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">
              {isUserSearch ? "No users found" : "No snippets found"}
            </div>
            <div className="text-gray-500 text-sm">
              {isUserSearch 
                ? "Try searching for a different username" 
                : "Try adjusting your search or filter criteria"
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
