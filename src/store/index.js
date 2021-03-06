import Vue from 'vue';
import Vuex from 'vuex';

import sheetData from '../data/sheet1.json';
import sheet2Data from '../data/sheet2.json';
import sheet3Data from '../data/sheet3.json';
import sheet4Data from '../data/sheet4.json';
import sheet5Data from '../data/sheet5.json';
import rainbow from '../data/rainbow.json';

Vue.use(Vuex);

function levelData(){
    let levels = [];
    levels.push({
        id: 0,
        name: "Level 1",
        sheet: sheetData,
        best: localStorage.getItem("best") ? parseInt(localStorage.getItem("best")) : null,
        scoreKey: "best"
    });
    levels.push({
        id: 1,
        name: "Level 2",
        sheet: sheet2Data,
        best: localStorage.getItem("level2-best") ? parseInt(localStorage.getItem("level2-best")) : null,
        requirement: 35,
        scoreKey: "level2-best"
    });
    levels.push({
        id: 2,
        name: "Level 3",
        sheet: sheet3Data,
        best: localStorage.getItem("level3-best") ? parseInt(localStorage.getItem("level3-best")) : null,
        requirement: 75,
        scoreKey: "level3-best"
    });
    levels.push({
        id: 3,
        name: "Level 4",
        sheet: sheet4Data,
        best: localStorage.getItem("level4-best") ? parseInt(localStorage.getItem("level4-best")) : null,
        requirement: 110,
        scoreKey: "level4-best"
    });
    levels.push({
        id: 4,
        name: "Level 5",
        sheet: sheet5Data,
        best: localStorage.getItem("level5-2-best") ? parseInt(localStorage.getItem("level5-2-best")) : null,
        requirement: 150,
        scoreKey: "level5-2-best"
    });
    levels.push({
        id: 5,
        name: "Rainbow Road",
        sheet: rainbow,
        best: localStorage.getItem("rainbow-best") ? parseInt(localStorage.getItem("rainbow-best")) : null,
        requirement: 200,
        scoreKey: "rainbow-best"
    });

    return levels;
}

function levelIdFromLocalStorage(){
    let level = localStorage.getItem("level");
    return level ? parseInt(level) : 0;
}

function initSheet(sheet){
    for (let i in sheet.colls) {
        let coll = sheet.colls[i];

        for(let y in coll.cells){
            let cell = coll.cells[y];
            cell.faded = false;
            cell.selectable = coll.startingLane;
            cell.startingLane = coll.startingLane;
            cell.unlocked = false;
            cell.selected = false;
            cell.marked = false;
        }
    }
    return sheet;
}

function initColors(){
    let colors = sheetData.colors;
    for (let i in colors) {
        let color = colors[i];
        color.completed = false;
    }
    return colors;
}

function fadeCells(state){
    let sheet = state.sheet;
    let selectedColor = state.colorDice ? state.colorDice.value : null;
    for (let i in sheet.colls) {
        let coll = sheet.colls[i];
        for(let y in coll.cells){
            let cell = coll.cells[y];
            cell.faded = selectedColor && (selectedColor !== 'black' && selectedColor !== cell.color);
        }
    }
    return sheet;
}

function markCells(state){
    let sheet = state.sheet;
    for (let i in sheet.colls) {
        let coll = sheet.colls[i];
        for(let y in coll.cells){
            let cell = coll.cells[y];
            if(!cell.marked){
                cell.marked = state.selectedCells.filter(e => e.id === cell.id).length > 0;
            }
        }
    }
    return sheet;
}

function markColors(state){
    let colors = state.colors;
    for (let i in colors) {
        let color = colors[i];
        color.completed = checkIfColorIsCompleted(state.sheet, color.color);
    }
    return colors;
}

function checkIfColorIsCompleted(sheet, color){
    for (let i in sheet.colls) {
        let coll = sheet.colls[i];
        for(let y in coll.cells){
            let cell = coll.cells[y];
            if(!cell.marked && cell.color === color){
                return false;
            }
        }
    }
    return true;
}

function markJokers(state){
    let nrOfJokersUsed = 0;
    if(state.colorDice && state.colorDice.value === "black"){
        nrOfJokersUsed++;
    }
    if(state.numberDice && state.numberDice.value === "?"){
        nrOfJokersUsed++;
    }
    state.jokersUsed += nrOfJokersUsed;

    return state;
}

