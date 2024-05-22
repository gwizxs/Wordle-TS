import "../styles/Footer.scss";
import { GithubFilled , GitlabOutlined, LinkOutlined  } from '@ant-design/icons';


const Footers = () => {
  return (
    <div className="theme">
    <footer>
      <div className="footer-content">
        <h3>Wordle clone</h3>
        <p>ура, новый проект</p>
        <ul className="socials">
          <li><a href="https://github.com/gwizxs"> <GithubFilled  className='icon'/></a></li>
          <li><a href="https://gitlab.com/gwizxs"> <GitlabOutlined className='icon'/> </a></li>
          <li><a href="https://t.me/gwizxs"> <LinkOutlined className='icon'/> </a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p> &copy; 2024 gwizxs. designed by <span>gwizxs</span></p>
      </div>
    </footer>
    </div>
  )
}

export default Footers;