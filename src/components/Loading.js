
import './Loading.css';

export default function LoadingBird() {
  return (
    <div className="loading-screen">
      <div className="bird"><img src="/images/bird2.png" alt="Bird" className="bird" />
</div>
      <div className="loading-text">PostBird is flying your data...</div>
    </div>
  );
}
