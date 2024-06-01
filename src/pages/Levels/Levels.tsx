import "./Levels.css";
import ListLevels from "../../components/ListLevels/ListLevels";

const Levels: React.FC = () => {
  return (
    <div>
      <div className="h1 levels-header">Рівні</div>

      <ListLevels />
    </div>
  );
};

export default Levels;
