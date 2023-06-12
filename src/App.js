
import { useState,useEffect } from "react"
import './App.css';
import Square from "./components/Sqaure";
import { Patterns } from "./patterns/Patterns";

export default function App(){

    const [board, setBoard] = useState(["","","","","","","","",""]);
    const [player, setPlayer] = useState("O");
    const [result, setResult] = useState({winner:"none", status:"none"});


    useEffect(()=>{
        checkWin();
        checkTie();
        if(player =="X"){
            setPlayer("O");
        } else {
            setPlayer("X");
        }
    },[board]);

    useEffect(()=>{
        if(result.status!="none"){
            alert(`Game finished! Winning Player: ${result.winner}`);
            restartGame();
        }
    },[result]);

    const chooseSquare = (square) =>{

        const updatedBoard = board.map((val,idx)=>{
            if(square === idx && val== ""){ // checking each square is empty  and the square we clicked and the square in board are same or not
                return player;
            }
            return val;
        });

        setBoard(updatedBoard);
    }

    const checkWin = () => {
        Patterns.forEach((currPattern)=>{
            const anyPlayer = board[currPattern[0]];
            //  the each array in patterns is a winner, so if the same person is on each pattern of patterns array. means we found the winner. we are intializing the each pattern with person, and checking the remaing two are also with that person or not.
            if(anyPlayer =="") return;
            let foundWinningPattern = true;
            currPattern.forEach((idx)=>{
                if(board[idx] != anyPlayer){
                    foundWinningPattern = false;
                }
            })

            if(foundWinningPattern){
                setResult({winner:player,status:"Won"});
                // particularly, here we just cant easily put player as winner cuz in react the state is constantly changing so we dont get correct player. so we use useEffect for this.
                // so because the player showing is incorrect due to state change of react we can copy setPlayer if block to useEffect.
                //even though we have copied, because of the way useEffect works, it calls the checkwin in intial render and setPlayer to 'O', so if start the game with O only in the useState. We can play with 'X' as first );
            }
        });
    }

    const checkTie = () =>{
        let filled = true; // board if finished
        board.forEach((square)=>{
            if(square == ""){
                filled = false; // finding a empty block means board is not finished.
            }
        });
        if(filled){
            setResult({winner:'No One',status:"Tie"});
        }
    }

    const restartGame = () => {
        setBoard(["","","","","","","","",""]);
        setPlayer("O");
    }


    return (
        <div className="app">
            <div className="header">
                <h1>TIC-TAC-TOE</h1>
            </div>
            <div className="board">
                <div className="row">
                    <Square val={board[0]} chooseSquare={()=>{chooseSquare(0)}}/>
                    <Square val={board[1]} chooseSquare={()=>{chooseSquare(1)}}/>
                    <Square val={board[2]} chooseSquare={()=>{chooseSquare(2)}}/>
                </div>
                <div className="row">
                    <Square val={board[3]} chooseSquare={()=>{chooseSquare(3)}}/>
                    <Square val={board[4]} chooseSquare={()=>{chooseSquare(4)}}/>
                    <Square val={board[5]} chooseSquare={()=>{chooseSquare(5)}}/>
                </div>
                <div className="row">
                    <Square val={board[6]} chooseSquare={()=>{chooseSquare(6)}}/>
                    <Square val={board[7]} chooseSquare={()=>{chooseSquare(7)}}/>
                    <Square val={board[8]} chooseSquare={()=>{chooseSquare(8)}}/>
                </div>
            </div>
            <div className="footer">
                <p>by</p>
                <p>Bhanu Kiran Jonnapalli</p>
            </div>
        </div>
    )
}