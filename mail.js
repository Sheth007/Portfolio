const Mail_submit_button = document.getElementById('copymailid');

Mail_submit_button.addEventListener('click', function() {
    const text = "shethuday505@gmail.com";
    navigator.clipboard.writeText(text).then(() => {
        const notify = document.getElementById('notify');
        notify.style.display = 'block';
        setTimeout(() => {
          notify.style.display = 'none';
        }, 5000);
      });
});