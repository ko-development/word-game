import axios from "axios"
import { useState, useEffect } from 'react'

const App = () => {

const [chosenLevel, setChosenLevel] = useState('2') 
const [words, setWords] = useState(null)
const [correctAnswers, setCorrectAnswers] = useState([])
const [clicked, setClicked] = useState([])

  const getRandomWords = () => {
    const options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: {level: chosenLevel, area: 'sat'},
      headers: {
        'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
        'x-rapidapi-key': 'd44410e14bmsh63ea02601f36c5fp18337ejsn7cf9790497df'
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
    }
    setClicked([...clicked, option])
  }
  
console.log(words && words.quizlist)

useEffect(() => {
  if(chosenLevel) getRandomWords()
}, [chosenLevel])

  return (
    <div className="App">

      {!chosenLevel && <div className='levelSelector'>
        <h1>Word Association App</h1>
        <p>Select your level to start</p>
        <select name='levels' id='levels' value={chosenLevel} onChange={(e) => setChosenLevel(e.target.value)}>
          <option value={null}>select a level</option>
          <option value='1'>level 1</option>
          <option value='2'>level 2</option>
          <option value='3'>level 3</option>
        </select>
      </div> }

      {chosenLevel && words && <div className="question-area">
        <h1>Welcome to level: {chosenLevel}</h1>

        {words.quizlist.map((question, questionIndex) => (
          <div className='question-box'>
            {question.quiz.map((tip, _index) => (
              <p key={_index}>{tip}</p>
            ))}

            <div className='question-buttons'>
              {question.option.map((option, optionIndex) => (
                <div className='question-button'>
                  <button 
                    onClick={() => checkAnswer(option, optionIndex + 1, question.correct)}
                    disabled = {clicked.includes(option)}
                  > {option} </button>
                </div>
              ))}
            </div>

            <p>{question.correct}</p>
          </div>
        ))}
      </div> }

    </div>
  );
}

export default App;
