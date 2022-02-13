import axios from "axios"
import { useState, useEffect } from 'react'

const App = () => {

const [chosenLevel, setChosenLevel] = useState(null) 
const [words, setWords] = useState(null)
const [correctAnswers, setCorrectAnswers] = useState([])
const [clicked, setClicked] = useState([])
const [score, setScore] = useState(0)

  const getRandomWords = () => {
    const options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: {level: chosenLevel, area: 'sat'},
      headers: {
        'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
      }
    };
  
    axios.request(options).then((response) => {
      console.log(response.data)
      setWords(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }

  const checkAnswer = (option, optionIndex, correctAnswer) => {
    if (optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, option])
      setScore((score) => score + 1)
    } else {
      setScore((score) => score - 1)
    }
    setClicked([...clicked, option])
  }
  
console.log(words && words.quizlist)

useEffect(() => {
  if(chosenLevel) getRandomWords()
}, [chosenLevel])

  return (
    <div className="app">

      {!chosenLevel && <div className='levelSelector'>
        <h1>Word Association App</h1>
        <p>Select your level to start</p>
        <select name='levels' id='levels' value={chosenLevel} onChange={(e) => setChosenLevel(e.target.value)}>
          <option value={null}>select a level</option>
          <option value='1'>level 1</option>
          <option value='2'>level 2</option>
          <option value='3'>level 3</option>
          <option value='4'>level 4</option>
          <option value='5'>level 5</option>
          <option value='6'>level 6</option>
          <option value='7'>level 7</option>
          <option value='8'>level 8</option>
          <option value='9'>level 9</option>
          <option value='10'>level 10</option>
        </select>
      </div> }

      {chosenLevel && words && <div className="question-area">
        <h1>Welcome to level: {chosenLevel}</h1>
        <h3>Your score is: {score}</h3>

        <div className='questions'>
          {words.quizlist.map((question, questionIndex) => (
            <div key ={questionIndex} className ='question-box'>
              {question.quiz.map((tip, _index) => (
                <p key={_index}>{tip}</p>
              ))}

              <div className='question-buttons'>
                {question.option.map((option, optionIndex) => (
                  <div key = {optionIndex} className='question-button'>
                    <button 
                      onClick={() => checkAnswer(option, optionIndex + 1, question.correct)}
                      disabled = {clicked.includes(option)}
                    > {option} </button>
                    {correctAnswers.includes(option) && <p>Correct!</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setChosenLevel(null)}>Go Back</button>
      </div> }

    </div>
  );
}

export default App;
