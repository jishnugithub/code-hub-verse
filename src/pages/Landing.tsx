
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Users, Zap, Share2, Github, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Landing = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [loginIdentifier, setLoginIdentifier] = useState("");

  const handleEmailAuth = async (isSignup: boolean) => {
    if (isSignup && !username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: isSignup ? "Account created!" : "Welcome back!",
        description: isSignup ? "Please check your email to verify your account." : "You have been logged in successfully.",
      });
      navigate('/editor');
    }, 1500);
  };

  const handleSocialAuth = (provider: string) => {
    toast({
      title: `${provider} Authentication`,
      description: `Redirecting to ${provider} for authentication...`,
    });
    setTimeout(() => {
      navigate('/editor');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 3D Floating Cubes Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="cube cube-1"></div>
        <div className="cube cube-2"></div>
        <div className="cube cube-3"></div>
        <div className="cube cube-4"></div>
        <div className="cube cube-5"></div>
        <div className="cube cube-6"></div>
        <div className="code-line code-line-1"></div>
        <div className="code-line code-line-2"></div>
        <div className="code-line code-line-3"></div>
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-bg"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg animate-pulse">
            <Code className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">CodeShare Hub</span>
        </div>
        <div className="space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => setShowAuthModal(true)}
          >
            Login
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover-scale"
            onClick={() => setShowAuthModal(true)}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center z-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl animate-fade-in">
            Code, Collaborate,
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              {" "}Create
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-300 md:text-2xl animate-fade-in">
            The ultimate collaborative coding platform. Write, compile, and share code snippets 
            in real-time with developers worldwide.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover-scale animate-scale-in"
              onClick={() => setShowAuthModal(true)}
            >
              Start Coding Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 hover-scale"
            >
              View Public Feed
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 relative z-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white animate-fade-in">
            Why Developers Choose CodeShare Hub
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover-scale animate-fade-in">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Multi-Language Support</h3>
              <p className="text-gray-300">
                Write and compile code in Python, JavaScript, Java, C++, and 20+ other languages.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover-scale animate-fade-in">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Real-time Collaboration</h3>
              <p className="text-gray-300">
                Code together with your team in real-time with live cursors and instant updates.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover-scale animate-fade-in">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500 animate-pulse">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Instant Compilation</h3>
              <p className="text-gray-300">
                Run your code instantly with our powerful cloud-based compilation engine.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover-scale animate-fade-in">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Smart Sharing</h3>
              <p className="text-gray-300">
                Share snippets publicly, fork others' code, and build upon community knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 px-6 py-8 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">CodeShare Hub</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <Card className="w-full max-w-md bg-white/10 border-white/20 backdrop-blur-md animate-scale-in">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CodeShare Hub</span>
              </div>
              <CardTitle className="text-white">Welcome</CardTitle>
              <CardDescription className="text-gray-300">
                Join the collaborative coding community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/5">
                  <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/10">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/10">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-identifier" className="text-white">Email or Username</Label>
                    <Input 
                      id="login-identifier" 
                      type="text" 
                      placeholder="Enter email or username"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Input 
                        id="login-password" 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    onClick={() => handleEmailAuth(false)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username" className="text-white">Username</Label>
                    <Input 
                      id="signup-username" 
                      type="text" 
                      placeholder="Choose a unique username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-400">This cannot be changed later</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                    <div className="relative">
                      <Input 
                        id="confirm-password" 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    onClick={() => handleEmailAuth(true)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  onClick={() => handleSocialAuth('Google')}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  onClick={() => handleSocialAuth('GitHub')}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>

              <div className="mt-4 text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }
        
        @keyframes slideCode {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .cube {
          position: absolute;
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #8b5cf6, #3b82f6);
          border-radius: 8px;
          opacity: 0.7;
        }
        
        .cube-1 {
          top: 20%;
          left: 10%;
          animation: float 6s ease-in-out infinite;
        }
        
        .cube-2 {
          top: 60%;
          left: 80%;
          animation: floatReverse 8s ease-in-out infinite;
        }
        
        .cube-3 {
          top: 30%;
          left: 70%;
          animation: float 10s ease-in-out infinite;
        }
        
        .cube-4 {
          top: 80%;
          left: 20%;
          animation: floatReverse 7s ease-in-out infinite;
        }
        
        .cube-5 {
          top: 10%;
          left: 50%;
          animation: float 9s ease-in-out infinite;
        }
        
        .cube-6 {
          top: 70%;
          left: 40%;
          animation: floatReverse 11s ease-in-out infinite;
        }
        
        .code-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
          opacity: 0.5;
        }
        
        .code-line-1 {
          top: 25%;
          width: 200px;
          animation: slideCode 15s linear infinite;
        }
        
        .code-line-2 {
          top: 45%;
          width: 150px;
          animation: slideCode 20s linear infinite reverse;
          animation-delay: -5s;
        }
        
        .code-line-3 {
          top: 65%;
          width: 180px;
          animation: slideCode 18s linear infinite;
          animation-delay: -10s;
        }
        
        .grid-bg {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }
        
        .hover-scale {
          transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Landing;
