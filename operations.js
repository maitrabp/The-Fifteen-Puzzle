var tablevals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var moves = 0;
function fillTable(table, quickGame) {
    var randChoice;
    moves = 0;
    if(!quickGame)
    {
        tablevals = shuffleValue(tablevals);  
    }
    else{
        randChoice = Math.floor(Math.random() * Math.floor(2)); 
        tablevals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    }
    //rows
    var ind1D = 0;
    for(let i = 0; i < table.rows.length; i++)
    {
        //PUT SHUFFLED VALUES OF 1D ARRAY INTO 2D ARRAY
        for(let j = 0; j < table.rows[i].cells.length; j++)
        {
            //Changes values for the table at each cell
            table.rows[i].cells[j].innerHTML = tablevals[ind1D];
            //Set blankspace
            if(tablevals[ind1D] == 16)
            {
                table.rows[i].cells[j].setAttribute("id", "blankspace");
                table.rows[i].cells[j].innerHTML = " ";
            }
            else{
                table.rows[i].cells[j].setAttribute("id", "dim" + j + i);
            }
            ind1D+=1;
        }
    }
    if((randChoice == "0") && quickGame)
    {
        //SWAP 12 & 16 for one move game
        swapCells(table.rows[2].cells[3], table.rows[3].cells[3]);
    }
    else if((randChoice == "1") && quickGame)
    { 
        //SWAP 15 & 16 for one move game
        swapCells(table.rows[3].cells[2], table.rows[3].cells[3]);
    }
}

//SHUFFLE 1D ARRAY VALUES
function shuffleValue(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        //USING MATHRANDOM METHOD, WE SCRAMBLE 1D ARRAY
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  return array;
}

function clickCell(table)
{
    var validCheck = true;
    if (table != null) {
        for (let i = 0; i < table.rows.length; i++) {
            for (let j = 0; j < table.rows[i].cells.length; j++)
            table.rows[i].cells[j].onclick = function () {
                var winId = document.getElementById("message");
                winId.innerHTML = " ";
                //UP CHECK
                if((i-1 >= 0) && (table.rows[i-1].cells[j].innerHTML == " "))
                {
                    document.getElementById("moves").innerHTML = ++moves;   
                    swapCells(table.rows[i].cells[j], table.rows[i-1].cells[j]);
                    winId.innerHTML = " ";
                    console.log("Valid Check UP");
                    validCheck = true;
                }
                //DOWN CHECK
                else if((i+1 <= 3) && (table.rows[i+1].cells[j].innerHTML == " "))
                {
                     document.getElementById("moves").innerHTML = ++moves;   
                     swapCells(table.rows[i].cells[j], table.rows[i+1].cells[j]);
                     winId.innerHTML = " ";
                     validCheck = true;
                     console.log("Valid Check Down");
                }
                //Left Check
               else if(((j-1) >= 0) && (table.rows[i].cells[j-1].innerHTML == " "))
                {
                        document.getElementById("moves").innerHTML = ++moves;   
                        swapCells(table.rows[i].cells[j], table.rows[i].cells[j-1]);
                        winId.innerHTML = " ";
                        validCheck = true;
                        console.log("Valid Check Left");
                }
                //RIGHT CHECK
                else if(((j+1) <= 3) && (table.rows[i].cells[j+1].innerHTML == " "))
                {
                   document.getElementById("moves").innerHTML = ++moves;   
                   swapCells(table.rows[i].cells[j], table.rows[i].cells[j+1]);
                   winId.innerHTML = " ";
                   validCheck = true;
                   console.log("Valid Check Right");
                }
                else
                {
                    console.log("We inside valid check");
                    winId.innerHTML = "Invalid Move!";
                }
                gameover(table);           
            };
        }
    }
}
function swapCells(x1, x2 )
{
    var temp0 = x1.ID;
    x1.setAttribute("id", "blankspace");
    x2.setAttribute("id", temp0);
    var temp = x1.innerHTML;

    x1.innerHTML = x2.innerHTML;
    //blank cell
    x2.innerHTML = temp;
}
function startTimer()
{ 
    var counter = 0;
    startTime = setInterval(function() {
    counter++;
    document.getElementById("timer").innerHTML = counter;
    }, 1000)
}
function stopTimer()
{
    counter = 0;
    console.log("Stopping Timer");
    clearInterval(startTime);
}
function gameover(table)
{
    var counter = 1;
    var gameoverCheck = true;
    for(let i = 0; i < table.rows.length; i++)
    {
        for(let j = 0; j < table.rows[i].cells.length; j++)
        {
            if(counter < 16)
            {
                if(table.rows[i].cells[j].innerHTML == counter)
                {
                    gameoverCheck = true;
                }
                else{
                    gameoverCheck = false;
                    break;
                }
            }
            counter++;
        }
        if(gameoverCheck)
            break;
    }
    if(gameoverCheck)
    {
        if(confirm("GAME OVER, Start Over?"))
        {
            var winId = document.getElementById("message");
            winId.innerHTML = " ";
            moves = 0;
            fillTable(table, false);
            stopTimer();
            startTimer();
            
        }
        else{
            var winId = document.getElementById("message");
            winId.innerHTML = "YOU WON!"
            moves = 0;
        }
    }
}