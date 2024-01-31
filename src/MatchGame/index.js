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

//   //   const [updatedItems, setUpdatedItems] = useState()

//   const [searchText, setSearchText] = useState()
//   const [websiteText, setWebsitetext] = useState()
//   const [usernameText, setUsernametext] = useState()
//   const [passwordText, setpasswordtext] = useState()
//   const [idCounter, setIdCounter] = useState(1)

//   const [credentials, setCredentials] = useState([])

//   const handleAddButton = e => {
//     e.preventDefault()
//     // console.log('websiteText', websiteText)
//     if (usernameText && passwordText && websiteText) {
//       // Create a new object with the entered credentials
//       const newCredential = {
//         id: idCounter,
//         usernameText,
//         passwordText,
//         websiteText,
//       }

//       // Update the state by adding the new credential to the array
//       setCredentials([...credentials, newCredential])
//       setIdCounter(idCounter + 1)
//       // Clear the input fields
//       setWebsitetext('')
//       setUsernametext('')
//       setpasswordtext('')
//     } else {
//       alert('Please fill in all fields')
//     }
//   }

//   console.log('credentials=>', credentials)

//   const handletext = e => {
//     const query = e.target.value
//     setSearchText(query)
//     if (query === '') {
//       setCredentials(credentials)
//     } else {
//       // Filter the items based on the search query

//       const filteredItems = credentials.filter(item =>
//         item.usernameText.toLowerCase().includes(query.toLowerCase()),
//       )
//       setCredentials(filteredItems)
//     }
//   }

//   const handleDelete = item => {
//     const updatedItemss = credentials.filter(each => each.id !== item.id)
//     setCredentials(updatedItemss)
//   }

//   const [isChecked, setIsChecked] = useState(false)

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked)
//   }

//   return (
//     <div className="app-container">
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
//         alt="app logo"
//         className="appLogo"
//       />
//       <div className="container1">
//         <div className="containerA">
//           <h1 className="inputHeading">Add New Password</h1>
//           <form onSubmit={handleAddButton}>
//             <div>
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
//                 alt="website"
//                 className="textpics"
//               />
//               <input
//                 type="text"
//                 placeholder="Enter Website"
//                 value={websiteText}
//                 onChange={e => setWebsitetext(e.target.value)}
//               />
//             </div>
//             <div>
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
//                 alt="username"
//                 className="textpics"
//               />
//               <input
//                 type="text"
//                 placeholder="Enter UserName"
//                 value={usernameText}
//                 onChange={e => setUsernametext(e.target.value)}
//               />
//             </div>
//             <div>
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
//                 alt="password"
//                 className="textpics"
//               />
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 value={passwordText}
//                 onChange={e => setpasswordtext(e.target.value)}
//               />
//             </div>
//             <button type="submit">Add</button>
//           </form>
//         </div>
//         <div>
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
//             alt="password manager"
//             className="contaner1Pic"
//           />
//         </div>
//       </div>
//       <div className="container2">
//         <div className="containerB">
//           <div className="containerC">
//             <h1 className="inputHeading">Your passwords</h1>
//             <p className="count">{credentials?.length}</p>
//           </div>

//           <div className="search-container">
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/search-img.png"
//               alt="search"
//               className="search"
//             />
//             <input
//               type="search"
//               placeholder="Search"
//               className="input-box"
//               onChange={e => handletext(e)}
//             />
//           </div>
//         </div>
//         <hr />
//         <label className="checkcontainer">
//           <input
//             type="checkbox"
//             checked={isChecked}
//             onChange={handleCheckboxChange}
//           />
//           Show passwords
//         </label>
//         {credentials?.length > 0 ? (
//           <ul className="kkok">
//             {credentials.map((cred, index) => (
//               <li className="countcred">
//                 <div className="iconurl">{cred.websiteText[0]}</div>
//                 <div>
//                   <p>{cred.websiteText}</p>
//                   <p>Username: {cred.usernameText}</p>
//                   <p>Password: </p>
//                   {isChecked ? (
//                     <p> {cred.passwordText}</p>
//                   ) : (
//                     <img
//                       src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
//                       alt="stars"
//                       className="search"
//                     />
//                   )}
//                 </div>
//                 <button onClick={() => handleDelete(cred)}>
//                   <img
//                     src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
//                     alt="delete"
//                     className="search"
//                   />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="container2b">
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
//               alt="no passwords"
//               className="contaner2Pic"
//             />
//             <p>No Passwords</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
