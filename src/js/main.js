(() => {
  let milliseconds = 0;
  let intervalId;
  const stopwatch = document.querySelector('.stopwatch');
  const startBtn = document.querySelector('.btn');
  const controls = document.querySelector('.controls');

  const lapResetBtn = document.createElement('button');
  lapResetBtn.classList.add('btn');
  lapResetBtn.textContent = 'Lap';
  lapResetBtn.id = 'lap';

  const pauseResumeBtn = document.createElement('button');
  pauseResumeBtn.classList.add('btn');
  pauseResumeBtn.textContent = 'Pause';
  pauseResumeBtn.id = 'pause';

  function startInterval() {
    const id = setInterval(() => {
      stopwatch.textContent = `${parseInt(milliseconds / 1000 / 60)}:${parseInt(
        milliseconds / 1000
      )}.${parseInt((milliseconds % 1000) / 10)}`;
      milliseconds += 10;
    }, 10);
    return id;
  }

  startBtn.addEventListener('click', () => {
    intervalId = startInterval();
    controls.innerHTML = '';
    controls.append(lapResetBtn);
    controls.append(pauseResumeBtn);

    lapResetBtn.addEventListener('click', () => {
      if (lapResetBtn.id === 'lap') {
        // lapResetBtn.textContent = 'Reset';
        // lapResetBtn.id = 'reset';
      } else if (lapResetBtn.id === 'reset') {
        clearInterval(intervalId);
        milliseconds = 0;
        stopwatch.textContent = '00:00.00';
      }
    });

    pauseResumeBtn.addEventListener('click', () => {
      if (pauseResumeBtn.id === 'pause') {
        clearInterval(intervalId);
        pauseResumeBtn.textContent = 'Resume';
        pauseResumeBtn.id = 'resume';
      } else if (pauseResumeBtn.id === 'resume') {
        intervalId = startInterval();
        pauseResumeBtn.textContent = 'Pause';
        pauseResumeBtn.id = 'pause';
      }
    });
  });
})();
