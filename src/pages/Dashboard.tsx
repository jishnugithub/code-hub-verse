import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Plus, Search, Filter, Eye, Copy, Share2, Heart, MessageSquare, Star, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

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

  const popularTags = ["React", "Python", "JavaScript", "CSS", "Node.js", "API", "Animation", "Hooks", "Data"];

  const filteredSnippets = mockSnippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || snippet.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">CodeShare Hub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                onClick={() => navigate('/editor')}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Snippet
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer" onClick={() => navigate('/profile')}>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-purple-500 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search code snippets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Filter by tag:</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedTag === "" ? "default" : "secondary"}
              className={`cursor-pointer transition-colors ${
                selectedTag === "" 
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" 
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
                className={`cursor-pointer transition-colors ${
                  selectedTag === tag 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" 
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Code Snippets Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSnippets.map((snippet) => (
            <Card key={snippet.id} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-200 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2 line-clamp-2">
                      {snippet.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-sm line-clamp-2">
                      {snippet.description}
                    </CardDescription>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getLanguageColor(snippet.language)} ml-2 flex-shrink-0`} />
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
                <div className="bg-black/30 rounded-lg p-3 mb-4">
                  <pre className="text-sm text-gray-300 overflow-hidden">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {snippet.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{snippet.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{snippet.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{snippet.forks}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{snippet.comments}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-1">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-1">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSnippets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No snippets found</div>
            <div className="text-gray-500 text-sm">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
