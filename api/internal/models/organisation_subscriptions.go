package models

import "time"

type OrganisationSubscription struct {
	ID                int       `json:"id"`
	OrganisationID    int       `json:"organisationId"`
	SoftwareProductID int       `json:"softwareProductId"`
	StartDate         time.Time `json:"startDate"`
	EndDate           time.Time `json:"endDate,omitempty"`
}
