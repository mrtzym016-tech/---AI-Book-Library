
import React from 'react';

interface AdSectionProps {
  slot?: string;
}

const AdSection: React.FC<AdSectionProps> = ({ slot }) => {
  return (
    <div className="w-full bg-gray-100 border border-dashed border-gray-300 rounded-lg p-4 my-8 flex flex-col items-center justify-center min-h-[150px]">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">إعلان</span>
      <div className="text-gray-500 text-sm">مساحة إعلانية {slot}</div>
      <p className="text-gray-400 text-xs mt-1">تواصل معنا للإعلان هنا</p>
    </div>
  );
};

export default AdSection;
