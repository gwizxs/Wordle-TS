import '../styles/ModalsHelp.scss';

const ModalsHelp = ({active, setActive}) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
      <h2>How to Play</h2>
<h4>Rules: </h4>
<h5>* Enter a 5-letter word. <br />
* Hit Enter to check. <br />
* Tile colors show you how close you are. <br />
Goal: Guess the word in 6 tries. 
</h5>

<hr />
<ul>
  <li>I</li>
  <li>S</li>
  <li className='green'>L</li>
  <li>E</li>
  <li>D</li>
</ul>

<h5>L is it the word and in the correct location</h5>

<ul>
  <li>G</li>
  <li>I</li>
  <li className='yellow'>V</li>
  <li>E</li>
  <li>N</li>
</ul>

<h5>V is it the word and in the correct location</h5>

<ul>
  <li>T</li>
  <li>A</li>
  <li className='grev'>S</li>
  <li>K</li>
  <li >S</li>
</ul>

<h5>S is it the word and in the correct location</h5>
<hr />

<h6>click on the area around to exit</h6>
      </div>
    </div>
  )
}


export default ModalsHelp;