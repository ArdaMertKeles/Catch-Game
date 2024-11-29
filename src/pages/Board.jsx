import React, { useState, useEffect } from "react";
import levels from '../levels'

export const Board = () => {
    const [level, setLevel] = useState(0)
    const boardSize = 20;
    const initialPosition = levels[level].initialPosition;
    const enemyInitialPosition = levels[level].enemies[0].enemyPosition

    const boardArr = levels[level].boardArr

    const [playerPosition, setPlayerPosition] = useState(initialPosition);
    const [enemyPosition, setEnemyPosition] = useState(enemyInitialPosition)
    const [secondEnemyPosition, setSecondEnemyPosition] = useState()
    const [thirdEnemyPosition, setThirdEnemyPosition] = useState()
    const [fourthEnemyPosition, setFourthEnemyPosition] = useState()
    const [turn, setTurn] = useState(0)

    useEffect(() => {
        setPlayerPosition(levels[level].initialPosition)
        setEnemyPosition(levels[level].enemies[0].enemyPosition)
        if (levels[level].enemies[1]) {
            setSecondEnemyPosition(levels[level].enemies[1].enemyPosition)
        }
        if (levels[level].enemies[2]) {
            setThirdEnemyPosition(levels[level].enemies[2].enemyPosition)
        }
        if (levels[level].enemies[3]) {
            setFourthEnemyPosition(levels[level].enemies[3].enemyPosition)
        }
    }, [level])

    const movePlayer = (dx, dy) => {
        const newPosition = {
            x: playerPosition.x + dx,
            y: playerPosition.y + dy,
        };

        if (
            newPosition.x >= 0 &&
            newPosition.x < boardSize &&
            newPosition.y >= 0 &&
            newPosition.y < boardSize
        ) {
            const targetIndex = newPosition.y * boardSize + newPosition.x;
            if (boardArr[targetIndex] === 0) {
                setPlayerPosition(newPosition);
                setTurn(prev => prev + 1)
            }
            if (boardArr[targetIndex] === 2) {
                setPlayerPosition(newPosition);
                setLevel(prev => prev + 1)
                setTurn(0)
            }
        }
    };

    useEffect(() => {
        if (turn <= 1) {
            const handleKeyDown = (e) => {
                switch (e.key) {
                    case "ArrowUp":
                        movePlayer(0, -1);
                        break;
                    case "ArrowDown":
                        movePlayer(0, 1);
                        break;
                    case "ArrowLeft":
                        movePlayer(-1, 0);
                        break;
                    case "ArrowRight":
                        movePlayer(1, 0);
                        break;
                    default:
                        break;
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [playerPosition, turn]);

    const enemyCatch = () => {
        setEnemyPosition((prevPosition) => {
            let newX = prevPosition.x;
            let newY = prevPosition.y;

            if (playerPosition.x > prevPosition.x) {
                newX++;
                if (boardArr[newY * boardSize + newX] === 1) {
                    newX--;
                    newY++
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newY--;
                        newY--;
                    }
                }
            } else if (playerPosition.x < prevPosition.x) {
                newX--;
                if (boardArr[newY * boardSize + newX] === 1) {
                    newX++;
                    newY--;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newY++;
                        newY++;
                    }
                }
            } else if (playerPosition.y > prevPosition.y) {
                newY++;
                if (boardArr[newY * boardSize + newX] === 1) {
                    newY--;
                    newX++;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newX--;
                        newX--;
                    }
                }
            } else if (playerPosition.y < prevPosition.y) {
                newY--;
                if (boardArr[newY * boardSize + newX] === 1) {
                    newY++;
                    newX--;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newX++;
                        newX++;
                    }
                }
            }

            if (
                newX >= 0 &&
                newX < boardSize &&
                newY >= 0 &&
                newY < boardSize
            ) {
                const targetIndex = newY * boardSize + newX;
                if (boardArr[targetIndex] === 0) {
                    return { x: newX, y: newY };
                }
            }

        });
        if (secondEnemyPosition) {
            setSecondEnemyPosition((prevPosition) => {
                let newX = prevPosition.x;
                let newY = prevPosition.y;

                if (playerPosition.x > prevPosition.x) {
                    newX++;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newX--;
                        newY++
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newY--;
                            newY--;
                        }
                    }
                } else if (playerPosition.x < prevPosition.x) {
                    newX--;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newX++;
                        newY--;
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newY++;
                            newY++;
                        }
                    }
                } else if (playerPosition.y > prevPosition.y) {
                    newY++;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newY--;
                        newX++;
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newX--;
                            newX--;
                        }
                    }
                } else if (playerPosition.y < prevPosition.y) {
                    newY--;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newY++;
                        newX--;
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newX++;
                            newX++;
                        }
                    }
                }

                if (
                    newX >= 0 &&
                    newX < boardSize &&
                    newY >= 0 &&
                    newY < boardSize
                ) {
                    const targetIndex = newY * boardSize + newX;
                    if (boardArr[targetIndex] === 0) {
                        return { x: newX, y: newY };
                    }
                }
            });
        }
        if (thirdEnemyPosition) {
            setThirdEnemyPosition((prevPosition) => {
                let newX = prevPosition.x;
                let newY = prevPosition.y;

                if (playerPosition.x > prevPosition.x) {
                    newX++;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newX--;
                        newY++
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newY--;
                            newY--;
                        }
                    }
                } else if (playerPosition.x < prevPosition.x) {
                    newX--;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newX++;
                        newY--;
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newY++;
                            newY++;
                        }
                    }
                } else if (playerPosition.y > prevPosition.y) {
                    newY++;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newY--;
                        newX++;
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newX--;
                            newX--;
                        }
                    }
                } else if (playerPosition.y < prevPosition.y) {
                    newY--;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newY++;
                        newX--;
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newX++;
                            newX++;
                        }
                    }
                }

                if (
                    newX >= 0 &&
                    newX < boardSize &&
                    newY >= 0 &&
                    newY < boardSize
                ) {
                    const targetIndex = newY * boardSize + newX;
                    if (boardArr[targetIndex] === 0) {
                        return { x: newX, y: newY };
                    }
                }
            });
        }
        if (fourthEnemyPosition) {
            setFourthEnemyPosition((prevPosition) => {
                let newX = prevPosition.x;
                let newY = prevPosition.y;

                if (playerPosition.x > prevPosition.x) {
                    newX++;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newX--;
                        newY++
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newY--;
                            newY--;
                        }
                    }
                } else if (playerPosition.x < prevPosition.x) {
                    newX--;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newX++;
                        newY--;
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newY++;
                            newY++;
                        }
                    }
                } else if (playerPosition.y > prevPosition.y) {
                    newY++;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newY--;
                        newX++;
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newX--;
                            newX--;
                        }
                    }
                } else if (playerPosition.y < prevPosition.y) {
                    newY--;
                    if (boardArr[newY * boardSize + newX] === 1) {
                        newY++;
                        newX--;
                        if (boardArr[newY * boardSize + newX] === 1) {
                            newX++;
                            newX++;
                        }
                    }
                }

                if (
                    newX >= 0 &&
                    newX < boardSize &&
                    newY >= 0 &&
                    newY < boardSize
                ) {
                    const targetIndex = newY * boardSize + newX;
                    if (boardArr[targetIndex] === 0) {
                        return { x: newX, y: newY };
                    }
                }
            });
        }
    };


    useEffect(() => {
        if (turn === 2) {
            const interval = setInterval(() => {
                enemyCatch();
                setTurn(0)
            }, 750);
            return () => clearInterval(interval);
        }
    }, [playerPosition, turn]);

    useEffect(() => {
        if ((playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y) || (secondEnemyPosition && playerPosition.x === secondEnemyPosition.x && playerPosition.y === secondEnemyPosition.y) || (thirdEnemyPosition && playerPosition.x === thirdEnemyPosition.x && playerPosition.y === thirdEnemyPosition.y) || (fourthEnemyPosition && playerPosition.x === fourthEnemyPosition.x && playerPosition.y === fourthEnemyPosition.y)) {
            setPlayerPosition(levels[level].initialPosition)
            setEnemyPosition(levels[level].enemies[0].enemyPosition)
            if (levels[level].enemies[1]) {
                setSecondEnemyPosition(levels[level].enemies[1].enemyPosition)
            }
            if (levels[level].enemies[2]) {
                setThirdEnemyPosition(levels[level].enemies[2].enemyPosition)
            }
            if (levels[level].enemies[3]) {
                setFourthEnemyPosition(levels[level].enemies[3].enemyPosition)
            }
            setTurn(0)
        }
    }, [enemyPosition, playerPosition])

    return (
        <div className="boardWrapper">
            <div className="turnCounter">Remained Turn: {2 - turn}</div>
            <div className="levelPanel">Level {level}</div>
            {boardArr.map((tile, index) => {
                const x = index % boardSize;
                const y = Math.floor(index / boardSize);

                return (
                    <div
                        key={index}
                        className={`tile ${tile === 2 ? 'door' : tile === 1 ? "wall" : "floor"}`}
                    >
                        {playerPosition.x === x && playerPosition.y === y && (
                            <div className="player"></div>
                        )}
                        {enemyPosition.x === x && enemyPosition.y === y && (
                            <div className="enemy"></div>
                        )}
                        {secondEnemyPosition && secondEnemyPosition.x === x && secondEnemyPosition.y === y && (
                            <div className="enemy"></div>
                        )}
                        {thirdEnemyPosition && thirdEnemyPosition.x === x && thirdEnemyPosition.y === y && (
                            <div className="enemy"></div>
                        )}
                        {fourthEnemyPosition && fourthEnemyPosition.x === x && fourthEnemyPosition.y === y && (
                            <div className="enemy"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
