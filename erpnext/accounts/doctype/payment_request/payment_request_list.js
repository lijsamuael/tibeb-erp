const INDICATORS = {
	"Partially Paid": "orange",
	Cancelled: "red",
	Draft: "gray",
	Failed: "red",
	Initiated: "green",
	Paid: "blue",
	Requested: "green",
};

frappe.listview_settings["Payment Request"] = {
	add_fields: ["status"],
	get_indicator: function (doc) {
		if (!doc.status || !INDICATORS[doc.status]) return;

		return [__(doc.status), INDICATORS[doc.status], `status,=,${doc.status}`];
	},
};
