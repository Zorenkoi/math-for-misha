import { useState, useEffect } from "react";
import "./Result.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { setLevelScore } from "../../redux/slices/levelsSlice";
import StarContainer from "../../components/StarContainer/StarContainer";
import { getNextLevelId } from "../../utils/getLevelId";

const Result: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mistakes } = useParams();
  const countMistakes = Number(mistakes);

  let { levelid } = useParams();
  levelid = levelid ? levelid : "";

  useEffect(() => {
    if (levelid) {
      dispatch(setLevelScore({ levelid, countMistakes }));
    }
  }, []);

  const nextLevelId = getNextLevelId(levelid);

  return (
    <div className="result">
      <StarContainer countMistakes={countMistakes} />

      <div className="header h1">Ви зробили {countMistakes} помилок</div>

      <div className="result-button-container">
        <button onClick={() => navigate(-1)} className="button">
          пройти ще раз
        </button>
        <button onClick={() => navigate("/")} className="button">
          інші рівні
        </button>

        <button
          disabled={countMistakes > 0}
          onClick={() => navigate(`/${nextLevelId}`)}
          className="button"
        >
          наступний рівень
        </button>
      </div>
    </div>
  );
};

export default Result;
