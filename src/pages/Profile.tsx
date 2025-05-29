
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Code, 
  User, 
  Edit2, 
  Star, 
  Eye, 
  MessageSquare, 
  Calendar,
  ArrowLeft,
  Heart,
  Copy,
  Share2,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Alex Johnson",
    username: "alexcodes",
    email: "alex.johnson@email.com",
    bio: "Full-stack developer passionate about creating innovative solutions. Love sharing knowledge with the community!",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    joined: "March 2023"
  });

  const userStats = {
    snippets: 24,
    likes: 156,
    views: 2847,
    followers: 89,
    following: 43
  };

  const mySnippets = [
    {
      id: 1,
      title: "React Custom Hook for API Calls",
      description: "A reusable custom hook for handling API requests with loading states",
      language: "JavaScript",
      tags: ["React", "Hooks", "API"],
      likes: 42,
      views: 156,
      forks: 12,
      comments: 8,
      timeAgo: "2 hours ago",
      isPublic: true
    },
    {
      id: 2,
      title: "Python Data Visualization Script",
      description: "Beautiful charts using matplotlib and seaborn",
      language: "Python",
      tags: ["Python", "Data", "Visualization"],
      likes: 38,
      views: 203,
      forks: 15,
      comments: 5,
      timeAgo: "4 hours ago",
      isPublic: true
    },
    {
      id: 3,
      title: "Private Project Setup",
      description: "Initial setup for my new project - work in progress",
      language: "TypeScript",
      tags: ["TypeScript", "Setup", "Private"],
      likes: 0,
      views: 12,
      forks: 0,
      comments: 0,
      timeAgo: "1 day ago",
      isPublic: false
    }
  ];

  const forkedSnippets = [
    {
      id: 4,
      title: "CSS Animation Collection",
      description: "Smooth CSS animations for modern web apps",
      language: "CSS",
      originalAuthor: "Maria Garcia",
      tags: ["CSS", "Animation", "UI"],
      timeAgo: "2 days ago"
    }
  ];

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

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CodeShare Hub</span>
              </div>
            </div>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Panel - Profile Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl">
                      {userInfo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing ? (
                    <div className="w-full space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white text-left block">Full Name</Label>
                        <Input
                          id="name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-white text-left block">Username</Label>
                        <Input
                          id="username"
                          value={userInfo.username}
                          onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-white text-left block">Bio</Label>
                        <Textarea
                          id="bio"
                          value={userInfo.bio}
                          onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-white text-left block">Location</Label>
                        <Input
                          id="location"
                          value={userInfo.location}
                          onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website" className="text-white text-left block">Website</Label>
                        <Input
                          id="website"
                          value={userInfo.website}
                          onChange={(e) => setUserInfo({...userInfo, website: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <Button 
                        onClick={handleSaveProfile}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold text-white mb-1">{userInfo.name}</h1>
                      <p className="text-gray-400 mb-3">@{userInfo.username}</p>
                      <p className="text-gray-300 text-sm mb-4">{userInfo.bio}</p>
                      
                      <div className="w-full space-y-2 text-sm text-gray-400">
                        <div className="flex items-center justify-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{userInfo.location}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {userInfo.joined}</span>
                        </div>
                        {userInfo.website && (
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
                              {userInfo.website}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">{userStats.snippets}</div>
                    <div className="text-sm text-gray-400">Snippets</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{userStats.likes}</div>
                    <div className="text-sm text-gray-400">Likes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{userStats.views}</div>
                    <div className="text-sm text-gray-400">Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{userStats.followers}</div>
                    <div className="text-sm text-gray-400">Followers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="snippets" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10">
                <TabsTrigger value="snippets" className="text-white data-[state=active]:bg-white/20">
                  My Snippets
                </TabsTrigger>
                <TabsTrigger value="forked" className="text-white data-[state=active]:bg-white/20">
                  Forked
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-white data-[state=active]:bg-white/20">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="snippets" className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">My Code Snippets</h2>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/editor')}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    Create New
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {mySnippets.map((snippet) => (
                    <Card key={snippet.id} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <CardTitle className="text-white text-lg">{snippet.title}</CardTitle>
                              {!snippet.isPublic && (
                                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 text-xs">
                                  Private
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-gray-300 text-sm">
                              {snippet.description}
                            </CardDescription>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${getLanguageColor(snippet.language)} ml-2 flex-shrink-0`} />
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {snippet.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
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
                            <span className="text-gray-500">•</span>
                            <span>{snippet.timeAgo}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-1">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-1">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-1">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="forked" className="space-y-4 mt-6">
                <h2 className="text-xl font-semibold text-white">Forked Snippets</h2>
                
                <div className="grid gap-4">
                  {forkedSnippets.map((snippet) => (
                    <Card key={snippet.id} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-white text-lg mb-2">{snippet.title}</CardTitle>
                            <CardDescription className="text-gray-300 text-sm mb-2">
                              {snippet.description}
                            </CardDescription>
                            <div className="text-sm text-gray-400">
                              Forked from <span className="text-purple-400">{snippet.originalAuthor}</span> • {snippet.timeAgo}
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${getLanguageColor(snippet.language)} ml-2 flex-shrink-0`} />
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {snippet.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 mt-6">
                <h2 className="text-xl font-semibold text-white">Account Settings</h2>
                
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Privacy Settings</CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage your account privacy and visibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Public Profile</div>
                        <div className="text-sm text-gray-400">Allow others to view your profile</div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Activity Status</div>
                        <div className="text-sm text-gray-400">Show when you're active</div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white">
                        Enabled
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Notifications</CardTitle>
                    <CardDescription className="text-gray-300">
                      Configure your notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Email Notifications</div>
                        <div className="text-sm text-gray-400">Receive updates via email</div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Comment Notifications</div>
                        <div className="text-sm text-gray-400">Get notified of new comments</div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white">
                        Enabled
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
