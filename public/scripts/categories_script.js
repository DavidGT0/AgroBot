
document.addEventListener('DOMContentLoaded', loadCategories);

async function loadCategories() {
    try {
        let response = await fetch('/categories');
        if (response.status === 401) {
            window.location.href = '/login';
            return;
        }

        // בדיקה שהתשובה תקינה
        if (!response.ok) {
            let errorData = await response.json();
            alert('שגיאה: ' + (errorData.message || 'שגיאה לא ידועה'));
            return;
        }

        let data = await response.json();

        // בדיקה שהנתונים הם מערך
        if (!Array.isArray(data)) {
            console.error('Data received:', data);
            alert('התקבלו נתונים לא תקינים מהשרת');
            return;
        }

        displayCategories(data);
    } catch (err) {
        console.error('Error loading categories:', err);
        alert('שגיאה בטעינת קטגוריות: ' + err.message);
    }
}

function displayCategories(categories) {
    let tableBody = document.getElementById('categoriesTable');
    tableBody.innerHTML = '';

    if (categories.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3">אין קטגוריות להצגה</td></tr>';
        return;
    }

    categories.forEach(category => {
        // הגנה מפני שמות עם גרשיים
        let safeName = (category.name || '').replace(/'/g, "\\'");

        let row = `
            <tr>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>
                    <button onclick="editCategory(${category.id}, '${safeName}')">ערוך</button>
                    <button onclick="deleteCategory(${category.id})">מחק</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function editCategory(id, name) {
    document.getElementById('id').value = id;
    document.getElementById('name').value = name;
}

function clearForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
}

async function addOrEditCategory() {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;

    if (!name) {
        alert('נא למלא שם קטגוריה');
        return;
    }

    try {
        if (id) {
            // עדכון קטגוריה
            let response = await fetch(`/categories/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            let data = await response.json();
            alert(data.message);
        } else {
            // הוספת קטגוריה
            let response = await fetch('/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            let data = await response.json();
            alert(data.message);
        }

        clearForm();
        loadCategories();
    } catch (err) {
        console.error('Error saving category:', err);
        alert('שגיאה: ' + err.message);
    }
}

async function deleteCategory(id) {
    // בדיקה אם יש משימות מקושרות
    let hasTasks = await checkIfCategoryHasTasks(id);

    let confirmMessage = hasTasks
        ? 'קטגוריה זו מכילה משימות. מחיקתה תמחק גם את כל המשימות המשוייכות אליה. האם להמשיך?'
        : 'האם אתה בטוח שברצונך למחוק קטגוריה זו?';

    if (!confirm(confirmMessage)) {
        return;
    }

    try {
        let response = await fetch(`/categories/${id}`, {
            method: 'DELETE'
        });
        let data = await response.json();
        alert(data.message);
        loadCategories();
    } catch (err) {
        console.error('Error deleting category:', err);
        alert('שגיאה במחיקה: ' + err.message);
    }
}

async function checkIfCategoryHasTasks(categoryId) {
    try {
        let response = await fetch('/tasks');
        if (response.status === 200) {
            let tasks = await response.json();
            return tasks.some(task => task.category_id === categoryId);
        }
        return false;
    } catch (err) {
        console.error('שגיאה בבדיקת משימות:', err);
        return false;
    }
}