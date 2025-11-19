import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { getDifficultyBadgeClass } from "../../../../utils/FilterHelperFun.js";


const ProblemDescription = ({ problem, currentProblemId, onProblemChange, allProblems }) => {
  const [showExamples, setShowExamples] = useState(false);

  if (!problem) {
    return <div className="p-4">Loading problem...</div>;
  }

  return (
    <div className="h-full overflow-y-auto bg-base-100 p-6">
      {/* Problem Selector */}
      <div className="mb-6">
        <select
          value={currentProblemId}
          onChange={(e) => onProblemChange(e.target.value)}
          className="select select-bordered w-full"
        >
          {allProblems.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Problem Title and Difficulty */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>
        <p className="text-sm text-base-content/60">{problem.category}</p>
      </div>

      {/* Problem Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-base-content/80 mb-3">{problem.description.text}</p>
        {problem.description.notes && problem.description.notes.length > 0 && (
          <ul className="list-disc list-inside text-base-content/70 space-y-1">
            {problem.description.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Examples */}
      <div className="mb-6">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="flex items-center gap-2 text-lg font-semibold mb-3 hover:text-primary transition-colors"
        >
          Examples
          {showExamples ? <ChevronUpIcon className="size-5" /> : <ChevronDownIcon className="size-5" />}
        </button>
        {showExamples && (
          <div className="space-y-4">
            {problem.examples.map((example, index) => (
              <div key={index} className="card bg-base-200 p-4">
                <div className="mb-2">
                  <strong>Input:</strong> {example.input}
                </div>
                <div className="mb-2">
                  <strong>Output:</strong> {example.output}
                </div>
                {example.explanation && (
                  <div>
                    <strong>Explanation:</strong> {example.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Constraints */}
      {problem.constraints && problem.constraints.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Constraints</h2>
          <ul className="list-disc list-inside text-base-content/70 space-y-1">
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProblemDescription;
