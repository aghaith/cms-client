import { getUserToken } from "helpers/global";
import { Tab, Tabs, Spinner } from "react-bootstrap";
import Campaigns from "./Campaigns";
import Dashboard from "./Dashboard";

const CampaignLanding = () => {

  const token = getUserToken() ? getUserToken().token : null;

  return (
    <section className="container mt-4">
      <div className="row">
        {token ? (
          <Tabs defaultActiveKey="Campaigns">
            <Tab eventKey="Campaigns" title='Campaigns'>
              <Campaigns />
            </Tab>
            <Tab eventKey="Dashboard" title='Dashboard'>
              <Dashboard />
            </Tab>
          </Tabs>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
    </section>
  )
}

export default CampaignLanding;
