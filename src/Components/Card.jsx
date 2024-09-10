import "./Card.css";

export default function Card({ imgSource, category, foodName }) {
  return (
    <div className="card">
      <div className="card-div-img">
        <img alt={`image of ${foodName}`} src={imgSource}></img>
      </div>
      <div className="card-div-description">
        <h4>{category}</h4>
        <h3>{foodName}</h3>
      </div>
    </div>
  );
}
