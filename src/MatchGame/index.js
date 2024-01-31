import './index.css'
import {useState, useCallback, useEffect} from 'react'

const MatchGame = ({tabsList, imagesList}) => {
  const initialSeconds = 60
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1)
      } else {
        clearInterval(timer)
        // Handle timer completion, e.g., display a message or trigger an action
      }
    }, 1000)

    return () => clearInterval(timer) // Cleanup the interval when the component unmounts
  }, [seconds])

  console.log('seconds', seconds)

  //   console.log(tabsList, imagesList)
  const fruitPics = imagesList.filter(each => each.category === 'FRUIT')
  const animalPics = imagesList.filter(each => each.category === 'ANIMAL')
  const placesPics = imagesList.filter(each => each.category === 'PLACE')

  const [activeTab, setActiveTab] = useState(tabsList[0].tabId)
  const [activeContent, setActiveContent] = useState(fruitPics)
  const handleTabChange = tabId => {
    setActiveTab(tabId)
  }

  useEffect(() => {
    if (activeTab === 'FRUIT') {
      setActiveContent(fruitPics)
    } else if (activeTab === 'ANIMAL') {
      setActiveContent(animalPics)
    } else {
      setActiveContent(placesPics)
    }
  }, [activeTab])

  const [randomObject, setRandomObject] = useState(imagesList[0])

  const getRandomObject = array => {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }
  const [scores, setScores] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const handleImageClick = image => {
    if (image.id === randomObject.id) {
      console.log('mahesh')
      setScores(scores + 1)
      const selectedObject = getRandomObject(imagesList)
      setRandomObject(selectedObject)
    } else {
      setGameOver(true)
      setSeconds(0)
      console.log('gameover')
    }
  }

  const handleReset = () => {
    setGameOver(false)
    setSeconds(initialSeconds)
    setActiveTab(tabsList[0].tabId)
    setScores(0)
  }

  console.log(gameOver, 'lll')

  useEffect(() => {
    if (seconds === 0) {
      setGameOver(true)
    }
  }, [seconds])

  return (
    <div>
      <div className="appheader">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
          className="appLogo"
        />
        <div className="header2">
          <p className="fonts">Score:</p>
          <div className="scoreFont">{scores}</div>
          <div className="header3">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              className="timerLogo"
            />
            <p className="scoreFont">{seconds} Sec</p>
          </div>
        </div>
      </div>
      {!gameOver ? (
        <div className="appbody">
          <img src={randomObject.imageUrl} alt="timer" className="imgaecss" />
          <div>
            <ul className="nav nav-tabs tabscxs" id="myTabs">
              {tabsList.map(tab => (
                <li className="nav-item" key={tab.id}>
                  <button
                    className={` nav-link ${
                      activeTab === tab.tabId ? 'active' : ''
                    }`}
                    onClick={() => handleTabChange(tab.tabId)}
                  >
                    {tab.displayText}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="activeimagecss">
            {activeContent.map(image => (
              <div>
                <img
                  src={image.thumbnailUrl}
                  alt="thumbnail"
                  className="slectimhecss"
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="appbody">
          <div className="app2ody">
            <div className="kkoll">
              {/* https://assets.ccbp.in/frontend/react-js/match-game-trophy.png */}
              <div>
                <img
                  src=" https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
                  alt="trophy"
                  className="trophycss"
                />
              </div>
              <p className="fonts">YOUR SCORE</p>
              <div className="scoreFont">{scores}</div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png "
                  alt="reset"
                  className="restcss"
                />
                <button onClick={handleReset}>PLAY AGAIN</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchGame
