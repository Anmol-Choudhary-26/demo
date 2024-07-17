import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { useTheme } from "@/context/ThemeContext";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: (range: { min: number; max: number }) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  onChange,
}) => {
  const { theme } = useTheme();
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="w-full px-4 py-2">
      <div className="relative mt-2 mb-8">
        <div className="absolute w-full h-1 bg-[#333333] rounded"></div>
        <div ref={range} className="absolute h-1 bg-[#A4E320] rounded"></div>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxVal - 1);
            setMinVal(value);
            e.target.style.zIndex = value === maxVal - 1 ? "1" : "3"; // Ensures that the thumb is on top when both thumbs are at the same value
          }}
          className="thumb z-10 absolute w-full h-1 bg-transparent appearance-none cursor-pointer"
          style={{ zIndex: 5 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minVal + 1);
            setMaxVal(value);
            e.target.style.zIndex = value === minVal + 1 ? "5" : "4"; // Ensures that the thumb is on top when both thumbs are at the same value
          }}
          className="thumb z-20 absolute w-full h-1 bg-transparent appearance-none cursor-pointer"
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="flex justify-between items-center gap-2">
        {/* Labels */}
        <div
          className={`flex flex-col border rounded-md px-2 py-2 w-[200px] ${
            theme === "dark" ? "border-[#3B3B3B]" : "border-[#CCCCCC]"
          }`}
        >
          <span
            className={`text-xs ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Min. Investment
          </span>
          <span
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            ₹ {minVal} L
          </span>
        </div>
        <div
          className={`flex flex-col border rounded-md px-2 py-2 w-[200px] ${
            theme === "dark" ? "border-[#3B3B3B]" : "border-[#CCCCCC]"
          }`}
        >
          <span
            className={`text-xs ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Max. Investment
          </span>
          <span
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            ₹ {maxVal} L
          </span>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
