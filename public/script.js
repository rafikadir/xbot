document.getElementById('runBot').addEventListener('click', async () => {
    const status = document.getElementById('status');
    status.textContent = 'Running bot...';
  
    try {
      const response = await fetch('https://xbot-theta.vercel.app/api/bot', { method: 'POST' });
      const data = await response.json();
  
      if (response.ok) {
        status.textContent = 'Success: Bot ran!';
      } else {
        status.textContent = `Error: ${data.error}`;
      }
    } catch (error) {
      status.textContent = `Error: ${error.message}`;
    }
  });
  