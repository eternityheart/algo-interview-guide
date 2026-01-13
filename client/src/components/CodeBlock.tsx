import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  fileName?: string;
}

// Simple Java syntax highlighter
function highlightJava(code: string): string {
  // Keywords
  const keywords = /\b(public|private|protected|class|interface|extends|implements|static|final|void|int|long|double|float|boolean|char|byte|short|String|new|return|if|else|for|while|do|switch|case|break|continue|default|try|catch|finally|throw|throws|import|package|this|super|null|true|false|instanceof)\b/g;
  
  // Types (common Java types)
  const types = /\b(HashMap|HashSet|ArrayList|List|Map|Set|Arrays|Math|Integer|Long|Double|Boolean|Character|Object|StringBuilder|ArrayDeque)\b/g;
  
  // Strings
  const strings = /(["'])(?:(?=(\\?))\2.)*?\1/g;
  
  // Numbers
  const numbers = /\b(\d+\.?\d*[fFdDlL]?)\b/g;
  
  // Comments
  const singleLineComment = /(\/\/.*$)/gm;
  const multiLineComment = /(\/\*[\s\S]*?\*\/)/g;
  
  // Methods/Functions
  const methods = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g;
  
  let highlighted = code;
  
  // Order matters - process comments first to avoid highlighting inside them
  highlighted = highlighted.replace(multiLineComment, '<span class="syntax-comment">$1</span>');
  highlighted = highlighted.replace(singleLineComment, '<span class="syntax-comment">$1</span>');
  highlighted = highlighted.replace(strings, '<span class="syntax-string">$&</span>');
  highlighted = highlighted.replace(numbers, '<span class="syntax-number">$1</span>');
  highlighted = highlighted.replace(keywords, '<span class="syntax-keyword">$1</span>');
  highlighted = highlighted.replace(types, '<span class="syntax-type">$1</span>');
  
  return highlighted;
}

export default function CodeBlock({ 
  code, 
  language = 'java', 
  showLineNumbers = true,
  highlightLines = [],
  fileName
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const lines = code.split('\n');
  const highlightedCode = language === 'java' ? highlightJava(code) : code;
  const highlightedLines = highlightedCode.split('\n');
  
  return (
    <div className="code-block relative group">
      {/* File tab header */}
      {fileName && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-[oklch(0.15_0.015_270)]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[oklch(0.7_0.18_25)]" />
            <div className="w-3 h-3 rounded-full bg-[oklch(0.88_0.12_85)]" />
            <div className="w-3 h-3 rounded-full bg-[oklch(0.78_0.15_145)]" />
          </div>
          <span className="text-xs text-muted-foreground ml-2 font-mono">{fileName}</span>
        </div>
      )}
      
      {/* Copy button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      
      {/* Code content */}
      <pre className="overflow-x-auto">
        <code className="block">
          {highlightedLines.map((line, index) => (
            <div 
              key={index}
              className={`flex ${highlightLines.includes(index + 1) ? 'bg-[oklch(0.72_0.15_290_/_0.1)] border-l-2 border-[oklch(0.72_0.15_290)]' : ''}`}
            >
              {showLineNumbers && (
                <span className="line-number select-none">{index + 1}</span>
              )}
              <span 
                className="flex-1"
                dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
              />
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
