import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
function App() {
  const [cards, setCards] = useState([]);
  const [turn, setturn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const cardsImages = [
    { src: "/img/helmet-1.png", matched: false },
    { src: "/img/potion-1.png", matched: false },
    { src: "/img/ring-1.png", matched: false },
    { src: "/img/scroll-1.png", matched: false },
    { src: "/img/shield-1.png", matched: false },
    { src: "/img/sword-1.png", matched: false },
  ];

  const shuffleCards = () => {
    const shuffledImages = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledImages);
    setChoiceOne(null);
    setChoiceTwo(null);
    setturn(0);
  };

  const handelChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setturn((prevTurns) => prevTurns + 1);
  };
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <>
      <div className="App">
        <h1>Memory Game</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handelChoice={handelChoice}
              flipped={card === choiceOne || card.matched || card === choiceTwo}
              disabled={disabled}
            />
          ))}
        </div>
        <p className="turn">turns: {turn}</p>
      </div>
    </>
  );
}

export default App;
