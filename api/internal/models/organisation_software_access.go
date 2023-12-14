package models

type OrganisationSoftwareAccess struct {
	OrganisationID    int  `json:"organisationId"`
	SoftwareProductID int  `json:"softwareProductId"`
	AccessGranted     bool `json:"accessGranted"`
}
