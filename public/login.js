

function Login() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    if (!username || !password) {
        const element = document.getElementById('loginErrLabel');
        element.innerText = 'Username or password empty.';
        return 1;
    }

    fetch('http://localhost:3000' + '/login', {
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
        if (data.satatus !== 200) {
          const element = document.getElementById('loginErrLabel');
          element.innerText = data.message;
          return 1;
        }
      })
      .catch(error => console.error('Error:', error));
}

function redirectToRegister() {
    window.location.href = '/register.html';
}

// 
// Register page functions
// 

function redirectToLogin() {
  window.location.href = '/login.html';
}

function register() {
  const username = document.getElementById('usernameInput').value;
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  if (!username || !password || !email) {
      const element = document.getElementById('registerErrLabel');
      element.innerText = 'Inputs are empty.';
      return 1;
  }

  fetch('http://localhost:3000' + '/users/register', {
      method: 'POST',  // HTTP Method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      const element = document.getElementById('registerErrLabel');
      console.log(data);
      if (data.status !== 201) {
        element.innerText = data.message;
        return 1;
      } else {
        console.log(data);
        if (data.token) {
          localStorage.setItem('token', data.token); // Token'ı localStorage'a kaydet
        } else {
          element.innerText = 'Giris yapilirken bir hata oluştu.';
          return 1;
        }
        element.innerText = 'Kullanıcı başarıyla oluşturuldu ve giriş yapılıyor...';
        setTimeout(() => {
          window.location.href = '/';
        }, 2000); // 2 saniye sonra yönlendir
      }
    })
    .catch(error => console.error('Error:', error));
}