import { Code2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

function DevCanvasPromo() {
    return (
        <div className="mb-8 group relative rounded-3xl p-[1px] overflow-hidden bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-blue-500/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl rounded-[23px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 shadow-inner">
                        <Code2 className="w-6 h-6 text-blue-400 group-hover:animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                            Try DevCanvas
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">New</span>
                        </h3>
                        <p className="text-gray-400 max-w-xl text-sm sm:text-base leading-relaxed">
                            Your ultimate coding workspace. Write, run, and share code snippets in a beautiful, fully-featured online editor.
                        </p>
                    </div>
                </div>

                <a
                    href="https://dev-canvas-your-coding-workspace.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                    Open DevCanvas
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}

export default DevCanvasPromo;
