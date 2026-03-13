
/**
 * Attach listeners to the form element and validate on submit.
 * @param {Function} onSubmit - invoked with the formData object when the
 *                              validation succeeds.
 */
export function initForm(onSubmit) {

    const formEl = document.getElementById('inducteeForm');
    if (!formEl) {
        console.warn('Form element with id "inducteeForm" not found');
        return;
    }

    formEl.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm(onSubmit);
    });
}

function validateForm(onSubmit) {
    const formData = {
        firstName: document.getElementById('firstname').value.trim(),
        lastName: document.getElementById('lastname').value.trim(),
        phoneNumber: document.getElementById('phonenumber').value.trim(),
        residence: document.getElementById('residence').value.trim(),
        hasWhatsApp: document.getElementById('hasWhatsApp').checked
    };

    // sanitize input: remove special characters and spaces
    formData.firstName = formData.firstName.replace(/[^a-zA-Z0-9]/g, '');
    formData.lastName = formData.lastName.replace(/[^a-zA-Z0-9]/g, '');
    formData.residence = formData.residence.replace(/[^a-zA-Z0-9]/g, '');

    // basic required‑field check
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.residence) {
        alert('Please fill in all required fields.');
        return;
    }

    // validate phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // if everything looks good, hand off to the caller
    if (typeof onSubmit === 'function') {
        onSubmit(formData);
    }
}

export function formObject() {
    const formEl = document.getElementById('inducteeForm');
    return formEl;
}
