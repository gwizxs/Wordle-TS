import '../styles/ModalSetting.scss';
import {  Tooltip } from 'antd';
import React, {useState} from 'react';
import { SunOutlined , MoonOutlined  } from '@ant-design/icons';
import Timer from './Timer';


const ModalSetting: React.FC = ({active, setActive}) => {
  
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  
  const toggleTheme = () => {
    setIsLightMode(prevMode => !prevMode);
    document.body.classList.toggle('light');
  }


  return (
    <div className={active ? "modal actives" : "modals"} onClick={() => setActive(false)}>
      <div className={active ? "modal__contents active" : "modal__contents"} onClick={e => e.stopPropagation()}>
        <h1>Setting</h1>
        <div className='button-containers'>
  <div className="button-item">
    <h3>{isLightMode ? 'light theme' : 'dark theme'}</h3>
    <Tooltip className="btn-share" title="theme">
    <button className='btn' onClick={toggleTheme}>
        {isLightMode ? <SunOutlined  className='btn-theme'/> : <MoonOutlined className='btn-theme' />}
        </button>
    </Tooltip>
  </div>
</div>
<div className='Timer'>
      <Timer />
    </div>

<hr />
<h5>click on the area around to exit</h5>

      </div>
    </div>
  )
}


export default ModalSetting; 