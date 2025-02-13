# Copyright (c) 2021, Frappe Technologies and contributors
# For license information, please see license.txt

import os
from string import ascii_letters, digits

import frappe
from frappe.model.document import Document

LICENSES = (
	"GNU Affero General Public License",
	"GNU General Public License",
	"MIT License",
)


class Package(Document):
	def validate(self):
		if not self.package_name:
			self.package_name = self.name.lower().replace(" ", "-")

		allowed_characters = ascii_letters + digits + "-"
		if not all(c in allowed_characters for c in self.package_name):
			frappe.throw("Package name can only contain letters, digits and hyphens")


@frappe.whitelist()
def get_license_text(license_type: str) -> str | None:
	if license_type in LICENSES:
		with open(os.path.join(os.path.dirname(__file__), "licenses", license_type + ".md")) as textfile:
			return textfile.read()