function isCellAllowedToBeSelected(sheet, cell, selection){
    //marked cells are completed and can never be selected again
    if(cell.marked){
        return false;
    }

    //if already selected we can deselect it again
    if(cell.selected){
        return true;
    }

    let isInTheSameBlock = selection.length === 0;
    let allowed = cell.unlocked || cell.startingLane;
    //if not we check the surrounding cells are selectable or unlocked
    let leftCell = findCellById(sheet, cell.id - 7);
    let rightCell = findCellById(sheet, cell.id + 7); 
    let surroundingCells = [leftCell, rightCell];

    //don't if the current cell is the top cell
    if(cell.id%7 !== 0){
        let topCell = findCellById(sheet, cell.id - 1);
        surroundingCells.push(topCell);
    }

    //don't if the current cell is the bottomcell
    if((cell.id+1)%7 !== 0){
        let bottomCell = findCellById(sheet, cell.id + 1);
        surroundingCells.push(bottomCell);
    }
       
    for(let i in surroundingCells){
        let surroundingCell = surroundingCells[i];
        if(surroundingCell && (surroundingCell.unlocked || surroundingCell.selected || surroundingCell.marked)){
            allowed = true;
            //check if a cell is in the same block as the current selection
            if(!isInTheSameBlock){
                isInTheSameBlock = selection.filter(e => e.id === surroundingCell.id).length > 0;
            }
        }
    } 

    return allowed && isInTheSameBlock;
}

function findCellById(sheet, id){
    for (let i in sheet.colls) {
        let coll = sheet.colls[i];
        for(let y in coll.cells){
            let cell = coll.cells[y];
            if(cell.id === id){
                return cell;
            }
        }
    }
}

function resetCellSelection(state){
    state.selectedCells = [];
    state.selectionCount = 0;
    state.currentColor = 0;
    state.sheet = updateSelectedCells(state.sheet, state.selectedCells);

    return state;
}

function updateSelectedCells(sheet, selectedCells){
    for (let i in sheet.colls) {
        let coll = sheet.colls[i];
        for(let y in coll.cells){
            let cell = coll.cells[y];
            cell.selected = selectedCells.filter(e => e.id === cell.id).length > 0;
        }
    }

    return sheet;
}

function countIsAcceptable(numberDice, count){
    if(!numberDice){
        return false;
    }
    //if ? we can accept up to 5
    if(numberDice.value === '?'){
        return count < 5;
    }

    return (numberDice.value - count) > 0;
}

