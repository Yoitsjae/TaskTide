document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent page reload

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        if (!name || !email || !password || !role) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                if (role === 'Customer') {
                    window.location.href = 'client-dashboard.html';
                } else {
                    window.location.href = 'provider-dashboard.html';
                }
            } else {
                alert(data.error || 'Failed to sign up.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error. Please try again later.');
        }
    });
});
