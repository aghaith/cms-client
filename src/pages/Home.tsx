import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import * as ROUTES from 'constants/routes';

const Home = () => {

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  return (
    <>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Campaigns Management System</h1>
            <p className="lead">
              A campaign can simply be a group of targeted messages (via Whatsapp, text, emails, etc..) initiated by an enterprise and sent to a selected list of contacts.
            </p>
            <div className="buttons">
              <Link 
                to={isLoggedIn ? ROUTES.CAMPAIGNS : ROUTES.LOGIN} 
                className="btn btn-primary"
              >Get Started</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;
