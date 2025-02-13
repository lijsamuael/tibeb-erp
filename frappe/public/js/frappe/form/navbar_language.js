function setLanguage(language) {
    frappe.call({
        method: "frappe.client.set_value",
        args: {
            doctype: "User",
            name: frappe.session.user,
            fieldname: "language",
            value: language,
        },
        callback: function(response) {
            if (response.message) {
                location.reload(); // Reload the page to apply the language change
            }
        },
    });
}

// Expose the function globally
window.setLanguage = setLanguage;