export default new Vuex.Store({
    state: {
        currentLevel: levelData()[levelIdFromLocalStorage()],
        turn: 0,
        jokersUsed: 0,
        rolling: false,
        nextTurnIsPossible: true,
        numberDice: null,
        colorDice: null,
        currentColor: null,
        selectionCount: 0,
        selectedCells: [],
        sheet: initSheet(levelData()[levelIdFromLocalStorage()].sheet),
        colors: initColors(),
        isFinished: false,
        showHelp: false,
        levelSelect: false,
        showInfo: false,
    },
    mutations: { 
        showHelp(state, value){
            this.state.showHelp = value;
        },
        showInfo(state, value){
            this.state.showInfo = value;
        },
        showLevelSelect(state, value){
            this.state.levelSelect = value;
        },
        setNumber(state, dice){
            if(dice.value === "?"){
                //check if we have jokers left.
                if(this.state.jokersUsed === sheetData.nrOfJokers){
                    return;
                }
                else if(this.state.colorDice && this.state.colorDice.value === "black" && this.state.jokersUsed + 1 === sheetData.nrOfJokers){
                    return;
                }
            }
            this.state.numberDice = dice;
            this.replaceState(resetCellSelection(this.state));
        },
        setColor(state, dice){
            if(dice.value === "black"){
                //check if we have jokers left.
                console.log(this.state.jokersUsed);
                if(this.state.jokersUsed === sheetData.nrOfJokers){
                    return;
                }
                else if(this.state.numberDice && this.state.numberDice.value === "?" && this.state.jokersUsed + 1 === sheetData.nrOfJokers){
                    return;
                }
            }
            this.state.colorDice = dice;
            this.state.sheet = fadeCells(this.state);
            this.replaceState(resetCellSelection(this.state));
        },
        setCurrentColor(state, color){
            this.state.color = color;
        },
        updateCell(state, cell){

            //check if cell is allowed to be selected
            if(!isCellAllowedToBeSelected(this.state.sheet, cell, this.state.selectedCells)){
                return;
            }

            //check if cell is of the correct color
            if(this.state.currentColor && cell.color !== this.state.currentColor){
                return;
            }

            if (this.state.selectedCells.filter(e => e.id === cell.id).length > 0) {
                let index = this.state.selectedCells.findIndex(o => o.id === cell.id);
                this.state.selectedCells.splice(index, this.state.selectedCells.length - index);

                // if empty set the current color to null
                if(this.state.selectedCells.length === 0){
                    this.state.currentColor = null;
                }

            }
            else{
                 //check if count is acceptable
                if(!countIsAcceptable(this.state.numberDice, this.state.selectionCount)){
                    return;
                }
                if(!this.state.currentColor){
                    this.state.currentColor = cell.color;
                }
                this.state.selectedCells.push(cell);
            }

            this.state.selectionCount = this.state.selectedCells.length;

            //check if we're at the end of the turn
            this.state.nextTurnIsPossible = this.state.numberDice.value === '?' && this.state.selectionCount > 0 || this.state.selectionCount === this.state.numberDice.value;
   

            this.state.sheet = updateSelectedCells(this.state.sheet, this.state.selectedCells);
        }
    },
    actions: {
        rollTheDie({getters}, skip){
            if(!skip){
                markCells(this.state);
                markJokers(this.state);
                markColors(this.state);
            }

            if(!this.state.rolling && this.state.turn < 30){
                this.state.rolling = true;
                this.state.currentColor = null;
                this.state.colorDice = null;
                this.state.numberDice = null;
                this.state.turn++;
                this.state.nextTurnIsPossible = false;
                this.state.selectedCells = [];
                this.state.sheet = fadeCells(this.state);
                this.replaceState(resetCellSelection(this.state));

                setTimeout(() => { this.state.rolling = false; }, 1000);
            }
            else if(this.state.turn >= 30){
                this.state.isFinished = true;
                let score = getters.colorPoints + getters.columnPoints + getters.jokerPoints - getters.starPoints;



                if(this.state.currentLevel.best === null || score > this.state.currentLevel.best){
                    console.log("setting a new high score");
                    this.state.currentLevel.best = score;
                    localStorage.setItem(this.state.currentLevel.scoreKey, score);
                    this.state.score = score;
                }             
            }
        },
        resetGame(){
            this.replaceState({
                currentLevel: this.state.currentLevel,
                turn: 0,
                jokersUsed: 0,
                rolling: false,
                nextTurnIsPossible: true,
                numberDice: null,
                colorDice: null,
                currentColor: null,
                selectionCount: 0,
                selectedCells: [],
                sheet: initSheet(this.state.currentLevel.sheet),
                colors: initColors(),
                isFinished: false,
                showHelp: false,
                levelSelect: false
            });
            this.dispatch('rollTheDie', false);
        },
        selectLevel(state, value){
            this.state.currentLevel = value;
            localStorage.setItem("level", value.id);
            //horible but needed to fix bug atm
            location.reload();
            //this.dispatch('resetGame');
        }
    },
    modules: {
        
    },
    getters: {
        rolling(state) {
            return state.rolling
        },
        numberDice(state) {
            return state.numberDice
        },
        colorDice(state) {
            return state.colorDice
        },
        currentColor(state){
            return state.currentColor
        },
        sheet(state){
            return state.sheet
        },
        selectionCount(state){
            return state.selectionCount
        },
        turn(state){
            return state.turn;
        },
        nextTurnIsPossible(state){
            return state.nextTurnIsPossible;
        },
        colors(state){
            return state.colors
        },
        jokersMax(){
            return sheetData.nrOfJokers;
        },
        jokersUsed(state){
            return state.jokersUsed;
        },
        colorPoints(state){
            let points = 0;
            for(let i in state.colors){
                let color = state.colors[i];
                if(color.completed){
                    points+= 5;
                }
            }
            return points;
        },
        columnPoints(state){
            let points = 0;
            for(let i in state.sheet.colls){
                let coll = state.sheet.colls[i];
                if(coll.cells.filter(cell => !cell.marked).length === 0){
                    points+= coll.pointsMax;
                }
            }
            return points;
        },
        jokerPoints(state){
            return sheetData.nrOfJokers - state.jokersUsed;
        },
        starPoints(state){
            let points = 0;
            for(let i in state.sheet.colls){
                let coll = state.sheet.colls[i];
                coll.cells.filter(cell => (!cell.marked && cell.hasStar)).length
                points += coll.cells.filter(cell => (!cell.marked && cell.hasStar)).length * 2;
            }
            return points;
        },
        isFinished(state){
            return state.isFinished;
        },
        help(state){
            return state.showHelp;
        },
        info(state){
            return state.showInfo;
        },
        levelSelect(state){
            return state.levelSelect;
        },
        levels(){
            return levelData();
        },
        currentLevel(state){
            return state.currentLevel;
        }
    },
});