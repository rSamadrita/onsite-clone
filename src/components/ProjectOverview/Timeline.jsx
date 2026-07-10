import "./Timeline.css";

const Timeline = () => {

  return (

    <div className="timeline-card">

      <h2>Project Timeline</h2>

      <div className="timeline">

        <div className="dot active"/>

        <div className="line"/>

        <div className="dot active"/>

        <div className="line"/>

        <div className="dot"/>

        <div className="line"/>

        <div className="dot"/>

      </div>

      <div className="timeline-labels">

        <span>Planning</span>

        <span>Foundation</span>

        <span>Structure</span>

        <span>Finishing</span>

      </div>

    </div>

  );

};

export default Timeline;