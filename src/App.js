import React from "react";
import "./style.css";

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import RestartIcon from '@mui/icons-material/RestartAlt';

import Divider from '@mui/material/Divider';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function App() { 

  const xMarkURL = "https://i.ibb.co/rcZZnpy/X.png"
  const oMarkURL = "https://i.ibb.co/QCXhBqP/O.png"

  const blankBoard = [[0,0,0],[0,0,0],[0,0,0]]

  const [showOptions, setShowOptions] = React.useState(true);

  const [board, setBoard] = React.useState(blankBoard);

  const [moveState, setMoveState] = React.useState(1);

  const [gameOver, setGameOver] = React.useState(false);

  const [twoPlayer, setTwoPlayer] = React.useState(true);

  const [gameTied, setGameTied] = React.useState(false);

  function resetGame(){

    console.log("reset");

    setMoveState(1);

    setBoard(blankBoard);

    setGameOver(false);

  }

  function checkForWinner(x,y){
    
    let rowWin = Math.abs(board[x][0] + board[x][1] + board[x][2]) > 2;

    let colWin = Math.abs(board[0][y] + board[1][y] + board[2][y]) > 2;

    let diag1Win = Math.abs(board[0][0] + board[1][1] + board[2][2]) > 2;

    let diag2Win = Math.abs(board[0][2] + board[1][1] + board[2][0]) > 2;
    
    return rowWin || colWin || diag1Win || diag2Win;

  }

  function boardFull(){

    for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
        if(board[row][col] == 0){
          return false;
        }
      }
    }

    return true;

  }

  function boardEmpty(){
    for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
        if(board[row][col] != 0){
          return false;
        }
      }
    }

    return true;
  }

  function changeState(x, y, move){
    if(board[x][y] == 0){
      let copy = [...board];

      copy[x][y] = move;

      setBoard(copy);
    }
  }

  function regionClicked(e){

    if(gameOver){ return; }

    if(showOptions){ setShowOptions(false)};

    let x = e.target.id[0]
    let y = e.target.id[1]
    e.target.style.opacity = 1;

    changeState(x,y, moveState);

    let tied = boardFull()

    if(checkForWinner(x,y) || tied){

      setGameOver(true);
      setGameTied(tied);
      setShowOptions(true);

    }else if(twoPlayer){
      setMoveState(moveState * -1 );
    } else {
      makeRandomMove();
    }

  }

  function makeRandomMove(){

    var moves = [[] * 9];
    var validMoves = 0;

    for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
        if(board[row][col] == 0){
          moves[validMoves] = [row,col];
          validMoves ++;
        }
      }
    }

    let move = moves[Math.floor(Math.random() * moves.length)]
    
    changeState(move[0],move[1], moveState * -1);

    if(checkForWinner(move[0], move[1])){
      setMoveState(moveState * -1);
      setGameOver(true);
      setShowOptions(true);
    };

  }
  
  function codeToImg(val){
    return val > 0 ? xMarkURL : oMarkURL
  }

  function imageFor(x,y){
    let posVal = board[x][y]

    return codeToImg(posVal != 0 ? posVal : moveState)
  }

  function showPreview(e){
    if(gameOver){ return }

    if(idValue(e.target.id) == 0){
      e.target.style.opacity = 0.5;
    }
  }

  function hidePreview(e){
    if(gameOver){ return }

    if(idValue(e.target.id) == 0){
      e.target.style.opacity = 0;
    }
  }

  function idValue(id){
    return board[id[0]][id[1]];
  }

  const GameRegion = (props) => {

    let x = props.id[0];
    let y = props.id[1];

    return <img 
        id = {props.id}
        onMouseEnter = {showPreview}
        onMouseLeave = {hidePreview}
        onClick = {regionClicked}
        style = {{ width: "30%", height: "30%", opacity: idValue(props.id) == 0 ? 0 : 1}} 
        src = {imageFor(x, y)} alt = "pos1" />
  }

  const GameOverView = () => {

    return <div style = {{ display: "flex", justifyContent: "center"}}>
      <Stack alignItems = "center">

        {gameTied || <h1> {moveState > 0 ? "X" : "O"} wins!</h1>}


        <Button style = {{ fontSize: "30px" }}onClick = {resetGame} >

        <Stack alignItems="center">
            <RestartIcon/>
            New Game
            </Stack>
          </Button>
        </Stack>

      </div>

  }


  const GameOptions = () => {

    return <div style = {{ display: "flex", justifyContent: "center"}}>


      <FormGroup>
        <FormControlLabel control={
            <Switch
            checked={twoPlayer}
            onChange={() => setTwoPlayer(!twoPlayer)}
            label = "Multiplayer"
          />
        } label= {<div style = {{fontSize: "30px"}} >Multiplayer</div>} />

      </FormGroup>


      </div>

  }

  return (


    
    <div>
      
      <Stack alignItems = "center">
        <h1>Tic Tac Toe</h1>
        
        <Stack 
        maxWidth = "500px"
        spacing = {0}
        direction = "column"
        divider={<Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: 5 }}/>}
        >
          <Stack 
          spacing={0}
          direction = "row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 5 }}/>}
          >

            <GameRegion id = "00"/>

            <GameRegion id = "01"/>

            <GameRegion id = "02"/>

          </Stack>

          <Stack 
          spacing={0} 
          direction = "row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 5 }}/>}
          >
            
            <GameRegion id = "10"/>

            <GameRegion id = "11"/>

            <GameRegion id = "12"/>       

          </Stack>  

          <Stack
          spacing={0}
          direction = "row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 5 }}/>}
          >
            
            <GameRegion id = "20"/>

            <GameRegion id = "21"/>

            <GameRegion id = "22"/> 

          </Stack>  
        </Stack>

        {!gameOver  || <GameOverView/>}

        {!showOptions || <GameOptions/>}
      </Stack>

    </div>
  );
}
