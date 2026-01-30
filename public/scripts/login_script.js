
async function login() {
    let userName = document.getElementById('userName').value;
    let pass = document.getElementById('pass').value;
    try {
        if (userName && pass) {
            let response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, pass })
            })

            // בדיקה אם התגובה היא JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                alert('שגיאת שרת - התקבלה תגובה לא תקינה');
                return;
            }

            let data = await response.json();

            if (response.status == 200) {
                localStorage.setItem('name',data.name);
                window.location.href = '/';
                return;
            }
            alert(data.message);
        }else{
            alert("חסרים נתונים")
        }
    } catch (err) {
        console.error('Login error:', err);
        alert('שגיאת התחברות: ' + err.message)
    }
}