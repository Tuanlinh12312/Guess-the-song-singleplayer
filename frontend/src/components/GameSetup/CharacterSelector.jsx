// components/GameSetup/CharacterSelector.jsx
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CharacterSelector = ({ onSelectCharacter }) => {
  const characterCount = 8;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    const newIndex = (selectedIndex - 1 + characterCount) % characterCount;
    setSelectedIndex(newIndex);
    onSelectCharacter(newIndex);
  };

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % characterCount;
    setSelectedIndex(newIndex);
    onSelectCharacter(newIndex);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <h3 className="text-center font-bold text-3xl font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mb-2">
        Choose Your Character
      </h3>
      <div className="flex items-center space-x-6">
        <button onClick={handlePrev} aria-label="Previous Character">
          <ChevronLeft size={40} className="text-white hover:text-amber-400" />
        </button>
        <img
          src={`/images/characters/char${selectedIndex + 1}.png`}
          alt={`Character ${selectedIndex + 1}`}
          className="w-40 h-40 object-contain drop-shadow-lg"
        />
        <button onClick={handleNext} aria-label="Next Character">
          <ChevronRight size={40} className="text-white hover:text-amber-400" />
        </button>
      </div>
    </div>
  );
};

export default CharacterSelector;
