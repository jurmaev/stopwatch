(() => {
  let milliseconds = 0;
  let intervalId;
  const stopwatch = document.querySelector('.stopwatch');
  const startBtn = document.querySelector('.btn');
  const controls = document.querySelector('.controls');

  function getTime(milliseconds) {
    const minutes = parseInt(milliseconds / 1000 / 60);
    const seconds = parseInt(milliseconds / 1000);
    const decimal = parseInt((milliseconds % 1000) / 10);
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }.${decimal < 10 ? '0' + decimal : decimal}`;
  }

  function startInterval() {
    const id = setInterval(() => {
      stopwatch.textContent = getTime(milliseconds);
      milliseconds += 10;
    }, 10);
    return id;
  }

  startBtn.addEventListener('click', () => {
    intervalId = startInterval();

    const lapResetBtn = document.createElement('button');
    lapResetBtn.classList.add('btn');
    lapResetBtn.textContent = 'Lap';
    lapResetBtn.id = 'lap';

    const pauseResumeBtn = document.createElement('button');
    pauseResumeBtn.classList.add('btn');
    pauseResumeBtn.textContent = 'Pause';
    pauseResumeBtn.id = 'pause';

    controls.innerHTML = '';
    controls.append(lapResetBtn);
    controls.append(pauseResumeBtn);

    lapResetBtn.addEventListener('click', () => {
      if (lapResetBtn.id === 'lap') {
      } else if (lapResetBtn.id === 'reset') {
        milliseconds = 0;
        stopwatch.textContent = '00:00.00';
        controls.innerHTML = '';
        controls.append(startBtn);
        clearInterval(intervalId);
      }
    });

    pauseResumeBtn.addEventListener('click', () => {
      if (pauseResumeBtn.id === 'pause') {
        clearInterval(intervalId);
        lapResetBtn.textContent = 'Reset';
        lapResetBtn.id = 'reset';
        pauseResumeBtn.textContent = 'Resume';
        pauseResumeBtn.id = 'resume';
      } else if (pauseResumeBtn.id === 'resume') {
        intervalId = startInterval();
        lapResetBtn.textContent = 'Lap';
        lapResetBtn.id = 'lap';
        pauseResumeBtn.textContent = 'Pause';
        pauseResumeBtn.id = 'pause';
      }
    });
  });
})();
