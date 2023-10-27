import coins from '../assets/coin.png';
import log from '../assets/log.png';
import score from '../assets/earnings.png'
import catalogue from '../assets/catalogue.png'
import './css/home.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Home () {

    return(
    <div>
        <div className="home-container">
            <div className="home-intro-box">
                <img src={coins} className="coin-img" />
                <h1 className="home-title">Welcome!</h1>
                <h3 className="home-subtitle">This platform is designed for coin roll hunters to enhance their collecting experience</h3>
            </div>
            <div className="home-grid-container">
                <div className="home-grid-item">
                    <div className="feature-descrip"><img src={log} className="log-img"/>Log each hunt with ease</div>
                    <div className="feature-descrip"><img src={score} className="score-img"/>Earn points for every valuable find</div>
                    <div className="feature-descrip"><img src={catalogue} className="catalogue-img"/>Catalog your collection on the fly as you discover new coins</div>
                </div>
                <div className="home-grid-item">
                    <div className="intro-questions">New to coin roll hunting?</div>
                        <div className="button-container">
                            <Link to={'/start-here'}>
                            <Button id="log-in-out" variant="outlined" sx={{ marginLeft: 30 }}>Start Here</Button>
                            </Link>
                        </div>
                        <div className="intro-questions">Wondering how the scoring works?</div>
                        <div className="button-container">
                            <Link to={'/scoring'}>
                            <Button id="log-in-out" variant="outlined">Scoring</Button>
                            </Link>
                        </div>
                        <div className="intro-questions">Would you like to leave feedback?</div>
                        <div className="button-container">
                            <Button id="log-in-out" variant="outlined">Feedback</Button>
                        </div>
                </div>
            </div>
            <div></div>
            
            <div>
                <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
            </div>
        </div>

    </div>
    )
}
