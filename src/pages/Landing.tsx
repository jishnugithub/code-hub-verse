
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Users, Zap, Share2, Github, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
            <Code className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">CodeShare Hub</span>
        </div>
        <div className="space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/auth')}
          >
            Login
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            onClick={() => navigate('/auth')}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            Code, Collaborate,
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {" "}Create
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-300 md:text-2xl">
            The ultimate collaborative coding platform. Write, compile, and share code snippets 
            in real-time with developers worldwide.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              onClick={() => navigate('/auth')}
            >
              Start Coding Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              View Public Feed
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Why Developers Choose CodeShare Hub
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Multi-Language Support</h3>
              <p className="text-gray-300">
                Write and compile code in Python, JavaScript, Java, C++, and 20+ other languages.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Real-time Collaboration</h3>
              <p className="text-gray-300">
                Code together with your team in real-time with live cursors and instant updates.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Instant Compilation</h3>
              <p className="text-gray-300">
                Run your code instantly with our powerful cloud-based compilation engine.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-500">
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
      <footer className="border-t border-white/10 bg-black/20 px-6 py-8">
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
    </div>
  );
};

export default Landing;
