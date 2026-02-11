export function WorkloadChart() {
  return (
    <div className="border border-black p-6 rounded-xl h-full">
      <h3 className="font-bold text-lg">Team Workload Distribution</h3>
      <p className="text-sm text-gray-500 mb-8">Current capacity usage by developer</p>

      {/* The Chart Area - The container MUST have a defined height like h-64 */}
      <div className="flex items-end justify-between h-64 border-l border-b border-black p-4">
        
        {/* We use style={{ height: 'XX%' }} to ensure they show up */}
        <div className="w-12 bg-[#925ECC] h-[60%]" title="Alex"></div>
        <div className="w-12 bg-[#925ECC] h-[82%]" title="Maria"></div>
        <div className="w-12 bg-[#925ECC] h-[45%]" title="Jordan"></div>
        <div className="w-12 bg-[#925ECC] h-[70%]" title="Priya"></div>
        <div className="w-12 bg-[#925ECC] h-[55%]" title="Liam"></div>
        <div className="w-12 bg-[#925ECC] h-[38%]" title="Emma"></div>
        
      </div>
      
      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs font-medium px-2">
        <span className="w-8 text-center">Alex</span>
        <span className="w-8 text-center">Maria</span>
        <span className="w-8 text-center">Jordan</span>
        <span className="w-8 text-center">Priya</span>
        <span className="w-8 text-center">Liam</span>
        <span className="w-8 text-center">Emma</span>
      </div>
    </div>
  );
}