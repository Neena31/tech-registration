const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const messageEl = document.getElementById('formMessage');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  messageEl.textContent = '';
  messageEl.className = 'message';

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    college: form.college.value.trim()
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.college) {
    messageEl.textContent = 'Please fill in all fields.';
    messageEl.classList.add('error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Unable to submit registration.');
    }

    messageEl.textContent = data.message || 'Registration successful!';
    messageEl.classList.add('success');
    form.reset();
  } catch (error) {
    console.error('Registration client error:', error);
    messageEl.textContent = error.message || 'Server error. Try again later.';
    messageEl.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Register Now';
  }
});
