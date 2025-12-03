# Wordle-Solver-2025
Overview: A small, on-device, offline web app for solving ANY wordle problem. Easy to use and modify to meet your own needs!

### Quick Start Guide: 

##### NOTICE: YOU NEED ALL THREE OF THE FOLLOWING FILES FOR THIS PROJECT TO WORK: Wordle-Solver.html, words.js, solver.js. 

#### Step 1:
* **Windows: Open the Notepad Application.**
* **Mac: Open the TextEdit Application.** 

#### Step 2:
* **Windows: Open A new, blank, unnamed note.**
* **Mac: Open A new, blank, unnamed file/note. Select "Format" > "Make Plain Text".**

#### Step 3:
* **Windows: Copy and Paste the contents of ONE (1) Of The 3 Main Wordle-Solver Files to the opened note.**
* **Mac: Copy and Paste the contents of ONE (1) Of The 3 Main Wordle-Solver Files to the opened note.**

#### Step 4:
* **Windows: In Notepad, select "File" > "Save As". In the "File Name:" Area, write the full name of the file you had copy and pasted(words.js, solver.js, etc.). Then Select "Save As Type", and select "All Files". Select "Save".**
* **Mac: In TextEdit, Go To "File" > "Save". In the file name area, write only the first part of the file(Stop at the place for the extension. Example: "Hello" instead of "Hello.html"). Make sure you add the correct extension for the particular file!**

#### Step 5:
* **Windows: Repeat steps 3 and 4 for all the files needed(See Above). When finished, you should have ONE (1) .html file and TWO (2) .js files.**
* **Mac: Repeat steps 3 and 4 for all the files needed(See Above). When finished, you should have ONE (1) .html file and TWO (2) .js files.**
* *IMPORTANT: MAKE SURE THAT ALL 3 FILES ARE SAVED AS CODE, NOT TEXT FILES! If you encounter an issue, consult the help resources below.*

#### Step 6:
* **Windows: Locate Wordle-Solver.html and double click it. It will open the wordle solver in your browser.**
* **Mac: Locate Wordle-Solver.html and double click it. It should open in your defult browser however you may be asked to choose what to open it with. Choose your browser.**

### How To Use: 
When started, it will start on the default word: SOARE. This will be your first guess. In your wordle game, type this word(SOARE) into it. Select enter or your wordle game's equivelent. When you see a green letter, type "G" into the wordle solver. When you see a yellow letter, type "Y" into the wordle solver. When you see a gray letter, type "B" into the wordle solver. For Example: I type "SOARE" into the wordle game. The wordle gaame informs me that only "R" and "O" are green, and "E" is yellow. The letters "S" and "A" are gray. Therefore, the input I would type into the wordle-solver would be "BGBGY". After you input the sequence of letters so that they match the results you have, you can select "Apply". The wordle-solver will then give you the next word you should try. Repeat this process as many times as neccessary. 

### Additional Information:
* This solver is intended for classic 5 letter wordle and uses a library based off of the NYT wordle indexed for total possible words.
* There are a total of 14,855 five-letter words that can be used.
* The average amount of tries until it can solve is 4. However, it can vary based on the key word used by the wordle game.
* You must always start with the word "SOARE". The solver does not expect you to not guess the word given by it. In the case that your wordle game does not accept the word, you can choose to use a different word from the "Canidate Words" section.

### Help Guide: 
* *The "Wordle-Solver.html" file isn't opening in my browser:* You may have them saved as a text file, not as the correct code file. Delete the file that is not working, and do steps 3 and 4 again. Consult google for additional help.
* *The user interface is all messed up, it looks terrible/I can't see the user interface at all even when the page is open:* You may have mis-typed or deleted part of Wordle-Solver.html. Delete the current Wordle-Solver.html file and do steps 3 and 4 again.
* *When I click "Apply", it doesn't do anything:* You may not have all the correct files or some may be in .txt format. Double check that you have all the correct files and they are all in the correct formats. If the issue persists, try creating a dedicated folder for all three of the files and save them there. The reason for this is that Wordle-Solver.html is not able to communicate with the two other files.
* *The Wordle-Solver keeps giving me the wrong answers/not usable words:* You either did not fully copy words.js or your wordle game uses a slightly different library of words. In this case, start by selecting "Reset" and try to re-input your answers again.
* *When I input the answers from the wordle game, no new word pops up:* You may have mis-typed your answer, try retyping it in. If this issue persists, select "Reset" and try again. 
