export default function Card({imgSource, category ,foodName}){
    return (
        <div className="card">
            <img alt={`image of ${foodName}`} src={imgSource}></img>
            <h4>{category}</h4>
            <h3>{foodName}</h3>
        </div>
    );
}