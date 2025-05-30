import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code, 
  Play, 
  Save, 
  Share2, 
  Users, 
  Settings, 
  Plus, 
  X, 
  Eye,
  Globe,
  Lock,
  ArrowLeft,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

const Editor = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg", active: true, cursorColor: "bg-blue-500" },
    { id: 2, name: "Bob Smith", avatar: "/placeholder.svg", active: true, cursorColor: "bg-green-500" },
  ]);

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "typescript", label: "TypeScript" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
  ];

  const getDefaultCode = (lang: string) => {
    switch (lang) {
      case "javascript":
        return `// Welcome to CodeShare Hub!
// Start coding your JavaScript here...

function greetUser(name) {
  console.log(\`Hello, \${name}! Welcome to CodeShare Hub!\`);
}

greetUser("Developer");`;
      case "python":
        return `# Welcome to CodeShare Hub!
# Start coding your Python here...

def greet_user(name):
    print(f"Hello, {name}! Welcome to CodeShare Hub!")

greet_user("Developer")`;
      case "java":
        return `// Welcome to CodeShare Hub!
// Start coding your Java here...

public class Main {
    public static void main(String[] args) {
        greetUser("Developer");
    }
    
    public static void greetUser(String name) {
        System.out.println("Hello, " + name + "! Welcome to CodeShare Hub!");
    }
}`;
      case "cpp":
        return `// Welcome to CodeShare Hub!
// Start coding your C++ here...

#include <iostream>
#include <string>

void greetUser(const std::string& name) {
    std::cout << "Hello, " << name << "! Welcome to CodeShare Hub!" << std::endl;
}

int main() {
    greetUser("Developer");
    return 0;
}`;
      case "typescript":
        return `// Welcome to CodeShare Hub!
// Start coding your TypeScript here...

function greetUser(name: string): void {
  console.log(\`Hello, \${name}! Welcome to CodeShare Hub!\`);
}

greetUser("Developer");`;
      case "go":
        return `// Welcome to CodeShare Hub!
// Start coding your Go here...

package main

import "fmt"

func greetUser(name string) {
    fmt.Printf("Hello, %s! Welcome to CodeShare Hub!\\n", name)
}

func main() {
    greetUser("Developer")
}`;
      case "rust":
        return `// Welcome to CodeShare Hub!
// Start coding your Rust here...

fn greet_user(name: &str) {
    println!("Hello, {}! Welcome to CodeShare Hub!", name);
}

fn main() {
    greet_user("Developer");
}`;
      case "html":
        return `<!-- Welcome to CodeShare Hub! -->
<!-- Start coding your HTML here... -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeShare Hub</title>
</head>
<body>
    <h1>Hello, Developer!</h1>
    <p>Welcome to CodeShare Hub!</p>
</body>
</html>`;
      case "css":
        return `/* Welcome to CodeShare Hub! */
/* Start coding your CSS here... */

body {
    font-family: Arial, sans-serif;
    background-color: #1a1a1a;
    color: #ffffff;
    margin: 0;
    padding: 20px;
}

.welcome {
    text-align: center;
    color: #4f46e5;
}

.welcome::after {
    content: " Welcome to CodeShare Hub!";
}`;
      default:
        return `// Welcome to CodeShare Hub!
// Start coding here...

console.log("Hello, Developer! Welcome to CodeShare Hub!");`;
    }
  };

  // Initialize code when component mounts
  useEffect(() => {
    setCode(getDefaultCode(language));
  }, []);

  // Update code when language changes
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(getDefaultCode(newLanguage));
  };

  const templates = [
    { name: "Blank", code: "// Start coding here..." },
    { name: "React Component", code: `import React from 'react';

const MyComponent = () => {
  return (
    <div>
      <h1>Hello, React!</h1>
    </div>
  );
};

export default MyComponent;` },
    { name: "Express Server", code: `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});` },
    { name: "Python Function", code: `def main():
    """
    Main function - add your code here
    """
    print("Hello, Python!")
    
if __name__ == "__main__":
    main()` },
  ];

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running code...\n");
    
    // Simulate code execution
    setTimeout(() => {
      const simulatedOutput = `$ Running ${language} code...\n\nHello, Developer! Welcome to CodeShare Hub!\n\nExecution completed successfully.\n✓ No errors found.`;
      setOutput(simulatedOutput);
      setIsRunning(false);
      toast({
        title: "Code executed successfully!",
        description: "Your code ran without errors.",
      });
    }, 2000);
  };

  const saveSnippet = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title for your snippet.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Snippet saved!",
      description: `"${title}" has been saved to your library.`,
    });
  };

  const shareSnippet = () => {
    if (!title.trim()) {
      toast({
        title: "Title required", 
        description: "Please add a title before sharing.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Snippet shared!",
      description: isPublic ? "Your snippet is now public." : "Sharing link created.",
    });
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const loadTemplate = (template: any) => {
    setCode(template.code);
    toast({
      title: "Template loaded",
      description: `"${template.name}" template has been loaded.`,
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50'}`}>
      {/* Header */}
      <header className={`border-b ${theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-gray-200 bg-white/80'} backdrop-blur-sm`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>CodeShare Hub</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Collaborators */}
              <div className="flex items-center space-x-2">
                <Users className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                <div className="flex -space-x-2">
                  {collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="relative">
                      <Avatar className="h-8 w-8 border-2 border-gray-800">
                        <AvatarImage src={collaborator.avatar} />
                        <AvatarFallback className="bg-purple-500 text-white text-xs">
                          {collaborator.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {collaborator.active && (
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${collaborator.cursorColor} rounded-full border border-gray-800`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={saveSnippet}
                className={`${theme === 'dark' ? 'bg-white/5 border-white/20 text-white hover:bg-white/10' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'}`}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              
              <Button 
                size="sm"
                onClick={shareSnippet}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-purple-500 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Top Row - Collaborators */}
        <div className="mb-6">
          <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} backdrop-blur-sm max-w-md`}>
            <CardHeader>
              <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg flex items-center`}>
                <Users className="h-5 w-5 mr-2" />
                Collaborators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {collaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={collaborator.avatar} />
                      <AvatarFallback className="bg-purple-500 text-white text-xs">
                        {collaborator.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {collaborator.active && (
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${collaborator.cursorColor} rounded-full border border-gray-800`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{collaborator.name}</div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {collaborator.active ? "Active now" : "Offline"}
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                size="sm" 
                variant="outline"
                className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/20 text-white hover:bg-white/10' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'}`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Invite Collaborator
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid - Workspace and Output */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* Left Side - Code Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Code Editor</h2>
              <div className="flex space-x-2">
                <Button
                  onClick={runCode}
                  disabled={isRunning}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
              </div>
            </div>
            
            <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} backdrop-blur-sm`}>
              <CardContent className="p-0">
                <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-100'} rounded-t-lg p-4 border-b ${theme === 'dark' ? 'border-white/20' : 'border-gray-200'}`}>
                  <div className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-4">{language}.{language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : language === 'python' ? 'py' : language}</span>
                  </div>
                </div>
                <div className="relative">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`min-h-[500px] ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} border-0 font-mono text-sm resize-none rounded-none rounded-b-lg focus:ring-0 focus:border-0`}
                    placeholder="Start coding here..."
                  />
                  <div className="absolute top-4 left-20 w-0.5 h-5 bg-blue-500 animate-pulse"></div>
                  <div className="absolute top-8 left-32 w-0.5 h-5 bg-green-500 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Output */}
          <div className="space-y-4">
            <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg flex items-center`}>
                  <Eye className="h-5 w-5 mr-2" />
                  Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`${theme === 'dark' ? 'bg-black/50' : 'bg-gray-50'} rounded-lg p-4 min-h-[500px]`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap`}>
                    {output || "Run your code to see output here..."}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Row - Snippet Details */}
        <Card className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg`}>Snippet Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter snippet title..."
                    className={`${theme === 'dark' ? 'bg-white/5 border-white/20 text-white placeholder:text-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500'}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your snippet..."
                    className={`${theme === 'dark' ? 'bg-white/5 border-white/20 text-white placeholder:text-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500'}`}
                    rows={3}
                  />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Language</Label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className={`${theme === 'dark' ? 'bg-white/5 border-white/20 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={`${theme === 'dark' ? 'bg-gray-800 border-white/20' : 'bg-white border-gray-200'}`}>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value} className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Visibility</Label>
                  <div className="flex space-x-2">
                    <Button
                      variant={isPublic ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsPublic(true)}
                      className={isPublic ? "bg-gradient-to-r from-purple-500 to-blue-500" : `${theme === 'dark' ? 'bg-white/5 border-white/20 text-white' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Public
                    </Button>
                    <Button
                      variant={!isPublic ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsPublic(false)}
                      className={!isPublic ? "bg-gradient-to-r from-purple-500 to-blue-500" : `${theme === 'dark' ? 'bg-white/5 border-white/20 text-white' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Private
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className={`${theme === 'dark' ? 'bg-white/10 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className={`ml-1 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag..."
                      className={`${theme === 'dark' ? 'bg-white/5 border-white/20 text-white placeholder:text-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500'}`}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button size="sm" onClick={addTag} className={`${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'}`}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Templates</Label>
                  <div className="space-y-2">
                    {templates.map((template) => (
                      <Button
                        key={template.name}
                        variant="ghost"
                        size="sm"
                        onClick={() => loadTemplate(template)}
                        className={`w-full justify-start ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                      >
                        {template.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Editor;
