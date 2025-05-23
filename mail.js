const Mail_submit_button = document.getElementById('mailredirection');

Mail_submit_button.addEventListener('click', function() {
    const email = "shethuday505@gmail.com";
    const subject = encodeURIComponent(document.getElementById('about').value);
    const body = encodeURIComponent(document.getElementById('message').value);

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.location.href = gmailURL;
});
