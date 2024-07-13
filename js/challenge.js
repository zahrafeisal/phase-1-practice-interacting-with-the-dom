document.addEventListener('DOMContentLoaded', () => {
    const timer = document.getElementById('counter');
    let timeInSecs = 0;
    let interval = 1000;
    let timeOut;
    let paused = false

    // start timer
    function timerRun() {
        timer.textContent = timeInSecs;
        timeInSecs++;

        timeOut = setTimeout(timerRun, interval);
    }
    timerRun();


    // manually increase timer
    const addButton = document.getElementById('plus')

    addButton.addEventListener('click', () => {
        clearTimeout(timeOut);
        timerRun();
    });


    // manually decrease timer
    const minusButton = document.getElementById('minus')

    minusButton.addEventListener('click', () => {
        clearTimeout(timeOut);
        timeInSecs = timeInSecs - 1;
        timer.textContent = timeInSecs;

        timeOut = setTimeout(timerRun, interval);
    });


    // pause timer
    const pauseButton = document.getElementById('pause');

    pauseButton.addEventListener('click', () => {
        pauseButton.textContent = 'pause'
        if(!paused) {
            paused = true;
            clearTimeout(timeOut);
            pauseButton.textContent = 'resume';

            likerButton.disabled = true;
            minusButton.disabled = true;
            addButton.disabled = true;
            submitButton.disabled = true;

        } else {
            paused = false;
            pauseButton.textContent = 'pause';

            likerButton.disabled = false;
            minusButton.disabled = false;
            addButton.disabled = false;
            submitButton.disabled = false;

            timerRun();
        }
    })


    // like number
    let likedNumber = {};
    const likerButton = document.getElementById('heart')
    const likerList = document.querySelector('.likes')

    likerButton.addEventListener('click', () => {
        if(likedNumber[timeInSecs]) {
            likedNumber[timeInSecs]++;
        } else {
            likedNumber[timeInSecs ] = 1;
        }
        updateLikerList();
    });

    function updateLikerList() {
        likerList.innerHTML = '';
        for(const [number, count] of Object.entries(likedNumber)) {
            const li = document.createElement('li');
            li.textContent = `${number} has been liked ${count} times`
            
            likerList.appendChild(li)
        }
    }


    // adding comments
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentList =  document.getElementById('list');
    const submitButton = document.getElementById('submit');

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const comment = commentInput.value;
        addComment(comment);
        commentInput.value = '';  // clear input field
    })

    function addComment(text) {
        const p = document.createElement('p');
        p.textContent = text;

        commentList.appendChild(p);
    }
})

