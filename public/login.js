

function Login() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    if (!username || !password) {
        console.log({error:'Username or password empty.'});
        const element = document.getElementById('loginErrLabel');
        element.innerText = 'Username or password empty.';
        return 1;
    }

    fetch( + '/login', {
        method: 'POST',  // HTTP Method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
}