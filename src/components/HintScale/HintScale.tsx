import { useState, useEffect } from "react";
import "./HintScale.css";

interface IProps {
  hintDialLevel: number;
}

const HintScale: React.FC<IProps> = ({ hintDialLevel }) => {
  const [hintLevel, setHintLevel] = useState(0);

  useEffect(() => {
    if (hintDialLevel === 0) {
      setHintLevel(4);

      setTimeout(() => {
        setHintLevel(0);
      }, 500);
    } else {
      setHintLevel(hintDialLevel);
    }
  }, [hintDialLevel]);

  return (
    <div className="hint-level-container">
      <div
        className="hint-level"
        style={{
          width: `${100 - hintLevel * 25}%`,
        }}
      ></div>
    </div>
  );
};

export default HintScale;
