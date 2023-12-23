import React from "react";
// import { Link } from "react-router-dom";

// imported components
import Navbar from "../Component/Navbar.js";

// image imports
import keyFeaturesImage from "../Assets/keyfeatures.jpg";
import whyTM from "../Assets/whyTM.jpg";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="header-container">
        <h1>Welcome to TaskMaster</h1>
        <p>
          TaskMaster is your ultimate solution for seamless task management.
          Stay organized, boost productivity, and achieve your goals
          effortlessly with our intuitive and powerful task management platform.
        </p>
      </div>
      <div className="features-container">
        <div className="first-child">
          <h2>Key Features</h2>
          <div>
            <h3>Task Organization</h3>
            <p>
              Categorize tasks, set priorities, and manage deadlines
              effortlessly.
            </p>
            <h3>Collaboration</h3>
            <p>
              Share tasks, assign responsibilities, and collaborate in real-time
              with your team.
            </p>
            <h3>Reminders and Notifications</h3>{" "}
            <p>
              Stay on track with timely reminders and notifications for upcoming
              deadlines.
            </p>{" "}
            <h3>Customizable Workflow</h3>
            <p>
              Tailor TaskMaster to fit your unique workflow and preferences.
            </p>
            <h3>Cross-Platform Access</h3>
            <p>
              Access your tasks anytime, anywhere—desktop, mobile, or tablet.{" "}
            </p>
            <h3>Analytics and Insights</h3>
            <p>
              Gain valuable insights into your productivity with analytics and
              reporting features.
            </p>
          </div>
        </div>
        <div className="imageholder">
          <img src={keyFeaturesImage} alt="keyFeaturesimage"></img>
        </div>
      </div>
      <div className="whyTM-container">
        <div className="imageholder" style={{ transform: " rotate(-30deg)" }}>
          <img src={whyTM}></img>
        </div>
        <div className="first-child">
          <h2>Why TaskMaster ?</h2>
          <div>
            <h3>Simplicity</h3>
            <p>
              Streamlined interface for easy task management, suitable for
              individuals and teams
            </p>
            <h3>Efficiency</h3>
            <p>
              Save time and effort with automated features and intuitive design.
            </p>
            <h3>Reliability</h3>
            <p>
              Secure and reliable platform to keep your data safe and
              accessible.
            </p>
            <h3>Scalability</h3>
            <p>
              Whether you're a freelancer, a startup, or an enterprise,
              TaskMaster scales with you.
            </p>
            <h3>Reliability</h3>
            <p>
              Secure and reliable platform to keep your data safe and
              accessible.
            </p>
            <h3>Scalability</h3>
            <p>
              Whether you're a freelancer, a startup, or an enterprise,
              TaskMaster scales with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
