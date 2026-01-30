async function register() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let userName = document.getElementById('userName').value;
    let pass = document.getElementById('pass').value;
    try {
        if (name && email && userName && pass) {
            let response = await fetch('/auth/reg', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, userName, pass})
            })
            if (response.status == 201) {
                window.location.href = '/login';
                return;
            }
            let data = await response.json();
            alert(data.message);
        } else {
            alert("חסרים נתונים")
        }
    } catch (err) {
        alert(err)
    }
}