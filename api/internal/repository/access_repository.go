package repository

import (
	"database/sql"
	"log"

	"example.com/internal/models"
)

type UserAccessResponse struct {
	Organisation    models.Organisation    `json:"organisation"`
	SoftwareProduct models.SoftwareProduct `json:"softwareProduct"`
	AccessGranted   bool                   `json:"accessGranted"`
}

func GetUserOrganisationAndSoftwareAccess(db *sql.DB, email string, softwareId string) (UserAccessResponse, error) {
	const sql = `
    SELECT o.*, 
           sp.*, 
           osa.access_granted
    FROM users u
    JOIN user_organisations uo ON u.id = uo.user_id
    JOIN organisations o ON uo.organisation_id = o.id
    JOIN organisation_software_access osa ON o.id = osa.organisation_id
    JOIN software_products sp ON osa.software_product_id = sp.id
    WHERE u.email = $1 AND sp.id = $2;
    `

	row := db.QueryRow(sql, email, softwareId)
	var userAccessResponse UserAccessResponse
	err := row.Scan(
		&userAccessResponse.Organisation.ID,
		&userAccessResponse.Organisation.Name,
		&userAccessResponse.Organisation.Address,
		&userAccessResponse.Organisation.ContactEmail,
		&userAccessResponse.SoftwareProduct.ID,
		&userAccessResponse.SoftwareProduct.Name,
		&userAccessResponse.SoftwareProduct.Description,
		&userAccessResponse.SoftwareProduct.PriceMonthly,
		&userAccessResponse.SoftwareProduct.PriceAnnually,
		&userAccessResponse.AccessGranted,
	)
	if err != nil {
		log.Println("access org and software error", err)
		return UserAccessResponse{}, err
	}
	return userAccessResponse, nil
}
