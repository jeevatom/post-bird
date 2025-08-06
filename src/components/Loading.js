
import './Loading.css';

export default function LoadingBird() {
  return (
    <div className="loading-screen">
      <div className="bird"><img src="/images/bird2.png" alt="Bird" className="bird" />
</div>
      <div className="loading-text fw-bold">PostBird is flying with your data...</div>
    </div>
  );
}
