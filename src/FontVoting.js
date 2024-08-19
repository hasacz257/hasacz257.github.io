import React, { useState, useEffect } from 'react';
import { ArrowUpCircle, BarChart2, Info } from 'lucide-react';

const initialFonts = [
  {
    name: 'Arial',
    votes: 0,
    characteristics: 'Clean, modern sans-serif font with neutral appearance',
    useCase: 'Great for body text and headings in professional documents',
    sample: 'Bob, the cat, is biting my pants!!',
    scores: { readability: 0, professional: 0, versatility: 0, compatibility: 0, brandAlignment: 0 }
  },
  {
    name: 'Segoe UI',
    votes: 0,
    characteristics: 'Clear and modern sans-serif design optimized for screen readability',
    useCase: 'Excellent for user interfaces and digital content',
    sample: 'Bob, the cat, is biting my pants!!',
    scores: { readability: 0, professional: 0, versatility: 0, compatibility: 0, brandAlignment: 0 }
  },
  {
    name: 'Calibri',
    votes: 0,
    characteristics: 'Smooth sans-serif font with subtle rounded corners',
    useCase: 'Ideal for both body text and headings in various documents',
    sample: 'Bob, the cat, is biting my pants!!',
    scores: { readability: 0, professional: 0, versatility: 0, compatibility: 0, brandAlignment: 0 }
  },
  {
    name: 'Trebuchet MS',
    votes: 0,
    characteristics: 'Humanist sans-serif design with distinctive features',
    useCase: 'Good for web content and informal business communications',
    sample: 'Bob, the cat, is biting my pants!!',
    scores: { readability: 0, professional: 0, versatility: 0, compatibility: 0, brandAlignment: 0 }
  },
  {
    name: 'Verdana',
    votes: 0,
    characteristics: 'Wide sans-serif font designed for on-screen readability',
    useCase: 'Excellent for small text sizes and data-heavy reports',
    sample: 'Bob, the cat, is biting my pants!!',
    scores: { readability: 0, professional: 0, versatility: 0, compatibility: 0, brandAlignment: 0 }
  }
];

const criteria = [
  { name: 'readability', label: 'Readability', weight: 0.30 },
  { name: 'professional', label: 'Professional Appearance', weight: 0.25 },
  { name: 'versatility', label: 'Versatility', weight: 0.15 },
  { name: 'compatibility', label: 'Compatibility', weight: 0.20 },
  { name: 'brandAlignment', label: 'Brand Alignment', weight: 0.10 }
];

const SampleVisual = ({ fontFamily }) => (
  <svg width="300" height="200" viewBox="0 0 300 200" className="border rounded">
    <text x="10" y="30" fontSize="16" fontFamily={fontFamily} fontWeight="bold">Sample Chart Title</text>
    <text x="10" y="50" fontSize="12" fontFamily={fontFamily}>Axis Label</text>
    <text x="50" y="180" fontSize="12" fontFamily={fontFamily}>Category 1</text>
    <text x="150" y="180" fontSize="12" fontFamily={fontFamily}>Category 2</text>
    <text x="250" y="180" fontSize="12" fontFamily={fontFamily}>Category 3</text>
    <rect x="50" y="70" width="50" height="100" fill="#0068A3" />
    <rect x="150" y="40" width="50" height="130" fill="#CAD200" />
    <rect x="250" y="90" width="50" height="80" fill="#D0004E" />
    <text x="65" y="65" fontSize="12" fontFamily={fontFamily} fill="white">45</text>
    <text x="165" y="35" fontSize="12" fontFamily={fontFamily} fill="white">65</text>
    <text x="265" y="85" fontSize="12" fontFamily={fontFamily} fill="white">40</text>
  </svg>
);

