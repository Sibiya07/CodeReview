import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'



const localhost = "https://codereview-4pgc.onrender.com";
const LANGUAGES = [
  { label: "Java 8", value: "java8" },
  { label: "Java 11", value: "java11" },
  { label: "Python 2", value: "python2" },
  { label: "Python 3", value: "python3" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "JavaScript", value: "javascript" },
]

const DEFAULT_CODE = {
  java8: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  java11: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  python2: `print "Hello, World!"`,
  python3: `print("Hello, World!")`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  javascript: `console.log("Hello, World!");`,
}

function App() {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(DEFAULT_CODE["javascript"])
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  useEffect(() => {
    setCode(DEFAULT_CODE[language] || "")
  }, [language])

    async function reviewCode() {
    setLoading(true)
    try {
      const response = await axios.post(`${localhost}/ai/get-review`, {
        language,
        code,
      })
      setReview(response.data)
    } catch (err) {
      setReview("Error: " + err.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <main>
      <div className="left">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-dropdown"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages[language] || prism.languages.javascript, language)
            }
            padding={10}
            className="code-editor"
          />
        </div>

        <button onClick={reviewCode} className="review-button" disabled={loading}>
          {loading ? "Reviewing..." : "Review"}
        </button>
      </div>

      <div className="right">
        <h3>AI Code Review</h3>
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  )
}

export default App