export default function FontVoting() {
  // Retrieve saved data from localStorage or fall back to initial data
  const [fontList, setFontList] = useState(() => {
    const savedFonts = localStorage.getItem('fontList');
    return savedFonts ? JSON.parse(savedFonts) : initialFonts;
  });

  const [showResults, setShowResults] = useState(false);
  const [expandedFont, setExpandedFont] = useState(null);
  const [showScoring, setShowScoring] = useState(false);

  // Save updated fontList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fontList', JSON.stringify(fontList));
  }, [fontList]);

  const handleVote = (index) => {
    const newFontList = [...fontList];
    newFontList[index].votes += 1;
    setFontList(newFontList);
  };

  const handleScore = (fontIndex, criterionName, score) => {
    const newFontList = [...fontList];
    newFontList[fontIndex].scores[criterionName] = score;
    setFontList(newFontList);
  };

  const calculateTotalScore = (scores) => {
    return criteria.reduce((total, criterion) => {
      return total + (scores[criterion.name] * criterion.weight);
    }, 0).toFixed(2);
  };

  const interpretScore = (score) => {
    if (score >= 8.5) return "Excellent choice";
    if (score >= 7.0) return "Very good option";
    if (score >= 5.5) return "Acceptable";
    return "May need reconsideration";
  };

  const totalVotes = fontList.reduce((sum, font) => sum + font.votes, 0);

  const toggleFontDetails = (index) => {
    setExpandedFont(expandedFont === index ? null : index);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Font Evaluation and Voting</h1>
      <button
        onClick={() => setShowScoring(!showScoring)}
        className="mb-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 w-full flex items-center justify-center"
      >
        <BarChart2 className="mr-2" size={18} />
        {showScoring ? 'Hide Scoring System' : 'Show Scoring System'}
      </button>
      {showScoring && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Font Evaluation Scoring System</h2>
          <p className="mb-2"><strong>Criteria and Weights:</strong></p>
          <ul className="list-disc pl-5 mb-2">
            {criteria.map(criterion => (
              <li key={criterion.name}>{criterion.label} (Weight: {criterion.weight * 100}%)</li>
            ))}
          </ul>
          <p className="mb-2"><strong>Scoring Process:</strong></p>
          <ol className="list-decimal pl-5 mb-2">
            <li>Evaluate each font on all criteria, assigning a score from 0 to 10.</li>
            <li>Scores are automatically weighted and summed for a total out of 10.</li>
          </ol>
          <p><strong>Interpretation:</strong></p>
          <ul className="list-disc pl-5">
            <li>8.5 - 10: Excellent choice</li>
            <li>7.0 - 8.4: Very good option</li>
            <li>5.5 - 6.9: Acceptable</li>
            <li>Below 5.5: May need reconsideration</li>
          </ul>
        </div>
      )}
      {fontList.map((font, fontIndex) => (
        <div key={font.name} className="mb-6 p-4 border rounded hover:bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold" style={{ fontFamily: font.name }}>{font.name}</span>
            <div>
              <button
                onClick={() => toggleFontDetails(fontIndex)}
                className="mr-2 bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
              >
                <Info size={18} />
              </button>
              <button
                onClick={() => handleVote(fontIndex)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
              >
                <ArrowUpCircle className="mr-1" size={16} />
                Vote
              </button>
            </div>
          </div>
          {expandedFont === fontIndex && (
            <div className="mt-3 text-sm">
              <p><strong>Characteristics:</strong> {font.characteristics}</p>
              <p><strong>Recommended Use:</strong> {font.useCase}</p>
              <p className="mt-2"><strong>Sample Text:</strong></p>
              <p className="text-lg mt-1" style={{ fontFamily: font.name }}>{font.sample}</p>
              <div className="mt-4">
                <p className="mb-2"><strong>Sample Visual:</strong></p>
                <SampleVisual fontFamily={font.name} />
              </div>
              <div className="mt-4">
                <p className="mb-2"><strong>Scoring:</strong></p>
                {criteria.map(criterion => (
                  <div key={criterion.name} className="flex items-center mb-2">
                    <span className="w-1/3">{criterion.label}:</span>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={font.scores[criterion.name]}
                      onChange={(e) => handleScore(fontIndex, criterion.name, Number(e.target.value))}
                      className="w-16 px-2 py-1 border rounded"
                    />
                    <span className="ml-2">/ 10</span>
                  </div>
                ))}
                <p className="mt-2">
                  <strong>Total Score:</strong> {calculateTotalScore(font.scores)} / 10
                  <span className="ml-2 text-gray-600">
                    ({interpretScore(calculateTotalScore(font.scores))})
                  </span>
                </p>
              </div>
            </div>
          )}
          {showResults && (
            <div className="mt-2">
              <div className="bg-gray-200 h-2 rounded-full mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(font.votes / totalVotes) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{font.votes} votes</span>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => setShowResults(!showResults)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full flex items-center justify-center"
      >
        <BarChart2 className="mr-2" size={18} />
        {showResults ? 'Hide Voting Results' : 'Show Voting Results'}
      </button>
    </div>
  );
}
